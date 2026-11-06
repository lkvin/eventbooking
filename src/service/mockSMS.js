import crypto from "node:crypto"

const storeOTP = {};

export const serviceSMS = {
    sendOTP :(phoneNumber)=>{
        if (!phoneNumber) throw new Error("Phone number is required");
        const otp = crypto.randomInt(100000,999999).toString();
        const expireAt = Date.now() + 5*60*1000;

        storeOTP[phoneNumber] = {otp,expireAt};

        console.log(`\n=========================================`);
        console.log(`[SMS AGENT] To: ${phoneNumber}`);
        console.log(`OTP Code: ${otp}`);
        console.log(`========================================-\n`);

        return { success: true, message: "OTP has been sent" };

    },
    verify: (phoneNumber, otp) => {
        const record = storeOTP[phoneNumber];

        if (!record || Date.now() > record.expiresAt || record.otp !== otp) {
            return { valid: false, error: "Invalid or expired OTP" };
        }

        // Clear OTP after successful use so it can't be reused
        delete storeOTP[phoneNumber];

        return { valid: true };
    }
}