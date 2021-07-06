<template>
    <div class="bg-blue-400 w-full h-full p-8 flex font-sans">
        <task-lane v-for="lane in lanes" :key="lane.laneId" :lane="lane"></task-lane>
    </div>
</template>

<script setup>
import { ref } from "vue";
import TaskLane from "./TaskLane.vue";
import TaskItem from "./TaskItem.vue";

const lanes = ref([
    {
        laneId: "lane001",
        name: "Backlogs",
        tasks: [
            {
                taskId: "task001",
                text: "Do a mobile first layout",
                archived: false
            },
            {
                taskId: "task002",
                text: "Check the responsive layout",
                archived: true
            },
            {
                taskId: "task003",
                text: "Check the meta tags",
                archived: false
            }
        ]
    },
    {
        laneId: "lane002",
        name: "Done",
        tasks: []
    }
]);
</script>
