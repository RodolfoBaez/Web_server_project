<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
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
          <RouterLink to="/" class="navbar-item">Home</RouterLink>
          <RouterLink to="/Activity" class="navbar-item">Activity</RouterLink>
          <RouterLink to="/FriendsActivity" class="navbar-item">Friends Activity</RouterLink>
          <RouterLink to="/Statistics" class="navbar-item">Statistics</RouterLink>
          <RouterLink to="/Search" class="navbar-item">Search People</RouterLink>
          <RouterLink to="/Admin" class="navbar-item">Admin</RouterLink>

        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <RouterLink to="/Signup" class="button is-primary">
                <strong>Sign up</strong>
              </RouterLink>
              <RouterLink to="/Login" class="button is-light">
                Log in
              </RouterLink>
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
</style>
