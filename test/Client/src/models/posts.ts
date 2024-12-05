import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'; // Import necessary types
import { api } from './myFetch'; // Import the api function for making requests

// Function to get all posts
export function getAll(): Promise<DataListEnvelope<Posts>> {
  return api<DataListEnvelope<Posts>>('posts'); // Assuming 'posts' is the correct endpoint
}

// Function to get a post by ID
export function getById(id: number): Promise<DataEnvelope<Posts>> {
  return api<DataEnvelope<Posts>>(`posts/${id}`); // Assuming 'posts/{id}' is the correct endpoint
}

// Function to create a new post
export function create(post: Posts): Promise<DataEnvelope<Posts>> {
  return api<DataEnvelope<Posts>>('posts', post, 'POST'); // Assuming 'POST' method for creating
}

// Function to update an existing post
export function update(post: Posts): Promise<DataEnvelope<Posts>> {
  return api<DataEnvelope<Posts>>(`posts/${post.id}`, post, 'PATCH'); // Assuming 'PATCH' method for updating
}

// Function to remove a post
export function remove(id: number): Promise<DataEnvelope<Posts>> {
  return api<DataEnvelope<Posts>>(`posts/${id}`, undefined, 'DELETE'); // Assuming 'DELETE' method for removing
}

// Reaction interface for tracking likes and dislikes
export interface Reaction {
  likes: number;
  dislikes: number;
}

// Function to delete all posts by a specific userId
export async function deleteAllByUserId(userId: number): Promise<void> {
  try {
    const posts = await getAll();
    const userPosts = posts.data.filter(post => post.userId === userId);

    // Delete each post matching the userId
    for (const post of userPosts) {
      await remove(post.id); // Remove each post by ID
    }
  } catch (error) {
    console.error('Error deleting posts by userId:', error);
  }
}


// Function to get total duration of posts by a specific userId
export async function getTotalDuration(userId: number): Promise<number> {
  try {
    const posts = await getAll();
    const userPosts = posts.data.filter(post => post.userId === userId);
    
    // Calculate the total duration for the posts
    const totalDuration = userPosts.reduce((sum, post) => sum + post.duration, 0);
    return totalDuration;
  } catch (error) {
    console.error('Error calculating total duration:', error);
    return 0; // Return 0 if an error occurs
  }
}

// Function to get total views of posts by a specific userId
export async function getTotalViews(userId: number): Promise<number> {
  try {
    const posts = await getAll();
    const userPosts = posts.data.filter(post => post.userId === userId);

    // Calculate the total views for the posts
    const totalViews = userPosts.reduce((sum, post) => sum + post.views, 0);
    return totalViews;
  } catch (error) {
    console.error('Error calculating total views:', error);
    return 0; // Return 0 if an error occurs
  }
}



// Posts model with the structure you provided
export interface Posts {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
  imageUrl: string;
  timestamp: string;
  duration: number;      
}
