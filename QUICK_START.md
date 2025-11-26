# 🚀 Quick Start: Migración a Notion

## Setup en 5 Minutos

### 1. Configurar Notion (2 min)

```bash
# 1. Crea una integración en: https://www.notion.so/my-integrations
# 2. Copia el token (empieza con secret_...)
# 3. Comparte tus databases con la integración
# 4. Copia los Database IDs de las URLs
```

### 2. Configurar Variables de Entorno (1 min)

```bash
cp .env.example .env
# Edita .env con tus datos reales
```

### 3. Activar el Loader (1 min)

```bash
# Backup del config actual
cp src/content/config.ts src/content/config.backup.ts

# Activar config de Notion
cp src/content/config.notion.ts src/content/config.ts
```

### 4. Build y Test (1 min)

```bash
npm run build
npm run preview
```

---

## Estructura de Notion Database

### Posts Database - Propiedades Requeridas:

```
📋 Posts Database

Propiedades:
├── Title (Title)          ← Título del post
├── Description (Text)     ← Descripción corta
├── Date (Date)            ← Fecha de publicación
├── Published (Checkbox)   ← ☑️ = Se publica
├── Tags (Multi-select)    ← ["astro", "web", ...]
└── Canonical URL (URL)    ← (Opcional)

Cover: Imagen de portada (aparecerá en el post)
```

### Ejemplo de Post en Notion:

```
📄 Mi Primer Post desde Notion

Properties:
✅ Title: "Mi Primer Post desde Notion"
✅ Description: "Tutorial de cómo migrar a Notion CMS"
✅ Date: 2025-11-25
✅ Published: ☑️ (Checked)
✅ Tags: ["tutorial", "notion", "astro"]

🖼️ Cover: [Sube una imagen]

Contenido (escribe normal en Notion):
## Introducción
Este es mi primer post usando Notion como CMS...

### Código
Puedes incluir code blocks en Notion y se renderizarán con syntax highlighting.

[Continúa escribiendo tu contenido...]
```

---

## Comandos Útiles

```bash
# Limpiar cache de Astro
rm -rf .astro node_modules/.astro

# Build y ver logs detallados
npm run build -- --verbose

# Desarrollo (hot reload)
npm run dev

# Preview de producción
npm run preview

# Rollback rápido
cp src/content/config.backup.ts src/content/config.ts && npm run build
```

---

## Troubleshooting Express

### ❌ "Cannot find module '@infrastructure/notion/loader'"
```bash
npm run dev  # Reinicia el servidor
```

### ❌ "NOTION_API_KEY is not defined"
```bash
# Verifica que .env existe y tiene las variables
cat .env
```

### ❌ "Invalid Notion API Key"
```bash
# Verifica que:
# 1. El token empieza con "secret_"
# 2. Compartiste las databases con la integración
# 3. La integración tiene permisos de "Read content"
```

### ❌ "Database not found"
```bash
# El Database ID está en la URL:
# https://notion.so/workspace/DATABASE_ID?v=...
#                           ^^^^^^^^^^^^
# Debe tener 32 caracteres (sin guiones)
```

---

## Verificación Rápida

Después del build, deberías ver:

```
✅ Outputs esperados:

🔄 Fetching posts from Notion database: a1b2c3d4...
📦 Found 10 published posts
📥 Downloading image: mi-post.jpg
✅ Loaded: Mi Primer Post desde Notion
...
✨ Successfully loaded 10 posts

Build complete!
```

---

## Deploy a Producción

### Vercel

```bash
# 1. Añade las variables de entorno en Vercel Dashboard:
#    Settings → Environment Variables

# 2. Deploy
git add .
git commit -m "feat: Migrate to Notion CMS"
git push

# 3. Vercel detectará los cambios y rebuildeará automáticamente
```

### Otras plataformas

- **Netlify:** Settings → Environment variables
- **Cloudflare Pages:** Settings → Environment variables
- **Railway:** Variables tab

---

## ¿Dudas?

Lee la guía completa en: [NOTION_MIGRATION_GUIDE.md](./NOTION_MIGRATION_GUIDE.md)
