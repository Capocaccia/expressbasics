var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.get('/hello', function (req, res) {
  res.send('Hello!');
});

router.get('/awesome', function (req, res) {
    var collection = global.db.collection('awesomeThings');

    collection.find().toArray(function(err, thing) {
      res.render('templates/world',
        {
          welcome: 'Thanks for coming!',
          awesomeThings: thing
        }
      );
    });
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
