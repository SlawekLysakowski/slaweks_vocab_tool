const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const vocabRoutes = require('./routes/vocabs')

dotenv.config({ path: './config.env' });


const app = express();

mongoose
  .connect('mongodb+srv://slawku1:' + process.env.PASSWORD + '@vocabcluster.tjffsxz.mongodb.net/')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('connection failed');
  });

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../dist/slaweks_vocab_tool")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../dist/slaweks_vocab_tool/index.html"));
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );

  next();
});

app.use('/api/vocabs', vocabRoutes);

module.exports = app;
