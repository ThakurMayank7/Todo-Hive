"use server";

import { adminDb } from "@/firebase/admin";

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

export async function addNewTask(task: Task): Promise<boolean> {
  if (!task) {
    console.warn("Task Data given is not sufficient");
    return false;
  }
  try {
    await adminDb.collection("tasks").add(task);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
