import { createSlice } from "@reduxjs/toolkit";
import { deleteTaskById, getAllTasks } from "../api";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: null,
    error: null,
  },
  reducers: {
    // Action to start fetching all tasks
    fetchAllTasksStart(state) {
      state.status = "loading";
    },
    // Action to set tasks after fetching
    fetchAllTasksSuccess(state, action) {
      state.tasks = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    // Action to set error state after failed fetch
    fetchAllTasksFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    // Action to add a task (currently not handling API call here)
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    // Action to delete a task
    deleteTaskStart(state) {
      state.status = "loading";
    },
    deleteTaskSuccess(state, action) {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.status = "succeeded";
      state.error = null;
    },
    deleteTaskFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const fetchAllTasks = () => async (dispatch) => {
  dispatch(taskSlice.actions.fetchAllTasksStart());
  try {
    const result = await getAllTasks();
    dispatch(taskSlice.actions.fetchAllTasksSuccess(result.task));
  } catch (err) {
    dispatch(taskSlice.actions.fetchAllTasksFailure(err.response.data));
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(taskSlice.actions.deleteTaskStart());
  try {
    await deleteTaskById(taskId);
    dispatch(taskSlice.actions.deleteTaskSuccess(taskId));
  } catch (err) {
    dispatch(taskSlice.actions.deleteTaskFailure(err.response.data));
  }
};

// Export the actions and reducer
export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
