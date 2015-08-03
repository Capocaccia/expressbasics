var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.get('/hello', function (req, res) {
  res.send('Hello!');
});

router.get('/world', function (req, res) {
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

router.get('/error', function (req, res) {
  res.send(badVariable);
});

router.get('/test', function (req, res, next) {
  res.write('Test1!');
  next();
  //next jumps to the next function at the same route
});

router.get('/test', function (req, res) {
  res.end('Test2!');
});



router.get('/json', function (req, res) {
  res.send({an: 'object'});
});
//sending a JSON object to the browser

router.get('/', function (req, res) {
  res.send('This is the root!');
});
//this route gets ignored since there is already an earlier route with the same URL

module.exports = router;
