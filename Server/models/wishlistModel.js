//  Defines the schema for storing students’ favorite tutors.
import mongoose from 'mongoose';


// Define the schema for the Wishlist model
const wishlistSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tutors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model based on the schema
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;

// ==============================================
// Wishlist Model Summary
// ==============================================
//
// 1. `student`: 
// - **Data**: ObjectId (references User model, specifically a student)  
// - **Usage**: Represents the student who owns this wishlist. Each student can have their own list of favorite tutors.
//
// 2. `tutors`: 
// - **Data**: Array of ObjectIds (references User model, specifically tutors)  
// - **Usage**: Contains the list of tutors that the student has added to their wishlist. Each tutor is referenced by their `ObjectId` from the `User` model. A student can have multiple tutors in their wishlist.
//
// 3. `createdAt`: 
// - **Data**: Date (defaults to the current date)  
// - **Usage**: Tracks the date when the wishlist was created or last updated. Helps to monitor the creation and modification times of wishlist entries.
//
// ==============================================
