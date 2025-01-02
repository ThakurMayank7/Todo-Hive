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
import { addNewList } from "@/actions/actions";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";

function AddNewListDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const [creating, setCreating] = useState<boolean>(false);

  const [listName, setListName] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!listName || !user) {
      console.warn("missing list name");
      return;
    }

    try {
      setCreating(true);

      const result: boolean = await addNewList({
        userId: user.uid,
        listName: listName,
      });

      if (result) {
        toast(
          <div>
            <h1 className="text-xl font-serif">New List has been created</h1>
            <h2 className="text-lg font-semibold my-4">{listName}</h2>
            <p className="">
              Created At: {format(new Date(), "yyyy-MM-dd HH:mm:ss")}
            </p>
          </div>
        );

        setListName("");
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
                value={listName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setListName(e.target.value)
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

export default AddNewListDialog;
