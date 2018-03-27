const Mutation = {
  Mutation: {
    // 普通用户
    addUser: (obj, args, ctx) => {
      return ctx.User.addUser();
    },
    updateUser: (obj, { user }, ctx) => {
      return ctx.User.updateUser(user);
    },
    updateUserLoginTime: (obj, { uid }, ctx) => {
      return ctx.User.updateUserLoginTime(uid);
    },

    // coser 协助者
    addCosHelper: (obj, { cos }, ctx) => {
      ctx.CosHelper.addCosHelper(cos);
    },
    updateCosHelper: (obj, { cos }, ctx) => {
      ctx.CosHelper.updateCosHelper(cos);
    },
    addCosHelperType: (obj, { cosId, types }, ctx) => {
      ctx.CosHelper.addCosHelperType(cosId, types);
    },
    delCosHelperType: (obj, { cosId, types }, ctx) => {
      ctx.CosHelper.delCosHelperType(cosId, types);
    },
    addRepresentWork: (obj, { representWork }, ctx) => {
      ctx.CosHelper.addRepresentWork(representWork);
    },
    delRepresentWork: (obj, { ids }, ctx) => {
      ctx.CosHelper.delRepresentWork(ids);
    },
    upvote: (obj, args, ctx) => {
      return ctx.CosHelper.upvote(args);
    },
    downVote: (obj, args, ctx) => {
      return ctx.CosHelper.downVote(args);
    },

    // 评论修改操作
    addComment: (obj, { comment }, ctx) => {
      return ctx.Comment.addComment(comment);
    },
    delComment: (obj, args, ctx) => {
      return ctx.Comment.delComment(args);
    },
    upWeight: (obj, args, ctx) => {
      return ctx.Comment.upWeight(args);
    },
    downWeight: (obj, args, ctx) => {
      return ctx.Comment.downWeight(args);
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
};

export default Mutation;
