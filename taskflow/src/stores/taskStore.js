import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const nextId = ref(1)

  const totalCount   = computed(() => tasks.value.length)
  const doneCount    = computed(() => tasks.value.filter(t => t.done).length)
  const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

  function addTask(name) {
    if (!name.trim()) return
    tasks.value.push({ id: nextId.value++, name, done: false, photo: null })
  }
  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
  }
  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }
  function addPhotoToTask(id, path) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.photo = path
  }

  return { tasks, totalCount, doneCount, pendingCount, addTask, toggleTask, removeTask, addPhotoToTask }
})
