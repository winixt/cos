import Input from './Input';

const Mutation = `
  type Mutation {
    addUser: Result
    updateUser(user: UserInput!): Result
    updateUserLoginTime(uid: ID!): Result

    addCosHelper(cos: CosHelperInput!): Result
    updateCosHelper(cos: CosHelperInput!): Result
    addCosHelperType(cosId: ID!, types: [Int]!): Result
    delCosHelperType(cosId: ID!, types: [Int]!): Result
    addRepresentWork(representWork: RepresentWork!): Result
    delRepresentWork(id: [ID]!): Result
    upvote(cosId: ID!, uid: ID!): Result
    downVote(cosId: ID!, uid: ID!): Result

    addComment(comment: CommentInput!): Result
    delComment(comId: ID!): Result
    upWeight(comId: ID!, uid: ID!): Result
    downWeight(comId: ID!, uid: ID!): Result
    
    updateStaff(staff: StaffInput!): Staff
    addImRoom(room: ImRoomInput!): ImRoom
    addImMember(member: ImMemberInput!): ImMember
    addImContent(content: ImContentInput!): ImContent
    delImRoom(rid: ID!, uid: ID!): ImRoom
    addFeedback(feedback: FeedbackInput): Feedback
  }
`;

export default [Mutation, Input];
