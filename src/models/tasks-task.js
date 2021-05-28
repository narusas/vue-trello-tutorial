import axios from "axios";

export async function updateTaskTitle(taskId, title) {
  console.log("updateTaskTitle", taskId, title);
  await axios.put(`/api/tasks/${taskId}`, {title});
  await getTasks();
}

export async function moveTask(taskId, laneId, newIndex) {
  await axios.put(`/api/tasks/${taskId}/moveTo`, {laneId, newIndex});
  await getTasks();
}

export async function repositionTask(taskId, newIndex, oldIndex) {
  await axios.put(`/api/tasks/${taskId}/reposition`, {newIndex, oldIndex});
  await getTasks();
}
