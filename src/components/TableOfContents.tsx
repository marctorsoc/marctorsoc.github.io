import React, { useState } from 'react';
import { Header } from '../utils/tocUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface TableOfContentsProps {
  headers: Header[];
  className?: string;
  indentSize?: number; // New prop for configurable indentation
}

interface NumberedHeader extends Header {
  number: string;
  children: NumberedHeader[]; // Remove optional marker, always initialize as array
}

function generateNumberedHeaders(headers: Header[]): NumberedHeader[] {
  const minLevel = Math.min(...headers.map(h => h.level));
  const result: NumberedHeader[] = [];
  const stack: NumberedHeader[] = [];
  const counters: { [key: number]: number } = {};

  headers.forEach(header => {
    const relativeLevel = header.level - minLevel;
    
    // Initialize or increment counter for this level
    counters[relativeLevel] = (counters[relativeLevel] || 0) + 1;
    
    // Reset counters for deeper levels
    Object.keys(counters).forEach(level => {
      if (Number(level) > relativeLevel) {
        delete counters[level];
      }
    });

    // Generate number based on all parent levels
    const number = Array.from({ length: relativeLevel + 1 }, (_, i) => 
      counters[i] || 1
    ).join('.');

    const numbered: NumberedHeader = {
      ...header,
      number,
      children: [] // Always initialize as empty array
    };

    // Pop stack until we find the parent or reach the root
    while (stack.length > 0 && stack[stack.length - 1].level >= header.level) {
      stack.pop();
    }

    if (stack.length > 0 && stack[stack.length - 1].level < header.level) {
      // Add as child to the last item in stack
      stack[stack.length - 1].children.push(numbered);
    } else {
      // Add to root level
      result.push(numbered);
    }

    stack.push(numbered);
  });

  return result;
}

const TOCItem: React.FC<{ 
  header: NumberedHeader;
  minLevel: number;
  indentSize?: number;
}> = ({ header, minLevel, indentSize = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = header.children.length > 0; // Remove optional chaining
  const isTopLevel = header.level === minLevel;

  return (
    <li className="toc-item">
      <div className="flex items-center">
        {isTopLevel ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0 w-4 h-4 -ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center justify-center"
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-3 h-3" />
            ) : (
              <ChevronRightIcon className="w-3 h-3" />
            )}
          </button>
        ) : (
          <span className="shrink-0 w-4" />
        )}
        <a
          href={`#${header.id}`}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(header.id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              window.history.pushState(null, '', `#${header.id}`);
            }
          }}
          className="text-blue-600 dark:text-blue-400 min-w-0"
        >
          <span className="text-gray-500 dark:text-gray-400 mr-2">{header.number}</span>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({children}) => <>{children}</>,
              code: ({children}) => (
                <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">{children}</code>
              ),
              strong: ({children}) => <strong>{children}</strong>,
              em: ({children}) => <em>{children}</em>
            }}
          >
            {header.text}
          </ReactMarkdown>
        </a>
      </div>
      {hasChildren && isExpanded && (
        <ul className="list-none mt-1 space-y-1" style={{ paddingLeft: `${indentSize}rem` }}>
          {header.children.map(child => (
            <TOCItem 
              key={child.id} 
              header={child} 
              minLevel={minLevel}
              indentSize={indentSize} 
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  headers, 
  className = '',
  indentSize = 0.5 // Adjusted default indent size
}) => {
  if (!headers || headers.length === 0) return null;

  const numberedHeaders = generateNumberedHeaders(headers);
  const minLevel = Math.min(...headers.map(h => h.level));

  return (
    <nav className={`toc-container ${className}`}>
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Table of Contents
      </h2>
      <ul className="space-y-2 list-none pl-4">
        {numberedHeaders.map((header) => (
          <TOCItem 
            key={header.id} 
            header={header} 
            minLevel={minLevel}
            indentSize={indentSize}
          />
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
