import { validationResult } from "express-validator";
import { returnError } from "../../../utils/errors/errorHandler.js";
import { initRegisterViewer, verifyRegisterViewerService } from "../services/Register.service.js";

export const initRegisterViewerController = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }

        await initRegisterViewer(req);


        return res.status(200).json({
            success: true,
            message: "Otp sent Successfully"
        });

    } catch (error) {
        returnError(res, error)
    }
}

export const verifyRegisterViewerController = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }

        await verifyRegisterViewerService(req);

        return res.status(200).json({
            success: true,
            message: "Registration Verified SuccessFully"
        });

    } catch (error) {
        returnError(res, error)
    }
}