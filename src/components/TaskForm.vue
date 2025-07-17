<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add-task', task: { name: string; is_completed: boolean }): void
}>()

const name = ref('')

function submitForm() {
  if (!name.value.trim()) return
  emit('add-task', { name: name.value, is_completed: false })
  name.value = ''
}
</script>

<template>
  <form @submit.prevent="submitForm" class="task-form">
    <input v-model="name" placeholder="New task..." required />
    <button type="submit">Add Task</button>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background: #42b983;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background: #369870;
}
</style>