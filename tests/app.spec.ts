import supertest from 'supertest';
import { app } from '../src/app';

describe('app', () => {
  const helloQuery = {
    query: `
      query {
        hello
      }
    `,
  };

  it('sends the response from REST', async () => {
    const response = await supertest(app).get('/');
    expect(response.text).toEqual('Hello world from REST');
  });

  it('sends the response from Graphql', async () => {
    const response = await supertest(app)
      .post('/graphql')
      .set('Accept', 'application/json')
      .send(helloQuery);
    expect(response.body).toEqual({
      data: { hello: 'Hello world from Graphql' },
    });
  });
});
