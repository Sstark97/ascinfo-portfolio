import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Initialize Notion client with latest API version (2025-09-03)
// This version uses the new data sources model
export const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

// Initialize Notion to Markdown converter
export const n2m = new NotionToMarkdown({ notionClient: notion });
