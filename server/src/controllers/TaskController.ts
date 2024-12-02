import { Request, Response } from "express";
import Notice from "../models/NotificationModel.js";
import Task, { IActivity } from "../models/TaskModel.js";
import User from "../models/UserModel";

// Interfaces for request bodies and activity
interface UserRequest extends Request {
    user?: { userId: string; isAdmin: boolean };
}

interface TaskBody {
    title: string;
    team: string[];
    stage: string;
    date: string;
    priority: string;
    assets?: any[];
}

interface Activity {
    type: string;
    activity: IActivity;
    by: string;
}

// Create a Task
export const createTask = async (req: UserRequest, res: Response) => {
    try {
        const { userId } = req.user!;
        const { title, team, stage, date, priority, assets } = req.body as TaskBody;

        const task = await Task.create({
            title,
            team,
            stage: stage.toLowerCase(),
            date,
            priority: priority.toLowerCase(),
            assets,
        });

        let text = "New task has been assigned to you";
        if (team?.length > 1) {
            text += ` and ${team.length - 1} others.`;
        }

        text += ` The task priority is set to ${priority} priority. The task date is ${new Date(date).toDateString()}. Thank you!`;



        await Notice.create({ team, text, task: task._id });

        res.status(200).json({ status: true, task, message: "Task created successfully." });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ status: false, message: error.message });
    }
};

// Duplicate a Task
export const duplicateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            throw new Error("Task not found");
        }

        const newTask = await Task.create({
            ...task.toObject(),
            title: task.title + " - Duplicate",
        });
        newTask.team = task.team;
        newTask.subTasks = task.subTasks;
        newTask.assets = task.assets;
        newTask.priority = task.priority;
        newTask.stage = task.stage;

        await newTask.save();

        let text = "New task has been assigned to you";
        if (task.team.length > 1) {
            text += ` and ${task.team.length - 1} others.`;
        }
        text += ` The task priority is set to ${task.priority} priority. The task date is ${new Date(task.date).toDateString()}. Thank you!`;

        await Notice.create({ team: task.team, text, task: newTask._id });

        res.status(200).json({ status: true, message: "Task duplicated successfully." });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ status: false, message: error.message });
    }
};

// Post Task Activity
export const postTaskActivity = async (req: UserRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.user!;
        const { type, activity } = req.body as Activity;

        const task = await Task.findById(id);
        if (!task) {
            throw new Error("Task not found");
        }

        const data = { type, activity, by: userId }

        task.activities.push(data);
        task.save();

        res.status(200).json({ status: true, message: "Activity posted successfully." });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ status: false, message: error.message });
    }
};

// get Dashboard Statistics
export const dashboardStatistics = async (req: UserRequest, res: Response) => {
    try {
        const { userId, isAdmin } = req.user!;

        const tasks = isAdmin ? await Task.find({ isTrashed: false }).populate({
            path: "team",
            select: "name role title email",
        }).sort({ _id: -1 }) : await Task.find({ team: { $all: [userId] }, isTrashed: false }).populate({
            path: "team",
            select: "name role title email",
        }).sort({ _id: -1 });

        const users = await User.find({ isActive: true }).select("name role title email").limit(10).sort({ _id: -1 });


        //    Grup Task By Stage and calculate counts

        const groupTask = tasks.reduce((result: any, task: any) => {
            const stage = task.stage;
            result[stage] = result[stage] ? result[stage] + 1 : 1;
            return result;
        }, {});

        const groupData = Object.entries(
            tasks.reduce((result: any, task) => {
                const { priority } = task;

                result[priority] = (result[priority] || 0) + 1;
                return result;
            }, {})
        ).map(([name, total]) => ({ name, total }));

        // calculate total tasks
        const totalTasks = tasks?.length;
        const last10Task = tasks?.slice(0, 10);

        const summary = {
            totalTasks,
            last10Task,
            users: isAdmin ? users : [],
            tasks: groupTask,
            graphData: groupData,
        };

        res.status(200).json({
            status: true,
            message: "Successfully",
            ...summary,
        });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message });
    }
};


// Get Tasks
export const getTasks = async (req: Request, res: Response) => {
    try {
        const { stage, isTrashed } = req.query;

        let query: any = { isTrashed: isTrashed ? true : false };
        if (stage) {
            query.stage = stage;
        }

        const tasks = await Task.find(query)
            .populate({ path: "team", select: "name title email" })
            .sort({ _id: -1 });

        res.status(200).json({ status: true, tasks });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message });
    }
};

// Get Single Task
export const getTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id)
            .populate({ path: "team", select: "name title role email" })
            .populate({ path: "activities.by", select: "name" });

        res.status(200).json({ status: true, task });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message });
    }
};

// Create SubTask
export const createSubTask = async (req: Request, res: Response) => {
    try {
        const { title, tag, date } = req.body;
        const { id } = req.params;

        const newSubTask = { title, date, tag };

        const task = await Task.findById(id);
        if (task) {
            task.subTasks.push(newSubTask);
            await task.save();
        }
        res.status(200).json({ status: true, message: "SubTask added successfully." });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message });
    }
};

// Update Task
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, date, team, stage, priority, assets } = req.body;

        const task = await Task.findById(id);
        if (task) {
            task.title = title;
            task.date = date;
            task.priority = priority.toLowerCase();
            task.assets = assets;
            task.stage = stage.toLowerCase();
            task.team = team;
            await task.save();
        }
        res.status(200).json({ status: true, message: "Task updated successfully." });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message });
    }
};

// Trash Task
export const trashTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (task) {
            task.isTrashed = true;
            await task.save();
        }

        res.status(200).json({ status: true, message: `Task trashed successfully.` });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message });
    }
};

// Delete or Restore Task
export const deleteRestoreTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if (actionType === "delete") {
            await Task.findByIdAndDelete(id);
        } else if (actionType === "deleteall") {
            await Task.deleteMany({ isTrashed: true });
        } else if (actionType === "restore") {
            const resp = await Task.findById(id);
            if (resp) {
                resp.isTrashed = false;
                await resp.save();
            }
        } else if (actionType === "restoreall") {
            await Task.updateMany({ isTrashed: true }, { $set: { isTrashed: false } });
        }

        res.status(200).json({ status: true, message: "Operation Performed Successfully." });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ status: false, message: error.message });
    }
};
