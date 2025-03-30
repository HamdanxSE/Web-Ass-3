// Defines the schema for tutor verification requests.
import mongoose from 'mongoose';


// Verification Request Schema
const verificationSchema = new mongoose.Schema({
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model (specifically, a tutor).
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'], // Status of the verification request.
        default: 'pending',
        required: true
    },
    verificationDate: {
        type: Date, // Date when the verification request was created.
        default: Date.now
    },
    adminComments: {
        type: String, // Comments or reasons for approval/rejection by the admin.
        default: null
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // References the admin who verified/rejected the request.
        default: null
    }
});

// Creating the Verification model using the schema.
const VerificationRequest = mongoose.model('VerificationRequest', verificationSchema);

export default VerificationRequest;

// ==============================================
// Verification Model Summary
// ==============================================
//
// 1. `tutor`: 
// - **Data**: ObjectId (references User model, specifically a tutor)  
// - **Usage**: Links the verification request to the specific tutor whose profile is being verified. This is required to associate the verification request with the correct tutor.
//
// 2. `status`: 
// - **Data**: String (can be 'pending', 'approved', or 'rejected')  
// - **Usage**: Tracks the current status of the verification request. It helps to determine whether the tutor is awaiting verification, has been approved, or has been rejected. Default value is 'pending'.
//
// 3. `verificationDate`: 
// - **Data**: Date  
// - **Usage**: Stores the date when the verification request was made. This is used for tracking the timeline of the request process.
//
// 4. `adminComments`: 
// - **Data**: String (optional)  
// - **Usage**: Allows admins to leave comments regarding the verification request. It is especially useful for explaining why a tutor's request was approved or rejected. This field is optional and can be null.
//
// 5. `verifiedBy`: 
// - **Data**: ObjectId (references User model, specifically an admin)  
// - **Usage**: Tracks the admin who handled and completed the verification process. This ensures accountability and identifies who processed the verification request. This field is optional and can be null until the verification is completed.
//
// ==============================================
