const User = `
  type User {
    uid: ID!
    name: String!
    type: Int
    avatar: String
    message: String
    city: String
    staff(city: String = '全国'): Staff
  }
`;

export default User;
