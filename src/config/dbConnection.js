import knex from "knex";
import knexfile from "../../knexfile.js";

const environment = process.env.NODE_ENV || "development";
const configOption = knexfile[environment];

export const db = knex(configOption);

export async function testConnection(){
    try {
        await db.raw('SELECT 1');
        console.log("\x1b[32mDatabase connected successfully\x1b[0m");
        
    } catch (error) {
        console.log("\x1b[31mDatabase connection failed\x1b[0m",error.message);
    }
}