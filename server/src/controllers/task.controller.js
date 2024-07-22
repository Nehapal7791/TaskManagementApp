import Task from "../models/task-data.schema.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
  const { title, description, priorityStatus, dueDate, isDone } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      priorityStatus,
      dueDate,
      isDone,
    });
    await newTask.save();
    res.status(201).json({
      success: true,
      message: "Task added successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res
      .status(200)
      .json({ success: true, message: "Task added successfully", task: tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: "Task not found" });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).send({ message: "Tasks not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priorityStatus, dueDate, isDone } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: "Task not found" });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priorityStatus, dueDate, isDone },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updateTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: "Task not found" });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      task: deleteTask,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
