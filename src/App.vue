<script setup lang="ts">
import { useQuery} from '@tanstack/vue-query'
import Tasks from './components/Tasks.vue'
import TaskForm from './components/TaskForm.vue'
import { fetchTasks } from './api/taskApi'

// Fetch tasks
const { data: tasks = [], isLoading, error } = useQuery({
  queryKey: ['tasks'],
  queryFn: fetchTasks,
})

</script>

<template>
  <main>
    <div class="task-form">
      <TaskForm />
    </div>
    <div class="tasks-container">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">Error loading tasks.</div>
      <Tasks v-else :tasks="tasks" />
    </div>
  </main>
</template>