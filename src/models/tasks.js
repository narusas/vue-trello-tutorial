import axios from "axios";
import {ref} from "vue";


async function getData() {
  const response = await axios.get("/api/tasks");

  console.log("response", response);
  const data = response.data;
  return data;
}


async function getTasks() {
  const payload = await getData();
  parsePayload(payload);
}

function parsePayload(payload) {
  parseLane(payload);
  parseTasks(payload);
}


const laneList = ref([]);
const lanes = ref(null);


function parseLane(payload) {
  laneList.value = payload.laneList;
  lanes.value = payload.lanes;
}

const tasks = ref(null);

function parseTasks(payload) {
  tasks.value = payload.tasks;
}


function changeLaneTitle() {

}

function changeTaskTitle() {

}

function toggleTaskDone() {

}

export function useModel() {
  return {laneList, lanes, tasks, getTasks, changeLaneTitle, changeTaskTitle, toggleTaskDone}
}