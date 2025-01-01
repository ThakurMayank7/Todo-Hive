'use client';

import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Spinner from './Spinner';

function AddNewTagDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const [open, setOpen] = useState(false);

  const [creating, setCreating] = useState<boolean>(false);



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

                <div className="flex items-center justify-center">
                  <button
                    className="bg-teal-200 w-full p-4 rounded border border-black hover:bg-teal-500 hover:font-bold font-semibold"
                    type="submit"
                    // onClick={() => handleSubmit}
                  >
                    Add Task
                  </button>
                </div>
              
            </>
          )}
        </DialogContent>
      </Dialog>
      </div>
  )
}

export default AddNewTagDialog