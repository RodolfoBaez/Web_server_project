<template>
  <div>
    <h1>User Stats - Best to Worst Ranking</h1>

    <!-- Display the ranked list of users by total duration -->
    <div v-if="rankedByDuration.length > 0">
      <h2>Ranking of Users by Total Duration</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Duration (minutes)</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in rankedByDuration" :key="user.id" :class="{'highlight': currentUser && user.id === currentUser.id}">
            <td>{{ user.name }}</td>
            <td>{{ user.totalDuration }}</td>
            <td>{{ index + 1 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Display the ranked list of users by total views -->
    <div v-if="rankedByViews.length > 0">
      <h2>Ranking of Users by Total Views</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Views</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in rankedByViews" :key="user.id" :class="{'highlight': currentUser && user.id === currentUser.id}">
            <td>{{ user.name }}</td>
            <td>{{ user.totalViews }}</td>
            <td>{{ index + 1 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>No users found or data is loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { getAll as getAllUsers } from '@/models/users'; // Assuming there's a method to get all users
import { getTotalDuration, getTotalViews } from '@/models/posts'; // The functions for total duration and views

export default {
  name: 'StatsPage',
  setup() {
    const users = ref<any[]>([]);
    const rankedByDuration = ref<any[]>([]);
    const rankedByViews = ref<any[]>([]);
    const currentUser = ref<{ id: number; name: string } | null>(null);

    // Fetch current user from localStorage
    onMounted(async () => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        currentUser.value = JSON.parse(storedUser); // Retrieve the current user from localStorage

        // Fetch all users
        try {
          const response = await getAllUsers(); // Fetch all users
          users.value = response.data; // Assuming response contains users data in 'data' field
          await fetchUserStats();
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    });

    // Function to calculate total duration and total views for each user
    const fetchUserStats = async () => {
      const userStats = await Promise.all(
        users.value.map(async (user) => {
          const totalDuration = await getTotalDuration(user.id);
          const totalViews = await getTotalViews(user.id);

          return {
            ...user,
            totalDuration,
            totalViews,
          };
        })
      );

      // Sort users by total duration and total views separately
      rankedByDuration.value = userStats.sort((a, b) => b.totalDuration - a.totalDuration); // Rank by total duration
      rankedByViews.value = userStats.sort((a, b) => b.totalViews - a.totalViews); // Rank by total views
    };

    return {
      rankedByDuration,
      rankedByViews,
      currentUser,
    };
  },
};
</script>

<style scoped>
/* Style for the table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

/* Highlight current user in the table */
.highlight {
  background-color: yellow; /* Highlight color for current user */
  font-weight: bold;
}
</style>
