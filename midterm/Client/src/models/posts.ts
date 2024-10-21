import data from '../data/posts.json';
import type { DataListEnvelope } from './dataEnvelope';

export function getAll(): DataListEnvelope<Post> {
  return {
    data: data.items,
    total: data.total
  }
}

export interface Reaction {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
  username: string;  
  imageUrl: string;
}
