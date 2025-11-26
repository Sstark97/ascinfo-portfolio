import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Downloads an image from a URL and saves it locally
 * This helps avoid expired Notion S3 URLs
 */
export async function downloadImage(
  imageUrl: string,
  slug: string,
  type: "posts" | "presentations" | "projects"
): Promise<string> {
  try {
    // Skip if image is already local
    if (imageUrl.startsWith("/") || imageUrl.startsWith("./")) {
      return imageUrl;
    }

    // Create directory structure
    const imagesDir = path.join(
      process.cwd(),
      "public",
      "images",
      "notion",
      type
    );

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Extract extension from URL or default to .jpg
    const urlObj = new URL(imageUrl);
    const ext = path.extname(urlObj.pathname) || ".jpg";
    const filename = `${slug}${ext}`;
    const filepath = path.join(imagesDir, filename);

    // Download only if file doesn't exist
    if (!fs.existsSync(filepath)) {
      console.log(`📥 Downloading image: ${filename}`);

      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      fs.writeFileSync(filepath, Buffer.from(buffer));

      console.log(`✅ Image downloaded: ${filename}`);
    }

    // Return public URL
    return `/images/notion/${type}/${filename}`;
  } catch (error) {
    console.error(`❌ Error downloading image for ${slug}:`, error);
    // Return original URL as fallback
    return imageUrl;
  }
}
