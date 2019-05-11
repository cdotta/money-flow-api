import 'reflect-metadata';
import { setup } from './app';

setup().then(app => {
  app.listen(3000, () => {
    console.log('listening at 3000');
  });
});
