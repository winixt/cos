import { users, cosHelper, vote } from './table';
import { EMPTY_OBJ } from '../setup';


// TODO 数据个添加 | 更改
class Users {
  constructor({ connector }) {
    this.connector = connector;
  }

  async getUser(uid) {
    const result = await this.connector(users).where({
      uid,
    });
    return result[0];
  }

  updateUser(args) {
    const { uid, ...other } = args;
    return this.connector(users).where({
      uid,
    }).update(other);
  }

  getUsers(args) {
    const { type, offset, limit } = args;
    if (type) {
      return this.connector(users).where({
        type,
      }).limit(limit).offset(offset);
    }
    return this.connector(users).limit(limit).offset(offset);
  }

  getUsersByID(uids) {
    return this.connector(users).whereIn('uid', uids);
  }

  async getCosHelper(uid, args) {
    const { city } = args || EMPTY_OBJ;
    let result;
    if (city === '全国') {
      result = await this.connector(cosHelper).where({
        uid,
      });
    } else {
      result = await this.connector(cosHelper).where({
        uid,
        city,
      });
    }
    return result[0];
  }
  getImages(img) {
    return JSON.parse(img);
  }
  updateCosHelper(args) {
    const { sid, ...other } = args;
    return this.connector(users).where({
      sid,
    }).update(other);
  }
  async getVote(args) {
    const { sid, uid } = args;
    let active = false;
    const count = await this.connector(vote)
      .count()
      .where({
        sid,
      });
    if (uid !== -1) {
      active = await this.connector(vote)
        .select(1)
        .where({
          uid,
        }).limit(1);
    }
    return {
      count,
      active,
    };
  }
  upvote(args) {
    const { sid, uid } = args;
    return this.connector(vote).insert({
      sid,
      uid,
      ctime: Date.now(),
    });
  }
  downVote(args) {
    const { sid, uid } = args;
    return this.connector(vote).where({
      sid,
      uid,
    }).del();
  }
}

export default Users;
