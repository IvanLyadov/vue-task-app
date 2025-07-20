<script setup lang="ts">
import type { Task } from '../types/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateTask, deleteTask } from '../api/taskApi'

defineProps<{
  tasks: Task[]
}>()

const queryClient = useQueryClient()

// Update task mutation
const updateTaskMutation = useMutation({
  mutationFn: updateTask,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
})

// Delete task mutation
const deleteTaskMutation = useMutation({
  mutationFn: deleteTask,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
})

function onToggle(task: Task) {
  updateTaskMutation.mutate({ ...task, is_completed: !task.is_completed })
}

function onDelete(id: number) {
  if (confirm('Are you sure you want to delete this task?')) {
    deleteTaskMutation.mutate(id)
  }
}
</script>

<template>
  <div>
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in tasks.slice().reverse()" :key="task.id">
        <input
          type="checkbox"
          :checked="task.is_completed"
          @change="onToggle(task)"
        />
        <span :style="{ textDecoration: task.is_completed ? 'line-through' : 'none' }" class="task-name">
          {{ task.name }}
        </span>
        <button @click="onDelete(task.id)" class="delete-button">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.delete-button {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.task-name {
  flex: 1;
  margin-left: 0.5rem;
}

ul {
  padding-left: 0;
  list-style: none;
}

li {
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s;
  display: flex;
  align-items: center;
}

li:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

span {
  font-size: 1.1rem;
  color: #333;
}
</style>