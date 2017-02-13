const amqp = require('amqplib');
const dbCRUD = require('./dbTest');

let db = new dbCRUD();

const RABBITMQ_URI='amqp://admin:admindemo@115.28.16.154:5672/monitor';

amqp.connect(RABBITMQ_URI).then(function(conn){

	return conn.createChannel().then(function(ch){

		//ch.assertExchange('bar');

		ch.assertQueue('serverQ').then(function(qok){

			const queue = qok.queue;
			return ch.consume(queue, function(msg){
				console.log(msg);

				db.create({
					code:msg.content.toString('hex')
				});

			}, {noAck: true});

		});

	});

});