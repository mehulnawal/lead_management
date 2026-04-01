import app from "../app.js"
import { apiError } from "./config/apiError.config.js";
import { dbConnect } from "./database/db.js";

const PORT = process.env.PORT || 8000

app.listen(PORT, async (error) => {
    if (error)
        return apiError({ status, message: "Error in starting server", error: error.message });

    await dbConnect();
    console.log(`Server started on port - ${PORT}`);
})