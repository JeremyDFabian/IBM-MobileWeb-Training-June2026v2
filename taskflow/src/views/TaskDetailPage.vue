<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import { Camera } from '@capacitor/camera'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonBadge,
  IonButton,
  IonImg,
} from '@ionic/vue'

const route = useRoute()
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const task = computed(() =>
  tasks.value.find(t => t.id === Number(route.params.id))
)

async function capturePhoto() {
  if (!task.value) return
  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: 'uri',
    })
    taskStore.addPhotoToTask(task.value.id, photo.webPath)
  } catch (error) {
    console.error('Photo capture failed:', error)
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tasks" />
        </ion-buttons>
        <ion-title>Task Detail</ion-title>
        <ion-buttons slot="end">
          <ion-button shape="round" @click="capturePhoto" class="camera-btn">
            📷
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="task" class="task-detail">
        <div class="task-header ion-padding">
          <h1>{{ task.name }}</h1>
          <ion-badge :color="task.done ? 'success' : 'warning'" class="status-badge">
            {{ task.done ? 'Completed' : 'Pending' }}
          </ion-badge>
        </div>

        <div class="photo-container ion-padding">
          <ion-img v-if="task.photo" :src="task.photo" class="detail-photo" />
          <div v-else class="no-photo">
            📸 No photo yet. Tap the camera button to add one.
          </div>
        </div>
      </div>

      <p v-else class="not-found">Task not found.</p>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.task-detail {
  display: flex;
  flex-direction: column;
}

.task-header {
  border-bottom: 1px solid var(--ion-border-color);
  padding-left: 16px !important;
  padding-right: 16px !important;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
}

.task-header h1 {
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;
  word-wrap: break-word;
}

.status-badge {
  font-size: 12px;
  padding: 6px 12px;
  display: inline-block;
}

.photo-container {
  display: flex;
  justify-content: center;
}

.detail-photo {
  width: 100%;
  max-width: 280px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.no-photo {
  padding: 40px 20px;
  text-align: center;
  color: var(--ion-color-medium);
  font-size: 14px;
}

.camera-btn {
  width: 44px;
  height: 44px;
  padding: 0;
  font-size: 20px;
}

.not-found {
  text-align: center;
  color: var(--ion-color-medium);
  font-style: italic;
  margin: 32px 0;
}
</style>
