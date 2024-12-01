import { Router } from "express";
import {
    // activateUserProfiIe,
    // deleteUserProfi1e,
    registerUser,
    // LogoutUser,
    // getTeam,
    // getNotifications,
    // getProfile,
    // readNotification,
    // changePassword
} from "../controllers/UserController"; // Import the required controller functions
import { protectRoute } from "../middlewares/AuthMiddleware";
import { isAdminRoute } from "../middlewares/AuthMiddleware";
const UserRouter = Router();

// Auth Routes
// UserRouter.post('/login', LoginUser);
UserRouter.post('/register', registerUser);
// UserRouter.post('/logout', LogoutUser);

// // User-related Routes
// UserRouter.get('/get-team', protectRoute, isAdminRoute, getTeam);  // Route for getting team data
// UserRouter.get('/notifications', protectRoute, getNotifications);  // Route for fetching notifications
// UserRouter.get('/profile', protectRoute, getProfile);  // Route for fetching user profile
// UserRouter.post('/read-notification', protectRoute, readNotification);  // Route for marking a notification as read
// UserRouter.post('/change-password', protectRoute, changePassword);  // Route for changing password
// UserRouter.route("/:id")
//     .put(protectRoute, isAdminRoute, activateUserProfiIe)
//     .delete(protectRoute, isAdminRoute, deleteUserProfi1e);
export { UserRouter };
