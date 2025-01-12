<script lang="ts" setup>
import BackIcon from '../components/BackIcon.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useThemeStore } from '../stores/useThemeStore'
import { useSettingStore } from '../stores/useSettingStore'
import { useI18n } from 'vue-i18n'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { onBeforeRouteLeave } from 'vue-router'
import { platform } from '@tauri-apps/plugin-os';

const { t, locale } = useI18n({ useScope: 'global' })
const themeStore = useThemeStore()
const settingStore = useSettingStore()
const appWindow = getCurrentWindow();
const isFullscreen = ref(false);
const currentPlatform = platform();

onMounted(async () => {
  isFullscreen.value = await appWindow.isFullscreen()
  await appWindow.listen('tauri://resize', async () => {
    isFullscreen.value = await appWindow.isFullscreen()
  })
})

onBeforeRouteLeave(() => settingStore.saveSettingsToStore())

const settings = computed({
  get: () => settingStore.settings,
  set: (newSettings) => {
    settingStore.settings = newSettings
    settingStore.saveSettingsToStore()
  }
})

watch(
  () => settingStore.settings.lang,
  (newLang) => {
    locale.value = newLang
  },
  { immediate: true }
)

const changeTheme = (theme: 'light' | 'dark') => {
  themeStore.setTheme(theme)
}
</script>

<template>
  <div class="setting-view">
    <nav>
      <ul>
        <li>
          <RouterLink to="/">
            <BackIcon />
          </RouterLink>
        </li>
      </ul>
      <ul>
        <li>
          <h1>{{ t('settings.settings') }}</h1>
        </li>
      </ul>
      <ul>
        <li>
        </li>
      </ul>
    </nav>

    <hr>

    <div class="setting-item dropdown">
      <p class="setting-title">{{ t('settings.appearance') }}
        <!--: {{ themeStore.currentTheme }} {{ settings.theme }}  -->
      </p>
      <select class="setting-option" aria-label="Select" v-model="themeStore.currentTheme"
        @change="changeTheme(themeStore.currentTheme)">
        <option value="light">{{ t('settings.light') }}</option>
        <option value="dark">{{ t('settings.dark') }}</option>
      </select>
    </div>

    <hr />

    <div class="setting-item dropdown">
      <p class="setting-title">
        {{ t('settings.lang') }}
        <!--: {{ settings.lang }} -->
      </p>
      <select class="setting-option" aria-label="Select" v-model="settings.lang">
        <option value="en">{{ t('settings.en') }}</option>
        <option value="zh-HK">{{ t('settings.zh-HK') }}</option>
      </select>
    </div>

    <hr />

    <div class="setting-item dropdown">
      <p class="setting-title">
        {{ t('settings.layout') }}
        <!--: {{ settings.layout }} -->
      </p>
      <select class="setting-option" aria-label="Select" v-model="settings.layout">
        <option value="clock">{{ t('settings.clock') }}</option>
        <option value="cal">{{ t('settings.cal') }}</option>
        <option value="cal-clock">{{ t('settings.cal') }} | {{ t('settings.clock') }}</option>
        <!-- <option value="clock-cal">{{ t('settings.clock') }} | {{ t('settings.cal') }}</option> -->
      </select>
    </div>

    <hr />

    <div v-if="currentPlatform !== 'android'">
      <div class="setting-item switch">
        <p class="setting-title">
          {{ t('settings.fullscreen') }}
          <!--: {{ settings.fullscreen }} {{ isFullscreen }} -->
        </p>
        <input name="fullscreen" type="checkbox" role="switch" v-model="settings.fullscreen" />
        <button @click="settingStore.toggleFullscreen()" class="outline">
          {{ isFullscreen ? t('settings.exitFullscreen') : t('settings.enterFullscreen') }}
        </button>
      </div>
      
      <hr />
    </div>

    <div class="setting-section">
      <div class="setting-item">
        <p class="setting-section-title">
          {{ t('settings.clock') }}
        </p>
      </div>

      <div class="setting-item switch">
        <p class="setting-title">
          {{ t('settings.showSeconds') }}
          <!--: {{ settings.showSeconds }} -->
        </p>
        <input name="showSeconds" type="checkbox" role="switch" v-model="settings.showSeconds" />
      </div>
    </div>

    <hr />

    <div class="setting-section">
      <div class="setting-item">
        <p class="setting-section-title">
          {{ t('settings.cal') }}
        </p>
      </div>
      <div class="setting-item switch">
        <p class="setting-title">
          {{ t('settings.sundayRed') }}
          <!--: {{ settings.sundayRed }} -->
        </p>
        <input name="sundayRed" type="checkbox" role="switch" v-model="settings.sundayRed" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.setting-view {
  width: 500px;
  margin: 0 auto;
}

.setting-item {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

input[type="number"][name="number"] {
  width: auto;
  margin-bottom: 0;
}

hr {
  margin: 10px 0;
  width: 100%;
}

.setting-title {
  font-size: large;
}

.setting-section {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}


.setting-section-title {
  font-size: x-large;
  font-weight: bold;
}

.setting-option {
  font-size: large;
  -webkit-user-select: none;
  user-select: none;
  width: auto;
  cursor: pointer;
  margin-bottom: 0;
}

@media (max-width: 590px) {
  .setting-view {
    width: 100%;
    padding: 0 10px;
  }

  .dropdown,
  .input {
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    gap: 5px;
  }

  .setting-select {
    width: 100%;
  }
}
</style>