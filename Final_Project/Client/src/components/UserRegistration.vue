<template>
    <div class="modal" :class="{ 'is-active': isModalOpen }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create New User</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="submitForm">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input 
                  class="input" 
                  type="text" 
                  v-model="formData.name" 
                  placeholder="Enter your name" 
                  required
                >
              </div>
            </div>
  
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input 
                  class="input" 
                  type="email" 
                  v-model="formData.email" 
                  placeholder="Enter your email" 
                  required
                >
              </div>
            </div>
  
            <div class="field">
              <label class="label">Profile Image URL</label>
              <div class="control">
                <input 
                  class="input" 
                  type="url" 
                  v-model="formData.profile_image" 
                  placeholder="Optional profile image URL"
                >
              </div>
            </div>
  
            <div class="field">
              <label class="label">Role</label>
              <div class="control">
                <div class="select">
                  <select v-model="formData.role" required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
  
            <div class="field is-grouped">
              <div class="control">
                <button 
                  type="submit" 
                  class="button is-link"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Creating...' : 'Create User' }}
                </button>
              </div>
              <div class="control">
                <button type="button" class="button is-link is-light" @click="closeModal">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue'
  import { create } from '@/models/users'
  import type { User } from '@/models/users'
  
  // Props and Emits
  const props = defineProps({
    isModalOpen: {
      type: Boolean,
      required: true
    }
  })
  
  const emit = defineEmits(['close', 'user-created'])
  
  // Form data and state
  const formData = ref<Omit<User, 'id' | 'createdAt'>>({
    name: '',
    email: '',
    profile_image: '',
    role: 'user'
  })
  
  const isSubmitting = ref(false)
  
  // Form submission handler
  const submitForm = async () => {
    if (!formData.value.name || !formData.value.email) {
      alert('Name and email are required')
      return
    }
  
    isSubmitting.value = true
    try {
      const response = await create(formData.value as User)
      
      if (response.isSuccess) {
        emit('user-created', response.data)
        closeModal()
      } else {
        alert(`Error: ${response.message}`)
      }
    } catch (error) {
      console.error('User creation error:', error)
      alert('Failed to create user')
    } finally {
      isSubmitting.value = false
    }
  }
  
  // Modal control methods
  const closeModal = () => {
    emit('close')
    // Reset form after closing
    formData.value = {
      name: '',
      email: '',
      profile_image: '',
      role: 'user'
    }
  }
  </script>
  
  <style scoped>
  .modal-card {
    max-width: 500px;
    margin: 0 auto;
  }
  </style>