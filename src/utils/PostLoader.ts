import frontMatter from 'front-matter';
import { Post } from '../types/Post';
import { generateId } from './textUtils';

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

async function importAll(): Promise<Post[]> {
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
          
          const lines = body.split('\n');
          const headers = [];
          let inCodeBlock = false;
          let headerIndex = 0;
          const headerIds = new Map<string, number>();
          
          for (let line of lines) {
            if (line.startsWith('```')) {
              inCodeBlock = !inCodeBlock;
              continue;
            }
            
            if (!inCodeBlock && /^(### |## |# )/.test(line)) {
              const level = line.startsWith('### ') ? 3 : line.startsWith('## ') ? 2 : 1;
              const text = line.replace(/^### |^## |^# /, '');
              
              // Generate a unique ID for duplicate headers
              const baseId = generateId(text);
              const count = headerIds.get(baseId) || 0;
              headerIds.set(baseId, count + 1);
              const id = count === 0 ? baseId : `${baseId}-${count}`;
              
              if (DEBUG) console.log('Found header:', { level, text, id });
              headers.push({ level, text, id });
            }
          }

          return {
            ...attributes,
            content: body,
            date: new Date(attributes.date).toISOString(),
            permalink: attributes.permalink || filepath
              .replace('/src/content/posts/', '')
              .replace('.md', ''),
            filename,
            toc: headers  // Add this line to include the TOC
          };
        } catch (error) {
          console.error(`❌ Error processing ${filepath}:`, error);
          return null;
        }
      })
    );

    const validPosts = posts.filter((post): post is Post => post !== null);
    
    if (DEBUG) console.log(`✅ Successfully loaded ${validPosts.length} posts`);
    
    if (validPosts.length === 0) {
      console.warn('⚠️ No valid posts were loaded');
    }

    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('❌ Fatal error loading posts:', error);
    return [];
  }
}

export const getPosts = importAll;