<template>
  <div class="bg-blue-400 w-full h-full p-8 flex font-sans">
    <div class="rounded bg-blue-200 w-64 p-2 mx-2 shadow-2xl">
      <div class="flex justify-between py-1">
        <h3 class="text-sm font-bold">{{ laneName }}</h3>
        <more></more>
      </div>
      <div class="text-sm mt-2">
        <task-item v-for="(task, index) in tasks" :key="index" :task="task"></task-item>
        <p class="mt-3 text-grey-dark">Add a card...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskItem from "./TaskItem.vue";

const tasks = ref([
  {
    text: "Do a mobile first layout",
    archived: false
  },
  {
    text: "Check the responsive layout",
    archived: true
  },
  {
    text: "Check the meta tags",
    archived: false
  }
]);

const laneName = ref("Backlogs");

setTimeout(() => {
  tasks.value.push({
    text: "hello",
    archived: false
  });
  laneName.value = "New Tasks";
}, 5000);
</script>
