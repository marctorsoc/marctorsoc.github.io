import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Post } from '../types/Post';
import { PostCard } from '../components/PostCard';
import { getAllPosts } from '../utils/markdownUtils';
import HeroImage from '../components/HeroImage';
import 'katex/dist/katex.min.css';

const markdown = `
Welcome to my blog! Here you'll find posts about various topics, including:
- Technical deep dives
- Career insights
- Personal experiences
- Random thoughts and musings
`;

export default function Blog() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    getAllPosts()
      .then(fetchedPosts => {
        // Show all blog posts, not filtering by category anymore
        setPosts(fetchedPosts);
      })
      .catch(err => {
        console.error('Error loading posts:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      {/* <HeroImage src="/content/offtopic2.jpg" /> */}
      
      <div className="max-w-4xl mx-auto pt-8">
        <div className="prose dark:prose-invert max-w-none mb-12">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]} 
            rehypePlugins={[rehypeRaw, rehypeKatex]}
          >
            {markdown}
          </ReactMarkdown>
        </div>

        {loading && (
          <div className="text-gray-600 dark:text-gray-400 mb-4">
            Loading posts...
          </div>
        )}

        {error && (
          <div className="text-red-600 dark:text-red-400 mb-4">
            Error loading posts: {error}
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid gap-8 md:grid-cols-1">
            {posts.map(post => (
              <PostCard key={post.permalink} post={post} showFullContent={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
