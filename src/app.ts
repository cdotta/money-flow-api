import Express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app: Express.Application = Express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world from Graphql',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.send('Hello world from REST');
});

export { app };
