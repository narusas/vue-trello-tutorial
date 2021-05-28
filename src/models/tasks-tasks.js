import axios from "axios";
import {laneList, lanes, tasks} from "./tasks-model";

/**
 * 외부에 노출하지 않아도 되는 내부 함수들
 */

async function fetchData() {
  const response = await axios.get("/api/tasks");
  console.log("response", response);
  return response.data;
}


function parsePayload(payload) {
  laneList.value = payload.laneList;
  lanes.value = payload.lanes;
  tasks.value = payload.tasks;
}


/**
 * 외부에 노출할 공개 함수들
 */

export async function getTasks() {
  const payload = await fetchData();
  parsePayload(payload);
}

export async function postNewTask(laneId, taskId, title) {
  await axios.post(`/api/tasks`, {
    laneId,
    taskId,
    title
  });
  await getTasks();
}



