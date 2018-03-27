const Input = `
  input UserInput {
    uid: ID!
    gender: Int
    nickname: String
    avatar: String
    message: String
    city: String
  }
  
  input CosHelperInput {
    cosId: ID
    uid: ID
    type: [Int]!
    info: String
    cover: String
    priceMin: Int
    priceMax: Int
    city: String
  }

  input RepresentWork {
    id: ID
    cosId: ID
    url: String
    width: Int
    height: Int
  }
  
  input CommentInput {
    cosId: ID!
    uid: ID!
    content: String
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
