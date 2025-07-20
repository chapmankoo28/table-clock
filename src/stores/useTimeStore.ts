import { defineStore } from "pinia";
import { ref } from "vue";

export const useTimeStore = defineStore("time", () => {
  const time = ref<Date>(new Date());
  const timer = ref<ReturnType<typeof setInterval> | null>(null);
  const subscriberCount = ref(0);

  const startTimer = () => {
    updateTime();
    stop();
    if (!timer.value) {
      // calculate the delay then start timer
      const now = new Date();
      const delay = 1000 - now.getMilliseconds();
      setTimeout(() => {
        updateTime();
        timer.value = setInterval(updateTime, 1000);
      }, delay);
    }
  };

  const stop = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  };

  const start = () => {
    // ensure only one timer is running for the app
    subscriberCount.value++;
    if (subscriberCount.value === 1) {
      startTimer();
    }
  };

  const updateTime = () => {
    time.value = new Date();
  };

  return {
    time,
    timer,
    updateTime,
    start,
    stop,
  };
});
