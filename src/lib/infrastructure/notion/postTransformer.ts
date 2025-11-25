import type { Post } from "@domain/model/Post";
import type { NotionPage } from "./types";
import {
  extractTitle,
  extractRichText,
  extractUrl,
  extractCheckbox,
  extractMultiSelect,
  extractCoverImage,
  extractCreatedTime,
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
 * Generates a description from markdown content (first paragraph)
 */
function generateDescriptionFromContent(content: string): string {
  // Remove markdown headings and get first paragraph
  const lines = content.split('\n').filter(line => !line.startsWith('#'));
  const firstParagraph = lines.find(line => line.trim().length > 0) || '';

  // Truncate to 200 characters
  if (firstParagraph.length > 200) {
    return firstParagraph.substring(0, 197) + '...';
  }

  return firstParagraph;
}

/**
 * Transforms a Notion page into a Post object
 */
export async function transformNotionPageToPost(
  page: NotionPage,
  downloadImages: boolean = true
): Promise<{ post: Post; content: string }> {
  const properties = page.properties;

  // Extract properties based on actual Notion database structure (Spanish property names)
  // Título (Title property)
  const title = extractTitle(
    properties["Título"] ||
    properties.Title ||
    properties.title ||
    properties.Name
  );

  // Tags (Multi-select property)
  const tags = extractMultiSelect(properties.Tags || properties.tags);

  // Published (Checkbox property)
  const isPublished = extractCheckbox(properties.Published || properties.published);

  // Created (Created time property) - used as publication date
  const date = extractCreatedTime(properties.Created || properties.created) || new Date();

  // Canonical URL (URL property) - optional
  const canonical_url = extractUrl(
    properties["Canonical URL"] ||
    properties.canonical_url ||
    properties["URL Canónica"]
  );

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

  // Generate description from content (since there's no Description property)
  const description = generateDescriptionFromContent(content);

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
