<template>
    <div class="statistics-page">
      <h1>Your Statistics</h1>
  
      <div class="stat-item">
        <h2>Workout Days:</h2>
        <p>{{ workoutDays }} days</p>
      </div>
      
      <div class="stat-item">
        <h2>Total Workout Hours:</h2>
        <p>{{ totalWorkoutHours }} hours</p>
      </div>
      
      <div class="stat-item">
        <h2>Workout Types:</h2>
        <ul>
          <li v-for="(count, type) in workoutTypes" :key="type">
            {{ type }}: {{ count }} times
          </li>
        </ul>
      </div>
      
      <div class="stat-item">
        <h2>Total Likes on Posts:</h2>
        <p>{{ totalLikes }}</p>
      </div>
      
      <div class="stat-item">
        <h2>Total Dislikes on Posts:</h2>
        <p>{{ totalDislikes }}</p>
      </div>
      
      <div class="stat-item">
        <h2>Most Used Tag:</h2>
        <p>{{ mostUsedTag }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { getAll as getAllPosts, type Post } from '@/models/posts';
  
  const props = defineProps(['currentUser']);
  const allPosts = ref(getAllPosts().data);
  
  // Filter posts by the current user
  const userPosts = computed(() => {
    if (props.currentUser) {
      return allPosts.value.filter((post: Post) => post.userId === props.currentUser.id);
    }
    return [];
  });
  
  // Statistics calculations
  const workoutDays = computed(() => {
    const uniqueDates = new Set(userPosts.value.map(post => post.timestamp.split('T')[0])); // Extracting unique dates
    return uniqueDates.size;
  });
  
  const totalWorkoutHours = computed(() => {
    return userPosts.value.reduce((total, post) => total + (post.duration || 0), 0); // Summing durations
  });
  
  const workoutTypes = computed(() => {
    return userPosts.value.reduce((acc, post) => {
      acc[post.exerciseType] = (acc[post.exerciseType] || 0) + 1; // Counting types of workouts
      return acc;
    }, {} as Record<string, number>);
  });
  
  const totalLikes = computed(() => {
    return userPosts.value.reduce((total, post) => total + post.reactions.likes, 0); // Total likes
  });
  
  const totalDislikes = computed(() => {
    return userPosts.value.reduce((total, post) => total + post.reactions.dislikes, 0); // Total dislikes
  });
  
  const mostUsedTag = computed(() => {
    const tagCount = userPosts.value.reduce((acc, post) => {
      post.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1; // Counting tags
      });
      return acc;
    }, {} as Record<string, number>);
    
    return Object.keys(tagCount).reduce((a, b) => tagCount[a] > tagCount[b] ? a : b, ''); // Finding the most used tag
  });
  </script>
  
  <style scoped>
  .statistics-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .stat-item {
    margin-bottom: 20px;
  }
  
  h1, h2 {
    color: #333;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  </style>
  