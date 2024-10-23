<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';

// State to hold the currently logged-in user
const currentUser = ref(null);

// Function to handle user login when a user is selected
const handleUserLoggedIn = (user) => {
  currentUser.value = user; // Set the selected user as the logged-in user
};
</script>

<template>
  <header>
    <NavBar @user-logged-in="handleUserLoggedIn" /> <!-- Pass the handler to NavBar -->
  </header>

  <div class="container">
    <RouterView :currentUser="currentUser" /> <!-- Pass the currentUser to RouterView -->
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
</style>
