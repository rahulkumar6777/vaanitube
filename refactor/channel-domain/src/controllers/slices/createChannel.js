import { body, validationResult } from 'express-validator';
import { Model } from "../../models/index.js"
import { client } from '../../configs/redis.js';


const channelValidate = [
    body('name')
        .notEmpty()
        .withMessage('Channel name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Channel name must be between 2 and 100 characters')
]


const createChannel = async (req, res) => {
    try {

        const user = req.user;

        if (user.role !== 'creator') {
            return res.status(403).json({ message: 'Only creators can create channels' });
        }

        await Promise.all(channelValidate.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { name } = req.body;

        // create channel username by using entered name and appending a random number
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        let channelUsername = name.toLowerCase().replace(/\s+/g, '') + randomNum;

        if (await Model.Channel.findOne({ channelUsername })) {
            channelUsername = name.toLowerCase().replace(/\s+/g, '') + randomNum;
        }

        const newChannel = new Model.Channel({
            name,
            channelUsername,
            ownerId: user.id,
            description: '',
            status: 'draft'
        });

        await newChannel.save();

        await client.hSet(
            `channel:exist:${newChannel._id.toString()}`,
            {
                ownerId: newChannel.ownerId,
                status: newChannel.status,
                name: newChannel.name
            }
        );

        res.status(201).json({ message: 'Channel created successfully', channel: newChannel });

    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { createChannel };