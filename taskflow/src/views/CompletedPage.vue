<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/vue'
import { checkmarkCircle } from 'ionicons/icons'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const completedTasks = computed(() => tasks.value.filter(t => t.done))
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Completed</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p v-if="completedTasks.length === 0" class="empty-state">
        No completed tasks yet.
      </p>

      <ion-list v-else>
        <ion-item v-for="task in completedTasks" :key="task.id">
          <ion-icon :icon="checkmarkCircle" slot="start" color="success" />
          <ion-label>{{ task.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.empty-state {
  text-align: center;
  color: var(--ion-color-medium);
  font-style: italic;
  margin: 32px 0;
}
</style>
