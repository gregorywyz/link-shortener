var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('../models');
var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

//load body parser (parses form POST data)
router.use(bodyParser.urlencoded({extended:false}));

// POST - get data from input
router.post('/', function(req,res) {
  // data base TODO
  var inputURL = req.body.url;
  // var outputURL = hashids.encode(inputURL);
  db.link.create({ urlLong: inputURL }).then(function(data) {
    var outputURL = hashids.encode(data.id);
    data.urlShort = outputURL;
    data.save().then(function() {
      var newURL = {taco: req.headers.host + '/' + data.urlShort};
      res.render('url/index', newURL);
    });
  });
});



module.exports = router;
