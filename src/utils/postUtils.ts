import { Post } from '../types/Post';
import { getPosts } from './PostLoader';
import frontMatter from 'front-matter';

export interface PostAttributes {
  title: string;
  date: string;
  categories: string[];
  permalink?: string;
  heroImage?: string;
  heroImageWidth?: string;
}

export async function getAllPosts(): Promise<Post[]> {
  return getPosts();
}

export async function getPost(slug: string): Promise<Post> {
  const DEBUG = false;
  try {
    if (DEBUG) console.log('🔍 Looking for post with slug:', slug);
    
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
    return parseMarkdownFile(content, filepath);
  } catch (error) {
    console.error('Error loading post:', error);
    throw error;
  }
}

export function parseMarkdownFile(content: string, filepath: string): Post {
  const { attributes, body } = frontMatter<PostAttributes>(content);

  if (!attributes || !attributes.title || !attributes.date) {
    console.error('❌ Missing required frontmatter in post:', filepath);
    throw new Error('Invalid post format');
  }

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
}
