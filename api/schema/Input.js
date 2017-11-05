const Input = `
  input CommentInput {
    sid: ID!
    uid: ID!
    message: ID!
  }

  input UserInput {
    uid: ID!
    type: INT
    name: String
    message: String
    avatar: String
  }

  input StaffInput {
    sid: ID!
    masterpiece: String,
    info: String,
    exPrice: String
  }

  input ImRoomInput {
    createrId: ID!
    name: String!
    memberId: String!
  }
  input ImMemberInput {
    rid: ID!
    uid: ID!
  }
  input ImContentInput {
    rid: ID!
    uid: ID!
    content: String
  }

  input FeedbackInput {
    uid: ID!
    contact: String!
    content: String!
  }
`;

export default Input;
