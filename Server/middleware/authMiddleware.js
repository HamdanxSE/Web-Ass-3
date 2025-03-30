// Verifies if a user is authenticated (JWT verification).
// authMiddleware.js

import jwt from 'jsonwebtoken';  // Import JWT library
import User from '../models/userModel.js';  // Import User model

// Middleware to check if the user is authenticated
export const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed, token missing' });
    }
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user by the decoded user ID
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed, user not found' });
        }
        
        // Attach user to the request object for access in the route handlers
        req.user = user;
        
        next();  // Continue to the next middleware/route handler
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Authentication failed, invalid token' });
    }
};

// Middleware to check if the user has the appropriate role (admin, tutor, student)
export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Permission denied, insufficient role' });
        }
        next();
    };
};

// Middleware to check if the user has admin role
export const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, insufficient role' });
    }
    next();
};


// export { authenticateUser, authorizeRole };  // Export the functions for use in other files

// ==============================================
// Authentication Middleware Summary
// ==============================================
//
// 1. `authenticateUser`: 
// - **Purpose**: Verifies if the incoming request has a valid JWT token and attaches the corresponding user to the request object.
// - **Usage**: Used in routes to ensure that the requestor is authenticated before accessing protected resources.
//
// 2. `authorizeRole`: 
// - **Purpose**: Checks if the authenticated user has one of the required roles (e.g., admin, tutor, student).
// - **Usage**: Used in routes to ensure that the user has the proper role to perform a certain action (e.g., an admin accessing admin-only resources).
