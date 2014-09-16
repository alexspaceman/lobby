//SERVER SETUP
//node + express
var express = require('express');
var app = express();
var server = require('http').createServer(app);
//socket.io
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
//file system
var fs = require('fs');
//start server
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

//SERVER ROUTING
//define root folder
app.use(express.static(__dirname + '/public'));
//when http://localhost/
app.get('/', function(req, res){
	res.sendfile('index.html');
});

var players = [];

io.on('connection', function (socket) {
	socket.on('save', function (guests) {
		fs.writeFile('public/data/log', JSON.stringify(guests), "utf8", function (err) {
		 // if (err) throw err;
		 // console.log('Log saved!');
		});
	});

	socket.on('login', function (data){
		players.push({
			name: data.name
		});

		console.log(players);

		socket.broadcast.emit('newPlayer', {
			name: data.name
		});
	});
});