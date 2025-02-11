import { Post } from '../types/Post';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MarkdownComponents from './MarkdownComponents';
import { categoryColors } from '../utils/constants';
import { HeaderIndexProvider, useHeaderIndex } from '../context/HeaderIndexContext';

function preprocessContent(content: string): string {
  // First, normalize line breaks in align environments
  let processed = content.replace(/\\\\(\s*\n\s*&)/g, '\\\\ &');

  // Replace multiple backslashes with a single one (except in URLs, \!, and \,)
  processed = processed.replace(/\\{2,}(?![!,])(?![^\s]*\.md)/g, '\\');

  // Handle align environments correctly
  processed = processed.replace(
    /(\\begin{align})([\s\S]*?)(\\end{align})/g,
    (_, _start, body) => {
      const cleanBody = body
        .trim()
        .replace(/\\\s*\n/g, '\n')
        .replace(/(?:\\!){2,}/g, '\\!')
        .replace(/(?:\\,){2,}/g, '\\,')
        .split('\n')
        .filter((line: string) => line.trim())
        .join(' \\\\ ');
      
      return `$$\\begin{aligned}${cleanBody}\\end{aligned}$$`;
    }
  );

  // Handle equation environments correctly
  processed = processed.replace(
    /(\\begin{equation})([\s\S]*?)(\\end{equation})/g,
    (_, start, body, end) => {
      const cleanBody = body
        .trim()
        .replace(/\\\s*\n/g, '\n')
        .replace(/(?:\\!){2,}/g, '\\!') // Add missing quote here
        .replace(/(?:\\,){2,}/g, '\\,');
      return `${start}${cleanBody}${end}`; // Keep \begin{equation}...\end{equation}
    }
  );

  return processed;
}

interface PostCardProps {
  post: Post;
  isPinned?: boolean;
  showFullContent?: boolean;
  maxPreviewChars?: number;
  compact?: boolean;
}

export function PostCard({ post, showFullContent = false, compact = false }: PostCardProps) {
  // Add null checks at the top of component
  if (!post || !post.categories) {
    console.error('PostCard: Missing post data or categories', { post });
    return null;
  }

  const safeContent = post.content || '';
  
  // Preprocess content to handle LaTeX environments
  const processedContent = preprocessContent(safeContent);

  // Safer extraction of first paragraph with fallback
  const firstParagraphMatch = processedContent.match(/^(.*?)(?:\n\n|$)/s);
  const firstParagraph = firstParagraphMatch ? firstParagraphMatch[1].trim() : 'No content available';

  // Move categories validation outside JSX
  if (!Array.isArray(post.categories)) {
    console.warn('PostCard: categories is not an array', { categories: post.categories });
    post.categories = []; // Provide empty array as fallback
  }

  return (
    <article className={`prose dark:prose-invert max-w-none bg-white dark:bg-black p-4 rounded-xl shadow-lg ring-1 ring-gray-900/5 ${
      compact ? 'h-[200px] flex flex-col' : ''
    }`}>
      <h2 className={`${
        showFullContent 
          ? 'text-3xl' 
          : compact 
            ? 'text-xl' 
            : 'text-2xl'
        } font-bold mt-0 mb-4`}
      >
        {showFullContent ? (
          <span className="text-gray-900 dark:text-gray-100">
            {post.title}
          </span>
        ) : (
          <Link 
            to={post.permalink} 
            className="post-title-link no-underline text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {post.title}
          </Link>
        )}
      </h2>
      <div className={`flex flex-wrap items-center gap-2 text-base ${compact ? 'mb-2' : 'mb-3'}`}>
        <time className="text-gray-700 dark:text-gray-300 flex items-center">
          {new Date(post.date).toLocaleDateString('en-CA').replace(/-/g, '/')}
        </time>
        {post.categories.map(category => (
          <Link 
            key={category}
            to={`/blog?category=${encodeURIComponent(category)}`}
            className={`category-tag no-underline px-2 py-0.5 rounded-full hover:opacity-90 transition-opacity ${categoryColors[category] || 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {category}
          </Link>
        ))}
      </div>
      {showFullContent && post.toc && post.toc.length > 0 && (
        <>
          <nav className="toc mb-4">
            <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
            <ul className="space-y-2 list-none p-0">
              {post.toc.map(header => {
                // Adjust level to make level 2 the base (no indentation)
                const minLevel = Math.min(...post.toc.map(h => h.level));
                const adjustedLevel = Math.max(0, header.level - minLevel);
                
                return (
                  <li
                    key={header.id}
                    style={{ marginLeft: `${adjustedLevel * 1.5}rem` }}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <a 
                      href={`#${header.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(header.id);
                        if (element) {
                          element.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          });
                          window.history.pushState(null, '', `#${header.id}`);
                        }
                      }}
                      className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline"
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Override default components to render plain text
                          p: ({children}) => <>{children}</>,
                          code: ({children}) => <>{children}</>,
                          strong: ({children}) => <strong>{children}</strong>,
                          em: ({children}) => <em>{children}</em>
                        }}
                      >
                        {header.text}
                      </ReactMarkdown>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <hr className="my-8 border-t border-gray-200 dark:border-gray-800" />
        </>
      )}

      
      {post.heroImage && showFullContent && (
        <div
            className={`mb-6 ${showFullContent ? '' : 'hidden'}`} 
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
        >
            <img
              src={post.heroImage}
              alt={post.title}
              className="rounded-t-xl"
              style={{
                  maxWidth: post.heroImageWidth || '100%',
                  objectFit: 'contain'
              }}
            />
        </div>
      )}

      <div className={`text-gray-800 dark:text-gray-200 ${compact ? 'text-sm flex-grow overflow-hidden' : 'text-justify'}`}>
        <div className={!showFullContent ? 'line-clamp-3' : ''}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={MarkdownComponents}
          >
            {showFullContent ? processedContent : firstParagraph}
          </ReactMarkdown>
        </div>
      </div>
      {!showFullContent && (
        <div className={`${compact ? 'text-sm mt-2' : 'mt-2'}`}>
          <Link 
            to={post.permalink}
            className="text-blue-600 dark:text-blue-400 no-underline"
          >
            <span className="inline-block transition-[text-decoration-color] duration-1000 [text-decoration-color:transparent] hover:[text-decoration-color:currentColor] underline">
              Read more
            </span>
          </Link>
        </div>
      )}
    </article>
  );
}
