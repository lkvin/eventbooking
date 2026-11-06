import { createUser, findUserByPhoneNumber } from "../model/user.model.js";
import { serviceSMS } from "../service/mockSMS.js";

export const reqOTP = async(req , res) =>{
    const {phoneNumber} = req.body;
    try {
        const requestOTP = serviceSMS.sendOTP(phoneNumber);
        return res.status(200).json(requestOTP);
    } catch (error) {
        return res.status(400).json({success: false, message : error.message});
    }
}

export const verifyOTP = async (req,res) =>{
    const {phoneNumber,otp,name,role} = req.body;
    try {
        const verify = serviceSMS.verify(phoneNumber,otp);
        if(!verify.valid){
            return res.status(400).json({success:false,message:"invalid OTP"});
        }
        const user = await findUserByPhoneNumber(phoneNumber);
        
        
        if(user==[]){
            const randomNumber = Math.floor(1000+ Math.random()*9000);
            const userPayload = {
                name : name||`User_${randomNumber}`,
                phoneNumber : phoneNumber,
                role : role || "customer"
                }
            const user = await createUser(userPayload);
            console.log("user created");
            return res.status(200).json({success:true,data:user});
        }
        
        return res.status(200).json({success:true,data:user});
    } catch (error) {
        return res.status(400).json(error.message);
    }
}