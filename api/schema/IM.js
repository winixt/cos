// IM 即时通信
const ImMember = `
type ImMember {
   rid: ID!
   uid: ID!
   unread: Int
   send: Int
   utime: Int
   rootTime: Int
   isDelete: Boolean
   room: [ImRoom]!
}
`;

const ImRoom = `
type ImRoom {
  rid: ID!
  createrId: String
  name: String
  number: Int
  memberId: String
  ctime: Int
  creater: User
  member: [User]
  content(limit: Int = 10, offset: Int = 0): [ImContent]
}
`;

const ImContent = `
type ImContent {
  id: ID!
  rid: ID
  uid: ID!
  content: String!
  ctime: Int
  isDelete: Boolean
  user: User
}
`;

export default [ImMember, ImRoom, ImContent];
