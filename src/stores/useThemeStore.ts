/*!
 * Based on Minimal theme switcher by Pico.css - https://picocss.com
 * Copyright 2019-2024 - Licensed under MIT
 */
import { defineStore } from "pinia";
import { ref } from "vue";
import { useSettingStore } from "@/stores/useSettingStore";
import { watch } from "vue";

export type Theme = "light" | "dark";

export const useThemeStore = defineStore("theme", () => {
  const currentTheme = ref<Theme>("dark");
  const settingStore = useSettingStore();

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme;
    settingStore.saveSettings("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
    localStorage.setItem("picoPreferredColorScheme", theme);
  };

  watch(
    () => settingStore.settings.theme,
    (newTheme) => {
      if (newTheme !== currentTheme.value) {
        setTheme(newTheme);
      }
    },
  );

  // init when creating a store
  setTheme(settingStore.settings.theme);

  return {
    currentTheme,
    setTheme,
  };
});
