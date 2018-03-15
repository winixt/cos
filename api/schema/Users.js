const User = `
  type User {
    id: ID!
    type: Int
    nickname: String
    avatar: String
    message: String
    city: String
    ctime: String
    loginTime: String
    cosHelper(city: String = "全国"): CosHelper
  }
`;

export default User;
