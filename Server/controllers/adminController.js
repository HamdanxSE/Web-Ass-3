import User from '../models/userModel.js';
import VerificationRequest from '../models/verificationModel.js';
import Report from '../models/reportModel.js';

// 1. Approve Tutor Verification
const approveTutorVerification = async (req, res) => {
    try {
        const { tutorId } = req.params;

        // Find the verification request
        const verificationRequest = await VerificationRequest.findOne({ tutor: tutorId, status: 'pending' });

        if (!verificationRequest) {
            return res.status(404).json({ message: 'Verification request not found' });
        }

        // Approve the tutor's verification
        verificationRequest.status = 'approved';
        await verificationRequest.save();

        // Update the tutor's role to 'tutor' in the User model
        await User.findByIdAndUpdate(tutorId, { role: 'tutor' });

        return res.status(200).json({ message: 'Tutor verified successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// 2. Reject Tutor Verification
const rejectTutorVerification = async (req, res) => {
    try {
        const { tutorId } = req.params;

        // Find the verification request
        const verificationRequest = await VerificationRequest.findOne({ tutor: tutorId, status: 'pending' });

        if (!verificationRequest) {
            return res.status(404).json({ message: 'Verification request not found' });
        }

        // Reject the tutor's verification
        verificationRequest.status = 'rejected';
        await verificationRequest.save();

        return res.status(200).json({ message: 'Tutor verification rejected' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// 3. Generate Reports
const generateReports = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required' });
        }

        // Fetch report data (can be customized further)
        const reports = await Report.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        });

        return res.status(200).json({ reports });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// 4. Get Tutor Verification Requests
const getTutorVerificationRequests = async (req, res) => {
    try {
        const verificationRequests = await VerificationRequest.find({ status: 'pending' })
            .populate('tutor', 'name email role qualifications bio');

        return res.status(200).json({ verificationRequests });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export { approveTutorVerification, rejectTutorVerification, generateReports, getTutorVerificationRequests };

// ==============================================
// AdminController Summary
// ==============================================
//
// 1. `approveTutorVerification`:
// - **Purpose**: Approves a tutor's verification request, updating the status and user role.
// - **Fields Used**: tutorId (req.body)
// - **Usage**: Admin approves tutor verification, promoting them to a tutor role.
//
// 2. `rejectTutorVerification`:
// - **Purpose**: Rejects a tutor's verification request, updating the status to 'rejected'.
// - **Fields Used**: tutorId (req.body)
// - **Usage**: Admin rejects the tutor's verification request.
//
// 3. `generateReports`:
// - **Purpose**: Generates reports based on a date range provided by the admin.
// - **Fields Used**: startDate, endDate (req.query)
// - **Usage**: Admin can generate reports for specific time periods, like popular subjects, session rates, etc.
//
// 4. `getTutorVerificationRequests`:
// - **Purpose**: Retrieves a list of all pending tutor verification requests for admin review.
// - **Fields Used**: None (all pending verification requests)
// - **Usage**: Admin can view pending tutor verifications to approve or reject them.
//
