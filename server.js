var trace = function(_m){ console.log(_m);},
	log = function(obj){ trace(JSON.stringify(obj));},
	http = require('http'),
	path = require('path'),
	express = require('express'),
	routes = require('./routes'),
	app = new express();

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.static(path.join(__dirname,'public')));
	app.use(express.static(path.join(__dirname,'node_modules')));
	app.use(express.static(path.join(__dirname,'bower_components')));
	app.use(express.bodyParser());
});

app.get("/", routes.index);
app.get("/_tests", routes.tdd);
app.get("/_tests/*", routes.tdd);
app.get("/*", routes.index);


http.createServer(app).listen(3002, function(){
	trace("SERVER:: init");
});

