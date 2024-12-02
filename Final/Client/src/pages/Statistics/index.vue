<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue';
import { getAll as getAllUsers, type User } from '@/models/users';
import { usePostsStore } from '@/store/posts';

const props = defineProps<{ currentUser: User }>();
const postsStore = usePostsStore();

const allUsers = computed(() => {
  return getAllUsers().data.filter(user => user.id !== 1);
}); 

const allPosts = computed(() => {
  return postsStore.getPosts().filter(post => post.userId !== 1);
});

// Getting current user posts
const userPosts = computed(() => {
  if (props.currentUser) {
    return allPosts.value.filter((post) => post.userId === props.currentUser.id);
  }
  return [];
});

// Workout Days
const workoutDays = computed(() => {
  const uniqueDates = new Set(userPosts.value.map(post => post.timestamp.split('T')[0]));
  return uniqueDates.size;
});

// Total Workouts
const totalWorkouts = computed(() => {
  return userPosts.value.length;
});

// Average Workout Duration
const averageDuration = computed(() => {
  const durations = userPosts.value.map(post => post.duration); // Ensure your post model includes duration
  const totalDuration = durations.reduce((sum, duration) => sum + duration, 0);
  return durations.length > 0 ? (totalDuration / durations.length).toFixed(2) : 0;
});

// Most Active Day
const mostActiveDay = computed(() => {
  const dayCount = userPosts.value.reduce((acc, post) => {
    const date = post.timestamp.split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxDay = Object.keys(dayCount).reduce((a, b) => dayCount[a] > dayCount[b] ? a : b);
  return { day: maxDay, count: dayCount[maxDay] || 0 };
});

// Total Reactions (if applicable)
const totalReactions = computed(() => {
  return userPosts.value.reduce((total, post) => total + (post.reactions ? post.reactions.likes : 0), 0);
});

// Workout Days Chart Data
const workoutDaysChartData = computed(() => {
  const otherUsers = allUsers.value.filter((user: User) => user.id !== props.currentUser.id && user.id !== 1);

  const otherUsersData = otherUsers.map((user: User) => {
    const userPostsForUser = allPosts.value.filter((post) => post.userId === user.id);
    const uniqueDates = new Set(userPostsForUser.map(post => post.timestamp.split('T')[0]));
    return {
      label: user.name,
      workoutDays: uniqueDates.size,
    };
  });

  return {
    labels: [props.currentUser.name, ...otherUsers.map((user: User) => user.name)],
    datasets: [
      {
        label: 'Workout Days',
        data: [workoutDays.value, ...otherUsersData.map(userData => userData.workoutDays)],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
});
</script>

<template>
  <div class="statistics-page">
    <h1>Your Statistics</h1>

    <div class="stat-item">
      <h2>Workout Days:</h2>
      <p>{{ workoutDays }} days</p>
    </div>

    <div class="stat-item">
      <h2>Total Workouts:</h2>
      <p>{{ totalWorkouts }} workouts</p>
    </div>

    <div class="stat-item">
      <h2>Average Workout Duration:</h2>
      <p>{{ averageDuration }} minutes</p>
    </div>

    <div class="stat-item">
      <h2>Most Active Day:</h2>
      <p>{{ mostActiveDay.day }} ({{ mostActiveDay.count }} workouts)</p>
    </div>

    <div class="stat-item">
      <h2>Total Reactions:</h2>
      <p>{{ totalReactions }} reactions</p>
    </div>
  </div>
</template>

<style scoped>
.statistics-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.stat-item {
  margin-top: 20px;
}
</style>
