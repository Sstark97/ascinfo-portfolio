import { defineCollection } from 'astro:content';
import {z} from "astro/zod";

const postCollection = defineCollection({
    type: 'content', // v2.5.0 y posteriores
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        canonical_url: z.string().optional(),
        date: z.string(),
        tags: z.array(z.string()),
    }),
});

export const collections = {
    'posts': postCollection,
};