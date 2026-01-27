import { body, validationResult } from 'express-validator';

const channelValidate = [
    body('name')
        .notEmpty()
        .withMessage('Channel name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Channel name must be between 2 and 100 characters')
]


const createChannel = async (req, res) => {
    try {
        await Promise.all(channelValidate.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { name } = req.body;

        // create channel username by using entered name and appending a random number
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const channelUsername = name.toLowerCase().replace(/\s+/g, '') + randomNum;

        
    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { createChannel };