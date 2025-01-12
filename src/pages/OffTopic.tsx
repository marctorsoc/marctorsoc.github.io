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
Beyond data science, *a man has many faces*. 
In this section, you'll find posts that explore topics unrelated to my work. Enjoy!

Among them, I have spent some time learning the Lithuanian language. Here some resources about this:
* [LinguaQuest](https://play.google.com/store/apps/details?id=com.marc.torsoc.linguaquest), my app to help learning Lithuanian and other languages
* [Notes](https://docs.google.com/document/d/10_oMegG_znrgvay_M33PTWF6XIIypNG_Tji44IWA2eo/edit#heading=h.1nihs4t9nrtp) about Lithuanian language
* [Flash cards](https://www.brainscape.com/p/3P84P-LH-AAWC6) about Lithuanian language
* [Cooljugator](https://cooljugator.com/lt). This really applies to any language.
`;

export default function OffTopic() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    getAllPosts()
      .then(fetchedPosts => {
        const offTopicPosts = fetchedPosts.filter(post => 
          post.categories.includes('Off-topic')
        );
        setPosts(offTopicPosts);
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
      <HeroImage src="/content/offtopic2.jpg" />
      
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