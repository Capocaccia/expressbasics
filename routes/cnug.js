var express = require('express');
var router = express.Router();
var moment = require('moment')
var ObjectID = require('mongodb').ObjectID;


router.get('/', function (req, res) {
  var collection = global.db.collection('cnugs');

  collection.find().toArray(function (err, orders) {
    var formattedOrders = orders.map(function (order) {
      return {
        _id: order._id,
        name:      order.name,
        flavor:    order.style,
        qty:       order.qty,
        createdAt: moment(order._id.getTimestamp()).fromNow()
      };
    });

    res.render('templates/cnug-index', {orders: formattedOrders});
  });
});

router.get('/order', function(req, res){
  res.render('templates/cnug-new');
});

router.post('/order/:id/complete', function(req, res){
  var collection = global.db.collection('cnugs');
  collection.update({_id: ObjectID(req.params.id)}, {$set: {complete: true}}, function(){
    res.redirect('/cnug')
  })
});

router.post('/order', function(req, res){
  var collection = global.db.collection('cnugs')
  collection.save(req.body, function(){
    res.redirect('/cnug')
  })
});

module.exports = router;
