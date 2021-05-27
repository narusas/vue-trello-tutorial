import axios from "axios";
import {ref} from "vue";
export function titleChanged(task, changedTitle) {
    task.title = changedTitle;
}

export function  toggleDone(task) {
    console.log("done",task.done);
    task.done = !task.done;
}

async function fetchData(){
    const response = await axios.get("/api/tasks");
    console.log("response",response);
    return response.data;
}

async function getTasks() {
    const payload = await fetchData();
    parsePayload(payload);
}


const laneList = ref([]);
const lanes = ref(null);
const tasks = ref(null);

function parsePayload(payload) {
    laneList.value = payload.laneList;
    lanes.value = payload.lanes;
    tasks.value = payload.tasks;
}


export function useModel() {
    return {
        tasks,
        lanes,
        laneList,
        getTasks
    };
}