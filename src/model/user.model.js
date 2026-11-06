import { db } from "../config/dbConnection.js";

export const createUser = async (userPayload) =>{
    const {name,phoneNumber,role} = userPayload;
    if(!name||!phoneNumber||!role){
        throw new Error("All field required");
    }
    const uuid = crypto.randomUUID();
    const userData = {
        id : uuid,
        name : name,
        phone_number : phoneNumber,
    }
    if (role){
        userData.role = role;
    }
    try {
        await db('users').insert(userData);

        const user = await db('users').select("*").where({id:uuid}).first();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const findUserByPhoneNumber = async (phoneNumber) =>{
    const userPhoneNumber = {phone_number : phoneNumber};
    try {
        const user = await db('users').where(userPhoneNumber);
        return user
    } catch (error) {
        throw new Error(error.message);
    }
}