// Handles rating calculations and updates (like recalculating the average tutor rating).
// ==============================================
// ratingUtils.js
// ==============================================
// This utility file contains helper functions to 
// update and calculate ratings for tutors based on 
// the reviews submitted by students.

// Function to calculate the average rating
const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
};

// Function to update the tutor's rating
const updateTutorRating = (tutorId, reviewRating, TutorModel, ReviewModel) => {
    // Add new review rating to the tutor's reviews
    ReviewModel.create({ tutor: tutorId, rating: reviewRating })
        .then(() => {
            // Find all reviews of the tutor
            ReviewModel.find({ tutor: tutorId })
                .then((reviews) => {
                    // Get all the ratings from the reviews
                    const ratings = reviews.map(review => review.rating);
                    
                    // Calculate the new average rating
                    const averageRating = calculateAverageRating(ratings);

                    // Update the tutor's rating in the User model
                    TutorModel.findByIdAndUpdate(tutorId, { rating: averageRating })
                        .then(() => {
                            console.log(`Tutor ${tutorId} rating updated to ${averageRating}`);
                        })
                        .catch((err) => {
                            console.error("Error updating tutor rating: ", err);
                        });
                })
                .catch((err) => {
                    console.error("Error fetching reviews for tutor: ", err);
                });
        })
        .catch((err) => {
            console.error("Error adding new review: ", err);
        });
};

module.exports = { calculateAverageRating, updateTutorRating };


// ==============================================
// ratingUtils.js Summary
// ==============================================
//
// 1. `calculateAverageRating(ratings)`:
// - **Data**: Array of ratings (numbers)
// - **Usage**: Calculates the average of all ratings given to a tutor. Returns 0 if no ratings are present.
//
// 2. `updateTutorRating(tutorId, reviewRating, TutorModel, ReviewModel)`:
// - **Data**: 
//   - `tutorId`: The unique ID of the tutor whose rating needs to be updated.
//   - `reviewRating`: The rating value (number) from the new review.
//   - `TutorModel`: Mongoose model for the tutors.
//   - `ReviewModel`: Mongoose model for the reviews.
// - **Usage**: 
//   - Creates a new review with the rating for the tutor.
//   - Retrieves all reviews for the tutor to calculate the average rating.
//   - Updates the tutor's rating in the User model after recalculating the average.

