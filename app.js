// app.js

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database.js');

// configuration
var db = mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());

	app.set('view engine', 'ejs');

	app.use(express.session({
		secret: 'abcdefg'
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

});

// routes
require('./app/routes.js')(app, passport);

// launch
app.listen(port);
console.log('The magic happens on port ' + port);