<template>
  <div class="rounded bg-blue-200 w-64 p-2 mx-2 shadow-2xl">
    <div class="flex justify-between py-1">
      <h3
          v-if="isEditingTitle==false"
          class="text-sm font-bold"
          @dblclick="goingToEditingTitle"
      >{{ lane.title }}</h3>
      <input type="text"
             v-else
             class="text-sm font-bold w-full" v-model="editingTitle"
             @keyup.esc="cancelEditingTitle"
             @keyup.enter="completeEditingTitle"
             @blur="completeEditingTitle"
             ref="editingTitleEl"
      >

    </div>
    <div class="text-sm mt-2">
      <draggable
          group="people"
          :list="lane.taskList"
          item-key="id"
          @change="log"
      >
        <template #item="{element}">
          <task-item :task="tasks[element]"
                     @task-title-changed="titleChanged(element, $event)"/>
        </template>

      </draggable>
      <p class="mt-3 text-grey-dark flex" @click="addTask">
        <plus/>
        Add a card...
      </p>
    </div>
  </div>
</template>
<script setup>
import {ref, defineProps, toRefs, computed, watch, nextTick, inject} from "vue";
import {Plus} from "@icon-park/vue-next";
import TaskItem from "./TaskItem.vue";
import draggable from '../../node_modules/vuedraggable/src/vuedraggable';

function log(p1) {
  console.log(p1);
}

const props = defineProps({
  lane: {
    type: Object
  }
});

console.log("props.lane", props.lane);


function titleChanged(task, changedTitle) {
  task.title = changedTitle;
}

let id = 100;

function addTask() {
  const newTask = {
    id: id++,
    title: '',
    done: false,
    isNewAppened: true
  }
  todos.value.push(newTask);
}

const tasks = inject("tasks");
console.log("tasks", tasks);


const isEditingTitle = ref(false);
const editingTitle = ref(null);
const editingTitleEl = ref(null);

function goingToEditingTitle() {
  editingTitle.value = lane.value.title;
  isEditingTitle.value = true;
  nextTick(() => {
    !!editingTitleEl.value && editingTitleEl.value.focus();
  })
}

function completeEditingTitle() {
  if (!!editingTitle.value) {
    lane.value.title = editingTitle.value;
  }
  editingTitle.value = null;

  isEditingTitle.value = false;
}

function cancelEditingTitle() {
  isEditingTitle.value = false;
  editingTitle.value = null;
}


</script>
