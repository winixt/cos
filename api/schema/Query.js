import User from './User';
import Staff from './Staff';
import Comment from './Comment';

const Query = `
  type Query {
    user(id: Int!): User
    staff(type: Int = 0, offset: Int = 0, limit: Int = 10): [User]!
    comment(staff_id: Int!, offset: Int = 0, limit: Int = 10): [Comment]!
  }
`;

export default [Query, User, Staff, Comment];
