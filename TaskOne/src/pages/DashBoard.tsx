import React from 'react';
import { MdDone, MdTask } from 'react-icons/md';
import { summary } from '../assets/data';
import { FaArrowsToDot } from 'react-icons/fa6';
import { LuClipboardEdit } from 'react-icons/lu';
import clsx from 'clsx';
import Charts from '../components/Charts';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import TaskTable from '../components/TaskTable';
import UserTable from '../components/UserTable';

// Define types for stat items
interface Stat {
  _id: string;
  label: string;
  total: number;
  icon: JSX.Element;
  bg: string;
}

// Mock data for stats
const stats: Stat[] = [
  {
    _id: "1",
    label: "Total Tasks",
    total: summary?.totalTasks || 0, // Assuming `totalTasks` has a `total` property
    icon: <MdTask size={24} />,
    bg: 'bg-[#3b82f6]',
  },
  {
    _id: "2",
    label: "Completed Tasks",
    total: summary?.tasks['completed'] || 0, // Assuming `completed` is a key in `totalTasks`
    icon: <MdDone size={24} />,
    bg: 'bg-[#16a34a]',
  },
  {
    _id: "3",
    label: "Pending Tasks",
    total: summary?.tasks['todo'] || 0, // Assuming `pending` is a key in `totalTasks`
    icon: <LuClipboardEdit size={24} />,
    bg: 'bg-[#f59e0b]',
  },
  {
    _id: "4",
    label: "Overdue Tasks",
    total: summary?.tasks['in progress'] || 0, // Assuming `overdue` is a key in `totalTasks`
    icon: <FaArrowsToDot size={24} />,
    bg: 'bg-[#ef4444]',
  },
];

// Card Component Props
interface CardProps {
  label: string;
  total: number;
  icon: JSX.Element;
  bg: string;
}

// Card Component
const Card: React.FC<CardProps> = ({ label, total, icon, bg }) => {
  return (
    <div className='p-4 h-28 w-full rounded-lg shadow-md bg-white'>
      {/* Card Content */}
      <div className="flex items-center justify-between">
        {/* Label and Total */}
        <div className="flex flex-col justify-between items-start mb-2">
          <p className="text-base text-gray-600 font-medium">{label}</p>
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-sm text-gray-400">{"110 gray "}</p>
        </div>
        {/* Icon */}
        <div className={clsx("flex items-center gap-2 rounded-full h-10 w-10 items-center justify-center", bg)}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// DashBoard Component
const DashBoard: React.FC = () => {
  return (
    <div className='w-full min-h-screen p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {stats.map((stat) => (
          <Card
            key={stat._id}
            label={stat.label}
            total={stat.total}
            icon={stat.icon}
            bg={stat.bg}
          />
        ))}
      </div>
      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>
          Chart by Priority
        </h4>
        <Charts />
      </div>
      <div className='w-full grid md:grid-cols-3 gap-4 grid-cols-1'>
        {/* /left */}

        <TaskTable tasks={summary.last10Task} />

        {/* /right */}
        <UserTable users={summary.users} />

        {/* <UserTable users={summary.users} /> */}

      </div>
    </div>
  );
};

export default DashBoard;
