import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post as PostType } from '../types/Post';
import { getPost } from '../utils/markdownUtils';
import { PostCard } from '../components/PostCard';

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<PostType | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }

    getPost(slug)
      .then(fetchedPost => {
        setPost(fetchedPost);
      })
      .catch(err => {
        console.error('Error loading post:', err);
        setError(err.message);
      });
  }, [slug, navigate]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-red-600 dark:text-red-400">
          Error loading post: {error}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-gray-600 dark:text-gray-400">
          Loading post...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PostCard post={post} showFullContent={true} />
    </div>
  );
} 