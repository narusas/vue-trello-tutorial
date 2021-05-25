<template>
  <div class="rounded bg-blue-200 w-64 p-2 mx-2 shadow-2xl">
    <div class="flex justify-between py-1">
      <h3 class="text-sm font-bold">{{lane.title}}</h3>
    </div>
    <div class="text-sm mt-2">
        <draggable 
            group="people"
            :list="todos"
            item-key="id"  
            @change="log"
        >
            <template #item="{element}">
                <task-item :task="element"
                    @task-title-changed="titleChanged(element, $event)" />
            </template>

        </draggable>
      <p class="mt-3 text-grey-dark flex" @click="addTask"><plus/>Add a card...</p>
    </div>
  </div>
</template>
<script setup>
import {ref, defineProps, toRefs, computed, watch} from "vue";
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

const a = {
    age:12,
    name: "John"
};


const {lane} = toRefs(props);

console.log("Lane", lane)
function titleChanged(task, changedTitle) {
    task.title = changedTitle;
}
let id = 100;
function addTask() {
    const newTask = {
        id: id++,
        title:'',
        done:false,
        isNewAppened: true
    }
    todos.value.push(newTask);
}
const todos = ref(lane.value.tasks.filter(task => !task.done ))

// watch(()=>[...todos.value], (newValue, oldValue)=>{
//     console.log(newValue,oldValue);
// });


// const todos = computed(()=>{
//     return lane.value.tasks.filter(task => !task.done );
// });

</script>
