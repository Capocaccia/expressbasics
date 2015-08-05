var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('templates/cnug');
});

router.post('/order', function(req, res){
  console.log(req.body);
  res.send('Thank you for ordering!')
});

module.exports = router;
