import { defineCollection } from 'astro:content';
import {z, ZodSchema} from "astro/zod";
import type {Post} from "../lib/domain/model/Post";

const postSchema: ZodSchema<Post> = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    canonical_url: z.string().optional(),
    date: z.string(),
    tags: z.array(z.string()),
});


// create zod collection with Post interface
const postCollection = defineCollection({
    type: 'content', // v2.5.0 y posteriores
    schema: postSchema,
});

export const collections = {
    'posts': postCollection,
};