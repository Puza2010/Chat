const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const UsersService = require('./UsersService');

const userService = new UsersService();

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
	socket.on('join', function(name) {
		userService.addUser({
			id: socket.id,
			name
		});
		io.emit('update', {
			users: userService.getAllUsers()
		});
	});
	socket.on('disconnect', () => {
		userService.removeUser(socket.id);
		socket.broadcast.emit('update', {
			users: userService.getAllUsers()
		});
	});
	socket.on('message', function(message){
		const {name} = userService.getUserById(socket.id);
		socket.broadcast.emit('message', {
			text: message.text,
			from: name
		});
	});
});