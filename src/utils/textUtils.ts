export function generateId(text: string, index?: number): string {
  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold
    .replace(/\*(.*?)\*/g, '$1')      // Remove italic
    .replace(/`(.*?)`/g, '$1')        // Remove code
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return typeof index === 'number' ? `${cleanText}-${index + 1}` : cleanText;
}
