/**
 * Script para verificar la conexión con Notion
 *
 * Ejecutar con:
 * npx tsx scripts/test-notion-connection.ts
 */

import { Client } from "@notionhq/client";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_POSTS_DATABASE_ID = process.env.NOTION_POSTS_DATABASE_ID;

async function testConnection() {
  console.log("🔍 Verificando conexión con Notion...\n");

  // Check 1: API Key
  if (!NOTION_API_KEY) {
    console.error("❌ NOTION_API_KEY no está definida");
    console.log("💡 Asegúrate de tener un archivo .env con:");
    console.log("   NOTION_API_KEY=secret_tu_token_aqui\n");
    process.exit(1);
  }

  if (!NOTION_API_KEY.startsWith("secret_")) {
    console.error("❌ NOTION_API_KEY no parece válida (debe empezar con 'secret_')");
    process.exit(1);
  }

  console.log("✅ NOTION_API_KEY encontrada\n");

  // Check 2: Database ID
  if (!NOTION_POSTS_DATABASE_ID) {
    console.error("❌ NOTION_POSTS_DATABASE_ID no está definida");
    console.log("💡 Añade en .env:");
    console.log("   NOTION_POSTS_DATABASE_ID=tu_database_id\n");
    process.exit(1);
  }

  console.log("✅ NOTION_POSTS_DATABASE_ID encontrada\n");

  // Check 3: Conectar a Notion
  const notion = new Client({ auth: NOTION_API_KEY });

  try {
    console.log("🔗 Conectando a Notion API...");
    const response = await notion.databases.query({
      database_id: NOTION_POSTS_DATABASE_ID,
      page_size: 5,
    });

    console.log(`✅ Conexión exitosa!`);
    console.log(`📊 Total de páginas en la database: ${response.results.length}\n`);

    // Check 4: Verificar estructura
    if (response.results.length === 0) {
      console.warn("⚠️  La database está vacía");
      console.log("💡 Añade al menos una página de prueba con:");
      console.log("   - Title (Title)");
      console.log("   - Description (Text)");
      console.log("   - Date (Date)");
      console.log("   - Published (Checkbox) ← Marca este checkbox");
      console.log("   - Tags (Multi-select)\n");
      return;
    }

    console.log("📋 Verificando estructura de la primera página...\n");

    const firstPage = response.results[0];
    if ("properties" in firstPage) {
      const props = firstPage.properties;

      // Verificar propiedades comunes
      const requiredProps = [
        { names: ["Title", "title", "Name", "name"], type: "title" },
        {
          names: ["Description", "description", "Descripción"],
          type: "rich_text",
        },
        { names: ["Date", "date", "Fecha"], type: "date" },
        {
          names: ["Published", "published", "Status", "Publicado"],
          type: "checkbox",
        },
        { names: ["Tags", "tags"], type: "multi_select" },
      ];

      let allGood = true;

      for (const req of requiredProps) {
        const foundProp = req.names.find((name) => name in props);

        if (!foundProp) {
          console.error(`❌ Propiedad no encontrada: ${req.names[0]}`);
          console.log(`   Busqué: ${req.names.join(", ")}`);
          allGood = false;
        } else if (props[foundProp].type !== req.type) {
          console.error(
            `❌ Tipo incorrecto para ${foundProp}: esperaba ${req.type}, encontré ${props[foundProp].type}`
          );
          allGood = false;
        } else {
          console.log(`✅ ${foundProp} (${req.type})`);
        }
      }

      if (allGood) {
        console.log("\n🎉 ¡Todo configurado correctamente!");
        console.log("\n📝 Siguiente paso:");
        console.log("   npm run build\n");
      } else {
        console.log("\n⚠️  Hay problemas con la estructura de la database");
        console.log("💡 Revisa las propiedades en Notion\n");
      }
    }
  } catch (error: any) {
    console.error("❌ Error al conectar con Notion:\n");

    if (error.code === "unauthorized") {
      console.error("🔒 Token inválido o expirado");
      console.log("💡 Verifica que:");
      console.log("   1. El token es correcto");
      console.log(
        "   2. La integración está activa en: https://www.notion.so/my-integrations\n"
      );
    } else if (error.code === "object_not_found") {
      console.error("🔍 Database no encontrada");
      console.log("💡 Verifica que:");
      console.log("   1. El Database ID es correcto");
      console.log("   2. Compartiste la database con tu integración");
      console.log("      (Haz clic en los 3 puntos → Connections → [Tu integración])\n");
    } else {
      console.error(error.message);
      console.error("\nError completo:", error);
    }

    process.exit(1);
  }
}

testConnection();
