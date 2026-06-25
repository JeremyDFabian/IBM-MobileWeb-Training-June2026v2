<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonNote,
  IonList,
  IonCheckbox,
  IonLabel,
  IonImg,
} from '@ionic/vue'

const router = useRouter()
const taskStore = useTaskStore()
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore)
const { addTask, toggleTask, removeTask } = taskStore

const newTaskName = ref('')

function handleAdd() {
  addTask(newTaskName.value)
  newTaskName.value = ''
}

function goToDetail(id) {
  router.push(`/tabs/tasks/${id}`)
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="input-section ion-padding">
        <ion-item>
          <ion-input
            v-model="newTaskName"
            placeholder="New task..."
            @keyup.enter="handleAdd"
          />
        </ion-item>

        <ion-button expand="block" @click="handleAdd">Add Task</ion-button>

        <ion-note class="stats-bar">
          Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
        </ion-note>
      </div>

      <p v-if="tasks.length === 0" class="empty-state">No tasks yet. Add one above!</p>

      <ion-list v-else class="tasks-list">
        <ion-item v-for="task in tasks" :key="task.id" button @click="goToDetail(task.id)" class="task-item">
          <ion-checkbox slot="start" :checked="task.done" @ionChange.stop="toggleTask(task.id)" @click.stop />
          <div class="task-content">
            <div class="task-header">
              <ion-label :class="{ done: task.done }" class="task-name">{{ task.name }}</ion-label>
              <ion-img v-if="task.photo" :src="task.photo" class="task-thumbnail" />
            </div>
          </div>
          <ion-button slot="end" color="danger" fill="clear" size="small" @click.stop="removeTask(task.id)">
            Remove
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.input-section {
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
  padding-bottom: 8px;
}

.stats-bar {
  display: block;
  margin: 12px 0 0 0;
  font-size: 13px;
  color: var(--ion-color-medium);
}

.empty-state {
  text-align: center;
  color: var(--ion-color-medium);
  font-style: italic;
  margin: 32px 16px;
}

.done {
  text-decoration: line-through;
  color: var(--ion-color-medium);
}

.tasks-list {
  margin: 0;
  padding: 8px 12px;
}

.task-item {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --inner-padding-start: 8px;
  align-items: center;
  margin-bottom: 8px;
  border-radius: 8px;
  background: var(--ion-item-background);
}

.task-content {
  flex: 1;
  padding: 10px 0;
  min-width: 0;
}

.task-header {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  min-width: 0;
}

.task-name {
  flex: 1;
  min-width: 0;
  word-break: break-word;
  overflow-wrap: break-word;
}

.task-thumbnail {
  width: 48px;
  height: auto;
  border-radius: 4px;
  object-fit: contain;
  flex-shrink: 0;
  max-width: 15vw;
  max-height: 48px;
}
</style>
