<script setup lang="ts">
import type { Task } from '../api/taskApi'

const props = defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'toggle-task', task: Task): void
  (e: 'delete-task', id: number): void
}>()

function onToggle(task: Task) {
  emit('toggle-task', { ...task, is_completed: !task.is_completed })
}

function onDelete(id: number) {
  if (confirm('Are you sure you want to delete this task?')) {
    emit('delete-task', id)
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
        <span :style="{ textDecoration: task.is_completed ? 'line-through' : 'none', marginLeft: '0.5rem', flex: 1 }">
          {{ task.name }}
        </span>
        <button @click="onDelete(task.id)" style="margin-left: auto; background: #ff4d4f; color: #fff; border: none; border-radius: 4px; padding: 0.3rem 0.7rem; cursor: pointer;">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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