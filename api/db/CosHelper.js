import { cosHelper, representWork, vote } from './table';

class CosHelper {
  constructor({ connector }) {
    this.connector = connector;
  }

  getCosHelperByType(args) {
    const {
      type,
      city,
      offset,
      limit,
    } = args;
    return this.connector(cosHelper).where({
      type,
      city,
    }).orderBy('voteCount')
      .limit(limit)
      .offset(offset);
  }

  async getCosHelper(uid) {
    const result = await this.connector(cosHelper).where({
      uid,
    });
    return result[0];
  }

  async getVote(args) {
    const { cosId, uid } = args;
    const active = await this.connector(vote)
      .where({
        cosId,
        uid,
      }).limit(1);

    return {
      active,
    };
  }
  // 获取代表作
  getRepresentWork(cosId) {
    return this.connector(representWork)
      .where({
        cosId,
      });
  }

  async addCosHelper(args) {
    const params = Object.assign({}, args, { ctime: this.connector.fn.now() });
    try {
      const result = await this.connector(cosHelper).returning('id').insert(params);
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

  updateCosHelper(args) {
    const { id, ...other } = args;
    return this.connector(cosHelper).where({
      id,
    }).update(other);
  }

  // 添加新的代表作
  async addRepresentWork(args) {
    try {
      const result = await this.connector(representWork).returning('id').insert(args);
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
  // 删除代表作
  delRepresentWork(id) {
    return this.connector(representWork).where({
      id,
    }).del();
  }

  // 点赞
  upvote(args) {
    const { cosId, uid } = args;
    this.connector(cosHelper).where({
      id: cosId,
    }).increment('voteCount', 1);
    return this.connector(vote).insert({
      cosId,
      uid,
      ctime: this.connector.fn.now(),
    });
  }

  // 取消点赞
  downVote(args) {
    const { cosId, uid } = args;
    this.connector(cosHelper).where({
      id: cosId,
    }).decrement('voteCount', 1);
    this.connector(vote).where({
      cosId,
      uid,
    }).del();
    return {
      retCode: 0,
    };
  }
}

export default CosHelper;
