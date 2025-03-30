// Defines the schema for reviews (student reviews for tutors).
import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
    tutor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,  // Reference to the tutor being reviewed
    },
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,  // Reference to the student leaving the review
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5, 
        default: 5, // Rating is between 1 to 5, default is 5
    },
    comment: { 
        type: String, 
        required: true, 
        maxlength: 500, 
        trim: true,  // The review comment, with a limit to prevent excessively long feedback
    },
    createdAt: { 
        type: Date, 
        default: Date.now,  // Automatically set the current date/time when the review is created
    },
    updatedAt: { 
        type: Date, 
        default: Date.now,  // Automatically set when the review is updated
    }
});

// Update the `updatedAt` field on modification
reviewSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;



/**
 * Review Model
 * 
 * This model represents the reviews left by students for tutors after completing a session. 
 * Reviews help provide feedback about tutors and contribute to their overall rating, 
 * which influences their visibility and trustworthiness on the platform.
 * 
 * Fields:
 * - `tutor`: Reference to the tutor being reviewed (required).
 * - `student`: Reference to the student who leaves the review (required).
 * - `rating`: A numerical rating (between 1 to 5) given by the student, default is 5.
 * - `comment`: A text field where the student provides written feedback about the session (max length 500 characters).
 * - `createdAt`: Date when the review was created, automatically set to the current date/time.
 * - `updatedAt`: Date when the review was last updated, automatically set to the current date/time on modification.
 * 
 * The `rating` and `comment` are both required for a valid review. Reviews are crucial 
 * for maintaining tutor quality and assisting other students in making informed decisions.
 * 
 * The `pre-save` hook ensures that the `updatedAt` field is updated each time the 
 * review is saved or modified.
 */
