<template>
  <div class="rounded bg-blue-200 w-64 p-2 mx-2 shadow-2xl">
    <div class="flex justify-between py-1">
        <h3  v-if="isEditingTitle == false"
            @dblclick="goingToEditTitle"
                class="text-sm font-bold">{{lane.title}}</h3>
        <input type="text" 
            v-else 
            v-model="editingTitle"

            ref="editingTitleEl"
            @keyup.esc="cancelEditTitle"
            @keyup.enter="completeEditTitle"
            @blur="completeEditTitle"

        >

    </div>
    <div class="text-sm mt-2">
        <draggable 
            group="people"
            :list="lane.taskList"
            item-key="id"  
            @change="updateLaneTasks"
        >
            <template #item="{element}">
                <task-item 
                    :task="tasks[element]"
                    @editCompleted="updateTaskTitle"
                    />
            </template>

        </draggable>
        <task-item 
            v-if="isAppendingNewTask"
            :task="newTask"
            @editCompleted="appendNewTask"
            @editCancled="cancelNewTask"
        />
      <p class="mt-3 text-grey-dark flex" @click="addTask"><plus/>Add a card...</p>
    </div>
  </div>
</template>
<script setup>
import {ref, defineProps, toRefs, computed, watch, nextTick, inject} from "vue";
import {Plus} from "@icon-park/vue-next";
import TaskItem from "./TaskItem.vue";
import draggable from '../../node_modules/vuedraggable/src/vuedraggable';
import {useModel} from "../models/tasks.js";

const {moveTask, repositionTask, updateTaskTitle, postNewTask} = useModel();



function appendNewTask(taskId, title) {
    postNewTask(props.lane.id, taskId, title);
}
function updateLaneTasks(event) {
    if (!!event.added){
        const taskId = event.added.element;
        const {newIndex} = event.added;
        moveTask(taskId, props.lane.id, newIndex);
    }
    else if (!!event.moved){
        console.log(event);
        const taskId = event.moved.element;
        const {newIndex, oldIndex} = event.moved;
        repositionTask(
            taskId,  
            newIndex,
            oldIndex, 
            );
    }

}

const props = defineProps({
  lane: {
    type: Object
  }
});



const {lane} = toRefs(props);
const tasks = inject("tasks");

const isAppendingNewTask = ref(false);
const newTask = ref(null);

let id = 100;

function addTask() {
    newTask.value = {
        id: id++,
        title:'',
        done:false,
        isNewAppened: true
    }
    isAppendingNewTask.value = true;
    
}

function cancelNewTask(){
    isAppendingNewTask.value = false;
    newTask.value = null;
}
// const todos = ref(lane.value.tasks.filter(task => !task.done ))

const isEditingTitle = ref(false);
const editingTitle = ref(null);
const editingTitleEl = ref(null);

function goingToEditTitle() {
    isEditingTitle.value = true;
    editingTitle.value = lane.value.title;
    nextTick(()=>{
        editingTitleEl.value.focus();
    });
    
}

function cancelEditTitle() {
    isEditingTitle.value = false;
    editingTitle.value = null;
}



const {updateLaneTitle} = useModel();

function completeEditTitle() {
    if (!!editingTitle.value){
        updateLaneTitle(lane.value.id, editingTitle.value);
        // lane.value.title = editingTitle.value;
    }
    isEditingTitle.value = false;
    editingTitle.value = null;
}


</script>
