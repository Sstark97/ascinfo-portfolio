export interface Post {
    slug: string;
    title: string;
    description: string;
    image?: string;
    canonical_url?: string;
    date: string;
    tags: string[];
}