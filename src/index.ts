import 'reflect-metadata';
import { setup as setupApp } from './app';
import { setup as setupDB } from './db';

setupDB()
  .then(setupApp)
  .then(app => {
    app.listen(3000, () => {
      console.log('listening at 3000');
    });
  })
  .catch(error => console.log(error));
