import { createRequire } from "module";
const require = createRequire(import.meta.url);

import client from './client.js';
import { dropParentTables, dropChildrenTables, createTables } from "./db/seed.js";

const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', require('./api'));

app.use((err, req, res, next)=> {
  console.log(err)
  res.status(err.status || 500).send({error: err.message ?  err.message : err})
})

const init = async () => {
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`listening on ${port}`));
  console.log('connecting to db');
  await client.connect();
  console.log('connected to database');
  await dropChildrenTables();
  console.log('yeetus fetus');
  await dropParentTables();
  console.log('yeet parent');
  await createTables();
  console.log('tables made')
};

init();
