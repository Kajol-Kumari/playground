const express = require('express');
const Data = require('./model/data');
const cors = require('cors');
const http = require('http');
require('./middleware/db');
require('dotenv').config();

const app = express();
const server = http.Server(app);

// CORS
app.use(cors());

// Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Home route
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello There!! You are at the backend server!' });
});

// Route for getting details
app.get('/get-details', async(_req, res) => {
    const data = await Data.find();
    res.status(200).send(data);
});

// Route to create an item
app.post('/create-item', async(_req, res) => {
  const data = await Data.create(_req.body);
  res.status(200).send(data);
});

// Route to delete an item
app.delete('/delete-item/:_id', async(_req, res) => {
  var _id = _req.params._id;
  const data = await Data.findOneAndDelete({_id:_id});
  res.status(200).send(data);
});

// Route to update an item
app.patch('/update-item/:_id', async(_req, res) => {
  var _id = _req.params._id;
  const data = await Data.findOneAndUpdate({_id  : _id}, {$set: _req.body});
  res.status(200).send(data);
})

// Route to get page data
app.get('/get-items/:pageNum', async(_req, res) => {
  let pageNum = _req.params.pageNum;
  var data = await Data.find().sort({"_id":1}).skip(10*(pageNum-1)).limit(10);
  res.status(200).send(data);
})

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(
  PORT,
  console.log(`Server running in ${process.env.ENV || 'development'} mode on port ${PORT}`)
);

// handle the error safely
process.on('uncaughtException', (err) => {
  console.log(err);
});

module.exports = app;
