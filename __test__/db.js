const knex = require('knex');
const knexfile = require('../knexfile')['development'];

const connector = knex(knexfile);

async function start() {
  const result = await connector('users').where({
    nickname: '次元世界',
  }).count();
  console.log(result[0]['count(*)']);
}

start();

