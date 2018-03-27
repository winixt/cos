import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../subscriptions';

const Subscription = {
  Subscription: {
    addImContent: {
      subscribe: withFilter(() => pubsub.asyncIterator('addImContent'), (payload, variables) => {
        return payload.rid === variables.rid;
      }),
    },
  },
};

export default Subscription;

