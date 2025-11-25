import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Initialize Notion client
export const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

// Initialize Notion to Markdown converter
export const n2m = new NotionToMarkdown({ notionClient: notion });
