import { Router } from "express";
import { UserRouter } from "./UserRoutes";
import { taskRouter } from "./TaskRoutes";


const route=Router();

route.use('/user',UserRouter)
route.use('/task',taskRouter)

export {route}