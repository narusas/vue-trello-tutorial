<template>
  <div class="bg-blue-400 w-full h-full p-8 flex font-sans">
    <tasks-lane
        v-for="laneId in laneList"
        :key="laneId"
        :lane="lanes[laneId]"
    />
  </div>
</template>

<script setup>
import {ref, onMounted, provide} from "vue";
import TasksLane from "./components/TasksLane.vue";

import axios from "axios";
import {useModel} from "./models/tasks.js";

const {getTasks, laneList, lanes, tasks} = useModel();

provide("tasks", tasks);
onMounted(getTasks);


</script>
