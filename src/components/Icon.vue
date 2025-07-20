<script lang="ts" setup>
import { useThemeStore } from "@/stores/useThemeStore";
import { computed } from "vue";

interface Props {
  path: string;
  size?: number | string;
  color?: Color;
}

interface Color {
  light: string;
  dark: string;
}

const { path, size = 24, color = { light: "#000000", dark: "#ffffff" } } = defineProps<Props>();

const themeStore = useThemeStore();
const fillColor = computed(() => {
  return themeStore.currentTheme === "dark" ? color.dark : color.light;
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 -960 960 960"
    :style="{ fill: fillColor }"
    class="svg-icon"
  >
    <path :d="path" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
