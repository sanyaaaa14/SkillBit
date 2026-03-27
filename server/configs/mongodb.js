import mongoose, { mongo } from "mongoose";

//Connect to MongoDB database

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("Database connected successfully"))

    await mongoose.connect(`${process.env.MONGODB_URI}/skillbit`)
}
export default connectDB;