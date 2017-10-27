
const resolvers = {
  Query: {
    user: (obj, args, context) => {
      return context.User.getUser(args.id);
    },
    staff: (obj, args, context) => {
      return context.User.getUsers(args);
    },
    comment: (obj, args, context) => {
      return context.Comment.getComment(args);
    },
  },
  User: {
    staff: (obj, args, context) => {
      return context.User.getStaff(obj.id);
    },
  },
  Comment: {
    user: (obj, args, context) => {
      return context.User.getUser(obj.user_id);
    },
  },

  Mutation: {
    upvoteStaff: (obj, args, context) => {
      return context.User.upvote(args.staffId);
    },
  },
};

export default resolvers;
