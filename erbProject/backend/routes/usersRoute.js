import express from "express";
import { postRegister, postLogin, getLogout, getProfile, postProfile } from "../controllers/userController.js"
import verify from "../helpers/verify.js";

const router =  express.Router();

router.post("/login", postLogin);
router.route("/register").post(postRegister);
router.get("/logout", getLogout);
router.route("/profile/:userId").get(getProfile).post(postProfile);
export default router;