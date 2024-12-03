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
  duration: number;      // Duration of the exercise in minutes
}
