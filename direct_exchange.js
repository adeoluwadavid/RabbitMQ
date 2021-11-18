// A REPLICA OF NEW_TASK_EXCHANGE.JS BUT WITH DIRECT EXCHANGES
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'direct_logs';
        var args = process.argv.slice(2);
        var msg = process.argv.slice(1).join(' ') || 'Hello World!';
        var severity = (args.length > 0) ? args[0] : 'info';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });
        channel.publish(exchange, severity, Buffer.from(msg)); // Severity is the binding key from exchange to queue
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});