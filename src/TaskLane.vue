<template>
  <div class="rounded bg-blue-200 w-64 p-2 mx-2 shadow-2xl">
    <task-lane-header :laneName="lane.name" @lane-name-changed="laneNameChanged"></task-lane-header>
    <div class="text-sm mt-2">
      <task-item v-for="taskItem in lane.tasks" :key="taskItem.taskId" :task="taskItem"></task-item>
      <p class="mt-3 text-grey-dark">Add a card...</p>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import TaskLaneHeader from "./TaskLaneHeader.vue";
import TaskItem from "./TaskItem.vue";

const props = defineProps({
  lane: {
    type: Object
  }
});

function laneNameChanged(newName) {
  console.log("New Lane Name:", newName);
  props.lane.name = newName;
}
</script>
