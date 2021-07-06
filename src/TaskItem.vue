<template>
  <div v-if="!isEditing" @dblclick="goingToEdit" class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
    <input type="checkbox" class="rounded" :checked="task.archived" @click="toggleTask" />
    {{ task.text }}
  </div>

  <div v-else>
    <input class="w-full" v-model="editingTitle" @keyup.enter="completeTitleChange" @keyup.esc="cancelTitleChange" @blur="cancelTitleChange" ref="editingTitleEl" />
  </div>
</template>

<script setup>
import { ref, defineEmit, nextTick } from "vue";

const props = defineProps({
  task: {
    type: Object
  }
});
// const emit = defineEmit(["task-title-changed"]);

const isEditing = ref(false);
const editingTitle = ref(null);
const editingTitleEl = ref(null);
function goingToEdit() {
  isEditing.value = true;
  editingTitle.value = props.task.text;
  nextTick(() => {
    editingTitleEl.value.focus();
  });
}

function cancelTitleChange() {
  isEditing.value = false;
  editingTitle.value = null;
}

function completeTitleChange() {
  props.task.text = editingTitle.value;

  isEditing.value = false;
  editingTitle.value = null;
}
</script>
