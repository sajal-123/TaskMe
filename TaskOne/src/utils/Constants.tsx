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
    icon: <FaTasks size={24} />,
  },
  {
    name: "To-Do",
    link: "/todo/todo",
    icon: <MdPendingActions size={24} />,
  },
  {
    name: "In Progress",
    link: "/inprogress/in-progress",
    icon: <MdTask size={24} />,
  },
  {
    name: "Completed",
    link: "/completed/completed",
    icon: <MdCheckCircle size={24} />,
  },

  // Team Section
  {
    name: "Team",
    link: "/team",
    icon: <MdGroup size={24} />,
  },

  // Settings Section
  {
    name: "Settings",
    link: "/settings",
    icon: <MdSettings size={24} />,
  },
  
  // Trash Section
  {
    name: "Trash",
    link: "/trashed",
    icon: <MdDelete size={24} />,
  },
  
];

export default Links;
