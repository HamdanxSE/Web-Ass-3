// Defines the schema for students, tutors, and admins.

import mongoose from 'mongoose';


// Schema definition for the User model to represent students, tutors, and admins in the EduConnect platform
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'],
      required: [true, 'Role is required'],
    },
    profileImage: {
      type: String,
      default: '', // Optional: URL/path to the user's profile image
    },
    qualifications: {
      type: String,
      default: '', // For tutors: academic qualifications or professional certifications
    },
    bio: {
      type: String,
      default: '', // For tutors: short biography or teaching philosophy
    },
    subjects: [
      {
        type: String,
        trim: true, // List of subjects taught by tutors
      },
    ],
    hourlyRate: {
      type: Number,
      min: [0, 'Hourly rate must be a positive number'],
      default: 0, // For tutors: hourly teaching rate
    },
    location: {
      type: String,
      default: 'Online', // Location for tutors (either city or "online")
    },
    availability: [
      {
        type: String,
        enum: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ], // Available days for tutors to conduct sessions
      },
    ],
    rating: {
      type: Number,
      default: 0, // For tutors: average rating based on student feedback
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ], // For students: list of tutors they have added to their wishlist
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt timestamps
  }
);

// Create the User model using the defined schema
const User = mongoose.model('User', userSchema);

export default User;



// ==============================================
// User Model Summary
// ==============================================
//
// 1. `name`: 
// - **Data**: String  
// - **Usage**: Represents the user's full name. Used for display purposes across the platform.
//
// 2. `email`: 
// - **Data**: String (unique, validated)  
// - **Usage**: The email address of the user, used for authentication and communication. Must be unique and correctly formatted.
//
// 3. `password`: 
// - **Data**: String (hashed before storing)  
// - **Usage**: Used for authenticating the user (via login). Stored securely.
//
// 4. `role`: 
// - **Data**: String (can be 'student', 'tutor', 'admin')  
// - **Usage**: Specifies the role of the user. Helps distinguish between students, tutors, and admins. 
//   - **Student**: Can search for tutors, book sessions, leave reviews, etc.
//   - **Tutor**: Can create and manage tutor profiles, offer sessions, track earnings, etc.
//   - **Admin**: Manages tutor verifications, user roles, and platform reports.
//
// 5. `profileImage`: 
// - **Data**: String (URL/path)  
// - **Usage**: Stores the URL or file path to the user's profile image. Optional and displayed on the user's profile.
//
// 6. `qualifications`: 
// - **Data**: String  
// - **Usage**: For **tutors only**. Represents the tutor's educational qualifications or certifications. Helps build credibility.
//
// 7. `bio`: 
// - **Data**: String  
// - **Usage**: For **tutors only**. A short description or teaching philosophy. Allows students to learn more about the tutor's teaching style.
//
// 8. `subjects`: 
// - **Data**: Array of Strings  
// - **Usage**: For **tutors only**. A list of subjects or topics the tutor can teach. Used for filtering tutors when students search for them.
//
// 9. `hourlyRate`: 
// - **Data**: Number  
// - **Usage**: For **tutors only**. Represents the tutor’s hourly rate for sessions. Helps students compare tutors based on pricing.
//
// 10. `location`: 
// - **Data**: String  
// - **Usage**: For **tutors only**. Specifies the tutor's location (either a city or "online"). Used for filtering tutors based on location.
//
// 11. `availability`: 
// - **Data**: Array of Strings  
// - **Usage**: For **tutors only**. A list of days the tutor is available for sessions. Helps students choose tutors based on their availability.
//
// 12. `rating`: 
// - **Data**: Number (default 0, range 0-5)  
// - **Usage**: For **tutors only**. Represents the average rating a tutor has received from students. Helps students filter tutors based on their ratings.
//
// 13. `wishlist`: 
// - **Data**: Array of ObjectIds (references to `User` model)  
// - **Usage**: For **students only**. Represents a list of tutors the student has added to their wishlist. This allows students to easily access their favorite tutors later.
//
// ==============================================
//
// Usage Breakdown:
//
// For **Students**:
// - **Search & Filtering**: Use `role`, `subjects`, `location`, `rating`, and `availability` to filter and find suitable tutors.
// - **Wishlist**: Can save tutors in `wishlist`, stored in their user document.
// - **Session Booking**: `availability` used to show available times for booking.
// - **Rating**: After a session, leave a rating to update the `rating` field.
//
// For **Tutors**:
// - **Profile**: Use `name`, `qualifications`, `bio`, `subjects`, `hourlyRate`, `location`, and `availability` to build a detailed profile for students to view.
// - **Session Management**: Track session availability using `availability` and manage sessions (including earnings).
// - **Rating**: The tutor’s `rating` gets updated as students leave feedback after each session.
//
// For **Admins**:
// - **User Management**: Use the `role` field to distinguish between students, tutors, and admins.
// - **Verification**: Admins interact with `qualifications` and `bio` to verify tutors' credentials.
//
// ==============================================
//
// Quick Summary of Key Fields by User Type:
//
// | **Field**         | **Student**          | **Tutor**                | **Admin**             |
// |-------------------|----------------------|--------------------------|-----------------------|
// | `name`            | Yes                  | Yes                      | Yes                   |
// | `email`           | Yes                  | Yes                      | Yes                   |
// | `password`        | Yes                  | Yes                      | Yes                   |
// | `role`            | "student"            | "tutor"                  | "admin"               |
// | `profileImage`    | Yes                  | Yes                      | Yes                   |
// | `qualifications`  | No                   | Yes                      | Yes                   |
// | `bio`             | No                   | Yes                      | Yes                   |
// | `subjects`        | No                   | Yes                      | Yes                   |
// | `hourlyRate`      | No                   | Yes                      | Yes                   |
// | `location`        | No                   | Yes                      | Yes                   |
// | `availability`    | No                   | Yes                      | Yes                   |
// | `rating`          | No                   | Yes                      | Yes                   |
// | `wishlist`        | Yes                  | No                       | Yes                   |
// ==============================================
