const Staff = `
  type Staff {
    uid: ID
    vote(sid: ID!, uid: ID = -1): Vote
    images: [Image]!
    info: String
    exPrice: String
  }
`;

export default Staff;
