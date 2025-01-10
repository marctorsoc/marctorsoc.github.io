export interface Post {
  title: string;
  date: string;
  permalink: string;
  categories: string[];
  content: string;
  isPinned?: boolean;
  filename?: string;
  heroImage?: string;
  heroImageWidth?: string;
  heroImageHeight?: string;
} 