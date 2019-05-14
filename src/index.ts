import 'reflect-metadata';
import { setup } from './app';
import { createConnection } from 'typeorm';

setup().then(async app => {
  try {
    await createConnection();
    app.listen(3000, () => {
      console.log('listening at 3000');
    });
  } catch (error) {
    console.log(error);
  }
});
