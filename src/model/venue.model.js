import { db } from "../config/dbConnection.js";
import crypto from 'crypto';

export const addVenue = async (venuePayload) => {
    const { name, address } = venuePayload;
    
    const id = crypto.randomUUID();

    const venueData = {
        id: id,
        name: name,
        address: address
    };

    try {
        await db('venue').insert(venueData); // Matches table name 'venue'
        const venue = await db('venue').select('*').where({ id }).first();
        return venue;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const findVenue = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
        const venues = await db('venue').select("*")
                            .limit(limit)
                            .offset(offset);

        const [{ total }] = await db('venue').count('id as total');

        return {
            venues,
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

export const findVenueById = async (venueId) => {
    try {
        // Looks up by the UUID primary key 'id'
        const venue = await db('venue').select("*").where({ id: venueId }).first();
        return venue;   
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateVenue = async (venueId, updateData) => {
    try {
        const rowAffected = await db('venue').where({ id: venueId }).update(updateData);

        if (rowAffected === 0) {
            return null;
        }
        
        const venueUpdated = await db('venue').select('*').where({ id: venueId }).first();
        return venueUpdated;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteVenue = async (venueId) => {
    try {
        const rowAffected = await db('venue').where({ id: venueId }).del();
        return rowAffected;
    } catch (error) {
        throw new Error(error.message);
    }
};