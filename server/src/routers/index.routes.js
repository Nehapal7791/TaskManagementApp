import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API endpoints for tasks
 */

/**
 * @swagger
 * /tasks/all-tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   priorityStatus:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.get("/all-tasks", getTasks);

// /**
//  * @swagger
//  * /create-tasks:
//  *   post:
//  *     summary: Create a new task
//  *     tags: [Tasks]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/models/task-data.schema'
//  *     responses:
//  *       201:
//  *         description: The task was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/models/task-data.schema'
//  *       400:
//  *         description: Bad request
//  */
/** POST Methods */

// /**
//  * @openapi
//  * '/api/create-task':
//  *  post:
//  *     tags:
//  *     - Task Controller
//  *     summary: Create a Task
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - title
//  *              - description
//  *              - priorityStatus
//  *              - dueDate
//  *     responses:
//  *      201:
//  *        description: Created
//  *      409:
//  *        description: Conflict
//  *      404:
//  *        description: Not Found
//  *      500:
//  *        description: Server Error
//  */
router.post("/create-tasks", createTask);

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
router.get("/get-tasks-by-id/:id", getTaskById);

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
router.put("/update-tasks/:id", updateTask);

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
router.delete("/delete-tasks/:id", deleteTask);

export default router;
