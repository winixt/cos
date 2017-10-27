import express from 'express';
import bodyParse from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import knex from './db';
import { User, Comment } from './db/modles';
import schema from './schema';

export function run() {
  const POST = 3000;
  const HOST = '127.0.0.1';
  // 全局异常处理
  process.on('uncaughtException', (err) => {
    console.error('未捕获异常', err);
  });
  // 结束数据库链接
  process.on('exit', (code) => {
    console.log(`${code}: process exit and database disconnect`);
  });
  const app = express();
  app.use(
    '/graphql',
    bodyParse.json(),
    graphqlExpress({
      schema,
      context: {
        User: new User({ connector: knex }),
        Comment: new Comment({ connector: knex }),
      },
    }),
  );
  // 测试
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    }),
  );
  app.listen(POST, HOST, (serError) => {
    if (serError) {
      console.error(serError);
    }
    console.error(`Listen to ${HOST}:${POST}`);
  });
}
