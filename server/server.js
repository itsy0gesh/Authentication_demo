import express from "express";
import 'dotenv/config';
import dbConnect from "./dbConnect.js";
import cors from 'cors';
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";

const app=express();
const {PORT , MONGO_URL} = process.env;

// * MIDDLEWARE
app.use(morgan('dev'));
app.use(cors({
    origin:"http://localhost:5416",
    credentials:true
}));
app.use(express.json()); 

// *API
app.get('/',(req,res,next)=>{res.send("welcome to server!");});
app.use("/api/user",userRoutes);


// * CONNECTION
const start = async()=>{
    try{
        await dbConnect(MONGO_URL);
        app.listen(PORT|| 5000,()=>{
            console.log(`server running on port ${PORT}`);
        });
    }catch(error){
        console.log(error);
    }
}
start();




