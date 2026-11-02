import { db } from "../config/dbConnection.js";


export const addEventZone = async (zonePayload) => {
    const { eventID, zone, price, totalQuan } = zonePayload;
    const id = crypto.randomUUID();

    const zoneData = {
        id: id,
        event_id: eventID,
        zone: zone,
        price: price,
        total_quan: totalQuan
    };

    try {
        await db('events_zone').insert(zoneData);
        const eventZone = await db('events_zone').select('*').where({ id }).first();
        return eventZone;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getEventZones = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
        const zones = await db('events_zone').select("*")
                            .limit(limit)
                            .offset(offset);

        const [{ total }] = await db('events_zone').count('id as total');

        return {
            zones,
            pagination: {
                totalRows: total,
                totalPages: Math.ceil(total / limit),
                currentPage: Number(page),
                limit: Number(limit)
            }
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Helpful extra: Fetch all zones belonging to a specific event
export const getZonesByEventId = async (eventId) => {
    try {
        const zones = await db('events_zone').select("*").where({ event_id: eventId });
        return zones;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getEventZoneById = async (zoneId) => {
    try {
        const zone = await db('events_zone').select("*").where({ id: zoneId }).first();
        return zone;   
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateEventZone = async (zoneId, updateData) => {
    try {
        const rowAffected = await db('events_zone').where({ id: zoneId }).update(updateData);

        if (rowAffected === 0) {
            return null;
        }
        
        const zoneUpdated = await db('events_zone').select('*').where({ id: zoneId }).first();
        return zoneUpdated;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteEventZone = async (zoneId) => {
    try {
        const rowAffected = await db('events_zone').where({ id: zoneId }).del();
        return rowAffected;
    } catch (error) {
        throw new Error(error.message);
    }
};