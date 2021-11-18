let amqp = require('amqplib/callback_api')
// connect to RabbitMQ Server and connect to a channel
amqp.connect('amqp://localhost', (error0, connection)=>{ //channel
    if(error0){
        throw error0
    }
    //created channel
    connection.createChannel((error1, channel)=>{
        if(error1) throw error1
        //creating a queue in a channel
        let queue = 'hello';
        let msg = 'Hello World'

        channel.assertQueue(queue,{ //idemp0tent - create when not present
            durable: false
        }); // Queue created

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log('[x] Sent %s', msg)
    });

    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },500)
})