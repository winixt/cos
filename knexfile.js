module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'wg0309',
      database: 'cos_dev',
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: '172.16.16.17',
      user: 'root',
      password: '',
      database: 'cos',
    },
  },
};
