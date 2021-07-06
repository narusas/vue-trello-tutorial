<template>
  <div class="flex justify-between py-1" @dblclick="goingToEdit">
    <template v-if="isEditing === false">
      <h3 class="text-sm font-bold">{{ laneName }}</h3>
      <more></more>
    </template>

    <template v-if="isEditing">
      <input type="text" v-model="editingName" @keyup.enter="completeEditing" @keyup.esc="cancelEditing" @blur="cancelEditing" ref="editingEl" />
    </template>
  </div>
</template>
<script setup>
import { defineEmit, defineProps, nextTick, ref } from "vue";
const props = defineProps({
  laneName: {
    type: String
  }
});

const emit = defineEmit("lane-name-changed");

const isEditing = ref(false);
const editingName = ref(props.laneName);
const editingEl = ref(null);
function goingToEdit() {
  isEditing.value = true;
  editingName.value = props.laneName;
  nextTick(() => {
    console.log("El:", editingEl.value);
    editingEl.value.focus();
  });
}

function cancelEditing() {
  isEditing.value = false;
  editingName.value = null;
}

function completeEditing() {
  console.log("Completed");
  emit("lane-name-changed", editingName.value);
  isEditing.value = false;
  editingName.value = null;
}
</script>
