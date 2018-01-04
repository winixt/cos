import CryptoJS from 'crypto-js';

import { TOKEN_EXPIRE_TIME, TOKEN_OVERFLOW_UP_TIME } from '../setup';
import { localAuth, token } from './table';

class Token {
  constructor({ connector }) {
    this.connector = connector;
  }
  async getToken(uid, ...args) {
    const time = Date.now();
    let other = args;
    if (!other.password) {
      other = await this.connector(localAuth)
        .select('password', 'salt')
        .where({
          uid,
        });
    }
    const { password, salt } = other;
    const accessToken = CryptoJS.SHA3(uid + password + salt + time);
    const refreshToken = CryptoJS.SHA3(uid + password + salt + time + TOKEN_EXPIRE_TIME);
    this.connector(token).insert({
      accessToken,
      expireIn: TOKEN_EXPIRE_TIME,
      refreshToken,
      ctime: time,
      uid,
    });
    return {
      uid,
      accessToken,
      expireIn: TOKEN_EXPIRE_TIME,
      refreshToken,
    };
  }

  deleteByAccess(accessToken) {
    return this.connector(token)
      .where({
        accessToken,
      })
      .del();
  }

  deleteByrefresh(refreshToken) {
    return this.connector(token)
      .where({
        refreshToken,
      })
      .del();
  }

  async authAccessToken(uid, accessToken) {
    const { ctime, uid: authId } = await this.connector(token).where({
      accessToken,
    });
    if (uid) {
      return (ctime && authId === uid);
    }
    return !!ctime;
  }

  async refreshToken(uid, refreshToken) {
    const result = await this.connector(token)
      .select('ctime')
      .where({
        refreshToken,
      });
    if (
      Date.now() - result.ctime <
      TOKEN_EXPIRE_TIME + TOKEN_OVERFLOW_UP_TIME
    ) {
      this.deleteByrefresh(refreshToken);
      return this.generateToken(uid);
    }

    // TODO 错误更好的控制
    return {
      error: 'refresh token 无效',
    };
  }
}

export default Token;
