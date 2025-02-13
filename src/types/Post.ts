export interface TOCHeader {
  level: number;
  text: string;
  id: string;
}

export interface Post {
    content: string;
    date: string;
    permalink: string;
    filename: string;
    title: string;
    categories: string[];
    isPinned?: boolean;
    isArchived?: boolean;
    heroImage?: string;
    heroImageWidth?: string;
    toc?: TOCHeader[];
}