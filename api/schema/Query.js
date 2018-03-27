import User from './User';
import CosHelper from './CosHelper';
import Comment from './Comment';
import IM from './IM';
import Feedback from './Feedback';

const Query = `
  type Query {
    user(uid: ID!): User
    cosHelper(uid: ID!): CosHelper
    cosHelperByType(type: Int = 0, city: String, offset: Int = 0, limit: Int = 10): [CosHelper]!
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
