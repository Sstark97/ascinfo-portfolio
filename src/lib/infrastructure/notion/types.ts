import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionPage = Extract<
  QueryDatabaseResponse["results"][number],
  { properties: Record<string, unknown> }
>;

export type NotionProperty = NotionPage["properties"][string];

export interface NotionDatabaseConfig {
  databaseId: string;
  filterByPublished?: boolean;
}

export type NotionCover = {
  type: "external" | "file";
  external?: { url: string };
  file?: { url: string };
} | null;
