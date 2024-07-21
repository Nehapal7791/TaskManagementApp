import Task from "../models/task-data.schema.js";
import mongoose from "mongoose";

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 */

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

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: The task was not found
 *       500:
 *         description: Some server error
 */

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

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by the id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The task was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 *       404:
 *         description: The task was not found
 */
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

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
 *       500:
 *         description: Some server error
 */
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
