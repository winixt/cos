import User from './User';
import Staff from './Staff';
import Comment from './Comment';
import Vote from './Vote';
import Weight from './Weight';
import IM from './IM';
import Feedback from './Feedback';

const Query = `
  type Query {
    user(uid: ID!): User
    staff(type: Int = 0, offset: Int = 0, limit: Int = 10): [User]!
    comment(sid: ID!, offset: Int = 0, limit: Int = 10): [Comment]!
    im(uid: ID!): [ImMember]!
  }
`;

export default [Query, User, Staff, Comment, Vote, Weight, Feedback, ...IM];
