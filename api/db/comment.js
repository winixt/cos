import { comment, weight } from './table';

class Comment {
  constructor({ connector }) {
    this.connector = connector;
  }
  getComment(...args) {
    const { sid, offset, limit } = args;
    return this.connector(comment).where({
      sid,
    }).limit(limit).offset(offset);
  }
  addComment(args) {
    const { uid, sid, message } = args;
    return this.connector(comment).insert({
      uid,
      sid,
      message,
      ctime: Date.now(),
    });
  }
  delComment(args) {
    const { cid } = args;
    this.connector(weight).where({
      cid,
    }).del();
    return this.connector(comment, cid).where({
      id: cid,
    }).del();
  }
  async getWeight(args) {
    const { cid, uid } = args;
    let active = false;
    const count = await this.connector(weight)
      .count()
      .where({
        cid,
      });
    if (uid !== -1) {
      active = await this.connector(weight)
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
  upWeight(args) {
    const { cid, uid } = args;
    return this.connector(weight).insert({
      cid,
      uid,
      ctime: Date.now(),
    });
  }
}

export default Comment;
