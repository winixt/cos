import express from 'express';
import bodyParse from 'body-parser';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { authenticate } from './authentication';
import knex from './db';
import { User, Comment, Token, IM, Feedback } from './db/modles';
import schema from './schema';
import { mountLoginAPI } from './login/loginAPI';

export function run() {
  const token = new Token(knex);
  const PORT = 3000;
  // 全局异常处理
  process.on('uncaughtException', (err) => {
    console.error('未捕获异常', err);
  });
  // 结束数据库链接
  process.on('exit', (code) => {
    console.log(`${code}: process exit and database disconnect`);
  });
  const server = express();
  server.use(bodyParse.json());

  mountLoginAPI(server, token);

  const buildOptions = async (req, res) => {
    const result = await authenticate(req.headers.authorization, token);
    if (result) {
      return {
        schema,
        context: {
          User: new User({ connector: knex }),
          Comment: new Comment({ connector: knex }),
          IM: new IM({ connector: knex }),
          Feedback: new Feedback({ connector: knex }),
        },
      };
    }
    res.send({
      error: '未登陆',
    });
    return result;
  };

  server.use(
    '/graphql',
    graphqlExpress(buildOptions),
  );
  // 测试
  server.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`   
    }),
  );
  const ws = createServer(server);
  ws.listen(PORT, () => {
    console.log(`apollo server run on localhost:${PORT}`);
    return new SubscriptionServer({
      execute,
      subscribe,
      schema,
      onConnect: (connectionParams) => {
        if (connectionParams.authToken) {
          return authenticate(connectionParams.authToken, token);
        }
        throw new Error('Missing auth token');
      },
    }, {
      server: ws,
      path: '/subscriptions',
    });
  });
}
