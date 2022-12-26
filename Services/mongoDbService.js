import mongoose from "mongoose";

export default async () => {
    try {
        await mongoose.connect(
            `mongodb://localhost:${process.env.PORT_MONGODB}/${process.env.DATABASE_NAME}`
        );
        // If successfully
        console.log("Success connect to database!");
    } catch (err) {
        console.log("Failed connect to database!");
    }
};
