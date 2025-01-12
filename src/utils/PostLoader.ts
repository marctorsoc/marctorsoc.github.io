import frontMatter from 'front-matter';
import { Post } from '../types/Post';

async function importAll(): Promise<Post[]> {
  try {
    // Update the path to src directory and use the new query syntax
    const markdownFiles = import.meta.glob('/src/content/posts/*.md', { 
      query: '?raw',
      import: 'default'
    });
    
    const posts = await Promise.all(
      Object.entries(markdownFiles).map(async ([filepath, loader]) => {
        try {
          const content = await loader() as string;  // Add type assertion here
          const { attributes, body } = frontMatter<{
            title: string;
            date: string;
            permalink: string;
            categories: string[];
            isPinned?: boolean;
          }>(content);

          // Extract filename from filepath
          const filename = filepath.split('/').pop() || '';

          return {
            ...attributes,
            content: body,
            date: new Date(attributes.date).toISOString(),
            permalink: attributes.permalink || filepath
              .replace('/src/content/posts/', '')
              .replace('.md', ''),
            filename
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