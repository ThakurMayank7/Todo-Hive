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
}

export async function createNewUser(newUser: User): Promise<boolean> {
  if (!newUser.uid) {
    console.error("Error: User must have a UID.");
    return false;
  }
  try {
    await adminDb.collection("users").doc(newUser.uid).set(newUser);

    await adminDb
      .collection("userData")
      .doc(newUser.uid)
      .set({
        tasks: [],
        lists: ["Work", "Personal"],
        tags: ["Urgent", "Important", "Work", "Personal"],
      });
    return true;
  } catch (error) {
    console.error("Could'nt create a new user", error);
    return false;
  }
}

export async function addNewList({
  listName,
  userId,
}: {
  listName: string;
  userId: string;
}): Promise<boolean> {
  if (!listName) {
    console.error("listName not provided");
    return false;
  }
  try {
    await adminDb
      .collection("userData")
      .doc(userId)
      .set(
        {
          lists: FieldValue.arrayUnion(listName),
        },
        { merge: true }
      );

    return true;
  } catch (error) {
    console.error("Could'nt create a new list", error);
    return false;
  }
}
export async function addNewTag({
  tagName,
  userId,
}: {
  tagName: string;
  userId: string;
}): Promise<boolean> {
  if (!tagName) {
    console.error("tagName not provided");
    return false;
  }
  try {
    await adminDb
      .collection("userData")
      .doc(userId)
      .set(
        {
          tags: FieldValue.arrayUnion(tagName),
        },
        { merge: true }
      );

    return true;
  } catch (error) {
    console.error("Could'nt create a new tag", error);
    return false;
  }
}

export async function updateSubTask({
  taskId,
  newSubTasks,
}: {
  taskId: string;
  newSubTasks: { sTask: string; sStatus: boolean }[];
}): Promise<boolean> {
  if (!taskId || !newSubTasks) {
    console.error("taskId or new subtasks not provided");
    return false;
  }
  try {
    await adminDb.collection("tasks").doc(taskId).set(
      {
        subTasks: newSubTasks,
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error("Could'nt update subTask", error);
    return false;
  }
}

export async function notifyUpdates({
  userId,
  taskId,
}: {
  userId: string;
  taskId: string;
}): Promise<boolean> {
  if (!userId) {
    console.error("userId or updateMessage not provided");
    return false;
  }
  try {
    await adminDb.collection("taskUpdates").doc(userId).set(
      {
        taskId: taskId,
        timestamp: Timestamp.now(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error("Could'nt notify updates", error);
    return false;
  }
}
