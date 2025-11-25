import type { Loader } from "astro/loaders";
import { notion } from "./client";
import { transformNotionPageToPost } from "./postTransformer";
import type { NotionPage } from "./types";

export interface NotionLoaderOptions {
  /** Notion database ID */
  databaseId: string;
  /** Property name for published status (default: "Published") */
  publishedProperty?: string;
  /** Whether to download images during build (default: true) */
  downloadImages?: boolean;
  /** Content type for organization (default: "posts") */
  type?: "posts" | "presentations" | "projects";
}

/**
 * Content Layer Loader for Notion
 * Fetches pages from a Notion database and transforms them into Astro content
 */
export function notionLoader(options: NotionLoaderOptions): Loader {
  const {
    databaseId,
    publishedProperty = "Published",
    downloadImages = true,
    type = "posts",
  } = options;

  return {
    name: "notion-loader",
    load: async ({ store, logger, parseData, generateDigest }) => {
      try {
        logger.info(`🔄 Fetching ${type} from Notion database: ${databaseId}`);

        // Clear existing entries
        store.clear();

        // Query Notion database with filter for published posts
        const response = await notion.databases.query({
          database_id: databaseId,
          filter: {
            property: publishedProperty,
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: "Date",
              direction: "descending",
            },
          ],
        });

        logger.info(`📦 Found ${response.results.length} published ${type}`);

        // Transform each page
        for (const page of response.results) {
          if (!("properties" in page)) continue;

          try {
            const notionPage = page as NotionPage;
            const { post, content } = await transformNotionPageToPost(
              notionPage,
              downloadImages
            );

            // Generate a digest for caching
            const digest = generateDigest(JSON.stringify(post) + content);

            // Store the entry
            store.set({
              id: post.slug || page.id,
              data: post,
              body: content,
              digest,
            });

            logger.info(`✅ Loaded: ${post.title}`);
          } catch (error) {
            logger.error(`❌ Error transforming page ${page.id}:`, error);
          }
        }

        logger.info(`✨ Successfully loaded ${store.entries().length} ${type}`);
      } catch (error) {
        logger.error(`❌ Error loading from Notion:`, error);
        throw error;
      }
    },
  };
}
