<template>
  <div>
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  data: {
    type: Object as () => {
      labels: string[];
      datasets: Array<{
        label: string;
        data: number[];
        backgroundColor: string;
      }>;
    },
    required: true,
  },
  options: {
    type: Object,
    default: () => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Workout Statistics',
        },
      },
    }),
  },
});
</script>

<style scoped>
</style>
