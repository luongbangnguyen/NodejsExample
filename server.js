var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
var config = require('./app/config/appconfig')
var fs = require('fs')
var app = express()
var path = require('path')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.use(function(req, res, next){
	 res.config = config;
  var render = res.render;
  res.render = function(view, locals, cb){
      if(!locals.meta){
        locals.meta = config.application;
      }
    render.call(res, view, locals, cb);
  }
  next();
});

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.set('config', config)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

//Config mongodb
if(config.mongodb){
  mongoose.connect(config.mongodb.url);
  mongoose.connection.on('error', function(){
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  });
}

fs.readdirSync('./app/routers').forEach(function(file){
	if(path.extname(file)==='.js'){
	    require('./app/routers/' +  file)(app);
	  }
});

app.listen(config.port,function(){
  console.log('server listening on port %d',config.port);
})
module.exports = app;
