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
    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { createChannel };