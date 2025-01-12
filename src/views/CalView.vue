<script setup lang="ts">
import { computed, watch } from 'vue'
import { useTimeStore } from '../stores/useTimeStore';
import { useSettingStore } from '../stores/useSettingStore';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n({ useScope: 'global' })

const settingStore = useSettingStore()
const timeStore = useTimeStore();

const currentDate = computed(() => new Date(timeStore.time.getTime()));
const year = currentDate.value.getFullYear()
const month = currentDate.value.getMonth()
const todayString = currentDate.value.toDateString()

const currentYearMonth = computed(() => {
  return new Intl.DateTimeFormat(settingStore.settings.lang, {
    year: 'numeric', month: 'long'
  }).format(currentDate.value)
})

watch(() => settingStore.settings.lang, (newLang) => {
  locale.value = newLang;
});

const weekdays = ['0', '1', '2', '3', '4', '5', '6']

const getDateForDay = (day: string | number) => new Date(year, month, Number(day))

const isToday = (day: string | number) => {
  return getDateForDay(day).toDateString() === todayString;
}

const isRedSunday = (day: string | number) => {
  if (!settingStore.settings.sundayRed) return false
  const dayIndex = getDateForDay(day).getDay();
  return dayIndex === 0;
}

const calendarWeeks = computed(() => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  let currentWeek: string[] = []
  const weeks = []
  let weekNum = 0

  // Add leading spaces
  for (let i = 0; i < firstDay.getDay(); i++) {
    currentWeek.push('  ')
  }

  // Add days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day)
    const dayStr = day.toString().padStart(2, ' ')

    currentWeek.push(dayStr)

    if (date.getDay() === 6 || day === lastDay.getDate()) {
      // Pad the last week if needed
      if (day === lastDay.getDate() && date.getDay() !== 6) {
        for (let i = date.getDay(); i < 6; i++) {
          currentWeek.push('  ')
        }
      }
      weeks.push({
        weekNum: weekNum++,
        days: currentWeek
      })
      currentWeek = []
    }
  }

  return weeks
})
</script>

<template>
  <div class="calendar">
    <div>
      <div class="header">
        {{ currentYearMonth }}
      </div>
      <hr />
      <div class="calendar-grid">
        <div class="weekdays">
          <div v-for="w in weekdays" :key="w" class="weekday"
            :class="{ 'redSunday': w === '0' && settingStore.settings.sundayRed }">
            {{ t(`weekdays.${w}`) }}</div>
        </div>
        <hr />

        <div v-for="week in calendarWeeks" :key="week.weekNum" class="weeks">
          <div v-for="day in week.days" class="week">
            <div :class="['day', { 'today': isToday(day) }, { 'redSunday': isRedSunday(day) }]" :key="day">
              {{ day }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  margin: auto;
  display: grid;
  place-content: center;
  max-width: 500px;
  height: 100%;
  width: 100%;
  --size: 3em;
  user-select: none;
}

hr {
  border-top: 2px solid var(--pico-muted-border-color);
}

.header {
  text-align: center;
  margin-bottom: 0;
  font-size: var(--size);
  font-weight: bold;
}

.calendar-grid {
  display: flex;
  flex-direction: column;
}

.weekday {
  width: var(--size);
  font-weight: bold;
  font-size: 1em;
  margin: 0.5em 0;
}

.weekdays,
.weeks {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.week {
  width: var(--size);
}

.day {
  height: var(--size);
  width: var(--size);
  display: grid;
  place-items: center;
  font-weight: 500;
  vertical-align: middle;
  position: relative;
}

.redSunday {
  color: #be0000;
}

.today {
  width: var(--size);
  height: var(--size);
  color: white;
  font-weight: bold;
}

.today::before {
  content: '';
  position: absolute;
  width: 2.25em;
  height: 2.25em;
  background-color: #820000;
  border-radius: 50%;
  z-index: -1;
}

@media (max-width: 850px) {
  .calendar {
    --size: 2em;
  }

  .today::before {
    width: 2em;
    height: 2em;
  }
}
</style>