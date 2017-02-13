const net = require('net');
const amqp = require('amqplib');

const RABBITMQ_URI='amqp://admin:admindemo@115.28.16.154:5672/monitor';

function TcpServer(opts) {
 
	this.opts = opts;

	this.server = net.createServer(function(sock) {

		sock.on('data', function(data) {
            
            amqp.connect(RABBITMQ_URI).then(function(conn){

				return conn.createChannel().then(function(ch){

					ch.assertQueue('serverQ');
					ch.sendToQueue('serverQ', data);

				});

			});

        });

	});

}

TcpServer.prototype.start = function() {
    this.server.listen(this.opts.port, this.opts.host);
}


module.exports = TcpServer;