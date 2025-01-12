import React from 'react';
import { Post } from '../types/Post';
import { PostCard } from '../components/PostCard';
import { getAllPosts } from '../utils/markdownUtils';
import ProfileSidebar from '../components/ProfileSidebar';

export default function Home() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    setLoading(true);
    getAllPosts()
      .then(fetchedPosts => {
        console.log('Loaded posts:', fetchedPosts);
        setPosts(fetchedPosts || []);
      })
      .catch(err => {
        console.error('Error loading posts:', err);
        setError(err.message);
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const pinnedPosts = posts?.filter(post => post.isPinned) || [];
  const recentPosts = posts?.slice(0, 6) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="relative w-full mb-4">
        <div className="relative w-full flex justify-center">
          <img
            src="/content/nepal3.png"
            alt="Hero image"
            className="w-full max-h-[400px] object-contain"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_300px] gap-8 mb-12 max-w-3xl mx-auto pt-4">
        <section className="prose dark:prose-invert max-w-prose flex flex-col justify-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-6">Welcome to my website!</h2>
            <p>
              A place to share my experiences, resources, and hobbies. 
              Use the menu above to explore the different sections, and learn a bit more about me.
            </p>
            <p>Have a beautiful day! 😃</p>
          </div>
        </section>

        <ProfileSidebar />
      </div>

      <div>
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

        {pinnedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Pinned Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pinnedPosts.map(post => (
                <PostCard key={post.permalink} post={post} maxPreviewChars={100} compact={true} />
              ))}
            </div>
          </section>
        )}

        {recentPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map(post => (
                <PostCard key={post.permalink} post={post} maxPreviewChars={100} compact={true} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}