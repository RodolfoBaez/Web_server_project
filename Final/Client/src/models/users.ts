import data from '../data/users.json'; 
import type { DataListEnvelope } from './dataEnvelope'; 

// In-memory representation of users
let users = [...data.items]; 

export function getAll(): DataListEnvelope<User> {
  return {
    data: users,  
    total: users.length,
    isSuccess: true // Adding the missing 'isSuccess' property
  };
}

export function deleteUser(userId: number): void {
  users = users.filter(user => user.id !== userId);
}

export interface User {
  id: number;
  name: string;
  profileImage: string; 
}
