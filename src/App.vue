<template>
  <div class="bg-blue-400 w-full h-full p-8 flex font-sans">
    <tasks-lane 
      v-for="lane in tasks" 
      :key="lane.id"
      :lane="lane"/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import TasksLane from "./components/TasksLane.vue";

const tasks = ref([
  {
    id: 1,
    title: "Backlogs",
    tasks: [
      {
        id: "1",
        title: "Task 1",
        done: false,
      },
      {
        id: "2",
        title: "Task 2",
        done: false,
      },
      {
        id: "3",
        title: "Task 3",
        done: false,
      },
      {
        id: "4",
        title: "Task 4",
        done: false,
      },
      {
        id: "5",
        title: "Task 5",
        done: false,
      },
    ],
  },
  {
    title:"Work In Progress",
    tasks:[
      {
        id: "6",
        title: "Task 6",
        done: false,
      },
    ]
  },
  
  {
    title:"Done",
    tasks:[
      {
        id: "7",
        title: "Task 6",
        done: false,
      },
    ]
  }
  
]);
</script>
