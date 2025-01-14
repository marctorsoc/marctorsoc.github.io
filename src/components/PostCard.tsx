import React from 'react';
import { Post } from '../types/Post';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import katex from 'katex';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import type { Components } from 'react-markdown';

// Map categories to colors
const categoryColors: { [key: string]: string } = {
  'Academia': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Off-topic': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'Divulgation': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
};

function Math({ children, inline = false }: { children: string, inline?: boolean }) {
  let html = '';
  try {
    html = katex.renderToString(children, {
      displayMode: !inline,
      throwOnError: false,
      trust: true,
      strict: false,
      fleqn: false,
      output: 'html',
      maxSize: 10,
      maxExpand: 1000,
      globalGroup: true,
      macros: {
        "\\RR": "\\mathbb{R}",
        "\\NN": "\\mathbb{N}",
        "\\ZZ": "\\mathbb{Z}"
      }
    });
  } catch (error) {
    console.error('KaTeX render error:', error, 'Input LaTeX:', children);
    html = `<span class="katex-error" style="color: #cc0000;">${children}</span>`;
  }

  return inline ? (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  ) : (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className="katex-display"
      style={{
        margin: '0 auto',
        textAlign: 'center',
        overflowX: 'auto',
        maxWidth: '100%',
      }}
    />
  );
}



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
        .replace(/(?:\\!){2,}/g, '\\!')
        .replace(/(?:\\,){2,}/g, '\\,');
      return `${start}${cleanBody}${end}`; // Keep \begin{equation}...\end{equation}
    }
  );

  return processed;
}

function processMathInText(text: string) {
  const parts = text.split(/(\$\$[^\$]+\$\$|\\begin{[\s\S]*?\\end{[\s\S]*?}|\$[^\$]+\$)/g);

  return parts.map((part, i) => {
    if (part.startsWith('$$') || (part.startsWith('\\begin') && part.endsWith('\\end'))) {
      // Block math
      const mathContent = part.startsWith('$$')
        ? part.slice(2, -2)
        : part;
      return <Math key={i} inline={false}>{mathContent}</Math>;
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      // Inline math
      const mathContent = part.slice(1, -1);
      return <Math key={i} inline={true}>{mathContent}</Math>;
    }
    // Plain text
    return part;
  });
}



const MarkdownComponents: Components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    const content = String(children).trim();

    // Handle math blocks
    if (content.startsWith('$') && content.endsWith('$')) {
      const mathContent = content.slice(1, -1);
      return <Math inline={true}>{mathContent}</Math>;
    }
    if (content.startsWith('$$') && content.endsWith('$$')) {
      const mathContent = content.slice(2, -2);
      return <Math inline={false}>{mathContent}</Math>;
    }
    
    const language = match ? match[1] : undefined;

    return !inline && language ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        {...props}
      >
        {content}
      </SyntaxHighlighter>
    ) : (
      <code className={`not-prose bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-['Courier New'] text-black dark:text-white text-sm`} {...props}>
        {children}
      </code>
    );
  },
  p(props) {
    const { children, ...rest } = props;
  
    return (
      <p {...rest}>
        {React.Children.map(children, child => {
          if (typeof child === 'string') {
            // Process text for inline and block math
            const parts = processMathInText(child);
  
            // Return all parts together (text and inline math)
            return parts;
          }
          return child;
        })}
      </p>
    );
  },  
  a(props) {
    const { href, children, ...rest } = props;
    if (href && href.startsWith('/')) {
      return (
        <Link to={href} {...rest}>
          {children}
        </Link>
      );
    }
    return <a href={href} {...rest}>{children}</a>;
  },

  strong(props) {
    const { children, ...rest } = props;
    return (
      <strong {...rest}>
        {React.Children.map(children, child => {
          if (typeof child === 'string') {
            return processMathInText(child);
          }
          return child;
        })}
      </strong>
    );
  },
  em(props) {
    const { children, ...rest } = props;
    return (
      <em {...rest}>
        {React.Children.map(children, child => {
          if (typeof child === 'string') {
            return processMathInText(child);
          }
          return child;
        })}
      </em>
    );
  },
  i(props) {
    const { children, ...rest } = props;
    return (
      <em {...rest}>
        {React.Children.map(children, child => {
          if (typeof child === 'string') {
            return processMathInText(child);
          }
          return child;
        })}
      </em>
    );
  },
  img(props) {
    return (
        <img {...props} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%'}}/>

    );
  }
};

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
      <h2 className={`${compact ? 'text-xl mb-2' : 'text-2xl mb-4'} font-bold mt-0`}>
        <Link 
          to={post.permalink} 
          className="post-title-link no-underline text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <div className={`flex flex-wrap items-center gap-2 text-base ${compact ? 'mb-2' : 'mb-3'}`}>
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
