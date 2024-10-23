<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import UserDropdown from './UserDropdown.vue';
import { defineEmits } from 'vue';

const isOpen = ref(false);
const loggedInUser = ref<{ id: number; name: string; profileImage: string } | null>(null);
const emit = defineEmits(['user-logged-in']); // Emit event for user-logged-in

// Function to handle user login when a user is selected
const handleUserLoggedIn = (user: { id: number; name: string; profileImage: string }) => {
  loggedInUser.value = user; 
  emit('user-logged-in', user);
};


// Function to log out the user and refresh the page
const logOut = () => {
  loggedInUser.value = null; 
  window.location.reload(); // Refresh the page
};
</script>

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink to="/Activity" class="navbar-item">Activity</RouterLink>
          <RouterLink to="/FriendsActivity" class="navbar-item">Friends Activity</RouterLink>
          <RouterLink to="/Statistics" class="navbar-item">Statistics</RouterLink>
          <RouterLink to="/Search" class="navbar-item">Search People</RouterLink>
          <RouterLink to="/Admin" class="navbar-item">Admin</RouterLink>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" v-if="loggedInUser">
              <img :src="loggedInUser.profileImage" alt="User profile" class="profile-image" />
              <span class="username">{{ loggedInUser.name }}</span>

              <!-- Display logout button and user profile image when logged in -->
              <button class="button is-light" @click="logOut">
                Log Out
              </button>
            </div>
            
            <div v-else>
              <!-- Display the UserDropdown when no user is logged in -->
              <UserDropdown @user-logged-in="handleUserLoggedIn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid blue;
}

.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 10px;
}
</style>
