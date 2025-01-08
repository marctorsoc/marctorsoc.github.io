import frontMatter from 'front-matter';
import { Post } from '../types/Post';

async function importAll(): Promise<Post[]> {
  try {
    // Use Vite's import.meta.glob to get all markdown files
    const markdownFiles = import.meta.glob('/public/content/posts/*.md', { as: 'raw' });
    
    const posts = await Promise.all(
      Object.entries(markdownFiles).map(async ([filepath, loader]) => {
        try {
          const content = await loader();
          const { attributes, body } = frontMatter<{
            title: string;
            date: string;
            permalink: string;
            categories: string[];
            isPinned?: boolean;
          }>(content);

          return {
            ...attributes,
            content: body,
            date: new Date(attributes.date).toISOString(),
            permalink: attributes.permalink || filepath
              .replace('/public/content/posts/', '')
              .replace('.md', '')
          };
        } catch (error) {
          console.error(`Error processing post ${filepath}:`, error);
          return null;
        }
      })
    );

    // Filter out nulls and sort by date
    const validPosts = posts.filter((post): post is Post => post !== null);
    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

// Export the posts loader
export const getPosts = importAll; 