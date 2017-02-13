const TcpServer = require('./socketTest');

let transport = new TcpServer({
	port:3400,
	host:'127.0.0.1'
});

transport.start();

console.log("Server start!");