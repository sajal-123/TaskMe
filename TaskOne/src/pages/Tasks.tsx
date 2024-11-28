import React from 'react'
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { MdGridView } from 'react-icons/md';
import { FaList } from 'react-icons/fa';
import Tabs from '../components/Tabs';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import { tasks } from '../assets/data';
import Table from '../components/task/Table';
import AddTask from '../components/task/AddTask';

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};


function Tasks() {
  const [loading, setLoading] = React.useState(false)
  const [selected, setSelected] = React.useState(0)
  const [open, setOpen] = React.useState(false);
  const params = useParams();

  const status = params?.status || ''

  return (
    <>
      {loading ?
        <Loader />
        :
        <div className='w-full'>
          <div className="flex justify-between p-4 items-start">
            <Title title={status ? `${status} Tasks` : "Tasks"} />
            <Button
              onClick={() => setOpen(true)}
              label='Create Task'
              icon={<IoMdAdd className='text-lg' />}
              className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
            />
          </div>
          <div className='w-full '>
            <Tabs tabs={TABS} setSelected={setSelected}>
              {
                !status && (
                  <div className='flex items-center justify-between gap-4 md:gap-x-12 py-4'>
                    <TaskTitle label="To Do" className={TASK_TYPE.todo} />
                    <TaskTitle label="in-progress" className={TASK_TYPE["in progress"]} />
                    <TaskTitle label="completed" className={TASK_TYPE.completed} />
                  </div>
                )
              }
              {
                selected == 0 ? <BoardView tasks={tasks} /> : <div>
                  <Table tasks={tasks} />
                </div>
              }

            </Tabs>
            <AddTask open={open} setOpen={setOpen} />
          </div>
        </div>
      }
    </>
  )
}

export default Tasks
