import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Establish a connection to the MongoDB database.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Prevent infinite waiting
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

// Handle disconnection events
mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB Disconnected. Reconnecting...');
    connectDB();
});

// Export the function
export default connectDB;
