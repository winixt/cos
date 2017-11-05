const Comment = `
  type Comment {
    id: ID
    user: User!
    message: String!
    weight(cid: ID!, uid: ID = -1): Weight
    ctime: Int
  }
`;

export default Comment;
