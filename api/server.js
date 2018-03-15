import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import knex from './db';
import { Users, Comments, IM, Feedback } from './db/modles';
import schema from './schema';

export function run() {
  const PORT = 3000;

  // 全局异常处理 TODO
  process.on('uncaughtException', (err) => {
    console.error('未捕获异常', err);
  });

  // 结束数据库链接
  process.on('exit', (code) => {
    console.log(`${code}: process exit and database disconnect`);
  });

  const app = new Koa();
  const router = new KoaRouter();

  const params = {
    schema,
    context: {
      User: new Users({ connector: knex }),
      Comment: new Comments({ connector: knex }),
      IM: new IM({ connector: knex }),
      Feedback: new Feedback({ connector: knex }),
    },
  };

  // koaBody is needed just for POST
  app.use(koaBody());

  router.post('/graphql', graphqlKoa(params));
  router.get('/graphql', graphqlKoa(params));

  router.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql', // a POST enppoint that GraphiQl will make the actual request to
  }));

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(PORT);
}
