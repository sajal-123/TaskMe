import { Router } from "express";
import { isAdminRoute, protectRoute } from "../middlewares/AuthMiddleware";
import { createTask, postTaskActivity, duplicateTask, dashboardStatistics, getTasks, getTask, createSubTask, updateTask, trashTask, deleteRestoreTask } from '../controllers/TaskController'

const taskRouter = Router();


// Post Routes
taskRouter.post('/create', protectRoute, isAdminRoute, createTask);
taskRouter.post('/duplicate/:id', protectRoute, isAdminRoute, duplicateTask);
taskRouter.post('/activity/:id', protectRoute, postTaskActivity);

// Get Routes
taskRouter.get('/dashboard', protectRoute, dashboardStatistics);
taskRouter.get('/', protectRoute, getTasks);
taskRouter.get('/:id', protectRoute, getTask);


// Put Routes
taskRouter.put('/create-subtasks/:id', protectRoute, isAdminRoute, createSubTask);
taskRouter.put('/update/:id', protectRoute, isAdminRoute, updateTask);
taskRouter.put('/:id', protectRoute, isAdminRoute, trashTask);


taskRouter.delete('/delete-restore/:id?', protectRoute, isAdminRoute, deleteRestoreTask);

export { taskRouter }