// Defines the schema for report data (sessions, usage, growth, etc.).

import mongoose from 'mongoose';


// Define the schema for the Report model
const reportSchema = new mongoose.Schema({
    reportType: {
        type: String,
        enum: ['sessionCompletion', 'userGrowth', 'platformUsage', 'subjectPopularity'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,  // Will hold various data depending on the report type
        required: true,
    },
    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,  // References the admin who generated the report
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Define pre-save middleware to update `updatedAt` field
reportSchema.pre('save', function(next) {
    this.updatedAt = Date.now();  // Automatically set updatedAt to current time whenever the report is modified
    next();
});

// Create the Report model based on the schema
const Report = mongoose.model('Report', reportSchema);

// Export the Report model
export default Report;
;


/**
 * Report Model
 * 
 * This model represents the platform's reports which track various metrics.
 * Reports include details such as session completion rates, platform usage, 
 * user growth, and subject popularity. Reports are created by admins for 
 * various purposes, such as analysis, growth tracking, and decision making.
 * 
 * Fields:
 * - `reportType`: Specifies the type of report (e.g., session completion, user growth).
 * - `startDate`: The start date for the report period.
 * - `endDate`: The end date for the report period.
 * - `data`: A mixed data field to store dynamic content based on report type.
 * - `generatedBy`: References the admin who generated the report.
 * - `createdAt`: Automatically set to the current date/time when the report is created.
 * - `updatedAt`: Automatically updated to the current date/time when the report is modified.
 * 
 * The `data` field will contain different kinds of information based on 
 * the `reportType`. For instance, user growth data could contain a list 
 * of new users within a specified time range, while session completion 
 * data could contain session counts.
 * 
 * This model ensures that reports are easily generated, tracked, and 
 * updated by admins, providing insights into platform performance and usage.
 */
