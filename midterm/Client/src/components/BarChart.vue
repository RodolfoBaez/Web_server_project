<template>
    <div>
      <Bar :chart-data="chartData" :options="options" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  // Register Chart.js components
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  const props = defineProps({
    chartData: {
      type: Object,
      required: true
    }
  });
  
  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Workout Days',
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  