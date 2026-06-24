<script setup>
import { ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
} from '@ionic/vue'

const notifications = ref(false)
const darkMode = ref(false)
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>Notifications</ion-label>
          <ion-toggle v-model="notifications" />
        </ion-item>
        <ion-item>
          <ion-label>Dark Mode</ion-label>
          <ion-toggle v-model="darkMode" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
