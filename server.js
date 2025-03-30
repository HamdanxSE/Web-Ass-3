import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Server/config/db.js'; // ✅ Ensure correct path
import cors from 'cors';
// Import Routes
import authRoutes from './Server/routes/authRoutes.js';
/*import studentRoutes from './Server/routes/studentRoutes.js';
import tutorRoutes from './Server/routes/tutorRoutes.js';
import adminRoutes from './Server/routes/adminRoutes.js';
*/
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json()); // Enable JSON parsing
app.use(express.urlencoded({ extended: true })); // Handle form data
app.use(cors());

// Use CORS middleware with configuration
app.use(cors({
    origin: 'http://localhost:5173', // Frontend React app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    credentials: true, // Enable cookies if needed (for session management or tokens)
  }));

  
// ✅ Register API Routes
app.use('/api/auth', authRoutes);
/*app.use('/api/students', studentRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/admin', adminRoutes);
*/
// Root route (can be used for a basic health check)
app.get('/', (req, res) => {
    res.send(`🚀 Server Running in ${process.env.NODE_ENV} mode on Port ${process.env.PORT || 5000}`);
});

// Define the port from the environment or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
