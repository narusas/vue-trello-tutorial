<template>
    <div class="bg-blue-400 w-full h-full p-8 flex font-sans">
        <task-lane v-for="lane in lanes" :key="lane.laneId" :lane="lane"></task-lane>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TaskLane from "./TaskLane.vue";
import TaskItem from "./TaskItem.vue";
import axios from "axios";

const lanes = ref([]);
async function getTasks() {
  const res = await axios.get("/tasks");
  console.log("Response:", res);
  lanes.value = res.data;
}
onMounted(getTasks);

</script>
