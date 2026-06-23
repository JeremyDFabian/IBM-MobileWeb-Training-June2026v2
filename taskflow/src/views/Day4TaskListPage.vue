<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
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
} from '@ionic/vue'

const taskStore = useTaskStore()
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore)
const { addTask, toggleTask, removeTask } = taskStore

const newTaskName = ref('')

function handleAdd() {
  addTask(newTaskName.value)
  newTaskName.value = ''
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks (Pinia)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
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

      <p v-if="tasks.length === 0" class="empty-state">No tasks yet. Add one above!</p>

      <ion-list>
        <ion-item v-for="task in tasks" :key="task.id">
          <ion-checkbox slot="start" :checked="task.done" @ionChange="toggleTask(task.id)" />
          <ion-label :class="{ done: task.done }">{{ task.name }}</ion-label>
          <ion-button slot="end" color="danger" fill="clear" size="small" @click="removeTask(task.id)">
            Remove
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.stats-bar {
  display: block;
  margin: 12px 0;
  font-size: 13px;
}

.empty-state {
  text-align: center;
  color: var(--ion-color-medium);
  font-style: italic;
  margin: 32px 0;
}

.done {
  text-decoration: line-through;
  color: var(--ion-color-medium);
}
</style>
