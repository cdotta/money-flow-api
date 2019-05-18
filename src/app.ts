import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import Express from 'express';
import { HelloResolver } from './hello/resolver';
import { PaymentResolver } from './payments/resolver';
import Container from 'typedi';

const app: Express.Application = Express();

export const resolvers = [HelloResolver, PaymentResolver];

export async function setup(): Promise<Express.Application> {
  const schema = await buildSchema({
    container: Container,
    resolvers,
  });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.send('Hello world from REST');
  });

  return app;
}
