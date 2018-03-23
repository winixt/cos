const CosHelper = `
  type CosHelper {
    id: ID
    uid: ID!
    type: Int
    voteCount: Int
    info: String
    cover: String
    priceMin: Int
    priceMax: Int
    city: String
    representWork: [RepresentWork]!
    vote(uid: ID!): Vote
    commentCount: CommentCount
    user: User
  }
`;

// cos 协助者代表作
const RepresentWork = `
  type RepresentWork {
    id: ID
    url: String!
    width: Int
    height: Int
  }
`;


// active 表示当前用户是否点赞过
const Vote = `
  type Vote {
    active: Boolean
  }
`;

export default [CosHelper, RepresentWork, Vote];
