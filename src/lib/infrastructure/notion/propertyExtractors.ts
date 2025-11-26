import type { NotionProperty } from "./types";

/**
 * Extracts text from Notion title property
 */
export function extractTitle(property: NotionProperty | undefined): string {
  if (!property) return "";
  if (property.type === "title" && property.title.length > 0) {
    return property.title.map((text) => text.plain_text).join("");
  }
  return "";
}

/**
 * Extracts text from Notion rich_text property
 */
export function extractRichText(property: NotionProperty | undefined): string {
  if (!property) return "";
  if (property.type === "rich_text" && property.rich_text.length > 0) {
    return property.rich_text.map((text) => text.plain_text).join("");
  }
  return "";
}

/**
 * Extracts URL from Notion url property
 */
export function extractUrl(property: NotionProperty | undefined): string | undefined {
  if (!property) return undefined;
  if (property.type === "url") {
    return property.url || undefined;
  }
  return undefined;
}

/**
 * Extracts date from Notion date property
 */
export function extractDate(property: NotionProperty | undefined): Date | undefined {
  if (!property) return undefined;
  if (property.type === "date" && property.date?.start) {
    return new Date(property.date.start);
  }
  return undefined;
}

/**
 * Extracts boolean from Notion checkbox property
 */
export function extractCheckbox(property: NotionProperty | undefined): boolean {
  if (!property) return false;
  if (property.type === "checkbox") {
    return property.checkbox;
  }
  return false;
}

/**
 * Extracts tags from Notion multi_select property
 */
export function extractMultiSelect(property: NotionProperty | undefined): string[] {
  if (!property) return [];
  if (property.type === "multi_select") {
    return property.multi_select.map((tag) => tag.name);
  }
  return [];
}

/**
 * Extracts status from Notion status property
 */
export function extractStatus(property: NotionProperty | undefined): string | undefined {
  if (!property) return undefined;
  if (property.type === "status" && property.status) {
    return property.status.name;
  }
  return undefined;
}

/**
 * Extracts date from Notion created_time property
 */
export function extractCreatedTime(property: NotionProperty | undefined): Date | undefined {
  if (!property) return undefined;
  if (property.type === "created_time") {
    return new Date(property.created_time);
  }
  return undefined;
}

/**
 * Extracts image URL from Notion files property or cover
 */
export function extractImage(
  property: NotionProperty | null | undefined
): string | undefined {
  if (!property) return undefined;

  if (property.type === "files" && property.files.length > 0) {
    const file = property.files[0];
    if (file.type === "external") {
      return file.external.url;
    } else if (file.type === "file") {
      return file.file.url;
    }
  }

  return undefined;
}

/**
 * Extracts cover image from Notion page
 */
export function extractCoverImage(cover: any): string | undefined {
  if (!cover) return undefined;

  if (cover.type === "external") {
    return cover.external.url;
  } else if (cover.type === "file") {
    return cover.file.url;
  }

  return undefined;
}
