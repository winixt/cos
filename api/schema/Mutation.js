import Input from './Input';

const Mutation = `
  type Mutation {
    upvote(sid: ID!, uid: ID!): Vote
    downVote(sid: ID!, uid: ID!): Vote
    upWeight(cid: ID!, uid: ID!): Weight
    addComment(comment: CommentInput!): Comment
    delComment(cid: ID!): Comment
    updateUser(user: UserInput!): User
    updateStaff(staff: StaffInput!): Staff
    addImRoom(room: ImRoomInput!): ImRoom
    addImMember(member: ImMemberInput!): ImMember
    addImContent(content: ImContentInput!): ImContent
    delImRoom(rid: ID!, uid: ID!): ImRoom
    addFeedback(feedback: FeedbackInput): Feedback
  }
`;

export default [Mutation, Input];
