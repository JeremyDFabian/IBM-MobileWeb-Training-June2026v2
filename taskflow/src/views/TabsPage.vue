<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="day1" href="/tabs/day1">
          <ion-icon aria-hidden="true" :icon="clipboard" />
          <ion-label>Day 1</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="day4" href="/tabs/day4">
          <ion-icon aria-hidden="true" :icon="list" />
          <ion-label>Day 4</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { clipboard, list } from 'ionicons/icons';
</script>
