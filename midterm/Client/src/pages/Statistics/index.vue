<script setup lang="ts">
import { computed, watch } from 'vue';
import BarChart from '@/components/BarChart.vue';
import LineChart from '@/components/LineChart.vue';
import { getAll as getAllUsers, type User } from '@/models/users';
import { usePostsStore } from '@/store/posts';

const props = defineProps<{ currentUser: User }>();
const postsStore = usePostsStore();

const allUsers = computed(() => getAllUsers().data); 
const allPosts = computed(() => postsStore.getPosts()); 

//getting current user post
const userPosts = computed(() => {
  if (props.currentUser) {
    return allPosts.value.filter((post) => post.userId === props.currentUser.id);
  }
  return [];
});

const workoutDays = computed(() => {
  const uniqueDates = new Set(userPosts.value.map(post => post.timestamp.split('T')[0]));
  return uniqueDates.size;
});

const workoutDaysChartData = computed(() => {
  const otherUsers = allUsers.value.filter((user: User) => user.id !== props.currentUser.id);

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

const hoursOverDays = computed(() => {
  const data: { day: string; hours: number }[] = [];
  userPosts.value.forEach(post => {
    const date = post.timestamp.split('T')[0];
    const existingDay = data.find(d => d.day === date);
    if (existingDay) {
      existingDay.hours += post.duration || 0;
    } else {
      data.push({ day: date, hours: post.duration || 0 });
    }
  });
  return data.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
});

</script>

<template>
  <div class="statistics-page">
    <h1>Your Statistics</h1>

    <BarChart :data="workoutDaysChartData" />    
    <LineChart :data="hoursOverDays" />

    <div class="stat-item">
      <h2>Workout Days:</h2>
      <p>{{ workoutDays }} days</p>
    </div>
  </div>
</template>

<style scoped>
.statistics-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.user-posts {
  margin-top: 30px;
}
</style>
