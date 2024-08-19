<template>
  <div>
    <div>
      <button v-for="(day, index) in weatherData" :key="index" @click="selectedDay = index">
        {{ day.date }}
      </button>
    </div>

    <div v-if="selectedDay !== null">
      <h2>Weather for {{ weatherData[selectedDay].date }}</h2>
      <div v-for="hour in weatherData[selectedDay].hours" :key="hour.time">
        <p>{{ hour.time }}: {{ hour.temp }}°</p>
      </div>
    </div>
  </div>
</template>
//this page displays the current location data, a link back to change the city, and the hourly temp data
<script lang="ts">
import { defineComponent, ref } from 'vue'
import HourlyForcast from './HourlyForcast.vue'

interface HourlyWeather {
  time: string
  temp: number
}

interface DailyWeather {
  date: string
  hours: HourlyWeather[]
}

export default defineComponent({
  props: {
    weatherData: {
      type: Array as () => DailyWeather[],
      required: true
    }
  },
  setup() {
    const selectedDay = ref<number | null>(0)

    return {
      selectedDay
    }
  }
})
</script>
