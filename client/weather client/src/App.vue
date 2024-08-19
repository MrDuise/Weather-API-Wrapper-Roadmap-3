<template>
  <div>
    <router-view />
    
    <WeatherPage v-if="weatherData.length" :weatherData="weatherData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MainPage from './views/MainPage.vue'
import WeatherPage from './views/WeatherPage.vue'

interface HourlyWeather {
  time: string
  temp: number
}

interface DailyWeather {
  date: string
  hours: HourlyWeather[]
}

export default defineComponent({
  components: {
    MainPage,
    WeatherPage
  },
  setup() {
    const weatherData = ref<DailyWeather[]>([])

    const getWeather = async ({
      location,
      unit
    }: {
      location: string
      unit: 'us' | 'uk' | 'metric'
    }) => {
      try {
        const response = await fetch(`your-api-url?location=${location}&unit=${unit}`)
        weatherData.value = await response.json()
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    return {
      weatherData,
      getWeather
    }
  }
})
</script>
