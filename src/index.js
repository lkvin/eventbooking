import "dotenv/config"
import { testConnection } from "./config/dbConnection.js"
import express from "express";

const PORT = process.env.SERVER_PORT;
testConnection();

const app = express();
app.use(express.json());

app.listen(PORT,()=>{
    console.log("Server if Running on PORT",PORT); 
})