import frontMatter from 'front-matter';
import { Post } from '../types/Post';
import { getPosts } from './PostLoader';

// Cache for permalink to filename mapping
let permalinkMap: Map<string, string> | null = null;

async function buildPermalinkMap(): Promise<Map<string, string>> {
  if (permalinkMap) return permalinkMap;
  
  const posts = await getPosts();
  permalinkMap = new Map();
  
  for (const post of posts) {
    const cleanPermalink = post.permalink.replace(/^\/|\/$/g, ''); // Remove leading/trailing slashes
    const parts = cleanPermalink.split('/');
    const slug = parts[parts.length - 1]; // Get the last part of the permalink
    permalinkMap.set(slug, post.filename);
  }
  
  return permalinkMap;
}

export async function getAllPosts(): Promise<Post[]> {
  return getPosts();
}

export async function getPost(slug: string): Promise<Post> {
  try {
    const map = await buildPermalinkMap();
    const filename = map.get(slug);
    
    if (!filename) {
      throw new Error(`Post not found: ${slug}`);
    }

    const response = await fetch(`/src/content/posts/${filename}?raw`);
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
      permalink: attributes.permalink || slug,
      filename
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    throw error;
  }
} 