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
} from "@/components/ui/select";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function AddNewTaskDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  const [taskName, setTaskName] = useState<string>("");

  const [taskDescription, setTaskDescription] = useState<string>("");

  const [list, setList] = useState<string>("");

  const [tags, setTags] = useState<{ tag: string; selected: boolean }[]>([
    { tag: "Important", selected: false },
    { tag: "Skippable", selected: false },
    { tag: "Try it", selected: false },
  ]);

  const [dueDate, setDueDate] = useState<Date>();

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
                    <SelectItem value="apple">Personal</SelectItem>
                    <SelectItem value="banana">Work</SelectItem>
                    <SelectItem value="blueberry">Hobby</SelectItem>
                    <SelectItem value="grapes">Something New</SelectItem>
                    <SelectItem value="pineapple">Trying</SelectItem>
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
                      tag.selected ? "bg-teal-500 font-semibold" : "bg-teal-200"
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
                className="block text-sm font-medium text-gray-600"
              >
                Due Date :
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
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
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Sub Tasks */}



            
            <button type="submit" onClick={() => handleSubmit}>
              Add Task
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewTaskDialog;
