<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';

// Correctly define the type of currentUser to allow null or a user object
const currentUser = ref<{ id: number; name: string; profileImage: string } | null>(null);

// Handle user login
const handleUserLoggedIn = (user: { id: number; name: string; profileImage: string } | null) => {
  currentUser.value = user;
};

// Handle user logout
const handleUserLoggedOut = () => {
  currentUser.value = null; // Clear the current user state
};
</script>

<template>
  <header>
    <!-- Listen for user-logged-out event -->
    <NavBar @user-logged-in="handleUserLoggedIn" @user-logged-out="handleUserLoggedOut" />
  </header>

  <div class="container">
    <template v-if="currentUser">
      <RouterView :currentUser="currentUser" /> <!-- Pass currentUser as a prop -->
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
