var express = require('express'),
	http = require('http'),
	app = express();

// static files
app.use("/", express.static(__dirname + "/dist"));

var port = process.env.PORT || 8100;
app.listen(port);
console.log('listening on port :' + port);
