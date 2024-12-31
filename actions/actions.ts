"use server";

import { adminDb } from "@/firebase/admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

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

export async function addNewTask({ task }: { task: Task }): Promise<boolean> {
  if (!task) {
    console.warn("Task Data given is not sufficient");
    return false;
  }

  if (!task.uid || !task.taskName || !task.list || !task.dueDate) {
    console.warn("Missing required task fields:", task);
    return false;
  }

  try {
    console.log("Adding task:", task);

    const taskRef = await adminDb.collection("tasks").add({
      taskName: task.taskName,
      uid: task.uid,
      taskDescription: task.taskDescription,
      list: task.list,
      tags: task.tags,
      subTasks: task.subTasks,
      status: task.status,
      dueDate: task.dueDate,
      createdDate: Timestamp.now(),
    });

    await adminDb
      .collection("userData")
      .doc(task.uid)
      .set(
        {
          tasks: FieldValue.arrayUnion(taskRef.id),
        },
        { merge: true }
      );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

interface User {
  uid: string;
  email: string;
  name: string;
  photoUrl: string;
};

export async function createNewUser(newUser: User): Promise<boolean> {
  if (!newUser.uid) {
    console.error("Error: User must have a UID.");
    return false;
  }
  try {
    await adminDb.collection("users").doc(newUser.uid).set(newUser);
    return true;
  } catch (error) {
    console.error("Could'nt create a new user", error);
    return false;
  }
}
