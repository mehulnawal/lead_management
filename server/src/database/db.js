import mongoose from "mongoose";
import { apiError } from "../config/apiError.config.js";
import { apiResponse } from "../config/apiResponse.config.js";

export const dbConnect = async () => {
    try {

        const newConnection = await mongoose.connect(process.env.DB_URL);

        return apiResponse({ status: 200, message: 'Db Connected successfully', data: { hostName: newConnection.connection.host } });

    } catch (error) {

        return apiError({ status: 500, message: 'Error in connecting db', error: error.message });
    }
}