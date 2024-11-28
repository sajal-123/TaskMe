import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import { UserType } from "../utils/Constants";
import ConfirmationDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<UserType | null>(null);
  const [openAction, setOpenAction] = useState<boolean>(false);
  const userActionHandler = () => { };
  const deleteHandler = () => { };

  const deleteClick = (id: string) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (user: UserType) => {
    setSelected(user);
    setOpen(true);
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-center">
        <th className="py-2">Full Name</th>
        <th className="py-2">Title</th>
        <th className="py-2">Email</th>
        <th className="py-2">Role</th>
        <th className="py-2">Active</th>
        <th className="py-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }: { user: UserType }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
            <span className="text-xs md:text-sm text-center">
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>
      <td className="p-2">{user.title}</td>
      <td className="p-2">{user?.email || "Email not provided"}</td>
      <td className="p-2">{user.role}</td>
      <td>
        <button
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user.isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td className="p-2 flex gap-4 justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
          label="Edit"
          type="button"
          onClick={() => editClick(user)}
        />
        <Button
          className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
          label="Delete"
          type="button"
          onClick={() => deleteClick(user._id)}
        />
      </td>
    </tr>
  );

  return (
    <div className="w-full md:px-1 px-0 mb-6">
      <div className="w-full flex justify-between items-center mb-8">
        <Title title="Team Members" />
        <Button
          onClick={() => setOpen(true)}
          label="Add new user"
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
        />
      </div>
      {summary && summary.users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg px-2 border-collapse">
            <TableHeader />
            <tbody>
              {summary.users.map((user) => (
                <TableRow key={user._id} user={user} />
              ))}
            </tbody>
          </table>
          <AddUser
            open={open}
            setOpen={setOpen}
            userData={selected}
            key={new Date().getTime().toString()}
          />

          <ConfirmationDialog
            open={openDialog}
            setOpen={setOpenDialog}
            onClick={deleteHandler}
          />

          <UserAction
            open={openAction}
            setOpen={setOpenAction}
            onClick={userActionHandler}
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center">No users found.</p>
      )}
    </div>
  );
};

export default Users;
