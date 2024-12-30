"use client";

import React, { useState } from "react";

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
  } from "@/components/ui/select"

function AddNewTaskDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  const [taskName, setTaskName] = useState<string>("");

  const [taskDescription, setTaskDescription] = useState<string>("");

  const [list,setList]=useState<string>("");

  const handleSubmit = () => {};

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          {children}
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-lg w-full bg-white p-6 rounded-lg shadow-lg"
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing on background click
          onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on Esc
        >
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Enter the task details below:</DialogDescription>
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
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTaskName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>




            <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Task Description <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={taskDescription}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTaskDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>




            <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              List <span className="text-gray-400">(required)</span>
            </label>
            <Select value={list} onValueChange={(e)=>{setList(e)}} required>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>List</SelectLabel>
          <SelectItem value="apple">Personal</SelectItem>
          <SelectItem value="banana">Work</SelectItem>
          <SelectItem value="blueberry">Hobby</SelectItem>
          <SelectItem value="grapes">Something New</SelectItem>
          <SelectItem value="pineapple">Trying</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>


{/* Due Data */}

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
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTaskName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

{/* Tags */}


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
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTaskName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

{/* Sub Tasks */}






          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewTaskDialog;
