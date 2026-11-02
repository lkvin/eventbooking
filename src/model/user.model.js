import { db } from "../config/dbConnection.js";

export const createUser = async (userPayload) =>{
    const {name,phoneNumber,role} = userPayload;
    const uuid = crypto.randomUUID();
    const userData = {
        uuid : uuid,
        name : name,
        phoneNumber : phoneNumber,
    }
    if (role){
        userData.role = role;
    }
    try {
        await db('users').insert(userData);

        const user = await db('users').select("*").where({uuid}).first();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const findUserByPhoneNumber = async (phoneNumber) =>{
    const userPhoneNumber = {phone_number : phoneNumber};
    try {
        const user = await db('users').select('*').where({userPhoneNumber});
        return user
    } catch (error) {
        throw new Error(error.message);
    }
}