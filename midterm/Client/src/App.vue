<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';

const currentUser = ref(null);

const handleUserLoggedIn = (user: null) => {
  currentUser.value = user; 
};
</script>

<template>
  <header>
    <NavBar @user-logged-in="handleUserLoggedIn" /> 
  </header>

  <div class="container">
    <template v-if="currentUser">
      <RouterView :currentUser="currentUser" /> 
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
