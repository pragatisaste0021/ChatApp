import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import messageRoute from './routes/message.route.js'
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());

app.use(cors(
  {
    origin: 'http://localhost:5173',  // Allow your frontend domain
    credentials: true,
  }
));

app.use(cookieParser());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

// Database Connectivity

try{
    mongoose.connect(URI);
    console.log("Connected To MongoDB");
}
catch(error){
    console.log(error);

}

// routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
