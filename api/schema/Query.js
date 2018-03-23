import User from './User';
import CosHelper from './CosHelper';
import Comment from './Comment';
import IM from './IM';
import Feedback from './Feedback';

const Query = `
  type Query {
    user(id: ID!): User
    cosHelper(type: Int = 0, offset: Int = 0, limit: Int = 10): [CosHelper]!
    comments(cosId: ID!, offset: Int = 0, limit: Int = 10): [Comment]!
    im(uid: ID!): [ImMember]!
  }
`;

export default [
  Query,
  User,
  ...CosHelper,
  ...Comment,
  ...IM,
  Feedback,
];
