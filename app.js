var express = require('express');
var app = express();
// var app = require express execute
var routes = require('./routes/index');
var pizza = require('./routes/pizza');
var cnug = require('./routes/cnug');
var less = require('less-middleware');
var morgan = require('morgan');
var bp = require('body-parser');
var fs = require('fs');
var loggly = require('loggly');
require('./lib/secrets');

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);
app.set('strict routing', true);

app.locals.title = "My Awesome App" ;

// app.use(function(req, res, next){
//   console.log('Request at ' + new Date().toISOString());
//   next();
// })
// //handles a console log for requests at any url

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
//Creates a write stream and applies the "append a flag" which tells the file to append and not write

app.use(function(req, res, next){
  var client = require('./lib/loggly')('incoming');
  client.log({ip: req.ip,
   res: res, date: new Date(), url: req.url, method: req.method, status: res.statusCode, });
  next();
})

app.use(morgan('combined', {stream: logStream}))
//combined is the style of log you wan
//the second argument object tells morgan where to output those logs
//these logs will not output to the console since we are streaming them into a file
app.use(morgan('dev'))
//morgan is an NPM package that handles server request logging.
//dev is the style of log
//these logs will print to a console since they are not being streamed to a file

app.use(express.static('public'))
//called a middleware
//essentially creates a route for everything in the public folder

app.use(bp.urlencoded({extended: false}))

app.use('/', routes);
app.use('/pizza', pizza);
app.use('/cnug', cnug);

app.use(less('public'));

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
