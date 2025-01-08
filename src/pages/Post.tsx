import React from 'react';
import { useParams } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import { getPost } from '../utils/markdownUtils';
import { Post as PostType } from '../types/Post';

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = React.useState<PostType | null>(null);

  React.useEffect(() => {
    if (slug) {
      getPost(slug).then(setPost);
    }
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return <PostCard post={post} />;
} 