// A REPLICA OF RECEIVE.JS BUT MORE COMPLEX SITUATIONS
let amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'task_queue';

        // This makes sure the queue is declared before attempting to consume from it
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1); // Only 1 msg to a worker at a time.
        console.log('[*] Waiting for messages in the %s. To exit press CTRL+C', queue)
        channel.consume(queue, (msg)=>{
            let secs = msg.content.toString().split('.').length -1;
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(()=>{
                console.log('[x] Done');
            },secs * 1000)
        },{ //To ensure that if a worker should die while processing a msg, the msg will be re-queued for another worker
            noAck: false})
    });
});