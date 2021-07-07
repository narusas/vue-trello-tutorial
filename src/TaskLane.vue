<template>
  <div class="rounded bg-blue-200 w-64 p-2 mx-2 shadow-2xl">
    <task-lane-header :laneName="lane.name" @lane-name-changed="laneNameChanged"></task-lane-header>
    <div class="text-sm mt-2">
        <draggable
                group="tasks"
                :list="lane.tasks"
                item-key="taskItem.taskId" 
        >
            <template #item="{element}">
                <task-item 
                :task="element"></task-item>
            </template>
        </draggable>
      <p 
        @click="addNewTask" 
        class="mt-3 text-grey-dark">Add a card...</p>
    </div>
  </div>
</template>
<script setup>
import { defineProps, toRefs } from "vue";
import TaskLaneHeader from "./TaskLaneHeader.vue";
import TaskItem from "./TaskItem.vue";
import { getNextTaskId } from "./tasks";
import draggable from '../node_modules/vuedraggable/src/vuedraggable';

const props = defineProps({
  lane: {
    type: Object
  }
});

const {lane} = toRefs(props);


function laneNameChanged(newName) {
  console.log("New Lane Name:", newName);
  props.lane.name = newName;
}


function addNewTask() {
    
    const newTask = {
        taskId: getNextTaskId(),
        text: "Something to do",
        archived: false

    };
    console.log("Add new task:", newTask);
    lane.value.tasks.push(newTask);
}
</script>
