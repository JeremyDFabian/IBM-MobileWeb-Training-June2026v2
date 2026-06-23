<script setup>
import { ref, computed } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonNote,
  IonList,
  IonCheckbox,
  IonLabel,
  IonButton,
  IonText,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue'
import { add, trash } from 'ionicons/icons'

const newTaskName = ref('')
const tasks = ref([])

const totalCount = computed(() => tasks.value.length)
const doneCount = computed(() => tasks.value.filter(t => t.done).length)
const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

function addTask() {
  if (!newTaskName.value.trim()) return
  tasks.value.push({ id: Date.now(), name: newTaskName.value.trim(), done: false })
  newTaskName.value = ''
}

function toggleTask(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.done = !task.done
}

function removeTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Task Counter</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          v-model="newTaskName"
          placeholder="Add a new task..."
          @keyup.enter="addTask"
        />
      </ion-item>

      <ion-note class="stats-bar">
        Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
      </ion-note>

      <ion-text v-if="tasks.length === 0" class="empty-state">
        <p>No tasks yet. Add one above!</p>
      </ion-text>

      <ion-list>
        <ion-item v-for="task in tasks" :key="task.id">
          <ion-checkbox slot="start" v-model="task.done" />
          <ion-label :class="{ done: task.done }">{{ task.name }}</ion-label>
          <ion-button slot="end" color="danger" fill="clear" size="small" @click="removeTask(task.id)">
            <ion-icon :icon="trash" />
          </ion-button>
        </ion-item>
      </ion-list>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="addTask">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </ion-fab>
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
  display: block;
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
