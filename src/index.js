import "dotenv/config"
import { testConnection } from "./config/dbConnection.js"
import express from "express";
import { evenRouter } from "./routes/event.route.js";

const PORT = process.env.SERVER_PORT;
testConnection();

const app = express();
app.use(express.json());
app.use("/api/event",evenRouter);

app.listen(PORT,()=>{
    console.log("Server if Running on PORT",PORT); 
})