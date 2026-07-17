import express from "express";
import { user } from "../controllers/index.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.put("/profile", upload.single('file'), user.changeProfilePic)
router.put("/details", user.userDetail)

export default router;