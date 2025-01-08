import frontMatter from 'front-matter';
import { Post } from '../types/Post';
import { getPosts } from './PostLoader';

export async function getAllPosts(): Promise<Post[]> {
  return getPosts();
}

export async function getPost(slug: string): Promise<Post> {
  try {
    const response = await fetch(`/src/content/posts/${slug}.md?raw`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    const text = await response.text();
    const { attributes, body } = frontMatter<{
      title: string;
      date: string;
      permalink: string;
      categories: string[];
      isPinned?: boolean;
    }>(text);
    
    return {
      ...attributes,
      content: body,
      permalink: attributes.permalink || slug
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    throw error;
  }
} 