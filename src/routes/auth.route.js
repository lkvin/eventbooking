import express from "express";
import { reqOTP, verifyOTP } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/otp/send',reqOTP);
authRouter.post('/otp/verify',verifyOTP);




export {authRouter};