//Handles errors (for example, when the route or data is not found).
// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);  // Log the error details for debugging purposes
    
    // Set default status code if not provided
    const statusCode = err.statusCode || 500;
    
    // Send error response
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Hide stack in production
    });
};

module.exports = errorHandler;


// ==============================================
// Error Handler Middleware Summary
// ==============================================
//
// 1. `errorHandler`: 
// - **Purpose**: Handles all errors in the application in a centralized manner, ensuring uniform error responses.
// - **Usage**: Used at the end of the middleware stack to catch any errors that were not handled earlier in the request cycle.
//   - It logs errors to the console (useful for debugging).
//   - It returns a standardized error message along with a status code to the client. 
//   - In production, stack traces are hidden to prevent exposing sensitive data.
