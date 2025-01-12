export interface Post {
    content: string;
    date: string;
    permalink: string;
    filename: string;
    title: string;
    categories: string[];
    isPinned?: boolean;
    heroImage?: string;
    heroImageWidth?: string;
}