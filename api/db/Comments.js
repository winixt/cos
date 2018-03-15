import { comments, commentWeight } from './table';

class Comments {
  constructor({ connector }) {
    this.connector = connector;
  }
  getComment(...args) {
    const { sid, offset, limit } = args;
    return this.connector(comments).where({
      sid,
    }).limit(limit).offset(offset);
  }
  addComment(args) {
    const { uid, sid, message } = args;
    return this.connector(comments).insert({
      uid,
      sid,
      message,
      ctime: Date.now(),
    });
  }
  delComment(args) {
    const { cid } = args;
    this.connector(commentWeight).where({
      cid,
    }).del();
    return this.connector(comments, cid).where({
      id: cid,
    }).del();
  }
  async getWeight(args) {
    const { cid, uid } = args;
    let active = false;
    const count = await this.connector(commentWeight)
      .count()
      .where({
        cid,
      });
    if (uid !== -1) {
      active = await this.connector(commentWeight)
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
    return this.connector(commentWeight).insert({
      cid,
      uid,
      ctime: Date.now(),
    });
  }
}

export default Comments;
