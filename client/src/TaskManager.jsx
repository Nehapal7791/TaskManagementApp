import { useEffect, useState } from "react";
import { FaCheck, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { notify, sortTasks } from "./utils";

import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchAllTasks } from "./redux/taskSlice";
import { createTask, deleteTaskById, updateTask } from "./api";

const TaskManager = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priorityStatus, setPriorityStatus] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks); // Access tasks from Redux state

  const handleAddTask = async () => {
    const newTask = {
      title,
      description,
      priorityStatus,
      dueDate,
      isDone: false,
    };

    try {
      if (editingTaskId) {
        const result = await updateTask(editingTaskId, newTask);
        if (result.success) {
          dispatch(fetchAllTasks());
          notify("Task updated successfully", "success");
        } else {
          notify(result.message || "Failed to update task", "error");
        }
      } else {
        const result = await createTask(newTask);
        if (result.success) {
          dispatch(addTask(result.task));
          notify("Task added successfully", "success");
        } else {
          notify(result.message || "Failed to add task", "error");
        }
      }
      setTitle("");
      setDescription("");
      setPriorityStatus("");
      setDueDate("");
      setEditingTaskId(null);
    } catch (err) {
      notify(err.message || "Failed to add/update task", "error");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const result = await deleteTaskById(id);
      if (result.success) {
        dispatch(deleteTask(id));
        notify("Task deleted successfully", "success");
      } else {
        notify(result.message || "Failed to delete task", "error");
      }
    } catch (err) {
      notify(err.message || "Failed to delete task", "error");
    }
  };

  const handleCheckAndUncheck = async (task) => {
    const updatedTask = {
      ...task,
      isDone: !task.isDone,
    };

    try {
      const result = await updateTask(task._id, updatedTask);
      if (result.success) {
        dispatch(fetchAllTasks());
        notify("Task status updated", "success");
      } else {
        notify(result.message || "Failed to update task status", "error");
      }
    } catch (err) {
      notify(err.message || "Failed to update task status", "error");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEditTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriorityStatus(task.priorityStatus);
    setDueDate(formatDate(task.dueDate));
    setEditingTaskId(task._id);
  };

  const handleDueDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      notify("Due date cannot be in the past", "error");
    } else {
      setDueDate(e.target.value);
    }
  };

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full sm:w-3/4 md:w-1/2 mx-auto  p-3">
      <h1 className="text-black-600 text-2xl font-bold mb-4">
        TASK MANAGEMENT APP
      </h1>

      {/* Inputs*/}
      <div className="flex flex-col items-center mb-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-input border border-gray-300 rounded-md py-2 px-4"
            placeholder="Add a new Task Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-input border border-gray-300 rounded-md py-2 px-4"
            placeholder="Description"
          />
          <select
            value={priorityStatus}
            onChange={(e) => setPriorityStatus(e.target.value)}
            className="form-select border border-gray-300 rounded-md py-2 px-4"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            onChange={handleDueDateChange}
            value={dueDate}
            type="date"
            className="form-input border border-gray-300 rounded-md py-2 px-4"
          />
          <div className="md:col-span-2">
            <button
              className="bg-purple-700 text-white rounded-md py-2 px-4 w-full flex text-center items-center justify-center"
              onClick={handleAddTask}
            >
              <FaPlus className="mr-2" /> Add Task
            </button>
          </div>
        </div>
      </div>

      {/* List of items */}
      <div className="flex flex-col w-full">
        {tasks.length > 0 ? (
          sortTasks(tasks).map((task) => (
            <div
              key={task._id}
              className="m-1 p-2 border w-full rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex flex-col w-full sm:w-3/4">
                <span
                  className={`break-words ${task.isDone ? "line-through" : ""}`}
                >
                  <strong>Title:</strong> {task.title}
                </span>
                <span
                  className={`break-words ${task.isDone ? "line-through" : ""}`}
                >
                  <strong>Description:</strong> {task.description}
                </span>
                <span className={`${task.isDone ? "line-through" : ""}`}>
                  <strong>Priority:</strong> {task.priorityStatus}
                </span>
                <span className={`${task.isDone ? "line-through" : ""}`}>
                  <strong>Due Date:</strong> {formatDate(task.dueDate)}
                </span>
              </div>
              <div className="flex w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2">
                <button
                  onClick={() => handleCheckAndUncheck(task)}
                  className="bg-green-500 text-white rounded-md px-2 py-1 text-sm mr-2"
                  type="button"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleEditTask(task)}
                  className="bg-blue-500 text-white rounded-md px-2 py-1 text-sm mr-2"
                  type="button"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 text-white rounded-md px-2 py-1 text-sm"
                  type="button"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-700">No tasks available</div>
        )}
      </div>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default TaskManager;
