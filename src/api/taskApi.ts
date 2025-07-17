export interface Task {
  id: number
  name: string
  is_completed: boolean
}

const apiUrl = 'http://localhost:8000/api/tasks';

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(apiUrl)
  if (!response.ok) throw new Error('Failed to fetch tasks')
  return await response.json()
}

export async function createTask(newTask: Omit<Task, 'id'>): Promise<Task> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  })
  if (!response.ok) throw new Error('Failed to create task')
  return await response.json()
}