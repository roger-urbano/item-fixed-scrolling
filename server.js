var connect = require('connect');
var http = require('http');
var st = require('st');
var findPort = require('find-port');

var server_port = 8080;
findPort(server_port, server_port+10, function(ports) {
	server_port = ports[0];
	var app = connect();
	var mount = st({
		path: 'source',
		cache: false
	});
	console.log('Corriendo en http://127.0.0.1:'+ports[0]+'/app/home.html');
	http.createServer(function (req, res) {
		if (mount(req, res)) return;
	}).listen(server_port);
	app.use(mount);
});