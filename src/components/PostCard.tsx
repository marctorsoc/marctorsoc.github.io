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
  const html = katex.renderToString(children, {
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
  
  if (inline) {
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }
  
  return (
    <div className="my-6">
      <div 
        dangerouslySetInnerHTML={{ __html: html }}
        className="katex-display"
        style={{
          margin: '0 auto',
          textAlign: 'center',
          overflowX: 'auto',
          maxWidth: '100%'
        }}
      />
    </div>
  );
}

function preprocessContent(content: string): string {
  // First, normalize line breaks in align environments
  let processed = content.replace(/\\\\(\s*\n\s*&)/g, '\\\\ &');
  
  // Replace multiple backslashes with a single one (except in URLs, \!, and \,)
  processed = processed.replace(/\\{2,}(?![!,])(?![^\s]*\.md)/g, '\\');
  
  // Handle align environments
  processed = processed.replace(
    /(\\begin{align})([\s\S]*?)(\\end{align})/g,
    (_, start, body, end) => {
      // Clean up the body
      const cleanBody = body
        .trim()
        // Remove extra backslashes before newlines
        .replace(/\\\s*\n/g, '\n')
        // Replace multiple \! or \, with a single one
        .replace(/(?:\\!){2,}/g, '\\!')
        .replace(/(?:\\,){2,}/g, '\\,')
        // Add proper line breaks
        .split('\n')
        .filter(line => line.trim())
        .join(' \\\\ ');
      
      return `$$\\begin{aligned}${cleanBody}\\end{aligned}$$`;
    }
  );

  // Handle equation environments
  processed = processed.replace(
    /(\\begin{equation})([\s\S]*?)(\\end{equation})/g,
    (_, start, body, end) => {
      // Clean up the body
      const cleanBody = body
        .trim()
        // Remove extra backslashes before newlines
        .replace(/\\\s*\n/g, '\n')
        // Replace multiple \! or \, with a single one
        .replace(/(?:\\!){2,}/g, '\\!')
        .replace(/(?:\\,){2,}/g, '\\,');
      
      return `$$${cleanBody}$$`;
    }
  );

  return processed;
}

function processMathInText(text: string) {
  const parts = text.split(/(\$[^\$]+\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const mathContent = part.slice(1, -1);
      return <Math key={i} inline={true}>{mathContent}</Math>;
    }
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

    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
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
            return processMathInText(child);
          }
          return child;
        })}
      </p>
    );
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
  }
};

interface PostCardProps {
  post: Post;
  isPinned?: boolean;
  showFullContent?: boolean;
}

export function PostCard({ post, isPinned, showFullContent = false }: PostCardProps) {
  // Preprocess content to handle LaTeX environments
  const processedContent = preprocessContent(post.content || '');

  return (
    <article className="prose dark:prose-invert max-w-none bg-white dark:bg-black p-4 rounded-xl shadow-lg ring-1 ring-gray-900/5">
      <h2 className="text-2xl font-bold mb-4 mt-0">
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
      <div className={`${showFullContent ? '' : 'line-clamp-3'} text-gray-800 dark:text-gray-200 text-justify`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={MarkdownComponents}
        >
          {processedContent}
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