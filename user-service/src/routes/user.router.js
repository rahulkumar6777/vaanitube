import express from "express";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";
import { user } from "../controllers/index.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.put("/profile", verifyJwt , upload.single('file') , user.changeProfilePic)

export default router;