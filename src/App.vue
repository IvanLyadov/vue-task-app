<script setup>
import { ref, onMounted } from 'vue'
import Tasks from './components/Tasks.vue'
import { fetchTasks } from './api/taskApi'

const tasks = ref([])

onMounted(async () => {
  try {
    tasks.value = await fetchTasks()
  } catch (error) {
    console.error(error)
    tasks.value = []
  }
})
</script>

<template>
  <header>
    <!-- You can add header content here -->
  </header>

  <main>
    <Tasks :tasks="tasks" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>