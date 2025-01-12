<script lang="ts" setup>
import { computed } from 'vue';
import { useTimeStore } from '../stores/useTimeStore';
import { useSettingStore } from '../stores/useSettingStore';

const timeStore = useTimeStore();
const settingStore = useSettingStore()

const time = computed(() => new Date(timeStore.time.getTime()));
const formattedTime = computed(() => {
  const output = time.value.getHours().toString().padStart(2, '0') + ':' + time.value.getMinutes().toString().padStart(2, '0')
  if (settingStore.settings.showSeconds) {
    return output + ':' + time.value.getSeconds().toString().padStart(2, '0')
  }
  return output
})
</script>

<template>
  <div class="clock" :class="settingStore.settings.showSeconds ? '' : 'no-seconds'">
    <div>
      {{ formattedTime }}
    </div>
  </div>
</template>

<style scoped>
.clock {
  font-size: 5em;
  font-weight: bold;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  margin: auto;
  user-select: none;
}

.no-seconds {
  font-size: 8em !important;
}

@media (max-width: 595px) {
  .no-seconds {
    font-size: 6em !important;
  }
}

@media (min-width: 850px) {
  .clock {
    font-size: 6em;
  }

  .no-seconds {
    font-size: 10em !important;
  }
}

@media (min-width: 1024px) {
  .clock {
    font-size: 8em;
  }

  .no-seconds {
    font-size: 12em !important;
  }
}

@media (min-width: 1280px) {
  .clock {
    font-size: 10em;
  }

  .no-seconds {
    font-size: 14em !important;
  }
}

@media (min-width: 1536px) {
  .clock {
    font-size: 12em;
  }

  .no-seconds {
    font-size: 16em !important;
  }
}
</style>