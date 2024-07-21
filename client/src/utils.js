import { toast } from "react-toastify";

export const notify = (message, type) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast(message);
      break;
  }
};

export const sortTasks = (tasks) => {
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return tasks.slice().sort((a, b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);

    if (isToday(aDate) && !isToday(bDate)) return -1;
    if (!isToday(aDate) && isToday(bDate)) return 1;
    const priorityComparison =
      priorityOrder[a.priorityStatus] - priorityOrder[b.priorityStatus];
    if (priorityComparison !== 0) return priorityComparison;
    return aDate - bDate;
  });
};
export const API_URL = "https://task-management-app-swart.vercel.app/api/";
