import { users } from './table';


class User {
  constructor({ connector }) {
    this.connector = connector;
  }

  async getUser(uid) {
    const result = await this.connector(users).where({
      id: uid,
    });
    return result[0];
  }

  async addUser() {
    try {
      const result = await this.connector(users).returning('id').insert({
        nickname: '次元世界',
        message: '我们只是一群爱 cos 的人儿',
        city: '全国',
        loginTime: this.connector.fn.now(),
        ctime: this.connector.fn.now(),
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
    const { uid, ...other } = args;
    this.connector(users).where({
      id: uid,
    }).update(other);
    return {
      retCode: 0,
    };
  }

  updateUserLoginTime(uid) {
    this.connector(users).where({
      id: uid,
    }).update({
      loginTime: this.connector.fn.now(),
    });
    return {
      retCode: 0,
    };
  }
}

export default User;
