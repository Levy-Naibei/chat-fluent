import { ApolloServer } from 'apollo-server';
import typeDefs from './graphQL/schema';
import resolvers from './graphQL/resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: ({ req }) => ({ req })
});

export default server;