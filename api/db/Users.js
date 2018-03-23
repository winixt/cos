import { users } from './table';


class Users {
  constructor({ connector }) {
    this.connector = connector;
  }

  async getUser(id) {
    const result = await this.connector(users).where({
      id,
    });
    return result[0];
  }

  async addUser() {
    try {
      const result = await this.connector(users).returning('id').insert({
        nickname: '次元世界',
        message: '我们只是一群爱 cos 的人儿',
        city: '全国',
        ctime: this.connector.fn.now(),
        loginTime: this.connector.fn.now(),
      });
      return {
        id: result[0],
        retCode: 0,
      };
    } catch (err) {
      return {
        retCode: 1,
        error: err.message,
      };
    }
  }

  updateUser(args) {
    const { id, ...other } = args;
    return this.connector(users).where({
      id,
    }).update(other);
  }
}

export default Users;
