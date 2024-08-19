<template>
  <div class="hourly-forecast">
    <div class="hourly-header">
      <h2>Hourly Forecast</h2>
    </div>
    <div class="hourly-grid">
      <div v-for="hour in hourlyData" :key="hour.datetimeEpoch" class="hourly-item">
        <div class="hourly-time">{{ formatTime(hour.datetime) }}</div>
        <div class="hourly-icon">
          <img :src="getIconUrl(hour.icon)" :alt="hour.conditions" />
        </div>
        <div class="hourly-temp">{{ hour.temp.toFixed(1) }}°F</div>
        <div class="hourly-feelslike">Feels like: {{ hour.feelslike.toFixed(1) }}°F</div>
        <div class="hourly-conditions">{{ hour.conditions }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {Data} from '../data/interfaces'


export default defineComponent({
    props: {
    hourlyData: {
      type: Array as PropType<Data.HourlyWeather[]>,
      required: true
    }
  },

  methods: {
    formatTime(datetime: string): string {
      const [hour, minute] = datetime.split(':')
      return `${hour}:${minute}`
    },
    getIconUrl(icon: string): string {
      // Adjust the URL as needed based on where your icons are stored
      return `https://example.com/icons/${icon}.png`
    },
  }
})
</script>

<style scoped>
.hourly-forecast {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.hourly-header h2 {
  margin: 0;
  font-size: 1.5em;
}

.hourly-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hourly-item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.hourly-time {
  font-weight: bold;
  flex: 1;
}

.hourly-icon img {
  width: 40px;
  height: 40px;
}

.hourly-temp {
  font-size: 1.2em;
  flex: 1;
}

.hourly-feelslike {
  color: #555;
  flex: 1;
}

.hourly-conditions {
  font-style: italic;
  flex: 2;
}
</style>
