export interface Presentation {
    slug?: string;
    title: string;
    description: string;
    image?: string;
    date: Date;
    isPublished: boolean;
    tags: string[];
}