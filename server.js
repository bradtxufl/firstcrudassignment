const express = require("express");
const app = express();
const fs = require('fs')
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [];
app.use(bodyParser.json());

app.get('/users', function (req, res) {
  res.sendFile(`${__dirname}/storage.json`)
});

app.get('/users/:name', function (req, res) {
  var data = fs.readFileSync(`${__dirname}/storage.json`)
  var arr = JSON.parse(data)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === req.params.name) {
      res.send(arr[i])
    }
  }
});

app.post('/users', function (req, res) {
  var newPerson = req.body
  var data = fs.readFileSync(`${__dirname}/storage.json`)
  var arr = JSON.parse(data)
  arr.push(newPerson)
  var string = JSON.stringify(arr)
  fs.writeFileSync(`${__dirname}/storage.json`, string)
  console.log('ya did it')
  res.end('You have updated' + string)
});

app.put('/users/:name', function (req, res) {
  var data = fs.readFileSync(`${__dirname}/storage.json`)
  var arr = JSON.parse(data)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === req.params.name) {
      arr[i] = req.body;
      var string = JSON.stringify(arr)
      fs.writeFileSync(`${__dirname}/storage.json`, string)
      res.end('updated' + res.params.name)
    }
  }
});

app.delete('/users/:name', function (req, res) {
  var data = fs.readFileSync(`${__dirname}/storage.json`)
  var arr = JSON.parse(data)
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name !== req.params.name) {
      newArr.push(arr[i])
    }
  }
  var string = JSON.stringify(newArr)
  fs.writeFileSync(`${__dirname}/storage.json`, string)
  res.end('deleted')
});

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
