/**
 * Content Collections Configuration with Notion Loader
 *
 * This file configures Notion as CMS for blog posts.
 * Presentations and projects continue using local markdown files.
 *
 * To use this configuration:
 * 1. Set up your .env file with NOTION_API_KEY and NOTION_POSTS_DATABASE_ID
 * 2. Rename this file to config.ts (backup the original first)
 * 3. Run `npm run build` to fetch content from Notion
 */

import { defineCollection } from 'astro:content';
import { z, ZodSchema } from "astro/zod";
import type { Post } from "@domain/model/Post.ts";
import type { Project } from "@domain/model/Project.ts";
import type { Presentation } from "@domain/model/Presentation.ts";
import { notionLoader } from "@infrastructure/notion/loader";

// ===== SCHEMAS =====

const postSchema: ZodSchema<Post> = z.object({
    slug: z.string().optional(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    canonical_url: z.string().optional(),
    date: z.date(),
    isPublished: z.boolean(),
    tags: z.array(z.string()),
});

const presentationSchema: ZodSchema<Presentation> = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
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

// ===== COLLECTIONS =====

// Posts: Fetched from Notion using Content Layer Loader
const postCollection = defineCollection({
    loader: notionLoader({
        databaseId: import.meta.env.NOTION_POSTS_DATABASE_ID,
        publishedProperty: "Published",
        downloadImages: import.meta.env.NOTION_DOWNLOAD_IMAGES !== "false",
        type: "posts",
    }),
    schema: postSchema,
});

// Presentations: Local markdown files (no Notion integration yet)
const presentationCollection = defineCollection({
    type: 'content',
    schema: presentationSchema,
});

// Projects: Local markdown files (no Notion integration yet)
const projectCollection = defineCollection({
    type: 'content',
    schema: projectSchema,
});

export const collections = {
    'posts': postCollection,
    'presentations': presentationCollection,
    'projects': projectCollection,
};
