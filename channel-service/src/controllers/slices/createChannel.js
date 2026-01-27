const createChannel = async (req, res) => {
    try {

    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { createChannel };