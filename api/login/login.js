import shortid from 'shortid';
import md5 from 'md5';

import { getSalt } from '../utils';
import { localAuth, user } from '../db/table';

class Login {
  constructor({ token }) {
    this.connector = token.connector;
    this.token = token;
  }

  register(args) {
    const { phone, password } = args;
    const uid = shortid();
    const salt = getSalt();
    const ctime = Date.now();
    this.connector(localAuth).insert({
      uid,
      phone,
      password: md5(password + salt),
      salt,
      ctime,
    });
    this.connector(user).insert({
      uid,
      name: 'cos 者',
    });
    return this.token.getToken(uid, salt, password);
  }
  async signIn(args) {
    // TODO 验证口令是否正确，正确则返回token
    const { phone, password: rawPassword } = args;
    const { uid, password, salt } = await this.connector(localAuth)
      .select('uid', 'password', 'salt')
      .where({
        phone,
      });
    if (salt) {
      const pw = md5(rawPassword + salt);
      if (pw === password) {
        return this.token.getToken(uid, password, salt);
      }
    }
    // TODO 更好的错误处理机制
    return {
      error: '用户不存在或密码错误',
    };
  }
  singOut(accessToken) {
    // 设置token 过期
    return this.token.deleteByAccess(accessToken);
  }
}

export default Login;
