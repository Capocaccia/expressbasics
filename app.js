var express = require('express');
var app = express();
// var app = require express execute
var routes = require('./routes/index');
var pizza = require('./routes/pizza');

app.set('view engine', 'ejs');

app.use(function(req, res, next){
  console.log('Request at ' + new Date().toISOString());
  next();
})
//handles a console log for requests at any url

app.use(express.static('public'))
//called a middleware
//essentially creates a route for everything in the public folder

app.use('/', routes);
app.use('/pizza', pizza);


app.use(function(req, res, next){
  res.status(403).send('Unauthorized!');
});
//this handles routes that dont exits
//so if you try to go to a route that doesnt exist is changes the response status code to 403 and sends "Unauthorized" as the res text
//it has to be at the bottom of the page otherwise it over-writes all routes with this response
//put 400 error handling before 500 error handling

app.use(function(err, req, res, next){
  //pass 4 arguments to create an error handling middleware
  console.log("error", err.stack);
  res.status(500).send('500: Error!')
})


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
