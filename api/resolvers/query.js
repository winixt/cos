
const Query = {
  Query: {
    user: (obj, { uid }, ctx) => {
      return ctx.User.getUser(uid);
    },
    cosHelper: (obj, { uid }, ctx) => {
      return ctx.CosHelper.getCosHelper(uid);
    },
    cosHelperByType: (obj, args, ctx) => {
      return ctx.CosHelper.getCosHelperByType(args);
    },
    comments: (obj, args, ctx) => {
      return ctx.Comments.getComment(args);
    },
  },
  CosHelper: {
    representWork: (obj, args, ctx) => {
      return ctx.CosHelper.getRepresentWork(obj.id);
    },
    vote: (obj, args, ctx) => {
      return ctx.CosHelper.getVote(obj.id, args.uid);
    },
    commentCount: (obj, args, ctx) => {
      return ctx.Comment.getCommentCount(obj.id);
    },
    user: (obj, args, ctx) => {
      return ctx.User.getUser(obj.uid);
    },
  },

  Comments: {
    user: (obj, args, ctx) => {
      return ctx.User.getUser(obj.uid);
    },
    love: (obj, args, ctx) => {
      return ctx.Comments.isLoveComment(obj.id, obj.uid);
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
};

export default Query;
