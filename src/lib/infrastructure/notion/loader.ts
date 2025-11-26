import type { Loader } from "astro/loaders";
import { notion } from "./client";
import { transformNotionPageToPost } from "./postTransformer";
import type { NotionPage } from "./types";

export interface NotionLoaderOptions {
  /** Notion database ID */
  databaseId: string;
  /** Optional: Specific data source ID to query. If not provided, uses the first data source in the database */
  dataSourceId?: string;
  /** Property name for published status (default: "Published") */
  publishedProperty?: string;
  /** Property name for sorting by date (default: "Created") */
  sortProperty?: string;
  /** Whether to download images during build (default: true) */
  downloadImages?: boolean;
  /** Content type for organization (default: "posts") */
  type?: "posts" | "presentations" | "projects";
}

/**
 * Content Layer Loader for Notion
 * Fetches pages from a Notion database and transforms them into Astro content
 * Uses the new data sources model (API version 2025-09-03)
 */
export function notionLoader(options: NotionLoaderOptions): Loader {
  const {
    databaseId,
    dataSourceId,
    publishedProperty = "Published",
    sortProperty = "Created",
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

        // Get data source ID if not provided
        let sourceId = dataSourceId;
        let useLegacyApi = false;
        
        if (!sourceId) {
          logger.info(`📡 Discovering data sources in database...`);
          const database = await notion.databases.retrieve({ database_id: databaseId });
          
          // @ts-ignore - The data_sources property exists in API 2025-09-03
          if (database.data_sources && database.data_sources.length > 0) {
            // @ts-ignore
            sourceId = database.data_sources[0].id;
            // @ts-ignore
            logger.info(`✅ Using data source: ${database.data_sources[0].name || sourceId}`);
          } else {
            // Fallback: use legacy databases.query API for backwards compatibility
            useLegacyApi = true;
            logger.info(`⚠️ No data sources found, using legacy database query API`);
          }
        }

        // Query using the appropriate API
        let response;
        if (useLegacyApi) {
          // Use legacy databases.query for databases without data sources
          response = await notion.databases.query({
            database_id: databaseId,
            filter: {
              property: publishedProperty,
              checkbox: {
                equals: true,
              },
            },
            sorts: [
              {
                property: sortProperty,
                direction: "descending",
              },
            ],
          });
        } else {
          // Use new dataSources.query for databases with data sources
          // @ts-ignore - The dataSources.query method exists in API 2025-09-03
          response = await notion.dataSources.query({
            data_source_id: sourceId,
            filter: {
              property: publishedProperty,
              checkbox: {
                equals: true,
              },
            },
            sorts: [
              {
                property: sortProperty,
                direction: "descending",
              },
            ],
          });
        }

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
