import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect(){
    if(connection.isConnected){
        return
    }

    const db = await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database connected")
    connection.isConnected = db.connections[0].readyState

}

export default dbConnect