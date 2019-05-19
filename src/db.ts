import { createConnection, Connection } from 'typeorm';
import { Container } from 'typedi';

export async function setup() {
  const connection: Connection = await createConnection();
  Container.set(Connection, connection);
  return connection;
}
