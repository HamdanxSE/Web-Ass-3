// Defines the schema for sessions (student-tutor interactions).
import mongoose from 'mongoose';


// Create the Session Schema
const sessionSchema = new mongoose.Schema({
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model (tutor)
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model (student)
        required: true
    },
    subject: {
        type: String,  // Subject or topic of the session
        required: true
    },
    date: {
        type: Date,  // The date and time of the session
        required: true
    },
    sessionType: {
        type: String,
        enum: ['online', 'in-person'],  // Session type (online or in-person)
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],  // Status of the session
        default: 'pending',
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],  // Payment status for the session
        default: 'pending',
        required: true
    },
    hourlyRate: {
        type: Number,  // The tutor's hourly rate for the session
        required: true
    },
    totalAmount: {
        type: Number,  // Total amount for the session (calculated from hourlyRate and session duration)
        required: true
    },
    feedback: {
        type: String,  // Feedback from the student after the session (can be null before completion)
        default: null
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',  // Reference to the Review model (for the session review)
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically store the creation timestamp
    }    
});

// Create a model for the session schema
const Session = mongoose.model('Session', sessionSchema);

export default Session;



/*
    Summary of Session Model Fields:

    tutor: { 
        // References the tutor associated with this session (must be a tutor type user).
        // Type: ObjectId, referencing the 'User' model.
        required: true 
    },

    student: { 
        // References the student associated with this session (must be a student type user).
        // Type: ObjectId, referencing the 'User' model.
        required: true 
    },

    subject: { 
        // The subject/topic of the tutoring session.
        // Type: String.
        required: true
    },

    date: { 
        // The exact date and time when the session is scheduled to take place.
        // Type: Date.
        required: true
    },

    sessionType: { 
        // Specifies whether the session is online or in-person.
        // Type: String, values: 'online' or 'in-person'.
        required: true
    },

    status: { 
        // Tracks the current state of the session (whether it's pending, confirmed, completed, or cancelled).
        // Type: String, values: 'pending', 'confirmed', 'completed', or 'cancelled'.
        default: 'pending', 
        required: true
    },

    paymentStatus: { 
        // Indicates whether the session's payment is pending, completed, or failed.
        // Type: String, values: 'pending', 'completed', or 'failed'.
        default: 'pending',
        required: true
    },

    hourlyRate: { 
        // The hourly rate charged by the tutor for the session.
        // Type: Number.
        required: true
    },

    totalAmount: { 
        // The total cost for the session, based on the hourly rate and session duration.
        // Type: Number.
        required: true
    },

    feedback: { 
        // Stores feedback or comments from the student about the session after completion.
        // Type: String, can be null before the session is completed.
        default: null
    },

    review: { 
        // References the Review model, if a review has been left for the session by the student.
        // Type: ObjectId, referencing the 'Review' model.
        default: null
    },

    createdAt: { 
        // Automatically records the date and time the session was created.
        // Type: Date.
        default: Date.now
    }

    Usage of Fields:
    - tutor and student fields will be used to track the users involved in the session.
    - subject helps specify what is being taught during the session.
    - date and sessionType will help in organizing and scheduling sessions.
    - status tracks the progress of the session from creation to completion.
    - paymentStatus keeps track of whether the session has been paid for or not.
    - hourlyRate and totalAmount help in calculating session cost based on the tutor's rate and session duration.
    - feedback and review fields store student feedback and ratings after the session is complete.
    - createdAt helps in auditing and managing session records chronologically.

*/
