import { defineCollection } from 'astro:content';
import {z, ZodSchema} from "astro/zod";
import type {Post} from "@domain/model/Post.ts";
import type {Project} from "@domain/model/Project.ts";

const postSchema: ZodSchema<Post> = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    canonical_url: z.string().optional(),
    date: z.date(),
    isPublished: z.boolean(),
    tags: z.array(z.string()),
});

const projectSchema: ZodSchema<Project> = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    repository: z.string(),
    demo: z.string().optional(),
    date: z.date(),
});

// create zod collection with Post interface
const postCollection = defineCollection({
    type: 'content', // v2.5.0 y posteriores
    schema: postSchema,
});

const projectCollection = defineCollection({
    type: 'content', // v2.5.0 y posterioresç
    schema: projectSchema,
});

export const collections = {
    'posts': postCollection,
    'projects': projectCollection,
};