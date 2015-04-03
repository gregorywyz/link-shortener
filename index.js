//load dependencies
var express = require('express');
var bodyParser = require('body-parser');
var urlCtrl = require('./controllers/url');
var db = require('./models');

//init express
var app = express();

//set view engine to ejs
app.set('view engine','ejs');
//set static directory
app.use(express.static(__dirname+'/public'));
// use controller
app.use('/links', urlCtrl);
//load body parser (parses form POST data)
app.use(bodyParser.urlencoded({extended:false}));

//home page route
app.get('/', function(req,res) {
  res.render('index');
});

app.get('/:hash', function(req,res) {
  db.link.find({where: {urlShort: req.params.hash}}).then(function(url) {
    res.redirect(url.urlLong);
  });
});

//start listening for requests on port 3000
// process.env.PORT for heroku
app.listen(process.env.PORT || 3000,function(){
  console.log('----- Server started on 3000!! -----');
});