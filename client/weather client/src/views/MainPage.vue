<template>
  <div>
    <h1>Enter Your Location</h1>
    <input v-model="location" placeholder="City or ZIP code" />

    <h2>Select Units</h2>
    <select v-model="unit">
      <option value="us">US (°F)</option>
      <option value="uk">UK (°C, miles)</option>
      <option value="metric">Metric (°C, km)</option>
    </select>

    <button @click="fetchWeather">Get Weather</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      location: '' as string,
      unit: 'us' as 'us' | 'uk' | 'metric'
    }
  },
  methods: {
    fetchWeather() {
      this.$emit('get-weather', { location: this.location, unit: this.unit })
    }
  }
})
</script>
