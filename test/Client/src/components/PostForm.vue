<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  currentUser: { type: Object, required: true },
  isVisible: { type: Boolean, required: true }
});

const emit = defineEmits(['close', 'submit']);

// Form data structure to create a post
const formData = ref({
  title: '',
  body: '',
  tags: [] as string[],
  reactions: {
    likes: 0,
    dislikes: 0,
  },
  views: 0, 
  userId: props.currentUser ? props.currentUser.id : null, 
  imageUrl: '',
  timestamp: '',
  duration: 0,       
});

const tagsInput = ref('');

const closeForm = () => {
  emit('close');
};

const updateTags = () => {
  formData.value.tags = tagsInput.value.split(',').map(tag => tag.trim());
};

const submitForm = async () => {
  updateTags();
  
  formData.value.timestamp = new Date().toISOString();

  try {
    const response = await fetch('http://localhost:3001/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    const responseData = await response.json();
    console.log('Post created:', responseData);
    
    emit('submit', formData.value);
    closeForm();
  } catch (error) {
    console.error('Error submitting post:', error);
  }
};
</script>

<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <span class="close" @click="closeForm">&times;</span>
        <h2>Create a Post</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" v-model="formData.title" required />
          </div>
    
          <div class="form-group">
            <label for="body">Body:</label>
            <textarea v-model="formData.body" required></textarea>
          </div>
    
          <div class="form-group">
            <label for="tags">Tags (comma-separated):</label>
            <input type="text" v-model="tagsInput" @blur="updateTags" />
          </div>

          <!-- Duration Input -->
          <div class="form-group">
            <label for="duration">Duration (in minutes):</label>
            <input type="number" v-model="formData.duration" min="0" required />
          </div>
    
          <div class="form-group">
            <label for="imageUrl">Image URL (optional):</label>
            <input type="url" v-model="formData.imageUrl" placeholder="Enter image URL (optional)" />
          </div>
    
          <button type="submit" class="submit-btn">Submit</button>
        </form>
      </div>
    </div>
</template>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
}
  
.modal-content {
  background: #f9f9f9;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 350px;
  animation: slideIn 0.4s ease-out;
}
  
.close {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
}
  
h2 {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
}
  
.form-group {
  margin-bottom: 15px;
}
  
label {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
  color: #555;
}
  
input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}
  
input:focus, textarea:focus {
  border-color: #4CAF50;
}
  
.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
  
.submit-btn:hover {
  background-color: #45a049;
}
  
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
  
@keyframes slideIn {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
