import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
let channel = null;
let connection = null;


const initRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        
        console.log(' RabbitMQ connected successfully');
        
        connection.on('error', (err) => {
            console.error(' RabbitMQ connection error:', err);
            channel = null;
            connection = null;
            setTimeout(initRabbitMQ, 5000);
        });
        
        connection.on('close', () => {
            console.log(' RabbitMQ connection closed. Reconnecting...');
            channel = null;
            connection = null;
            setTimeout(initRabbitMQ, 5000);
        });
        
        return channel;
        
    } catch (error) {
        console.error(' RabbitMQ connection error:', error);
        channel = null;
        connection = null;
        setTimeout(initRabbitMQ, 5000);
    }
};


const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel not initialized. Call initRabbitMQ() first.');
    }
    return channel;
};


const consumeQueue = async (queueName, callback, options = {}) => {
    try {
        const ch = getChannel();
        
        
        await ch.assertQueue(queueName, { durable: true });
        
        
        const prefetchCount = options.prefetch || 1;
        ch.prefetch(prefetchCount);
        
        console.log(` Waiting for messages in queue: ${queueName}`);
        
        ch.consume(queueName, async (msg) => {
            if (msg !== null) {
                try {
                    const data = JSON.parse(msg.content.toString());
                    console.log(` Received message from ${queueName}:`, data);
                    
                    
                    await callback(data, msg);
                    
                    
                    ch.ack(msg);
                    console.log(` Message acknowledged from ${queueName}`);
                    
                } catch (error) {
                    console.error(` Error processing message from ${queueName}:`, error);
                    
                   
                    const requeue = options.requeue !== undefined ? options.requeue : true;
                    ch.nack(msg, false, requeue);
                    console.log(` Message ${requeue ? 'requeued' : 'rejected'}`);
                }
            }
        }, {
            noAck: false 
        });
        
        return true;
        
    } catch (error) {
        console.error(`Error consuming from ${queueName}:`, error);
        throw error;
    }
};


const closeRabbitMQ = async () => {
    try {
        if (channel) {
            await channel.close();
            channel = null;
        }
        if (connection) {
            await connection.close();
            connection = null;
        }
        console.log(' RabbitMQ connection closed');
    } catch (error) {
        console.error('Error closing RabbitMQ connection:', error);
    }
};


const isConnected = () => {
    return channel !== null && connection !== null;
};

export { 
    initRabbitMQ,
    getChannel,
    consumeQueue, 
    closeRabbitMQ,
    isConnected
};