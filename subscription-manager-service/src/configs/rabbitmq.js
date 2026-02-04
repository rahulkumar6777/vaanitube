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


const assertQueue = async (queueName, options = { durable: true }) => {
    try {
        const ch = getChannel();
        await ch.assertQueue(queueName, options);
        console.log(` Queue asserted: ${queueName}`);
        return true;
    } catch (error) {
        console.error(`Error asserting queue ${queueName}:`, error);
        throw error;
    }
};


const sendToQueue = async (queueName, data, options = {}) => {
    try {
        const ch = getChannel();
        
        
        await ch.assertQueue(queueName, { durable: true });
        
        const message = JSON.stringify(data);
        const defaultOptions = {
            persistent: true,
            contentType: 'application/json',
            timestamp: Date.now(),
            ...options
        };
        
        ch.sendToQueue(queueName, Buffer.from(message), defaultOptions);
        
        console.log(` Message sent to queue: ${queueName}`);
        return true;
        
    } catch (error) {
        console.error(`Error sending message to ${queueName}:`, error);
        throw error;
    }
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


const publishToExchange = async (exchange, routingKey, data, options = {}) => {
    try {
        const ch = getChannel();
        
        await ch.assertExchange(exchange, 'topic', { durable: true });
        
        const message = JSON.stringify(data);
        const defaultOptions = {
            persistent: true,
            contentType: 'application/json',
            timestamp: Date.now(),
            ...options
        };
        
        ch.publish(exchange, routingKey, Buffer.from(message), defaultOptions);
        
        console.log(` Message published to exchange: ${exchange}, routingKey: ${routingKey}`);
        return true;
        
    } catch (error) {
        console.error(`Error publishing to exchange ${exchange}:`, error);
        throw error;
    }
};


const subscribeToExchange = async (exchange, routingKey, callback) => {
    try {
        const ch = getChannel();
        
        await ch.assertExchange(exchange, 'topic', { durable: true });
        
        const q = await ch.assertQueue('', { exclusive: true });
        await ch.bindQueue(q.queue, exchange, routingKey);
        
        console.log(` Subscribed to exchange: ${exchange}, routingKey: ${routingKey}`);
        
        ch.consume(q.queue, async (msg) => {
            if (msg !== null) {
                try {
                    const data = JSON.parse(msg.content.toString());
                    await callback(data, msg);
                    ch.ack(msg);
                } catch (error) {
                    console.error('Error processing exchange message:', error);
                    ch.nack(msg, false, false);
                }
            }
        }, { noAck: false });
        
        return true;
        
    } catch (error) {
        console.error('Error subscribing to exchange:', error);
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
    assertQueue,
    sendToQueue,
    consumeQueue,
    publishToExchange,
    subscribeToExchange,
    closeRabbitMQ,
    isConnected
};