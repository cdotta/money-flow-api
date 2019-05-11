import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Resolver, Query, buildSchema } from 'type-graphql';

const app: Express.Application = Express();

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'Hello world from Graphql';
  }
}

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
