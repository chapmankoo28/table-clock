<script lang="ts" setup>
import { PropType } from 'vue';
import { useThemeStore } from '../stores/useThemeStore'

interface Color {
  light: string
  dark: string
}

defineProps({
  path: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: Object as PropType<Color>,
    default: () => ({
      light: '#000000',
      dark: '#ffffff'
    })
  }
})

const themeStore = useThemeStore()
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 -960 960 960" :style="{ fill: color[themeStore.currentTheme] }"
    class="svg-icon">
    <path :d="path" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>