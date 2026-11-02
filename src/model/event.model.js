import { db } from "../config/dbConnection.js";

export const createEvent = async (createEventPayload) =>{
    const {name,venueID,date,startTime} = createEventPayload;
    const uuid = crypto.randomUUID();
    const eventData = {
        uuid : uuid,
        name : name,
        venue_id : venueID,
        date : date,
        start_time : startTime
    }
    try {
        await db('events').insert(eventData);
        const event =  await db('events').select('*').where({uuid}).first();
        return event;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getEvent = async (page,limit) =>{
    const offset = (page -1 ) * limit;
    try {
        const event = await db('events').select("*")
                            .limit(limit)
                            .offset(offset);
        const [{total}] = await db('events').count('id as total');
        return {
            event,
            pagination : {
                totalRow : total,
                limit: Number(limit)
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
export const getEventByID = async (eventId) =>{
    try {
        const event = await db('events').select("*").where({id:eventId}).first();
        return event;   
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateEvent = async (eventId, updateData) =>{
    try {
        const rowAffected = await db('events').where({id:eventId}).update(updateData);

        if (rowAffected == 0){
            return null;
        }
        
        const eventUpdated = await db('events').select('*').where({id:eventId}).first();
        return eventUpdated;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const deleteEvent = async (eventId) =>{
    try {
        const rowAffected = await db('events').where({id:eventId}).del();
        return rowAffected;
    } catch (error) {
        throw new Error(error.message);
    }
}