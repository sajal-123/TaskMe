import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { createJWT } from '../utils/CreateJWT';
import { CatchAsyncError } from '../middlewares/CatchAsyncError';


export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name, role, title, isAdmin } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'User already exists' });
        }

        // Hash the password before saving it
        //   const salt = await bcrypt.genSalt(10);
        //   const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            email,
            password: password,
            name,
            role,
            title,
            isActive: true,  // Default value for `isActive`
            tasks: [], // Empty tasks array for later population
            isAdmin, // Is admin flag (boolean)
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token using the createJwt function
        const token = createJWT(res, newUser._id as string);


        // Send back the response with token and user info
        res.status(201).json({
            status: true,
            message: 'User registered successfully',
            token,
            user: {
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                title: newUser.title,
                isAdmin: newUser.isAdmin,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' });
        }

        if (!user.isActive) {
            return res.status(401).json({
                status: false,
                message: "User account has been deactivated, contact the administrator",
            })
        }

        // Compare the provided password with the stored password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' });
        }

        // Generate JWT token using the createJwt function
        const token = createJWT(res, user._id as string);

        // Send back the response with token and user info
        res.status(200).json({
            status: true,
            message: 'Login successful',
            token,
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
                title: user.title,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
});


export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Clear the token cookie by setting it to an empty value and expiration date to 0
        res.cookie("token", "", {
            httpOnly: true, // Prevent JavaScript access to the cookie
            // secure: process.env.NODE_ENV === 'production', // Ensure the cookie is only sent over HTTPS in production
            sameSite: "strict", // Cookie will only be sent in a first-party context
            expires: new Date(0) // Set expiration date to the past to remove the cookie
        });

        // Send success response
        res.status(200).json({ status: true, message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export const getTeamList = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const users = await User.find().select("name title role email isActive");

        res.status(201).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export const getNotifications = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const users = await User.find().select("name title role email isActive");

        res.status(201).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
});
