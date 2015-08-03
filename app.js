var express = require('express');
var app = express();
// var app = require express execute

app.set('view engine', 'ejs');

app.use(function(req, res, next){
  console.log('Request at ' + new Date().toISOString());
  next();
})
//handles a console log for requests at any url

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
    setTimeout(function(){
        var awesomeThings = [
      'Pizza',
      'Bacon',
      '2nd Amendment',
      'Pluto',
      'Space Jam'
    ];
      res.render('templates/world', {title: 'My Test Title', welcome: "Welcome plebian!", awesomeThings: awesomeThings});
    //res.render looks in the views folder by default
    //the second argument in the render function allows you to pass arguments into the HTML
    console.log('I waited!')
  }, 5000)
});

app.get('/error', function (req, res) {
  res.send(badVariable);
});

app.get('/test', function (req, res, next) {
  res.write('Test1!');
  next();
  //next jumps to the next function at the same route
});

app.get('/test', function (req, res) {
  res.end('Test2!');
});

app.get('/pizza/:topping/:qty', function (req, res) {
  var obj = req.params;
  obj.title = 'Pizza Shop';
  res.render('templates/pizza', obj);
});

app.get('/json', function (req, res) {
  res.send({an: 'object'});
});
//sending a JSON object to the browser

app.get('/', function (req, res) {
  res.send('This is the root!');
});
//this route gets ignored since there is already an earlier route with the same URL

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
