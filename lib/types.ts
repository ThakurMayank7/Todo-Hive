export interface Task {
    uid: string;
    taskName: string;
    taskDescription?: string;
    list: string;
    dueDate: Date;
    tags?: string[];
    subTasks?: { sTask: string; sStatus: boolean }[];
    status: boolean;
    createdAt: Date;
    taskId: string;
  }
  
  export interface UserData {
    tasks: Task[];
    lists: string[];
    tags: string[];
  }