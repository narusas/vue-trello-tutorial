<template>
  <div v-if="!isEditing" @click="goingToEdit" class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
    <input type="checkbox" class="rounded" :checked="task.archived" />
    {{ task.text }}
  </div>
  <div v-else>Editing</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  task: {
    type: Object
  }
});

const isEditing = ref(false);

function goingToEdit() {
  isEditing.value = false;
}
</script>
