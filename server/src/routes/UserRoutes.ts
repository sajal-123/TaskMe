import { Router } from "express";
import {
    activateUserProfile,
    deleteUserProfile,
    registerUser,
    logoutUser,
    loginUser,
    getTeamList,
    getNotificationsList,
    UpdateUserProfile,
    markNotification,
    changePassword
} from "../controllers/UserController"; // Import the required controller functions
import { protectRoute } from "../middlewares/AuthMiddleware";
import { isAdminRoute } from "../middlewares/AuthMiddleware";
const UserRouter = Router();

// Auth Routes
UserRouter.post('/login', loginUser);
UserRouter.post('/register', registerUser);
UserRouter.get('/logout', logoutUser);

// // User-related Routes
UserRouter.get('/get-team', protectRoute, isAdminRoute, getTeamList);  // Route for getting team data
UserRouter.get('/notifications', protectRoute, getNotificationsList);  // Route for fetching notifications
UserRouter.get('/profile', protectRoute, UpdateUserProfile);  // Route for fetching user profile
UserRouter.post('/read-notification', protectRoute, markNotification);  // Route for marking a notification as read
UserRouter.post('/change-password', protectRoute, changePassword);  // Route for changing password
UserRouter.route("/:id")
    .put(protectRoute, isAdminRoute, activateUserProfile)
    .delete(protectRoute, isAdminRoute, deleteUserProfile);
export { UserRouter };
