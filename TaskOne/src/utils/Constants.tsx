import {
  MdDashboard,
  MdSettings,
  MdTask,
  MdDelete,
  MdGroup,
  MdCheckCircle,
  MdPendingActions
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";
// Define a type for the Links array items
interface LinkItem {
  name: string;
  link: string;
  icon: JSX.Element;
}

// Define the Links array with the LinkItem type
const Links: LinkItem[] = [
  // Dashboard Section
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard size={24} />,
  },

  // Tasks Section
  {
    name: "Tasks",
    link: "/tasks",
    icon: <FaTasks className="text-indigo-600" size={24} />,
  },
  {
    name: "To-Do",
    link: "/todo/todo",
    icon: <MdPendingActions size={24} className=" text-amber-950" />,
  },
  {
    name: "In Progress",
    link: "/inprogress/in-progress",
    icon: <MdTask size={24} className="text-yellow-500" />,
  },
  {
    name: "Completed",
    link: "/completed/completed",
    icon: <MdCheckCircle size={24} className="text-green-600" />,
  },

  // Team Section
  {
    name: "Team",
    link: "/team",
    icon: <MdGroup size={24} className=" text-blue-500" />,
  },

  // Settings Section
  {
    name: "Settings",
    link: "/settings",
    icon: <MdSettings size={24} className=" text-gray-600" />,
  },

  // Trash Section
  {
    name: "Trash",
    link: "/trashed",
    icon: <MdDelete size={24} className="text-red-500" />,
  },

];


export interface Task {
  _id: string;
  title: string;
  date: string; // ISO date string for task date
  priority: "low" | "medium" | "high"; // Enum for priority levels
  stage: "todo" | "in-progress" | "done"; // Enum for task stages
  assets: string[]; // Array of asset URLs
  team: TeamMember[]; // Array of team members
  isTrashed: boolean; // Indicates if the task is trashed
  activities: Activity[]; // Array of activities
  subTasks: SubTask[]; // Array of subtasks
  createdAt: string; // ISO date string for creation date
  updatedAt: string; // ISO date string for update date
  __v: number; // Version number
}

export interface TeamMember {
  _id: string;
  name: string;
  title: string; // Title/role in the team
  role: "Admin" | "Manager" | "Designer" | string; // Enum for roles, extensible
  email: string;
}

export interface SubTask {
  _id: string;
  title: string;
  date: string; // ISO date string for subtask date
  tag: string; // Tag associated with the subtask
}

export interface Activity {
  // Define properties as needed for activities
  [key: string]: any;
}

export interface TeamMember {
  _id: string; // Unique identifier for the team member
  name: string; // Name of the team member
  title: string; // Job title
  role: "Admin" | "Manager" | "Designer" | string; // Role in the team, extensible
  email: string; // Email address
}
export interface UserType {
  _id: string; // Unique identifier for the team member
  name: string; // Name of the team member
  title: string; // Job title
  role: "Admin" | "Manager" | "Designer" | string; // Role in the team, extensible
  isActive: boolean,
  createdAt: string,
}


export default Links;
