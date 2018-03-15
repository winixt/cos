const Comments = `
  type Comments {
    id: ID
    user: Users!
    content: String!
    commentWeight(comId: ID!, uid: ID = -1): CommentWeight
    ctime: String
    activeTime: String
  }
`;

export default Comments;
