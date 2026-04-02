import app from "../app.js"
import { dbConnect } from "./database/db.js";

const PORT = process.env.PORT || 8000

// FIX - Issue 4
app.listen(PORT, async (error) => {
    if (error) {
        console.error("Error in starting server:", error.message);
        return apiError({ status: 500, message: "Error in starting server" })
    }

    await dbConnect();
    console.log(`Server started on port - ${PORT}`);
});