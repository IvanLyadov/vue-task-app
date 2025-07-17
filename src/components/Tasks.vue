<script setup lang="ts">
import type { Task } from '../api/taskApi'

defineProps<{
  tasks: Task[]
}>()
</script>

<template>
  <div>
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :style="{ textDecoration: task.is_completed ? 'line-through' : 'none' }">
          {{ task.name }}
        </span>
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