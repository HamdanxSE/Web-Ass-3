// Handles student-related actions like searching tutors, booking sessions, managing sessions, and adding reviews.
import User from '../models/userModel.js';
import Session from '../models/sessionModel.js';
import Review from '../models/reviewModel.js';
import Wishlist from '../models/wishlistModel.js';

// 1. Search for Tutors Based on Filters
export const searchTutors = async (req, res) => {
    try {
        const { subject, location, price, rating, availability } = req.query;

        // Build filter criteria dynamically
        const filter = { role: 'tutor' };

        if (subject) filter.subjects = { $in: [subject] };
        if (location) filter.location = location;
        if (price) filter.hourlyRate = { $lte: price };
        if (rating) filter.rating = { $gte: rating };
        if (availability) filter.availability = { $in: [availability] };

        // Find tutors matching the filter
        const tutors = await User.find(filter);

        return res.status(200).json(tutors);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 2. Book a Session with a Tutor
export const bookSession = async (req, res) => {
    try {
        const { tutorId, date, time, subject } = req.body;
        const studentId = req.userId; // User ID from JWT token

        // Check if the tutor exists
        const tutor = await User.findById(tutorId);
        if (!tutor || tutor.role !== 'tutor') {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        // Create a new session
        const newSession = new Session({
            studentId,
            tutorId,
            date,
            time,
            subject,
            status: 'booked',
        });

        await newSession.save();

        return res.status(201).json({ message: 'Session booked successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 3. Leave a Review for a Tutor
export const leaveReview = async (req, res) => {
    try {
        const { tutorId, rating, comment } = req.body;
        const studentId = req.userId;

        const tutor = await User.findById(tutorId);
        if (!tutor || tutor.role !== 'tutor') {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        const newReview = new Review({ tutorId, studentId, rating, comment });
        await newReview.save();

        const reviews = await Review.find({ tutorId });
        const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        tutor.rating = avgRating;
        await tutor.save();

        return res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 4. Add a Tutor to Wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { tutorId } = req.body;
        const studentId = req.userId;

        const tutor = await User.findById(tutorId);
        if (!tutor || tutor.role !== 'tutor') {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        let wishlist = await Wishlist.findOne({ studentId });
        if (!wishlist) {
            wishlist = new Wishlist({ studentId, tutors: [tutorId] });
        } else if (!wishlist.tutors.includes(tutorId)) {
            wishlist.tutors.push(tutorId);
        }

        await wishlist.save();
        return res.status(201).json({ message: 'Tutor added to wishlist' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 5. Remove a Tutor from Wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const { tutorId } = req.body;
        const studentId = req.userId;

        const wishlist = await Wishlist.findOne({ studentId });
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

        wishlist.tutors = wishlist.tutors.filter(id => id.toString() !== tutorId);
        await wishlist.save();

        return res.status(200).json({ message: 'Tutor removed from wishlist' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// export{ searchTutors, bookSession, leaveReview, addToWishlist, removeFromWishlist };


// ==============================================
// StudentController Summary
// ==============================================
//
// 1. `searchTutors`:
// - **Purpose**: Handles tutor search based on filters like subject, location, price, rating, and availability.
// - **Fields Used**: subject, location, price, rating, availability (req.query)
// - **Usage**: Returns a list of tutors that match the filter criteria.
//
// 2. `bookSession`:
// - **Purpose**: Allows students to book sessions with tutors.
// - **Fields Used**: tutorId, date, time, subject (req.body), userId (from JWT token)
// - **Usage**: Creates a new session in the database and links it to the student and tutor.
//
// 3. `leaveReview`:
// - **Purpose**: Allows students to leave reviews and ratings for tutors.
// - **Fields Used**: tutorId, rating, comment (req.body), userId (from JWT token)
// - **Usage**: Saves the review and updates the tutor's rating.
//
// 4. `addToWishlist`:
// - **Purpose**: Adds a tutor to the student's wishlist.
// - **Fields Used**: tutorId (req.body), userId (from JWT token)
// - **Usage**: Adds the specified tutor to the wishlist, ensuring no duplicates.
//
// 5. `removeFromWishlist`:
// - **Purpose**: Removes a tutor from the student's wishlist.
// - **Fields Used**: tutorId (req.body), userId (from JWT token)
// - **Usage**: Removes the specified tutor from the wishlist if present.
//
