import { comments, commentsActive, commentWeight } from './table';

class Comments {
  constructor({ connector }) {
    this.connector = connector;
  }

  getComment(args) {
    const { cosId, offset, limit } = args;
    return this.connector(commentsActive).where({
      cosId,
    }).orderBy('weight')
      .limit(limit)
      .offset(offset);
  }

  async getCommentCount(cosId) {
    const result = await this.connector(commentsActive).where({
      cosId,
    }).count();
    return {
      count: result[0]['count(*)'],
    };
  }

  async isLoveComment(comId, uid) {
    const result = await this.connector(commentWeight).where({
      comId,
      uid,
    });
    if (result.length > 0) {
      return {
        id: result[0].id,
        active: true,
      };
    }
    return {
      active: false,
    };
  }

  async addComment(args) {
    const { cosId, uid, content } = args;
    const result = await this.connector(comments).returning('id').insert({
      cosId,
      uid,
      content,
      ctime: this.connector.fn.now(),
    });
    return {
      id: result[0],
      retCode: 0,
    };
  }

  delComment(args) {
    const { comId } = args;
    this.connector(commentWeight).where({
      comId,
    }).del();
    this.connector(commentsActive).where({
      id: comId,
    }).del();
    return {
      retCode: 0,
    };
  }

  upWeight(args) {
    const { comId, uid } = args;
    this.connector(commentsActive).where({
      id: comId,
    }).increment('weight', 1);
    this.connector(commentWeight).insert({
      comId,
      uid,
      ctime: this.connector.fn.now(),
    });
    return {
      retCode: 0,
    };
  }
  downWeight(args) {
    const { comId, uid } = args;
    this.connector(commentsActive).where({
      id: comId,
    }).decrement('weight', 1);
    this.connector(commentWeight).where({
      comId,
      uid,
    }).del();
    return {
      retCode: 0,
    };
  }
}

export default Comments;
