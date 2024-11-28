import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog, DialogTitle } from "@headlessui/react";
import Textbox from "../TextBox";
import { useForm, FieldErrors } from "react-hook-form";
// import UserList from "./UserList";
// import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import UserList from "./UserList";
import SelectList from "../SelectList";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"] as const;
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"] as const;

// Define prop types
interface AddTaskProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Define the form data shape
interface FormData {
  title: string;
  date: string;
}

const AddTask: React.FC<AddTaskProps> = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [team, setTeam] = useState<string[]>([]);
  const [stage, setStage] = useState<(typeof LISTS)[0]>(LISTS[0]);
  const [priority, setPriority] = useState<(typeof PRIORITY)[0]>(PRIORITY[2]);
  const [assets, setAssets] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const submitHandler = (data: FormData) => {
    console.log("Submitted Data:", { ...data, team, stage, priority, assets });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAssets(Array.from(e.target.files));
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            ADD TASK
          </DialogTitle>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Task Title"
              type="text"
              name="title"
              label="Task Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title?.message || ""}
            />
            <UserList setTeam={setTeam} team={team} />

            <div className="flex gap-4">
              <SelectList
                label="Task Stage"
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-full rounded"
                register={register("date", { required: "Date is required" })}
                error={errors.date?.message || ""}
              />
            </div>

            <div className="flex gap-4">
              <SelectList
                label="Priority Level"
                lists={PRIORITY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className="w-full flex items-center justify-center mt-4">
                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                  htmlFor="imgUpload"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="imgUpload"
                    onChange={handleSelect}
                    accept=".jpg, .png, .jpeg"
                    multiple
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              {uploading ? (
                <span className="text-sm py-2 text-red-500">
                  Uploading assets...
                </span>
              ) : (
                <Button
                  label="Submit"
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                />
              )}

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
