import React from 'react';
import { Post } from '../types/Post';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Map categories to colors
const categoryColors: { [key: string]: string } = {
  'Academia': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Off-topic': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'Divulgation': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
};

const MarkdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

interface PostCardProps {
  post: Post;
  isPinned?: boolean;
  showFullContent?: boolean;
}

export function PostCard({ post, isPinned, showFullContent = false }: PostCardProps) {
  return (
    <article className="prose dark:prose-invert max-w-none bg-white dark:bg-black p-4 rounded-xl shadow-lg ring-1 ring-gray-900/5">
      <h2 className="text-xl font-bold mb-2 mt-0">
        <Link 
          to={post.permalink} 
          className="post-title-link no-underline text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <div className="flex flex-wrap items-center gap-2 text-base mb-3">
        <time className="text-gray-700 dark:text-gray-300 flex items-center">
          {new Date(post.date).toLocaleDateString('en-CA').replace(/-/g, '/')}
        </time>
        {post.categories.map(category => (
          <Link 
            key={category}
            to={`/${category.toLowerCase()}`}
            className={`category-tag no-underline px-2 py-0.5 rounded-full hover:opacity-90 transition-opacity ${categoryColors[category] || 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {category}
          </Link>
        ))}
      </div>
      <div className={`${showFullContent ? '' : 'line-clamp-3'} text-gray-800 dark:text-gray-200`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={MarkdownComponents}
        >
          {post.content || ''}
        </ReactMarkdown>
      </div>
      {!showFullContent && (
        <Link 
          to={post.permalink}
          className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Read more →
        </Link>
      )}
    </article>
  );
} 