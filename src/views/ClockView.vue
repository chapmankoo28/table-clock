<script lang="ts" setup>
import { computed } from "vue";
import { useTimeStore } from "@/stores/useTimeStore";
import { useSettingStore } from "@/stores/useSettingStore";

const timeStore = useTimeStore();
const settingStore = useSettingStore();

const time = computed(() => new Date(timeStore.time.getTime()));
const formattedTime = computed(() => {
  const output =
    time.value.getHours().toString().padStart(2, "0") +
    ":" +
    time.value.getMinutes().toString().padStart(2, "0");
  if (settingStore.settings.showSeconds) {
    return output + ":" + time.value.getSeconds().toString().padStart(2, "0");
  }
  return output;
});
</script>

<template>
  <div
    class="clock"
    :class="settingStore.settings.showSeconds ? 'clock-show-seconds' : 'clock-no-seconds'"
  >
    {{ formattedTime }}
  </div>
</template>

<style scoped>
.clock {
  font-weight: bold;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  margin: auto;
  user-select: none;
}

.clock-show-seconds {
  font-size: 5em;
}

.clock-no-seconds {
  font-size: 8em;
}

@media (max-width: 595px) {
  .clock-no-seconds {
    font-size: 6em;
  }
}

@media (min-width: 850px) {
  .clock-show-seconds {
    font-size: 6em;
  }

  .clock-no-seconds {
    font-size: 10em;
  }
}

@media (min-width: 1024px) {
  .clock-show-seconds {
    font-size: 8em;
  }

  .clock-no-seconds {
    font-size: 12em;
  }
}

@media (min-width: 1280px) {
  .clock-show-seconds {
    font-size: 10em;
  }

  .clock-no-seconds {
    font-size: 14em;
  }
}

@media (min-width: 1536px) {
  .clock-show-seconds {
    font-size: 12em;
  }

  .clock-no-seconds {
    font-size: 16em;
  }
}
</style>
