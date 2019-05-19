import 'reflect-metadata';

import fs from 'fs';
import { printSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import { resolvers } from '../app';

async function logSchema() {
  const schema = await buildSchema({
    container: Container,
    resolvers,
  });
  fs.writeFile('./schema.graphql', printSchema(schema), err => {
    if (err) {
      console.error(err);
    } else {
      console.info('schema.graphql file saved');
    }
    process.exit();
  });
}

logSchema();
