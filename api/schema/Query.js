import Users from './Users';
import CosHelper from './CosHelper';
import Comments from './Comments';
import Vote from './Vote';
import CommentWeight from './CommentWeight';
import IM from './IM';
import Feedback from './Feedback';
import RepresentWork from './RepresentWork';

const Query = `
  type Query {
    user(uid: ID!): Users
    cosHelper(type: Int = 0, offset: Int = 0, limit: Int = 10): [Users]!
    comment(sid: ID!, offset: Int = 0, limit: Int = 10): [Comments]!
    im(uid: ID!): [ImMember]!
  }
`;

export default [
  Query,
  Users,
  CosHelper,
  Comments,
  Vote,
  CommentWeight,
  Feedback,
  RepresentWork,
  ...IM,
];
