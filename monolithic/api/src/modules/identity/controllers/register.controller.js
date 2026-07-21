import { validationResult } from "express-validator";
import { returnError } from "../../../utils/errors/errorHandler.js";
import { initRegisterCreatorService, initRegisterViewer, verifyRegisterViewerService } from "../services/Register.service.js";
import fs from "fs/promises";


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

export const initRegisterCreatorController = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }

        await initRegisterCreatorService(req);

        return res.status(200).json({
            success: true,
            message: "Otp sent Successfully"
        });

    } catch (error) {
        console.log(error)
        if (req?.files?.length) {
            await Promise.all(
                req.files.map(async (file) => {
                    try {
                        await fs.unlink(file.path);
                    } catch (err) {
                        console.error("Failed to delete file:", file.path, err);
                    }
                })
            );
        }
        returnError(res, error)
    }
}