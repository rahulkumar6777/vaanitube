import { body } from 'express-validator';
import { plans } from '../../../constant/plan.js';


export const initChannelPayment = [
    body("planid")
        .notEmpty()
        .withMessage("plan is required")
        .isString()
        .withMessage("planid must be a String")
        .isIn(Object.keys(plans))
        .withMessage(`plan must be one of ${Object.keys(plans).join(', ')}`),
    body('months')
        .notEmpty()
        .withMessage("months is Required")
        .isInt({ min: 1, max: 24 })
        .withMessage('Months must be between 1 and 24'),
    body('channelName')
        .notEmpty()
        .withMessage("channelName is required")
        .isString()
        .withMessage("channelName must be a String")
        .isLength({ max: 50 })
        .withMessage("channelName not more than 50 characters")
]