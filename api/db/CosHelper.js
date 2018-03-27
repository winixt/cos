import { cosHelper, representWork, cosHelperType, vote } from './table';

class CosHelper {
  constructor({ connector }) {
    this.connector = connector;
  }

  async getCosHelper(uid) {
    const result = await this.connector(cosHelper).innerJoin(cosHelperType, `${cosHelper}.id`, `${cosHelperType}.cosId}`).where({
      uid,
    });
    return result[0];
  }

  getCosHelperByType(args) {
    const {
      type,
      city,
      offset,
      limit,
    } = args;

    return this.connector(cosHelper).innerJoin(cosHelperType, `${cosHelper}.id`, `${cosHelperType}.cosId}`).where({
      type,
      city,
    }).orderBy('VoteCount')
      .limit(limit)
      .offset(offset);
  }

  async getVote(args) {
    const { cosId, uid } = args;
    const active = await this.connector(vote)
      .where({
        cosId,
        uid,
      });

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
    const { type, ...cos } = args;
    const params = Object.assign({}, cos, { ctime: this.connector.fn.now() });
    try {
      const result = await this.connector(cosHelper).returning('id').insert(params);
      this.addCosHelperType(result[0], type);
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

  addCosHelperType(cosId, types) {
    if (types.length > 0) {
      this.connector(cosHelperType).insert(types.map((type) => {
        return { cosId, type };
      }));
    }
    return {
      retCode: 0,
    };
  }

  delCosHelperType(cosId, types) {
    this.connector(cosHelperType).where({
      cosId,
    }).whereIn('type', types);
    return {
      retCode: 0,
    };
  }


  updateCosHelper(args) {
    const { cosId, types, ...other } = args;
    if (!cosId) {
      return {
        retCode: 1,
        error: '缺省 cosId',
      };
    }
    this.connector(cosHelper).where({
      id: cosId,
    }).update(other);
    this.addCosHelperType(cosId, types);
    return {
      retCode: 0,
    };
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
  delRepresentWork(ids) {
    this.connector(representWork).whereIn('id', ids).del();
    return {
      retCode: 0,
    };
  }

  // 点赞
  upvote(args) {
    const { cosId, uid } = args;
    this.connector(cosHelper).where({
      id: cosId,
    }).increment('voteCount', 1);
    this.connector(vote).insert({
      cosId,
      uid,
      ctime: this.connector.fn.now(),
    });
    return {
      retCode: 0,
    };
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
