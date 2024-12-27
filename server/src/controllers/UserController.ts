import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel';
import { createJWT } from '../utils/CreateJWT';
import { CatchAsyncError } from '../middlewares/CatchAsyncError';
import Notice from '../models/NotificationModel';


export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name, role, title, isAdmin } = req.body;

    try {
        console.log("Request body:", req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'User already exists' });
        }

        // Create a new user object
        const newUser = new User({
            email,
            password, // Consider hashing before saving (currently commented)
            name,
            role,
            title,
            isActive: true,  // Default value for `isActive`
            tasks: [],       // Empty tasks array for later population
            isAdmin,         // Is admin flag (boolean)
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = createJWT(res, newUser._id as string);

        // Send back the response
        return res.status(201).json({
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
        console.error("Error while registering the user:", error instanceof Error ? error.message : error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
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

export const getNotificationsList = CatchAsyncError(async (req: any, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user; // Destructure userId from req.user
        const notice = await Notice.find({
            team: userId,
            isRead: { $nin: [userId] }, // Exclude notices already read by the user
        }).populate("task", "title"); // Populate the task field with its title

        res.status(201).json(notice); // Respond with the notice data
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message, // Send the error message in the response
        });
    }

});

export const UpdateUserProfile = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, isAdmin } = req.body.user;
            const { _id } = req.body.user;

            // Determine the ID to update based on admin permissions
            const id = isAdmin && userId === _id ? userId : isAdmin && userId !== _id ? _id : userId;

            // Fetch the user by ID
            const user = await User.findById(id); // Ensure `await` is used for asynchronous calls

            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            // Update user details
            user.name = req.body.name || user.name;
            user.title = req.body.title || user.title;
            user.role = req.body.role || user.role;

            // Save updated user to the database
            const updatedUser = await user.save();

            // Respond with updated user data
            res.status(200).json({
                status: true,
                message: "User profile updated successfully",
                user: updatedUser,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    }
);

export const markNotification = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.body.user?.userId; // Ensure `req.user` is properly set by upstream middleware

            if (!userId) {
                return res.status(401).json({ status: false, message: "Unauthorized access" });
            }

            const { isReadType, id } = req.query;

            // Validate `isReadType` and `id` as needed
            if (!isReadType) {
                return res.status(400).json({ status: false, message: "isReadType is required" });
            }

            if (isReadType === "all") {
                // Mark all notifications for the user as read
                await Notice.updateMany(
                    { team: userId, isRead: { $nin: [userId] } }, // Filter for unread notifications
                    { $push: { isRead: userId } } // Add userId to the isRead array
                );
            } else if (id) {
                // Mark a single notification as read
                const notification = await Notice.findOneAndUpdate(
                    { _id: id, isRead: { $nin: [userId] } }, // Filter for unread notification with the given ID
                    { $push: { isRead: userId } }, // Add userId to the isRead array
                    { new: true } // Return the updated document
                );

                if (!notification) {
                    return res.status(404).json({ status: false, message: "Notification not found or already marked as read" });
                }
            } else {
                return res.status(400).json({ status: false, message: "Notification ID is required for single mark" });
            }

            res.status(200).json({ status: true, message: "Notification(s) marked as read successfully" });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ status: false, message: error.message });
        }
    }
);

export const changePassword = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.body.user; // Ensure middleware sets `req.user`
            const { currentPassword, newPassword } = req.body;

            // Validate input
            if (!currentPassword || !newPassword) {
                return res.status(400).json({ status: false, message: "Both current and new passwords are required" });
            }

            // Fetch the user from the database
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            // Verify the current password
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ status: false, message: "Current password is incorrect" });
            }

            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Update the user's password
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ status: true, message: "Password changed successfully" });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ status: false, message: error.message });
        }
    }
);

export const activateUserProfile = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            // Find user by ID
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            // Toggle activation status
            user.isActive = !user.isActive;
            const updatedUser = await user.save();

            res.status(200).json({
                status: true,
                message: `User profile ${user.isActive ? "activated" : "deactivated"} successfully`,
                user: updatedUser,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ status: false, message: error.message });
        }
    }
);
export const deleteUserProfile = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            // Find and delete user by ID
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            res.status(200).json({
                status: true,
                message: "User profile deleted successfully",
                user,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ status: false, message: error.message });
        }
    }
);


