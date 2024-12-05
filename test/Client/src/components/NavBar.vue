<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import UserDropdown from './UserDropdown.vue';
import UserRegistrationForm from './UserRegistration.vue';

// Define reactive states
const isOpen = ref(false);
const loggedInUser = ref<{ id: number; name: string; profileImage: string; role: string } | null>(null); // Added role
const isRegistrationModalOpen = ref(false);  

// Define events
const emit = defineEmits(['user-logged-in', 'user-logged-out']);

// Handle user login
const handleUserLoggedIn = (user: { id: number; name: string; profileImage: string; role: string }) => {
  loggedInUser.value = user;
  emit('user-logged-in', user);
  // Store user data in localStorage, including the role
  localStorage.setItem('loggedInUser', JSON.stringify(user));
};

// Handle logout
const logOut = () => {
  loggedInUser.value = null;
  emit('user-logged-out');
  // Remove user data from localStorage
  localStorage.removeItem('loggedInUser');
};

// Handle user creation (after user submits the form)
const handleUserCreated = (user: { id: number; name: string; profileImage: string; role: string }) => {
  handleUserLoggedIn(user);
};

// Modal close handler
const closeModal = () => {
  isRegistrationModalOpen.value = false;
};

// Retrieve the user from localStorage when the page loads
onMounted(() => {
  const storedUser = localStorage.getItem('loggedInUser');
  if (storedUser) {
    loggedInUser.value = JSON.parse(storedUser); // Restore user from localStorage
  }
});
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
              <img
                :src="loggedInUser.profileImage || '@/assets/default-profile.png'"
                alt="User profile"
                class="profile-image"
              />
              <span class="username">{{ loggedInUser.name }}</span>
              <span class="role" v-if="loggedInUser.role">{{ loggedInUser.role }}</span> <!-- Display the role -->
              <button class="button is-light" @click="logOut">Log Out</button>
            </div>
            <div v-else>
              <!-- Register Button -->
              <button 
                class="button is-primary" 
                @click="isRegistrationModalOpen = true"
              >
                Register
              </button>

              <!-- User Dropdown for login -->
              <UserDropdown @user-logged-in="handleUserLoggedIn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- User Registration Modal -->
  <UserRegistrationForm
    :is-modal-open="isRegistrationModalOpen"
    @close="closeModal"
    @user-created="handleUserCreated"
  />
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
  object-fit: cover;
}

.username {
  margin-left: 10px;
}

.role {
  margin-left: 5px;
  font-size: 0.9rem;
  color: gray;
}
</style>
