const Comment = `
  type Comment {
    id: ID!
    cosId: ID
    uid: ID
    user: User!
    weight: Int
    content: String!
    love(uid: ID!): CommentWeight
    ctime: String
    activeTime: String
  }
`;

const CommentCount = `
  type CommentCount {
    count: Int!
  }
`;

// active 表示当前是否点赞过
const CommentWeight = `
type CommentWeight {
  id: ID
  active: Boolean
}
`;

export default [Comment, CommentCount, CommentWeight];
