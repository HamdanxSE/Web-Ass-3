import User from '../models/userModel.js';  // Correct relative path
import Session from '../models/sessionModel.js';  // Correct file path with extension

// ==============================================
// TutorController - Handles Tutor-Specific Actions
// ==============================================

// 1. View Tutor Profile (Retrieve profile information)
export const viewProfile = async (req, res) => {
    try {
        const tutorId = req.userId;  // User ID from JWT token
        const tutor = await User.findById(tutorId);
        if (!tutor || tutor.role !== 'tutor') {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        // Return the tutor profile data
        return res.status(200).json(tutor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 2. Update Tutor Profile
export const updateProfile = async (req, res) => {
    try {
        const { name, subjects, bio, hourlyRate, location, qualifications, profileImage } = req.body;
        const tutorId = req.userId;  // User ID from JWT token

        // Find tutor by ID
        const tutor = await User.findById(tutorId);
        if (!tutor || tutor.role !== 'tutor') {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        // Update tutor profile
        tutor.name = name || tutor.name;
        tutor.subjects = subjects || tutor.subjects;
        tutor.bio = bio || tutor.bio;
        tutor.hourlyRate = hourlyRate || tutor.hourlyRate;
        tutor.location = location || tutor.location;
        tutor.qualifications = qualifications || tutor.qualifications;
        tutor.profileImage = profileImage || tutor.profileImage;

        // Save updated profile
        await tutor.save();

        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 3. Get Tutor's Session Requests
export const getSessionRequests = async (req, res) => {
    try {
        const tutorId = req.userId;  // User ID from JWT token

        // Find sessions where tutor is the target tutor
        const sessions = await Session.find({ tutorId, status: 'booked' }).populate('studentId', 'name email');

        return res.status(200).json(sessions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 4. Accept or Reject a Session Request
export const manageSessionRequest = async (req, res) => {
    try {
        const { sessionId, action } = req.body;
        const tutorId = req.userId;  // User ID from JWT token

        // Find session by ID
        const session = await Session.findById(sessionId);
        if (!session || session.tutorId.toString() !== tutorId.toString()) {
            return res.status(404).json({ message: 'Session not found or you are not authorized' });
        }

        // Handle the action (accept/reject)
        if (action === 'accept') {
            session.status = 'accepted';
        } else if (action === 'reject') {
            session.status = 'rejected';
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        // Save the updated session
        await session.save();

        return res.status(200).json({ message: `Session ${action}ed successfully` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 5. Track Earnings (Pending & Completed Sessions)
export const trackEarnings = async (req, res) => {
    try {
        const tutorId = req.userId;  // User ID from JWT token

        // Get sessions for this tutor and filter by status
        const completedSessions = await Session.find({ tutorId, status: 'completed' });
        const pendingSessions = await Session.find({ tutorId, status: 'booked' });

        const earnings = completedSessions.reduce((total, session) => total + session.hourlyRate, 0);

        return res.status(200).json({
            earnings,
            completedSessions: completedSessions.length,
            pendingSessions: pendingSessions.length,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 6. Update Tutor's Availability
export const updateAvailability = async (req, res) => {
    try {
        const { availableDays, availableTimes } = req.body;
        const tutorId = req.userId;  // User ID from JWT token

        // Find tutor by ID
        const tutor = await User.findById(tutorId);
        if (!tutor || tutor.role !== 'tutor') {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        // Update tutor availability
        tutor.availability = {
            days: availableDays || tutor.availability?.days,
            times: availableTimes || tutor.availability?.times,
        };

        // Save updated availability
        await tutor.save();

        return res.status(200).json({ message: 'Availability updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
