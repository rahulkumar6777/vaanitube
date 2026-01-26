import express from "express";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";
import { user } from "../controllers/index.js";

const router = express.Router();

router.post("/profile/change", verifyJwt , user.changeProfilePic)

export default router;