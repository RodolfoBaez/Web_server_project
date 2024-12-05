<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';

// Correctly define the type of currentUser to allow null or a user object including role
const currentUser = ref<{ id: number; name: string; profileImage: string; role: string } | null>(null);

// Handle user login
const handleUserLoggedIn = (user: { id: number; name: string; profileImage: string; role: string } | null) => {
  console.log('User logged in:', user); // Debugging: log user object during login
  currentUser.value = user;
  // Store user data in localStorage, including the role
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user)); // Save entire user data including role
    console.log('Saved to localStorage:', localStorage.getItem('currentUser')); // Debugging: log localStorage content
  } else {
    localStorage.removeItem('currentUser'); // Remove from localStorage if logged out
  }
};

// Handle user logout
const handleUserLoggedOut = () => {
  currentUser.value = null; // Clear the current user state
  localStorage.removeItem('currentUser'); // Remove from localStorage
  console.log('User logged out and data cleared from localStorage');
};

// On page load, check if a user is already logged in and include role
onMounted(() => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser); // Retrieve full user object including role from localStorage
    console.log('User loaded from localStorage:', currentUser.value); // Debugging: log retrieved user
  }
});
</script>

<template>
  <header>
    <!-- Listen for user-logged-in and user-logged-out events -->
    <NavBar @user-logged-in="handleUserLoggedIn" @user-logged-out="handleUserLoggedOut" />
  </header>

  <div class="container">
    <template v-if="currentUser">
      <RouterView :currentUser="currentUser" /> <!-- Pass currentUser as a prop including role -->
    </template>
    <template v-else>
      <div class="login-prompt">
        <h2>Please log in to access the content.</h2>
      </div>
    </template>
  </div>
</template>

<style scoped>
body {
  background-color: aliceblue;
}

.container {
  background-color: white;
  box-shadow: drop-shadow(0 0 10px rgba(0, 0, 0, 0.8));
  min-height: 100vh;
}

.login-prompt {
  text-align: center;
  padding: 20px;
}
</style>
