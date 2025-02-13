export function stripMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')           // Remove backticks
    .replace(/\*\*([^*]+)\*\*/g, '$1')     // Remove bold
    .replace(/\*([^*]+)\*/g, '$1')         // Remove italics
    .replace(/_([^_]+)_/g, '$1');          // Remove underscores
}

export function generateId(text: string, index?: number): string {
  // First strip markdown syntax
  const cleanText = stripMarkdown(text);
  
  // Then generate the ID
  const id = cleanText
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return typeof index === 'number' ? `${id}-${index + 1}` : id;
}
