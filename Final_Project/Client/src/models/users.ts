import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'; // Import necessary types
import { api } from './myFetch'; // Import the api function for making requests

// Function to add a new user
export function create(user: User): Promise<DataEnvelope<User>> {
  return api<DataEnvelope<User>>('users', user, 'POST');
}

// Function to delete a user by ID
export function remove(id: number): Promise<DataEnvelope<User>> {
  return api<DataEnvelope<User>>(`users/${id}`, undefined, 'DELETE'); 
}

// Function to get all users
export function getAll(): Promise<DataListEnvelope<User>> {
  return api<DataListEnvelope<User>>('users'); 
}

// Function to get a specific user by ID
export function getById(id: number): Promise<DataEnvelope<User>> {
  return api<DataEnvelope<User>>(`users/${id}`); 
}

// Function to get the user's role by their ID
export function getUserRoleById(id: number): Promise<string> {
  return api<DataEnvelope<User>>(`users/${id}`)
    .then(response => {
      if (response.data) {
        return response.data.role; // Return the role of the user
      } else {
        throw new Error('User not found');
      }
    })
    .catch(error => {
      console.error('Error fetching user role:', error);
      throw error;
    });
}



// User model with essential fields
export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  createdAt: string; 
  role: string; 
}

