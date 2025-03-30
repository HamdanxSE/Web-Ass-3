import express from 'express';
import {
    approveTutorVerification,
    rejectTutorVerification,
    generateReports,
    getTutorVerificationRequests
} from '../controllers/adminController.js';
import { authenticateUser, verifyAdmin } from '../middleware/authMiddleware.js';  // Import both

const router = express.Router();

// Apply the authenticateUser middleware to ensure the user is authenticated first
router.use(authenticateUser);

// Apply the verifyAdmin middleware to ensure only admins can access these routes
router.use(verifyAdmin);

// Route to verify a tutor's profile
router.put('/verify-tutor/:tutorId', approveTutorVerification);

// Route to reject a tutor's verification request
router.put('/reject-tutor/:tutorId', rejectTutorVerification);

// Route to get all tutor verification requests
router.get('/reports', getTutorVerificationRequests);

// Route to generate reports
router.get('/generate-report', generateReports);

export default router;

/*
==============================================
Admin Routes Summary
==============================================

1. `/verify-tutor/:id`:
   - Purpose: Verifies a tutor by their ID.
   - Controller Method: `verifyTutor` from the `adminController`.
   - Middleware: `authMiddleware.verifyAdmin` ensures only admins can access this route.

2. `/reject-tutor/:id`:
   - Purpose: Rejects a tutor’s verification request by their ID.
   - Controller Method: `rejectTutor` from the `adminController`.
   - Middleware: `authMiddleware.verifyAdmin` ensures only admins can access this route.

3. `/reports`:
   - Purpose: Fetches all the reports (e.g., tutor verification, user activity).
   - Controller Method: `getReports` from the `adminController`.
   - Middleware: `authMiddleware.verifyAdmin` ensures only admins can access this route.

4. `/generate-report/:type`:
   - Purpose: Generates specific report data based on the `:type` parameter (e.g., session completion rates, popular subjects).
   - Controller Method: `generateReport` from the `adminController`.
   - Middleware: `authMiddleware.verifyAdmin` ensures only admins can access this route.

*/
