import express from "express";
import { postAddMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", postAddMessage);

export default router;
