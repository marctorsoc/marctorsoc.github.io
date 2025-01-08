import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Post } from '../types/Post';
import { PostCard } from '../components/PostCard';
import { getAllPosts } from '../utils/markdownUtils';
import HeroImage from '../components/HeroImage';

const markdown = `
In this section, I will post different resources that may be useful in your undergrad days, at work, or preparing a job interview. You will review something from the past, or maybe learn something new. I will include my findings in data science, coding, and maths.

I also keep notes about different topics in the form of Google Slides / Docs:

* <a href="https://docs.google.com/presentation/d/1abzvRA6VQyMPIfuLVh43QgDdgH-7XgnfE7v73kxNYWw/edit?usp=sharing">Machine Learning</a>
* <a href="https://docs.google.com/presentation/d/14B0zzok1l1Zl-lUTigtAKubvBdVwBQfxhh1XWADHCRo/edit?usp=sharing">NLP</a>
* <a href="https://docs.google.com/presentation/d/1EhUGzJlXeU0T1RZiDByrt9szTwanSFvTtFziHTyVFCk/edit?usp=sharing">Algorithms and coding</a>
* <a href="https://docs.google.com/presentation/d/1ugNBNu3AcacuTo5aGWleNnYK5JqrubO_AUpDDRh-yWM/edit?usp=sharing">Maths</a>
* <a href="https://docs.google.com/document/d/1_2iLYl4Jt9O4WU-AqZ4jYWluYUWTDx74kZfajKt6-_M/edit">SQL</a>

These do not pretend to be exhaustive and are (and will always be) in construction. I update them every now and then, 
as I find out new concepts, properties, or even better ways to explain concepts.
`;

export default function Divulgation() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    getAllPosts()
      .then(fetchedPosts => {
        const divulgationPosts = fetchedPosts.filter(post => 
          post.categories.includes('Divulgation')
        );
        setPosts(divulgationPosts);
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
      <HeroImage src="/content/divulgation.png" />
      
      <div className="max-w-4xl mx-auto pt-8">
        <div className="prose dark:prose-invert max-w-none mb-12">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
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