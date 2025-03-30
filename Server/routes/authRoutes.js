// Routes for authentication (signup, login, logout).
import express from 'express';
import { registerUser, loginUser, checkEmail, getCurrentUser } from '../controllers/authController.js';

const router = express.Router(); // ✅ Define router before using it

// Route for user signup (for students, tutors, and admins)
router.post('/signup', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to verify if email already exists (for signup validation)
router.post('/check-email', checkEmail);

// Route to get current user info
router.get('/me', getCurrentUser);

export default router; // ✅ Use default export

/*
==============================================
Auth Routes Summary
==============================================

1. /login:
   - Purpose: Handles user login (students, tutors, and admins).
   - Controller Method: loginUser from the authController.
   - Data: Expects email and password in the request body for authentication.

2. /signup:
   - Purpose: Handles user registration for students, tutors, and admins.
   - Controller Method: registerUser from the authController.
   - Data: Expects name, email, password, and role (student, tutor, or admin) in the request body.
   - Validation: Ensures all required fields are filled and email is unique.

3. /check-email:
   - Purpose: Validates whether an email is already in use during signup.
   - Controller Method: checkEmail from the authController.
   - Data: Expects email in the request body and returns { exists: true/false } based on availability.

*/
