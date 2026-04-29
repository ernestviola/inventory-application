import express from 'express';
import bodyParser from 'body-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import categoryRouter from './routes/categoryRouter.js';
import indexRouter from './routes/indexRouter.js';
import itemRouter from './routes/itemRouter.js';

// Environment variables
const PORT = process.env.PORT || 3000;
const viewsPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'views',
);
const publicPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'public',
);

// App declaration and setup
const app = express();

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use('/item', itemRouter);
app.use('/category', categoryRouter);
app.use('/', indexRouter);
app.all('/*splat', (req, res) => res.send('404 - Not Found'));

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`App listening on port: ${PORT}`);
});
