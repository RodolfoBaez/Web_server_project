<script setup lang="ts">
import { ref } from 'vue';

const workoutTitle = ref('');
const workoutType = ref('');
const workoutFrequency = ref('daily');
const workoutTags = ref('');
const workoutImage = ref<File | null>(null);

const handleSubmit = () => {
  if (!workoutTitle.value || !workoutImage.value || !workoutType.value) {
    alert('Please provide a workout title, type, frequency, and image.');
    return;
  }
  
  const formData = new FormData();
  formData.append('title', workoutTitle.value);
  formData.append('type', workoutType.value);
  formData.append('frequency', workoutFrequency.value);
  formData.append('tags', workoutTags.value);
  if (workoutImage.value) {
    formData.append('image', workoutImage.value);
  }

  console.log('Form submitted', {
    title: workoutTitle.value,
    type: workoutType.value,
    frequency: workoutFrequency.value,
    tags: workoutTags.value,
    image: workoutImage.value,
  });

  workoutTitle.value = '';
  workoutType.value = '';
  workoutFrequency.value = 'daily';
  workoutTags.value = '';
  workoutImage.value = null;
};
</script>

<template>
    <div>
        <h1 class="title">Incoming Soon</h1>
        <h2 class="title">Todo:</h2>
        <h2 class="title">Display user activity data here</h2>

        <form @submit.prevent="handleSubmit" class="activity-form">
            <div>
                <label for="title">Workout Title:</label>
                <input type="text" id="title" v-model="workoutTitle" required />
            </div>
            <div>
                <label for="type">Workout Type:</label>
                <select id="type" v-model="workoutType" required>
                    <option value="">Select Type</option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                    <option value="flexibility">Flexibility</option>
                </select>
            </div>
            <div>
                <label for="frequency">Frequency:</label>
                <select id="frequency" v-model="workoutFrequency">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <div>
                <label for="tags">Tags (comma-separated):</label>
                <input type="text" id="tags" v-model="workoutTags" />
            </div>
            <div>
                <label for="image">Upload Image:</label>
                <input type="file" id="image" @change="event => workoutImage.value = event.target.files[0]" accept="image/*" required />
            </div>
            <button type="submit">Log Activity</button>
        </form>
    </div>
</template>

<style scoped>
.activity-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.activity-form div {
    margin-bottom: 15px;
}

.activity-form label {
    margin-bottom: 5px;
}

.activity-form input,
.activity-form select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.activity-form button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.activity-form button:hover {
    background-color: #0056b3;
}
</style>
