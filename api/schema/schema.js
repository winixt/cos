import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import resolvers from '../resolvers';

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, ...Mutation, ...Query, Subscription],
  resolvers,
});

addMockFunctionsToSchema({ schema });

export default schema;
