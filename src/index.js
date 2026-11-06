import "dotenv/config"
import { testConnection } from "./config/dbConnection.js"
import express from "express";
import { authRouter } from "./routes/auth.route.js";

const PORT = process.env.SERVER_PORT;
testConnection();

const app = express();
app.use(express.json());
app.use('/api/auth',authRouter);
app.listen(PORT,()=>{
    console.log("Server if Running on PORT",PORT); 
})