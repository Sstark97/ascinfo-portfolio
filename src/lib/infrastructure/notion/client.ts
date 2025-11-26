import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Initialize Notion client with API version 2022-06-28 for compatibility
// This version uses the stable database API without the new data sources model
export const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
  notionVersion: "2022-06-28",
});

// Initialize Notion to Markdown converter
export const n2m = new NotionToMarkdown({ notionClient: notion });
