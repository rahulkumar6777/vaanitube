import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
let channel = null;
let connection = null;

// Initialize RabbitMQ connection
const initRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        
        // Assert queues exist
        await channel.assertQueue('useraddonuserservice', { durable: true });
        await channel.assertQueue('refreshtokenusercreated', { durable: true });
        await channel.assertQueue('adduserdataonchannelservice', { durable: true });
        await channel.assertQueue('refresh-token-service.send-refresh-token', { durable: true });
        
        console.log('RabbitMQ connected successfully');
        
        // Handle connection errors
        connection.on('error', (err) => {
            console.error('RabbitMQ connection error:', err);
            setTimeout(initRabbitMQ, 5000);
        });
        
        connection.on('close', () => {
            console.log('RabbitMQ connection closed. Reconnecting...');
            setTimeout(initRabbitMQ, 5000);
        });
        
    } catch (error) {
        console.error('RabbitMQ connection error:', error);
        setTimeout(initRabbitMQ, 5000);
    }
};

// Get channel
const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel not initialized. Call initRabbitMQ() first.');
    }
    return channel;
};

// Send message to queue
const sendToQueue = async (queueName, data) => {
    try {
        const ch = getChannel();
        const message = JSON.stringify(data);
        
        ch.sendToQueue(queueName, Buffer.from(message), {
            persistent: true
        });
        
        console.log(`Message sent to queue: ${queueName}`);
        return true;
    } catch (error) {
        console.error(`Error sending message to ${queueName}:`, error);
        throw error;
    }
};

// Close connection
const closeRabbitMQ = async () => {
    try {
        if (channel) await channel.close();
        if (connection) await connection.close();
        console.log('RabbitMQ connection closed');
    } catch (error) {
        console.error('Error closing RabbitMQ connection:', error);
    }
};

export { 
    initRabbitMQ, 
    getChannel, 
    sendToQueue, 
    closeRabbitMQ 
};