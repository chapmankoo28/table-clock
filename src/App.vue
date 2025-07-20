<script setup lang="ts">
import { RouterView } from "vue-router";
import { useTimeStore } from "@/stores/useTimeStore";
import { onBeforeUnmount, onMounted } from "vue";
import { useSettingStore } from "@/stores/useSettingStore";

const settingStore = useSettingStore();
const timeStore = useTimeStore();

onMounted(() => {
  timeStore.start();
  settingStore.loadSettings();
});

onBeforeUnmount(() => {
  timeStore.stop();
  settingStore.saveSettingsToStore();
});
</script>

<template>
  <div class="main-container">
    <RouterView />
  </div>
</template>

<style scoped>
.main-container {
  display: grid;
  place-content: center;
  grid-template-columns: 1fr;
  padding: 6px;
  min-height: 100vh;
  overflow-y: auto;
}

@media (max-width: 590px) {
  .main-container {
    padding: 2px;
  }
}
</style>
