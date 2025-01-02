"use client";

import React, { FormEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Spinner from "./Spinner";
import { useAuth } from "@/hooks/useAuth";
import { addNewTag } from "@/actions/actions";

function AddNewTagDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const [creating, setCreating] = useState<boolean>(false);

  const [tagName, setTagName] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!tagName || !user) {
      console.warn("missing tag name");
      return;
    }

    try {
      setCreating(true);

      const result: boolean = await addNewTag({
        userId: user.uid,
        tagName: tagName,
      });

      if (result) {
        setTagName("");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
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
                <DialogTitle>Add New List</DialogTitle>
                <DialogDescription>
                  Enter the list name below:
                </DialogDescription>
              </DialogHeader>

              <input
                type="text"
                id="listName"
                name="listName"
                value={tagName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTagName(e.target.value)
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />

              <div className="flex items-center justify-center">
                <button
                  className="bg-teal-200 w-full p-4 rounded border border-black hover:bg-teal-500 hover:font-bold font-semibold"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Add List
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewTagDialog;
