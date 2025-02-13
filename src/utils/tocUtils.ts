import { generateId } from './textUtils';
import { TOC_MIN_DEPTH, TOC_MAX_DEPTH } from './constants';

export interface Header {
  level: number;
  text: string;
  id: string;
}

export function extractHeaders(
  content: string,
  minDepth: number = TOC_MIN_DEPTH,
  maxDepth: number = TOC_MAX_DEPTH
): Header[] {
  const lines = content.split('\n');
  const headers: Header[] = [];
  let inCodeBlock = false;
  const headerIds = new Map<string, number>();

  const depthRange = Array.from(
    { length: maxDepth - minDepth + 1 },
    (_, i) => '#'.repeat(i + minDepth)
  ).join('|');
  const headerRegex = new RegExp(`^(${depthRange})\\s+(.*)$`);

  for (let line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (!inCodeBlock && headerRegex.test(line)) {
      const level = line.match(/^#+/)?.[0].length || 0;
      const text = line.replace(/^#+\s+/, '');
      
      const baseId = generateId(text);
      const count = headerIds.get(baseId) || 0;
      headerIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      
      headers.push({ level, text, id });
    }
  }

  return headers;
}
