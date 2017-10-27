
export class User {
  constructor({ connector }) {
    this.connector = connector;
  }

  getUser(id) {
    return this.connector('users').where({
      id,
    });
  }

  getUsers(args) {
    const { type, offset, limit } = args;
    if (type) {
      return this.connector('users').where({
        type,
      }).limit(limit).offset(offset);
    }
    return this.connector('users').limit(limit).offset(offset);
  }

  getStaff(id) {
    return this.connector('staffs').where({
      id,
    });
  }

  upvote(staffId) {
    return this.connector('staffs').where({
      id: staffId,
    }).update(this.connector.raw('love=love + 1'));
  }
}

export class Comment {
  constructor({ connector }) {
    this.connector = connector;
  }

  getComment(args) {
    const { staff_id, offset, limit } = args;
    return this.connector('comments').where({
      staff_id,
    }).limit(limit).offset(offset);
  }
}

