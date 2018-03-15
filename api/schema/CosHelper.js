const Staff = `
  type Staff {
    id: ID
    uid: ID
    info: String
    cover: String
    priceMin: INT
    priceMax: INT
    city: String
    representWork(cosId: ID!): [RepresentWork]!
    vote(cosID: ID!, uid: ID = -1): Vote
  }
`;

export default Staff;
