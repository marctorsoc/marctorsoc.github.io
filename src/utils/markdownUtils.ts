import frontMatter from 'front-matter';
import { Post } from '../types/Post';
import { getPosts } from './PostLoader';

export async function getAllPosts(): Promise<Post[]> {
  return getPosts();
}

// Add interface for frontmatter attributes
interface PostAttributes {
  title: string;
  date: string;
  categories: string[];
  permalink?: string;
  heroImage?: string;
  heroImageWidth?: string;
}

export async function getPost(slug: string): Promise<Post> {
  const DEBUG = false;
  try {
    if (DEBUG) console.log('🔍 Looking for post with slug:', slug);
    
    // First try to find the post by checking all posts' permalinks
    const allPosts = await getPosts();
    const postByPermalink = allPosts.find(post => {
      const cleanPermalink = post.permalink.replace(/^\/|\/$/g, '').split('/').pop();
      const cleanSlug = slug.replace(/^\/|\/$/g, '').split('/').pop();
      if (DEBUG) console.log(`Comparing ${cleanPermalink} with ${cleanSlug}`);
      return cleanPermalink === cleanSlug;
    });

    if (postByPermalink) {
      if (DEBUG) console.log('✅ Found post by permalink');
      return postByPermalink;
    }

    // If not found by permalink, try the old way with filenames
    const markdownFiles = import.meta.glob('/src/content/posts/*.md', {
      query: '?raw',
      import: 'default'
    });

    const filepath = Object.keys(markdownFiles).find(path => 
      path.includes(slug) || path.endsWith(`${slug}.md`)
    );

    if (!filepath || !markdownFiles[filepath]) {
      console.error(`❌ Post not found with slug: ${slug}`);
      throw new Error(`Post not found: ${slug}`);
    }

    const content = await markdownFiles[filepath]() as string;
    const { attributes, body } = frontMatter<PostAttributes>(content);

    if (!attributes || !attributes.title || !attributes.date) {
      console.error('❌ Missing required frontmatter in post:', filepath);
      throw new Error('Invalid post format');
    }

    // Now TypeScript knows the shape of attributes
    const post: Post = {
      title: attributes.title,
      date: new Date(attributes.date).toISOString(),
      categories: attributes.categories || ['Uncategorized'],
      content: body,
      permalink: attributes.permalink || filepath
        .replace('/src/content/posts/', '')
        .replace('.md', ''),
      filename: filepath.split('/').pop() || '',
      heroImage: attributes.heroImage,
      heroImageWidth: attributes.heroImageWidth
    };

    return post;
  } catch (error) {
    console.error('Error loading post:', error);
    throw error;
  }
}