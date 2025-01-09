import { notifyUpdates, updateTaskStatus } from "@/actions/actions";

export const updateTaskStatusHandler = async ({
  taskId,
  userId,
}: {
  taskId: string;
  userId: string;
}) => {
  await updateTaskStatus({
    taskId: taskId,
    newTaskStatus: true,
  }).then((result) => {
    if (result && userId) {
      notifyUpdates({
        userId: userId,
        taskId: taskId,
      });
    }
  });
};
