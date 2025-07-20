<script setup lang="ts">
import { ref } from 'vue'
import { createTask } from '../api/taskApi'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const name = ref('')
const queryClient = useQueryClient()

// Add task mutation
const addTaskMutation = useMutation({
  mutationFn: createTask,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
})

function handleAddTask(newTask: { name: string; is_completed: boolean }) {
  addTaskMutation.mutate(newTask)
}

function submitForm() {
  if (!name.value.trim()) return
  handleAddTask({ name: name.value, is_completed: false })
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