// Contains functions for validating forms, reviews, and session bookings.
// ==============================================
// validationUtils.js
// ==============================================
// This utility file contains functions to validate 
// user inputs, such as email, password, ratings, 
// and session date/time.

const validateEmail = (email) => {
    // Simple email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // Password should be at least 8 characters long
    // and contain at least one number and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const validateRating = (rating) => {
    // Rating should be between 1 and 5
    return rating >= 1 && rating <= 5;
};

const validateSessionDateTime = (sessionDateTime) => {
    // Validate if the sessionDateTime is a valid date
    return !isNaN(new Date(sessionDateTime).getTime());
};

module.exports = { validateEmail, validatePassword, validateRating, validateSessionDateTime };


// ==============================================
// validationUtils.js Summary
// ==============================================
//
// 1. `validateEmail(email)`:
// - **Data**: String (email)
// - **Usage**: Validates if the email is in a correct format (e.g., user@example.com) using regex.
//
// 2. `validatePassword(password)`:
// - **Data**: String (password)
// - **Usage**: Validates if the password meets the required criteria: 
//   - At least 8 characters
//   - Contains at least one number
//   - Contains at least one special character (@$!%*?&)
//
// 3. `validateRating(rating)`:
// - **Data**: Number (rating)
// - **Usage**: Ensures the rating is within the range of 1 to 5. Returns `true` if valid.
//
// 4. `validateSessionDateTime(sessionDateTime)`:
// - **Data**: String (session date/time)
// - **Usage**: Checks if the session date/time is valid (using JavaScript's `Date` object).
