// IM 即时通信
const ImMember = `
type ImMember {
   rid: ID!
   uid: ID!
   unread: INT
   send: INT
   utime: INT
   rootTime: INT
   isDelete: Boolean
   room: [ImRoom]!
}
`;

const ImRoom = `
  rid: ID!
  createrId: String
  name: String
  number: INT
  memberId: String
  ctime: INT
  creater: User
  member: [User]
  content(limit: INT = 10, offset: INT = 0): [ImContent]
`;

const ImContent = `
  id: ID!
  rid: ID
  uid: ID!
  content: String!
  ctime: INT
  isDelete: Boolean
  user: User
`;

export default [ImMember, ImRoom, ImContent];
