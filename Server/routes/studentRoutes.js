// Routes for student-related actions (searching tutors, booking sessions, managing wishlist).
import express from 'express';
import { searchTutors, bookSession, leaveReview, addToWishlist, removeFromWishlist } from '../controllers/studentController.js';

const router = express.Router();

router.get('/search-tutors', searchTutors);
router.post('/book-session', bookSession);
router.post('/review', leaveReview);
router.post('/wishlist/add', addToWishlist);
router.post('/wishlist/remove', removeFromWishlist);

export default router;

/*
==============================================
Student Routes Summary
==============================================

1. `/search-tutors`:
   - Purpose: Allows students to search for tutors using various filters.
   - Controller Method: `searchTutors` from the `studentController`.
   - Data: Expects query parameters like subject, location, price, etc., to filter tutors.

2. `/view-tutor/:id`:
   - Purpose: Displays detailed information of a specific tutor based on the `id`.
   - Controller Method: `viewTutorProfile` from the `studentController`.
   - Data: Expects a tutor's `id` in the URL to fetch the tutor's profile data.

3. `/book-session`:
   - Purpose: Allows a student to book a session with a tutor.
   - Controller Method: `bookSession` from the `studentController`.
   - Data: Expects session details (e.g., tutor's `id`, date, time, subject) in the request body.

4. `/sessions`:
   - Purpose: Fetches the student's session history (past and upcoming sessions).
   - Controller Method: `getSessionHistory` from the `studentController`.
   - Data: None (retrieves all sessions associated with the logged-in student).

5. `/wishlist`:
   - Purpose: Allows a student to add or remove tutors from their wishlist.
   - Controller Method: `manageWishlist` from the `studentController`.
   - Data: Expects a tutor `id` and action (`add` or `remove`) in the request body.

6. `/review`:
   - Purpose: Allows a student to submit a review for a tutor after completing a session.
   - Controller Method: `submitReview` from the `studentController`.
   - Data: Expects `tutorId`, `rating`, and `comment` in the request body to submit the review.

*/
