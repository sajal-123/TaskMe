import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";// Corrected the import statement

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.cookies.token; // Access token from cookies
        if (token) {
            // Verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

            // Fetch user data using the decoded userId
            const user = await User.findById(decodedToken.userId).select("isAdmin email");
            if (user) {
                req.user = {
                    email: user.email,
                    isAdmin: user.isAdmin,
                    userId: decodedToken.userId,
                };
                next(); // Proceed to the next middleware or route handler
            } else {
                res.status(401).json({ message: "User not found" });
            }
        } else {
            res.status(401).json({ message: "No token provided" });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Middleware to check if the user is an admin
const isAdminRoute = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next(); // Proceed to the next middleware or route handler
    } else {
        return res.status(401).json({
            status: false,
            message: "Not authorized as admin. Try logging in as an admin.",
        });
    }
};

export { isAdminRoute };

export { protectRoute };
