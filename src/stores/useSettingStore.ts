import { LazyStore } from "@tauri-apps/plugin-store";
import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Theme } from "@/stores/useThemeStore";

export const useSettingStore = defineStore("setting", () => {
  type Layout = "clock" | "cal" | "cal-clock";
  type Lang = "en" | "zh-HK";
  type SettingsValue<K extends keyof Settings> = Settings[K];

  interface Settings {
    theme: Theme;
    layout: Layout;
    lang: Lang;
    fullscreen: boolean;
    showSeconds: boolean;
    sundayRed: boolean;
    autostart: boolean;
  }

  const defaultSettings: Settings = {
    theme: "dark",
    layout: "cal-clock",
    lang: "en",
    fullscreen: false,
    showSeconds: false,
    sundayRed: true,
    autostart: false,
  };

  const settings = ref<Settings>(defaultSettings);
  const store = new LazyStore("settings.json", { autoSave: 100 });

  const loadSettings = async () => {
    const stored = await getSettings();
    if (stored) {
      console.log("loaded settings", stored);
      // Merge stored settings with default settings to ensure all required keys exist
      settings.value = {
        ...defaultSettings,
        ...Object.fromEntries(Object.entries(stored).filter(([key]) => key in defaultSettings)),
      };
      if (settings.value.fullscreen) {
        toggleFullscreen();
      }
      // console.log('settings', settings.value)
    }
  };

  const saveSettings = async <K extends keyof Settings>(key: K, value: SettingsValue<K>) => {
    settings.value[key] = value;
    saveSettingsToStore();
  };

  const saveSettingsToStore = async () => {
    await store.set("settings", settings.value);
    await store.save();
  };

  const getSettings = async () => {
    try {
      const stored = await store.get<Settings>("settings");
      return stored;
    } catch {
      settings.value = defaultSettings;
      await store.set("settings", settings.value);
      await store.save();
    }
    return defaultSettings;
  };

  async function toggleFullscreen() {
    try {
      const appWindow = getCurrentWindow();
      const isFullscreen = await appWindow.isFullscreen();
      await appWindow.setFullscreen(!isFullscreen);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  // init when creating a store
  loadSettings();

  return {
    defaultSettings,
    saveSettingsToStore,
    settings,
    loadSettings,
    saveSettings,
    toggleFullscreen,
  };
});
