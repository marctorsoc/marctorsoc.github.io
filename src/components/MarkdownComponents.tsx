import React from 'react';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Math from './Math';
import type { Components } from 'react-markdown';
import { generateId } from '../utils/textUtils';

interface ReactElementWithChildren {
  props: {
    children?: React.ReactNode;
  };
}

function isReactElementWithChildren(obj: any): obj is ReactElementWithChildren {
  return obj && typeof obj === 'object' && 'props' in obj && typeof obj.props === 'object';
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

function getTextContent(children: React.ReactNode): string {
  if (children === null || children === undefined) {
    return '';
  }
  if (typeof children === 'string' || typeof children === 'number') {
    return children.toString();
  }
  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }
  if (isReactElementWithChildren(children)) {
    return getTextContent(children.props.children || '');
  }
  return '';
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
        PreTag="pre"
        customStyle={{
            margin: "0em",
            padding: "0.5em",
            backgroundColor: '#1f2937', // Set to same color as vscDarkPlus
            border: 'none', // Remove border
            outline: 'none', // Remove outline
          }}
        {...props}
      >
        {content}
      </SyntaxHighlighter>
    ) : 
    // inline blocks
    (
      <code
        className={`not-prose bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded font-['Courier New'] text-black dark:text-white text-sm border-none`}
        {...props}
      >
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
  },

  h1: ({children}) => {
    const text = getTextContent(children);
    const id = generateId(text);
    return <h1 id={id}>{children}</h1>;
  },
  h2: ({children}) => {
    const text = getTextContent(children);
    const id = generateId(text);
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({children}) => {
    const text = getTextContent(children);
    const id = generateId(text);
    return <h3 id={id}>{children}</h3>;
  },
  h4: ({children}) => {
    const text = getTextContent(children);
    const id = generateId(text);
    return <h4 id={id}>{children}</h4>;
  },
  h5: ({children}) => {
    const text = getTextContent(children);
    const id = generateId(text);
    return <h5 id={id}>{children}</h5>;
  },
  h6: ({children}) => {
    const text = getTextContent(children);
    const id = generateId(text);
    return <h6 id={id}>{children}</h6>;
  },
};

export default MarkdownComponents;
