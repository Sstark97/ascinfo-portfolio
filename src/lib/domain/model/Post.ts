export interface Post {
    slug?: string;
    title: string;
    description: string;
    image?: string;
    canonical_url?: string;
    date: Date;
    isPublished: boolean;
    tags: string[];
}