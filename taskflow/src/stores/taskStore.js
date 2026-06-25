import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const nextId = ref(1)

  const totalCount   = computed(() => tasks.value.length)
  const doneCount    = computed(() => tasks.value.filter(t => t.done).length)
  const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

  async function saveTasks() {
    try {
      const tasksJson = JSON.stringify(tasks.value)
      const nextIdJson = JSON.stringify(nextId.value)

      await Preferences.set({
        key: 'tasks',
        value: tasksJson
      })
      await Preferences.set({
        key: 'nextId',
        value: nextIdJson
      })
    } catch (error) {
      console.warn('Failed to save tasks:', error)
    }
  }

  async function loadTasks() {
    try {
      const tasksResult = await Preferences.get({ key: 'tasks' })
      const nextIdResult = await Preferences.get({ key: 'nextId' })

      if (tasksResult.value) {
        try {
          tasks.value = JSON.parse(tasksResult.value)
        } catch (parseError) {
          console.warn('Failed to parse tasks from storage, defaulting to empty array:', parseError)
          tasks.value = []
        }
      } else {
        tasks.value = []
      }

      if (nextIdResult.value) {
        try {
          nextId.value = JSON.parse(nextIdResult.value)
        } catch (parseError) {
          console.warn('Failed to parse nextId from storage, defaulting to 1:', parseError)
          nextId.value = 1
        }
      } else {
        nextId.value = 1
      }
    } catch (error) {
      console.warn('Failed to load tasks:', error)
      tasks.value = []
      nextId.value = 1
    }
  }

  function addTask(name) {
    if (!name.trim()) return
    tasks.value.push({ id: nextId.value++, name, done: false, photo: null })
    saveTasks()
  }

  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.done = !task.done
      saveTasks()
    }
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
  }

  function addPhotoToTask(id, path) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.photo = path
      saveTasks()
    }
  }

  return { tasks, totalCount, doneCount, pendingCount, addTask, toggleTask, removeTask, addPhotoToTask, saveTasks, loadTasks }
})
