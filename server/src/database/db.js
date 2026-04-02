import mongoose from "mongoose";

export const dbConnect = async () => {

    try {
        const newConnection = await mongoose.connect(process.env.DB_URL);

        console.log(`MongoDB Connected: ${newConnection.connection.host}`);
        return true;

    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}