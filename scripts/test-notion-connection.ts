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
      console.log("💡 Añade al menos una página de prueba con estas propiedades:");
      console.log("   - Título (Title)");
      console.log("   - Tags (Multi-select)");
      console.log("   - Published (Checkbox) ← Marca este checkbox");
      console.log("   - Created (Created time)\n");
      return;
    }

    console.log("📋 Verificando estructura de la primera página...\n");

    const firstPage = response.results[0];
    if ("properties" in firstPage) {
      const props = firstPage.properties;

      // Verificar propiedades requeridas basadas en tu database real
      const requiredProps = [
        {
          names: ["Título", "Title", "title", "Name"],
          type: "title",
          required: true
        },
        {
          names: ["Tags", "tags"],
          type: "multi_select",
          required: true
        },
        {
          names: ["Published", "published"],
          type: "checkbox",
          required: true
        },
        {
          names: ["Created", "created"],
          type: "created_time",
          required: true
        },
      ];

      // Propiedades opcionales
      const optionalProps = [
        {
          names: ["Estado", "Status", "status"],
          type: "status",
          required: false
        },
        {
          names: ["Canonical URL", "canonical_url", "URL Canónica"],
          type: "url",
          required: false
        },
      ];

      let allGood = true;

      console.log("Propiedades requeridas:");
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

      console.log("\nPropiedades opcionales:");
      for (const opt of optionalProps) {
        const foundProp = opt.names.find((name) => name in props);

        if (foundProp) {
          if (props[foundProp].type === opt.type) {
            console.log(`✅ ${foundProp} (${opt.type})`);
          } else {
            console.warn(
              `⚠️  ${foundProp}: esperaba ${opt.type}, encontré ${props[foundProp].type}`
            );
          }
        } else {
          console.log(`➖ ${opt.names[0]} (no configurado)`);
        }
      }

      if (allGood) {
        console.log("\n🎉 ¡Todo configurado correctamente!");
        console.log("\n📝 Siguiente paso:");
        console.log("   1. Copia el config de Notion:");
        console.log("      cp src/content/config.notion.ts src/content/config.ts");
        console.log("   2. Ejecuta el build:");
        console.log("      npm run build\n");
      } else {
        console.log("\n⚠️  Hay problemas con la estructura de la database");
        console.log("💡 Revisa las propiedades en Notion\n");
      }

      // Mostrar información adicional útil
      console.log("\n📊 Resumen de tu database:");
      console.log(`   - Total de propiedades: ${Object.keys(props).length}`);
      console.log(`   - Propiedades encontradas: ${Object.keys(props).join(", ")}`);
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
