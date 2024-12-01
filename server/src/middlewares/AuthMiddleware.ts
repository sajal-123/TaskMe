import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel"; // Corrected import statement

const protectRoute = async (req: any, res: Response, next: NextFunction) => {
    try {
        let token = req.cookies.token; // Access token from cookies
        if (token) {
            // Verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

            // Fetch user data using the decoded userId
            const user = await User.findById(decodedToken.userId).select("isAdmin email");
            if (user && user.email && req) {
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


const isAdminRoute = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    if (req.user && req.user.isAdmin) {
        return next();  // Proceed to next middleware or handler
    } else {
        return res.status(403).json({ message: 'Permission denied.' });
    }
};

export { protectRoute, isAdminRoute };
