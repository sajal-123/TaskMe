import clsx from 'clsx';
import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md'
import { TASK_TYPES, PROTOTYPES, BGS } from '../utils/index';
import moment from 'moment';
import UserInfo from './UserInfo';
import { Task, TeamMember } from '../utils/Constants';

const ICONS: { [key: string]: JSX.Element } = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
}

const TableHeader = () => {
  return (
      <thead className="bg-gray-200 rounded-lg overflow-hidden">
        <tr>
          <th className="border text-start pl-4 border-gray-300 p-2">Title</th>
          <th className="border text-start border-gray-300 p-2">Priority</th>
          <th className="border text-start border-gray-300 p-2">Team</th>
          <th className="border text-start border-gray-300 hidden md:block p-2">Created At</th>
        </tr>
      </thead>

  );
};
const TableRow = ({ task }: { task: Task }) => (
  <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
    <td className='py-2'>
      <div className='flex items-center gap-2'>
        <div
          className={clsx("w-4 h-4 rounded-full", TASK_TYPES[task.stage])}
        />

        <p className='text-base text-black'>{task.title}</p>
      </div>
    </td>

    <td className='py-2'>
      <div className='flex gap-1 items-center'>
        <span className={clsx("text-lg", PROTOTYPES[task.priority])}>
          {ICONS[task.priority]}
        </span>
        <span className='capitalize'>{task.priority}</span>
      </div>
    </td>

    <td className='py-2'>
      <div className='flex'>
        {task.team.map((user: TeamMember, index: number) => (
          <div
            key={index}
            className={clsx(
              "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
              BGS[index % BGS.length]
            )}
          >
            <UserInfo user={user} />
          </div>
        ))}
      </div>
    </td>
    <td className='py-2 hidden md:block'>
      <span className='text-base text-gray-600'>
        {moment(task?.date).fromNow()}
      </span>
    </td>
  </tr>
);

function TaskTable(tasks: any) {

  return (
    <div className='w-full col-span-2 p-4 rounded-lg bg-white'>
      <table className='w-full rounded-lg'>
        <TableHeader />
        <tbody>
          {tasks.tasks.map((task: any) => (
            <TableRow task={task} key={task._id} />
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default TaskTable
