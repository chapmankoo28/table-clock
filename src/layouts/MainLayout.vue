<script lang="ts" setup>
import SettingIcon from '@/components/SettingIcon.vue'
import { useSettingStore } from '@/stores/useSettingStore'
import CalView from '@/views/CalView.vue'
import ClockView from '@/views/ClockView.vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { RouterLink } from 'vue-router'

const settingStore = useSettingStore()

getCurrentWindow().listen('tauri://back-requested', () => {
  getCurrentWindow().close()
})
</script>

<template>
  <RouterLink to="/setting" class="setting">
    <SettingIcon />
  </RouterLink>
  <div class="container">
    <CalView
      v-if="settingStore.settings.layout === 'cal-clock' || settingStore.settings.layout === 'cal'"
    />
    <ClockView
      v-if="
        settingStore.settings.layout === 'clock' || settingStore.settings.layout === 'cal-clock'
      "
    />
  </div>
</template>

<style scoped>
.setting {
  /* place it at the bottom-right */
  position: fixed;
  right: 1em;
  bottom: 1em;
  z-index: 1000;
  padding: 5px;
}

.container {
  display: grid;
  grid-template-columns: 2fr 3fr;
  place-content: center;
}

.container > *:only-child {
  grid-column: 1 / -1;
}

@media (max-width: 590px) {
  .container {
    /* default single row */
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .container:not(:has(*:only-child)) {
    /* two rows only when it got multiple children */
    grid-template-rows: repeat(2, 1fr);
  }
}
</style>
