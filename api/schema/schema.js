import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import Query from './Query';
import Mutation from './Mutation';
import resolvers from '../resolvers';

const SchemaDefinition = `
  schema {
    query: Query
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Mutation, ...Query],
  resolvers,
});

addMockFunctionsToSchema({ schema });

export default schema;
