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
        const token = createJWT(res,newUser._id as string);


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