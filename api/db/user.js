import { user, staff, vote } from './table';

// TODO 数据个添加 | 更改
class User {
  constructor({ connector }) {
    this.connector = connector;
  }

  getUser(uid) {
    return this.connector(user).where({
      uid,
    });
  }

  updateUser(args) {
    const { uid, ...other } = args;
    return this.connector(user).where({
      uid,
    }).update(other);
  }

  getUsers(args) {
    const { type, offset, limit } = args;
    if (type) {
      return this.connector(user).where({
        type,
      }).limit(limit).offset(offset);
    }
    return this.connector(user).limit(limit).offset(offset);
  }

  getUsersByID(uids) {
    return this.connector(user).whereIn('uid', uids);
  }

  getStaff(sid, args) {
    const { city } = args;
    if (city === '全国') {
      return this.connector(staff).where({
        sid,
      });
    }
    return this.connector(staff).where({
      sid,
      city,
    });
  }

  updateStaff(args) {
    const { sid, ...other } = args;
    return this.connector(user).where({
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

export default User;
