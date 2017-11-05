const Staff = `
  type Staff {
    sid: ID!
    vote(sid: ID!, uid: ID = -1): Vote
    masterpiece: [String]!
    info: String
    exPrice: String
  }
`;

export default Staff;
