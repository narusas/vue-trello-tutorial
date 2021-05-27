import axios from "axios";
import {ref} from "vue";


export async function getData() {
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


export function titleChanged() {

}

export function toggleDone() {

}

export function useModel() {
  return {laneList, lanes, tasks, getTasks}
}