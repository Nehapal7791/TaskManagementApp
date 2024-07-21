import { API_URL } from "./utils";

export const createTask = async (task) => {
  const url = `${API_URL}create-tasks`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error creating task:", err);
    return { error: err.message };
  }
};
export const getAllTasks = async () => {
  const url = `${API_URL}all-tasks`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return { error: err.message };
  }
};
export const deleteTaskById = async (id) => {
  console.log(id);
  const url = `${API_URL}delete-tasks/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return { error: err.message };
  }
};
export const updateTask = async (id, task) => {
  console.log(id);
  const url = `${API_URL}update-tasks/${id}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error updating task:", err);
    return { error: err.message };
  }
};
