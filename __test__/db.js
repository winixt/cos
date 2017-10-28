const knex = require('knex');
const knexfile = require('../knexfile')['production'];

const connector = knex(knexfile);

async function start() {
  let result = await connector('user').select();
  console.log(result);
}

start();

