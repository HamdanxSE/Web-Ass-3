import express from 'express';
import * as tutorController from '../controllers/tutorController.js';  // Correct import

const router = express.Router();

// Route to view and edit the tutor's profile
router.get('/profile', tutorController.viewProfile);  // Correct method for viewing profile
router.put('/profile', tutorController.updateProfile);

// Route to view all upcoming and past sessions for the tutor
router.get('/sessions', tutorController.getSessionRequests); // Correct for retrieving sessions

// Route to accept or reject session requests
router.post('/session/accept', tutorController.manageSessionRequest); 
router.post('/session/reject', tutorController.manageSessionRequest);

// Route to manage tutor's availability
router.put('/availability', tutorController.updateAvailability); // Ensure this function is defined

// Route to view and manage tutor's reviews and ratings
router.get('/reviews', tutorController.viewReviews);  // Ensure this is implemented
router.put('/review', tutorController.updateReview);  // Ensure this is implemented

export default router;


/*
==============================================
Tutor Routes Summary
==============================================

1. `/profile` (GET):
   - Purpose: Allows a tutor to view their profile details.
   - Controller Method: `viewProfile` from the `tutorController`.
   - Data: None (retrieves the tutor's profile data).

2. `/profile` (PUT):
   - Purpose: Allows a tutor to update their profile details.
   - Controller Method: `updateProfile` from the `tutorController`.
   - Data: Expects updated profile information (e.g., bio, subjects, hourly rate) in the request body.

3. `/sessions`:
   - Purpose: Allows the tutor to view their session history (upcoming and past).
   - Controller Method: `viewSessions` from the `tutorController`.
   - Data: None (retrieves all sessions associated with the logged-in tutor).

4. `/session/accept`:
   - Purpose: Allows the tutor to accept a session request.
   - Controller Method: `acceptSession` from the `tutorController`.
   - Data: Expects session `id` in the request body to accept the session.

5. `/session/reject`:
   - Purpose: Allows the tutor to reject a session request.
   - Controller Method: `rejectSession` from the `tutorController`.
   - Data: Expects session `id` in the request body to reject the session.

6. `/availability` (PUT):
   - Purpose: Allows the tutor to update their availability (e.g., days/times they are available).
   - Controller Method: `updateAvailability` from the `tutorController`.
   - Data: Expects updated availability details (e.g., available days and times) in the request body.

7. `/reviews` (GET):
   - Purpose: Allows the tutor to view their reviews and ratings submitted by students.
   - Controller Method: `viewReviews` from the `tutorController`.
   - Data: None (retrieves all reviews associated with the logged-in tutor).

8. `/review` (PUT):
   - Purpose: Allows the tutor to update or manage their reviews (if applicable).
   - Controller Method: `updateReview` from the `tutorController`.
   - Data: Expects updated review information in the request body.

*/
