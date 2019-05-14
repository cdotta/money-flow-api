import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import Express from 'express';
import { HelloResolver } from './hello/resolver';

const app: Express.Application = Express();

async function setup(): Promise<Express.Application> {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.send('Hello world from REST');
  });

  return app;
}

export { setup };
