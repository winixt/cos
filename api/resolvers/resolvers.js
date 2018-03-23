import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../subscriptions';

const resolvers = {
  Query: {
    user: (obj, args, context) => {
      return context.Users.getUser(args.id);
    },
    cosHelper: (obj, args, context) => {
      return context.Users.getUsersByType(args);
    },
    comments: (obj, args, context) => {
      return context.Comments.getComment(args);
    },
  },
  User: {
    cosHelper: (obj, args, context) => {
      return context.Users.getCosHelper(obj.uid, args);
    },
  },
  CosHelper: {
    vote: (obj, args, context) => {
      return context.Users.getVote(args);
    },
    representWork: (obj, args, context) => {
      return context.Users.getRepresentWork(obj.masterpiece);
    },
  },
  Comments: {
    user: (obj, args, context) => {
      return context.Users.getUser(obj.uid);
    },
    commentWeight: (obj, args, context) => {
      return context.Comments.getWeight(args);
    },
  },
  ImMember: {
    room: (obj, args, context) => {
      return context.IM.getRoom(obj);
    },
  },
  ImRoom: {
    creater: (obj, args, context) => {
      return context.User.getUser(obj.createrId);
    },
    member: (obj, args, context) => {
      return context.User.getUsersByID(obj.memberId.split('$'));
    },
    content: (obj, args, context) => {
      return context.IM.getContent(obj);
    },
  },
  ImContent: {
    user: (obj, args, context) => {
      return context.User.getUser(obj.uid);
    },
  },
  Mutation: {
    upvote: (obj, args, context) => {
      return context.User.upvote(args);
    },
    downVote: (obj, args, context) => {
      return context.User.downVote(args);
    },
    upWeight: (obj, args, context) => {
      return context.Comment.upWeight(args);
    },
    addComment: (obj, { comment }, context) => {
      return context.Comment.addComment(comment);
    },
    delComment: (obj, args, context) => {
      return context.Comment.delComment(args);
    },
    updateUser: (obj, { user }, context) => {
      return context.User.updateUser(user);
    },
    updateStaff: (obj, { staff }, context) => {
      return context.User.updateStaff(staff);
    },
    addImRoom: (obj, { room }, context) => {
      return context.IM.addImRoom(room);
    },
    addImMember: (obj, { member }, context) => {
      return context.IM.addImMember(member);
    },
    addImContent: (obj, { content }, context) => {
      return context.IM.addImContent(content);
    },
    delImRoom: (obj, args, context) => {
      return context.IM.delImRoom(args);
    },
    addFeedback: (obj, args, context) => {
      return context.Feedback.addFeedback(args);
    },
  },
  Subscription: {
    addImContent: {
      subscribe: withFilter(() => pubsub.asyncIterator('addImContent'), (payload, variables) => {
        return payload.rid === variables.rid;
      }),
    },
  },
};

export default resolvers;
