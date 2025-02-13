import frontMatter from 'front-matter';
import { Post } from '../types/Post';
import { TOC_MIN_DEPTH, TOC_MAX_DEPTH } from './constants';
import { extractHeaders } from './tocUtils';

const DEBUG = import.meta.env.DEV;


function validatePostAttributes(attributes: any): attributes is Post {
  if (!attributes) {
    console.error('❌ Post attributes are undefined');
    return false;
  }

  const required = ['title', 'date', 'categories'];
  for (const field of required) {
    if (!(field in attributes)) {
      console.error(`❌ Missing required field: ${field}`);
      return false;
    }
  }

  const errors: string[] = [];

  if (typeof attributes.title !== 'string') {
    errors.push('title must be a string');
  }

  if (typeof attributes.date !== 'string' && !(attributes.date instanceof Date)) {
    errors.push('date must be a string or a Date object');
  }

  if (!Array.isArray(attributes.categories)) {
    errors.push('categories must be an array');
  }

  if (errors.length > 0) {
    console.error('Invalid post attributes:', errors);
    return false;
  }

  return true;
}

async function importAll(minDepth: number = TOC_MIN_DEPTH, maxDepth: number = TOC_MAX_DEPTH): Promise<Post[]> {
  if (DEBUG) console.log('🔄 Starting to load posts...');
  
  try {
    const markdownFiles = import.meta.glob('/src/content/posts/*.md', { 
      query: '?raw',
      import: 'default'
    });

    if (!markdownFiles || Object.keys(markdownFiles).length === 0) {
      console.error('❌ No markdown files found or glob pattern failed');
      return [];
    }

    if (DEBUG) console.log(`📑 Found ${Object.keys(markdownFiles).length} markdown files`);

    const posts = await Promise.all(
      Object.entries(markdownFiles).map(async ([filepath, loader]) => {
        try {
          if (DEBUG) console.log(`📖 Processing ${filepath}...`);
          
          const content = await loader() as string;
          if (!content) {
            console.error(`❌ Empty content for ${filepath}`);
            return null;
          }

          const { attributes, body } = frontMatter(content);
          
          if (!validatePostAttributes(attributes)) {
            console.error(`❌ Invalid post attributes in ${filepath}`, attributes);
            return null;
          }

          const filename = filepath.split('/').pop() || '';
          const headers = extractHeaders(body, minDepth, maxDepth);

          return {
            ...attributes,
            content: body,
            date: new Date(attributes.date).toISOString(),
            permalink: attributes.permalink || filepath
              .replace('/src/content/posts/', '')
              .replace('.md', ''),
            filename,
            toc: headers
          };
        } catch (error) {
          console.error(`❌ Error processing ${filepath}:`, error);
          return null;
        }
      })
    );

    const validPosts = posts
      .filter((post): post is NonNullable<typeof post> => post !== null)
      // Don't use type predicate here, just validate the date
      .filter(post => {
        try {
          const timestamp = new Date(post.date).getTime();
          if (isNaN(timestamp)) {
            console.error(`❌ Invalid date format in post: ${post.title}`);
            return false;
          }
          return true;
        } catch {
          console.error(`❌ Invalid date format in post: ${post.title}`);
          return false;
        }
      })
      // Type assertion in the map function
      .map((post): Post => ({
        ...post,
        date: new Date(post.date).toISOString()
      }));
    
    if (DEBUG) console.log(`✅ Successfully loaded ${validPosts.length} posts`);
    
    if (validPosts.length === 0) {
      console.warn('⚠️ No valid posts were loaded');
      return [];
    }

    // Sort posts with safe date comparison
    return validPosts.sort((a, b) => {
      try {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        
        if (isNaN(dateA) || isNaN(dateB)) {
          console.warn('⚠️ Invalid date comparison:', { a: a.date, b: b.date });
          return 0;
        }
        
        return dateB - dateA;
      } catch (error) {
        console.error('❌ Error comparing dates:', error);
        return 0;
      }
    });
  } catch (error) {
    console.error('❌ Fatal error loading posts:', error);
    return [];
  }
}

export const getPosts = () => importAll();