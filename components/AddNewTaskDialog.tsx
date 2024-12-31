"use client";

import React, { FormEvent, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Dot } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { addNewTask } from "@/actions/actions";
import Spinner from "./Spinner";
import { toast } from "sonner";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import { useUserContext } from "@/context/UserContext";

function AddNewTaskDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();

  const { userData } = useUserContext();

  const [lists, setLists] = useState<string[]>([]);

  const [tags, setTags] = useState<{ tag: string; selected: boolean }[]>([]);
  useEffect(() => {
    setLists(userData?.lists || []);

    if (userData?.tags) {
      const tags = userData.tags.map((tag) => ({
        tag,
        selected: false,
      }));
      setTags(tags);
    }
  }, [userData]);

  const [open, setOpen] = useState(false);

  const [taskName, setTaskName] = useState<string>("");

  const [taskDescription, setTaskDescription] = useState<string>("");

  const [list, setList] = useState<string>("");

  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const [subTasksOpen, setSubTasksOpen] = useState<boolean>(false);

  const [subTasks, setSubTasks] = useState<string[]>([]);

  const [subTaskInput, setSubTaskInput] = useState<string>("");

  const [creating, setCreating] = useState<boolean>(false);

  const handleDateChange = (newValue: Dayjs | null) => {
    // Convert Dayjs to Date if a valid date is selected, otherwise set undefined
    setDueDate(newValue ? newValue.toDate() : undefined);
  };

  const handleTagSelection = (currTag: string) => {
    const temp: { tag: string; selected: boolean }[] = [];

    tags.forEach((tag) => {
      if (tag.tag === currTag) {
        temp.push({
          tag: tag.tag,
          selected: !tag.selected,
        });
      } else {
        temp.push(tag);
      }
    });

    setTags(temp);
  };

  const addNewSubTask = () => {
    if (
      subTaskInput !== "" &&
      subTasks.filter((t) => t === subTaskInput).length === 0
    ) {
      setSubTasks((prev) => [...prev, subTaskInput]);
      setSubTaskInput("");
    }
  };

  const handleSubTaskDelete = (currSubTask: string) => {
    const updatedSubTasks = subTasks.filter(
      (subTask) => subTask !== currSubTask
    );

    setSubTasks(updatedSubTasks);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!taskName || !list || !dueDate || !user) {
      console.warn("Missing required fields");
      return;
    }

    interface Task {
      uid: string;
      taskName: string;
      taskDescription?: string;
      list: string;
      dueDate: Date;
      tags?: string[];
      subTasks?: { sTask: string; sStatus: boolean }[];
      status: boolean;
    }

    const task: Task = {
      uid: user?.uid,
      taskName: taskName,
      list: list,
      dueDate: dueDate,
      status: false,
      taskDescription: taskDescription || "",
      tags: tags.filter((tag) => tag.selected).map((tag) => tag.tag),
      subTasks:
        subTasks.length > 0
          ? subTasks.map((task) => ({ sTask: task, sStatus: false }))
          : [],
    };

    if (
      Object.values(task).includes(null) ||
      Object.values(task).includes(undefined)
    ) {
      console.error("Task data is incomplete:", task);
      return;
    }
    try {
      setCreating(true);
      const result = await addNewTask({ task });

      if (result) {
        toast(
          <div>
            <h1 className="text-xl font-serif">New Task has been created</h1>
            <br />
            <h2 className="text-md font-semibold">{taskName}</h2>
            <p>{taskDescription}</p>
            <span className="text-md font-semibold">
              Created At: {format(new Date(), "yyyy-MM-dd HH:mm:ss")}
            </span>
          </div>
        );

        setTaskName("");
        setTaskDescription("");
        setOpen(false);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-full">
      <Dialog
        modal={false}
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      >
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          {children}
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-lg w-full bg-white p-6 rounded-lg shadow-lg"
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing on background click
          onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on Esc
        >
          {creating ? (
            <div className="flex w-full h-full items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Enter the task details below:
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 mt-4 max-h-[75vh] overflow-y-auto"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={taskName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTaskName(e.target.value)
                    }
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Task Description{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={taskDescription}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTaskDescription(e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    List <span className="text-gray-400">(required)</span>
                  </label>
                  <Select
                    value={list}
                    onValueChange={(e) => {
                      setList(e);
                    }}
                    required
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a List" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>List</SelectLabel>
                        {lists &&
                          lists.map((list) => (
                            <SelectItem key={list} value={list}>
                              {list}
                            </SelectItem>
                          ))}
                        {/* <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Hobby">Hobby</SelectItem>
                        <SelectItem value="Something New">
                          Something New
                        </SelectItem>
                        <SelectItem value="Trying">Trying</SelectItem> */}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* Tags */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Tags :
                  </label>
                  <div className="flex gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => handleTagSelection(tag.tag)}
                        className={`${
                          tag.selected
                            ? "bg-teal-500 font-semibold"
                            : "bg-teal-200"
                        } border-2 border-teal-900 rounded p-2`}
                      >
                        {tag.tag}
                      </button>
                    ))}
                  </div>
                </div>
                <button>Add New Tag</button>
                {/* Due Data */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    Due Date :{dueDate !== undefined ? dueDate.getDate() : ""}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-[280px] justify-start text-left font-normal ${
                          !dueDate && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon />
                        {dueDate ? (
                          dayjs(dueDate).format("MMMM D, YYYY") // Improved date formatting
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                      Select Component
                      <Select
                        onValueChange={(value) =>
                          setDueDate(addDays(new Date(), parseInt(value)))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </Select>
                      Date Picker Component
                      <div className="rounded-md border">
                        <DatePicker
                          label="Select a Date"
                          value={dueDate ? dayjs(dueDate) : null} // Convert Date to Dayjs for the picker
                          onChange={handleDateChange} // Handle date change
                          // Use TextField directly instead of renderInput
                          slots={{
                            textField: TextField, // This replaces renderInput
                          }}
                          format="MM/DD/YYYY"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                Sub Tasks
                <div>
                  {subTasks &&
                    subTasks.map((task) => (
                      <div key={task} className="flex flex-row items-center">
                        <Dot />
                        {task}
                      </div>
                    ))}
                </div>
                <Dialog
                  open={subTasksOpen}
                  onOpenChange={(isOpen) => setSubTasksOpen(isOpen)}
                >
                  <DialogTrigger asChild onClick={() => setSubTasksOpen(true)}>
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className="bg-teal-400 hover:bg-teal-700 self-center border-2 border-teal-900 rounded text-lg p-2"
                      >
                        {subTasks.length === 0 ? "Add " : "Edit "}
                        SubTasks
                      </button>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-lg w-full bg-white p-6 rounded-lg shadow-lg"
                    onInteractOutside={(e) => e.preventDefault()} // Prevent closing on background click
                    onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on Esc
                  >
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                      <DialogDescription>
                        Enter the task details below:
                      </DialogDescription>
                    </DialogHeader>

                    {subTasks &&
                      subTasks.map((task) => (
                        <div key={task} className="flex flex-row items-center">
                          <Dot />
                          {task}
                          <button
                            className="ml-auto bg-red-600 text-white p-1 rounded border-black border hover:font-semibold hover:bg-red-700"
                            onClick={() => handleSubTaskDelete(task)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    <div className="flex flex-row gap-2">
                      <input
                        type="text"
                        id="subTask"
                        name="subTask"
                        value={subTaskInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSubTaskInput(e.target.value)
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        className="bg-teal-300 hover:bg-teal-600 border-2 border-teal-900 hover:font-semibold rounded p-2"
                        onClick={addNewSubTask}
                      >
                        Add
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-teal-200 w-full p-4 rounded border border-black hover:bg-teal-500 hover:font-bold font-semibold"
                    type="submit"
                    onClick={() => handleSubmit}
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewTaskDialog;
