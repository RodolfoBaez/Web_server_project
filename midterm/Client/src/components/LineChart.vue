<template>
    <div class="line-chart">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LinearScale,
    PointElement,
    LineElement,
    type ChartData,
    type ChartOptions,
  } from 'chart.js';
  
  // Registering necessary components
  ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement, LineElement);
  
  // Props
  const props = defineProps({
    data: {
      type: Array as () => { day: string; hours: number }[],
      required: true,
    },
  });
  
  // Computed property for chart data
  const chartData = computed<ChartData<'line'>>(() => ({
    labels: props.data.map(item => item.day),
    datasets: [
      {
        label: 'Hours Worked Out',
        data: props.data.map(item => item.hours),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  }));
  
  // Chart options
  const chartOptions = computed<ChartOptions<'line'>>(() => ({
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hours Worked Out Over Time',
      },
    },
  }));
  </script>
  
  <style scoped>
  .line-chart {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  