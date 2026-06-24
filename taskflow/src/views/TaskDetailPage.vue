<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonNote,
  IonBadge,
} from '@ionic/vue'

const route = useRoute()
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const task = computed(() =>
  tasks.value.find(t => t.id === Number(route.params.id))
)
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tasks" />
        </ion-buttons>
        <ion-title>Task Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="task">
        <ion-item>
          <ion-label>
            <ion-note>ID</ion-note>
            <p>{{ task.id }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <ion-note>Name</ion-note>
            <p>{{ task.name }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <ion-note>Status</ion-note>
            <p>
              <ion-badge :color="task.done ? 'success' : 'warning'">
                {{ task.done ? 'Completed' : 'Pending' }}
              </ion-badge>
            </p>
          </ion-label>
        </ion-item>
      </div>

      <p v-else class="not-found">Task not found.</p>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.not-found {
  text-align: center;
  color: var(--ion-color-medium);
  font-style: italic;
  margin: 32px 0;
}

ion-note {
  font-size: 12px;
  display: block;
  margin-bottom: 4px;
}

ion-item p {
  margin: 4px 0 8px;
  font-size: 16px;
}
</style>
