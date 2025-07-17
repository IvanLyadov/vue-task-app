<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Tasks from './components/Tasks.vue'
import TaskForm from './components/TaskForm.vue'
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi'
import type { Task } from './types/types'

const tasks = ref<Task[]>([])

onMounted(async () => {
  try {
    tasks.value = await fetchTasks()
  } catch (error) {
    console.error(error)
    tasks.value = []
  }
})
/**
 * Add a new task to the list and server
 */
async function handleAddTask(newTask: { name: string; is_completed: boolean }) {
  try {
    const created = await createTask(newTask)
    tasks.value.push(created)
  } catch (error) {
    console.error('Failed to create task:', error)
  }
}

/**
 * Toggle a task's completion status and update on server
 */
async function handleToggleTask(task: Task) {
  try {
    const updated = await updateTask(task)
    const idx = tasks.value.findIndex(t => t.id === updated.id)
    if (idx !== -1) tasks.value[idx] = updated
  } catch (error) {
    console.error('Failed to update task:', error)
  }
}

/**
 * Delete a task from the list and server
 */
async function handleDeleteTask(id: number) {
  try {
    await deleteTask(id)
    tasks.value = tasks.value.filter(task => task.id !== id)
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}
</script>

<template>
  <main>
    <div class="task-form">
      <TaskForm @add-task="handleAddTask" />
    </div>
    <div class="tasks-container">
      <Tasks
        :tasks="tasks"
        @toggle-task="handleToggleTask"
        @delete-task="handleDeleteTask"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #f5f7fa;
  padding-top: 3rem;
  margin: 0 auto;
  max-width: 600px;
  width: 100%; 
  box-sizing: border-box;
}

.task-form {
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
}

.tasks-container {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>