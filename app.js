import express from 'express';
import mongoose from 'mongoose';

import { default as path, dirname } from 'path';
import { fileURLToPath } from 'url';

import { userRoutes } from './routes/user.routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json()); // for accessing req.body; may use bodyparser

mongoose
  .connect(
    'mongodb+srv://orionx7:' +
    process.env.MONGO_ATLAS_PW +
    '@mean.c0rsp.mongodb.net/ChinesePokerUsers?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(
    (_) => console.log('Connection to Db Succesfull!'),
    (err) => console.log('Somthing Went Wrong:', err)
  );

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from Db!!!');
});

mongoose.set('toJSON', { virtuals: true });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Expose-Headers', '*');
  next();
});

app.use((req, res, next) => {
  console.log('Requset method and url : ', req.method, req.url);
  console.log('Requset queryParams:', req.query);
  next();
});

app.use('/api/user', userRoutes);

app.use('/', express.static(path.join(__dirname, 'chinesePoker')));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, './chinesePoker', 'index.html'));
});

export { app };
