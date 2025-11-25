import type { Post } from "@domain/model/Post";
import type { NotionPage } from "./types";
import {
  extractTitle,
  extractRichText,
  extractUrl,
  extractDate,
  extractCheckbox,
  extractMultiSelect,
  extractCoverImage,
} from "./propertyExtractors";
import { downloadImage } from "./imageDownloader";
import { n2m } from "./client";

/**
 * Generates a slug from a Notion page title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Transforms a Notion page into a Post object
 */
export async function transformNotionPageToPost(
  page: NotionPage,
  downloadImages: boolean = true
): Promise<{ post: Post; content: string }> {
  const properties = page.properties;

  // Extract properties based on Notion database structure
  const title = extractTitle(properties.Title || properties.Name || properties.title);
  const description = extractRichText(properties.Description || properties.description || properties.Descripción);
  const canonical_url = extractUrl(properties["Canonical URL"] || properties.canonical_url);
  const date = extractDate(properties.Date || properties.date || properties.Fecha) || new Date();
  const isPublished = extractCheckbox(properties.Published || properties.Status || properties.Publicado);
  const tags = extractMultiSelect(properties.Tags || properties.tags);

  // Extract cover image
  let image: string | undefined = extractCoverImage(page.cover);

  // Generate slug from title
  const slug = generateSlug(title);

  // Download image if enabled and image exists
  if (downloadImages && image) {
    image = await downloadImage(image, slug, "posts");
  }

  // Get page content as markdown
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const content = n2m.toMarkdownString(mdBlocks).parent;

  const post: Post = {
    slug,
    title,
    description,
    image,
    canonical_url,
    date,
    isPublished,
    tags,
  };

  return { post, content };
}
