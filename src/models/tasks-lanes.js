import axios from "axios";

export async function updateLaneTitle(laneId, title){
    console.log("updateLaneTitle", laneId, title);
    await axios.put(`/api/lanes/${laneId}`, {title});
    await getTasks();
}

