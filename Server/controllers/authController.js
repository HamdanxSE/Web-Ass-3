// Handles registration, login, logout, and session management (authentication).
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js'; // ✅ Fixed path

dotenv.config(); // Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// ==============================================
// AuthController - Handles Authentication
// ==============================================

// 1. User Registration (Sign Up)
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 2. User Login
// 2. User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Return user information including role and the token
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role, // Include role here
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// 3. Check if Email Exists (For Signup Validation)
const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        return res.json({ exists: !!existingUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// 4. Get Current User (Authenticated User)
const getCurrentUser = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ Use named exports for ES Modules
export { registerUser, loginUser, checkEmail, getCurrentUser };

// ==============================================
// AuthController Summary
// ==============================================
//
// 1. registerUser:
// - **Purpose**: Handles user registration, including email uniqueness check, password hashing, and user creation.
// - **Fields Used**: name, email, password, role (req.body)
// - **Usage**: Registers a new user and stores them in the database after hashing their password.
//
// 2. loginUser:
// - **Purpose**: Handles user login, including credential validation and token generation.
// - **Fields Used**: email, password (req.body)
// - **Usage**: Authenticates the user by checking email and password, and generates a JWT token for session management.
//
// 3. checkEmail:
// - **Purpose**: Checks if an email already exists in the database.
// - **Fields Used**: email (req.body)
// - **Usage**: Returns { exists: true/false } to prevent duplicate signups.
//
// 4. getCurrentUser:
// - **Purpose**: Fetches the current authenticated user's details.
// - **Fields Used**: userId (from JWT token)
// - **Usage**: Provides the logged-in user's name, email, and role, used in authenticated routes.
