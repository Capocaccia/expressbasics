var express = require('express');
var app = express();
// var app = require express execute

app.use(express.static('public'))
//called a middleware
//essentially creates a route for everything in the public folder

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/hello', function (req, res) {
  res.send('Hello!');
});

app.get('/world', function (req, res) {
  res.send('World!');
});

app.get('/', function (req, res) {
  res.send('This is the root!');
});
//this route gets ignored since there is already an earlier route with the same URL

app.use(function(req, res, next){
  res.status(403);
  res.send('Unauthorized')
});
//this handles routes that dont exits
//so if you try to go to a route that doesnt exist is changes the response status code to 403 and sends "Unauthorized" as the res text
//it has to be at the bottom of the page otherwise it over-writes all routes with this response

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
