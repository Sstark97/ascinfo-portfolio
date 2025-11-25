# 📘 Guía de Migración: Astro v5 + Notion CMS

## 🎯 Resumen Ejecutivo

Esta guía documenta la migración completa de tu portfolio desde Content Collections basadas en archivos locales hacia **Notion como CMS**, utilizando la nueva **Content Layer API de Astro v5**.

### ✅ Lo que ya tienes
- ✨ **Astro v5.2.5** (ya actualizado)
- 🏗️ **Arquitectura Hexagonal** (Repository Pattern + Adapters)
- 📦 **Content Collections** configuradas con Zod
- 🎨 **TailwindCSS** + React

### 🚀 Lo que se ha implementado
- 📡 **Notion Content Layer Loader** personalizado
- 🖼️ **Sistema de descarga de imágenes** (evita URLs expiradas)
- 🔄 **Transformadores de datos** de Notion a tu formato
- ✅ **Filtrado automático** por estado de publicación
- 🔌 **Compatibilidad total** con tu código existente

---

## 📋 Índice

1. [Configuración Inicial](#1️⃣-configuración-inicial)
2. [Estructura de la Base de Datos de Notion](#2️⃣-estructura-de-la-base-de-datos-de-notion)
3. [Activación del Loader](#3️⃣-activación-del-loader)
4. [Testing de la Migración](#4️⃣-testing-de-la-migración)
5. [Estrategia de Webhooks](#5️⃣-estrategia-de-webhooks-auto-rebuild)
6. [Rollback Plan](#6️⃣-plan-de-rollback)
7. [Troubleshooting](#7️⃣-troubleshooting)

---

## 1️⃣ Configuración Inicial

### Paso 1.1: Crear una Integración de Notion

1. Ve a [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Haz clic en **"+ New integration"**
3. Configura:
   - **Name:** `Portfolio CMS`
   - **Associated workspace:** Tu workspace
   - **Capabilities:** Read content
4. Copia el **Internal Integration Token** (empieza con `secret_...`)

### Paso 1.2: Compartir las Bases de Datos con la Integración

Para cada base de datos (Posts, Presentations, Projects):

1. Abre la base de datos en Notion
2. Haz clic en los tres puntos `⋯` (arriba a la derecha)
3. Ve a **"Connections"** → **"Connect to"**
4. Selecciona tu integración **"Portfolio CMS"**

### Paso 1.3: Obtener los Database IDs

El Database ID está en la URL de tu base de datos:

```
https://www.notion.so/workspace/DATABASE_ID?v=...
                              ^^^^^^^^^^^^
```

**Ejemplo:**
```
https://www.notion.so/myworkspace/a1b2c3d4e5f6...?v=123
                                  👆 Este es tu Database ID
```

### Paso 1.4: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Copia desde .env.example
cp .env.example .env
```

Edita `.env` con tus datos reales:

```bash
NOTION_API_KEY=secret_tu_token_aqui
NOTION_POSTS_DATABASE_ID=a1b2c3d4e5f6...
NOTION_PRESENTATIONS_DATABASE_ID=x9y8z7w6v5u4...
NOTION_PROJECTS_DATABASE_ID=p0o9i8u7y6t5...
NOTION_DOWNLOAD_IMAGES=true
```

> ⚠️ **IMPORTANTE:** Añade `.env` a tu `.gitignore` si no está ya

---

## 2️⃣ Estructura de la Base de Datos de Notion

### Database: Posts

Tu base de datos de **Posts** debe tener estas propiedades:

| Propiedad | Tipo | Requerido | Notas |
|-----------|------|-----------|-------|
| **Title** o **Name** | Title | ✅ Sí | Título del post |
| **Description** | Text | ✅ Sí | Descripción corta |
| **Date** | Date | ✅ Sí | Fecha de publicación |
| **Published** | Checkbox | ✅ Sí | ☑️ = Se publica / ☐ = Draft |
| **Tags** | Multi-select | ✅ Sí | Etiquetas del post |
| **Canonical URL** | URL | ⚪ No | URL canónica (opcional) |
| *Cover Image* | - | ⚪ No | Usa el cover de la página |

### Ejemplo de Página de Post

```
📄 Arquitectura de Islas en Astro

Properties:
- Title: "Arquitectura de Islas en Astro"
- Description: "La arquitectura de islas o Astro Islands..."
- Date: 2023-09-20
- Published: ☑️
- Tags: ["astro", "web", "arquitectura"]
- Canonical URL: (vacío)

Cover: [Imagen de portada]

Contenido:
## Introducción
Astro es uno de los framework web más sonados...

[Resto del contenido en bloques de Notion]
```

### Database: Presentations

| Propiedad | Tipo | Requerido |
|-----------|------|-----------|
| **Title** | Title | ✅ |
| **Description** | Text | ✅ |
| **Date** | Date | ✅ |
| **Published** | Checkbox | ✅ |
| **Tags** | Multi-select | ✅ |

### Database: Projects

| Propiedad | Tipo | Requerido |
|-----------|------|-----------|
| **Title** | Title | ✅ |
| **Description** | Text | ✅ |
| **Repository** | URL | ✅ |
| **Demo** | URL | ⚪ |
| **Date** | Date | ✅ |

> 💡 **Tip:** Puedes personalizar los nombres de las propiedades editando `postTransformer.ts`

---

## 3️⃣ Activación del Loader

### Paso 3.1: Hacer Backup del Config Actual

```bash
# Respalda tu configuración actual
cp src/content/config.ts src/content/config.backup.ts
```

### Paso 3.2: Activar la Configuración de Notion

```bash
# Reemplaza la configuración con la versión de Notion
cp src/content/config.notion.ts src/content/config.ts
```

### Paso 3.3: Test Local

```bash
# Limpia el cache de Astro
rm -rf .astro node_modules/.astro

# Instala dependencias si no lo has hecho
npm install

# Ejecuta el build
npm run build
```

**Salida esperada:**

```
🔄 Fetching posts from Notion database: a1b2c3d4e5f6...
📦 Found 10 published posts
📥 Downloading image: arquitectura-de-islas-en-astro.jpg
✅ Image downloaded: arquitectura-de-islas-en-astro.jpg
✅ Loaded: Arquitectura de Islas en Astro
...
✨ Successfully loaded 10 posts
```

### Paso 3.4: Verificar el Resultado

```bash
# Inicia el servidor de preview
npm run preview

# O modo dev (si quieres seguir editando)
npm run dev
```

Visita: `http://localhost:4321/blog`

---

## 4️⃣ Testing de la Migración

### Checklist de Validación

- [ ] **Build exitoso** sin errores
- [ ] **Posts visibles** en `/blog`
- [ ] **Imágenes cargando** correctamente
- [ ] **Filtrado funciona** (solo posts con Published = ☑️)
- [ ] **Rutas dinámicas** `/blog/[post]` funcionan
- [ ] **Metadata** (título, descripción, tags) correcta
- [ ] **Markdown rendering** funcionando
- [ ] **Code syntax highlighting** activo

### Test de un Post Individual

```bash
# Busca en la salida del build el slug de un post
# Ejemplo: arquitectura-de-islas-en-astro

# Visita en el navegador:
# http://localhost:4321/blog/arquitectura-de-islas-en-astro
```

### Comparación Visual

1. Abre un post con la configuración antigua (backup)
2. Abre el mismo post con la nueva configuración
3. Compara:
   - Layout y estilos
   - Imágenes
   - Formato del contenido
   - Links y code blocks

---

## 5️⃣ Estrategia de Webhooks (Auto-Rebuild)

### Opción A: Vercel + Notion Webhook

#### Paso 1: Crear un Deploy Hook en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. **Settings** → **Git** → **Deploy Hooks**
3. Crea un nuevo hook:
   - **Name:** `Notion Content Update`
   - **Branch:** `main` (o tu rama de producción)
4. Copia la URL generada (ej: `https://api.vercel.com/v1/integrations/deploy/...`)

#### Paso 2: Configurar Notion Automation (Zapier/Make)

Ya que Notion no tiene webhooks nativos, usa **Zapier** o **Make (Integromat)**:

**Con Zapier:**

1. Crea un nuevo Zap
2. **Trigger:** Notion → "Updated Database Item"
   - Selecciona tu database de Posts
   - Trigger cuando: `Published` = `true`
3. **Action:** Webhooks by Zapier → "POST"
   - URL: Tu Deploy Hook de Vercel
   - Method: POST
4. Activa el Zap

**Resultado:** Cada vez que publiques un post (☐ → ☑️), se dispara un rebuild.

### Opción B: Vercel Cron Jobs (Rebuild Periódico)

Si no quieres usar Zapier, puedes configurar rebuilds automáticos cada X horas:

**Archivo:** `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/rebuild",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

**Archivo:** `src/pages/api/rebuild.ts`

```typescript
export const prerender = false;

export async function GET() {
  const deployHook = import.meta.env.VERCEL_DEPLOY_HOOK_URL;

  if (!deployHook) {
    return new Response("Deploy hook not configured", { status: 500 });
  }

  try {
    await fetch(deployHook, { method: "POST" });
    return new Response("Rebuild triggered", { status: 200 });
  } catch (error) {
    return new Response("Error triggering rebuild", { status: 500 });
  }
}
```

Añade a `.env`:
```bash
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

### Opción C: GitHub Actions (Rebuild Diario)

**Archivo:** `.github/workflows/notion-sync.yml`

```yaml
name: Sync Notion Content

on:
  schedule:
    # Rebuild diario a las 8am UTC
    - cron: '0 8 * * *'
  workflow_dispatch: # Permite ejecutar manualmente

jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy
        run: |
          curl -X POST ${{ secrets.VERCEL_DEPLOY_HOOK }}
```

Añade `VERCEL_DEPLOY_HOOK` en:
**GitHub** → **Settings** → **Secrets and variables** → **Actions**

---

## 6️⃣ Plan de Rollback

Si algo sale mal, puedes volver al sistema anterior:

### Rollback Rápido (5 minutos)

```bash
# 1. Restaura el config original
cp src/content/config.backup.ts src/content/config.ts

# 2. Limpia el cache
rm -rf .astro node_modules/.astro

# 3. Rebuild
npm run build

# 4. Deploy (si estás en producción)
git add src/content/config.ts
git commit -m "revert: Rollback to local content collections"
git push
```

### Rollback con Git

```bash
# Ver el último commit antes de la migración
git log --oneline

# Volver a ese commit (reemplaza COMMIT_HASH)
git revert COMMIT_HASH

# Push
git push
```

---

## 7️⃣ Troubleshooting

### Problema: "Cannot find module '@infrastructure/notion/loader'"

**Causa:** TypeScript no encuentra los paths configurados

**Solución:**
```bash
# Reinicia el servidor dev
npm run dev
```

### Problema: "NOTION_API_KEY is not defined"

**Causa:** Variables de entorno no cargadas

**Solución:**
1. Verifica que `.env` existe en la raíz
2. Verifica que `.env` tiene las variables correctas
3. Reinicia el servidor

**Para Vercel:**
- Ve a **Settings** → **Environment Variables**
- Añade todas las variables del `.env`

### Problema: "Error: Invalid Notion API Key"

**Causa:** Token incorrecto o integración no compartida

**Solución:**
1. Verifica que el token empieza con `secret_`
2. Verifica que compartiste las databases con la integración
3. Regenera el token en [my-integrations](https://www.notion.so/my-integrations)

### Problema: Imágenes no se descargan

**Causa:** Permisos de escritura o path incorrecto

**Solución:**
```bash
# Verifica que existe el directorio
mkdir -p public/images/notion/posts

# Verifica permisos
ls -la public/images/
```

### Problema: Build muy lento

**Causa:** Descargando muchas imágenes

**Solución:**
```bash
# Deshabilita temporalmente la descarga
# En .env:
NOTION_DOWNLOAD_IMAGES=false
```

### Problema: "Database not found"

**Causa:** Database ID incorrecto

**Solución:**
1. Ve a la database en Notion
2. Copia la URL completa
3. Extrae el ID (32 caracteres hexadecimales)
4. Ejemplo correcto: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

## 📚 Archivos Clave Creados

```
src/
├── content/
│   ├── config.ts             # ← Ahora usa el loader de Notion
│   └── config.backup.ts      # ← Backup del config original
│
├── lib/
│   └── infrastructure/
│       └── notion/
│           ├── client.ts            # Cliente de Notion configurado
│           ├── types.ts             # Tipos TypeScript para Notion
│           ├── loader.ts            # 🌟 Content Layer Loader
│           ├── postTransformer.ts   # Transforma Notion → Post
│           ├── propertyExtractors.ts # Extrae propiedades de Notion
│           └── imageDownloader.ts   # Descarga imágenes de S3
│
└── .env.example                     # Template de variables
```

---

## 🎓 Conceptos Clave

### ¿Qué es un Content Layer Loader?

Es una función que le dice a Astro:
- **Dónde** obtener el contenido (en este caso, Notion)
- **Cómo** transformarlo al formato que espera tu aplicación
- **Cuándo** actualizar el cache

### ¿Por qué usar Loaders en vez de getStaticPaths?

| Aspecto | `getStaticPaths` | Content Layer Loader |
|---------|------------------|---------------------|
| **Timing** | En cada build | Durante la fase de "data collection" |
| **Cache** | No automático | Sí, con digest |
| **Tipado** | Manual | Automático con Zod |
| **Consistencia** | Múltiples fetches | Un solo fetch centralizado |

### Flujo de Datos

```
Notion Database
    ↓
Content Layer Loader (durante build)
    ↓
Astro Content Collection
    ↓
getCollection("posts") / getEntry("posts", slug)
    ↓
Tu Adapter (PostAstroContentAdapter)
    ↓
Páginas Astro
```

---

## 🚀 Siguiente Pasos Recomendados

### Corto Plazo
- [ ] Configurar webhook de rebuild (Zapier/Make)
- [ ] Testear en staging antes de producción
- [ ] Configurar monitoreo de builds (Vercel Analytics)

### Mediano Plazo
- [ ] Migrar Presentations y Projects a Notion
- [ ] Crear templates de Notion para nuevos posts
- [ ] Documentar workflow de creación de contenido

### Largo Plazo
- [ ] Implementar preview mode (ver drafts)
- [ ] Añadir analytics de contenido
- [ ] Explorar Notion AI para SEO suggestions

---

## 📞 Soporte

### Recursos Útiles

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Notion API Docs](https://developers.notion.com/)
- [notion-to-md GitHub](https://github.com/souvikinator/notion-to-md)

### Debug Mode

Para ver más información durante el build:

```bash
# Modo verbose
npm run build -- --verbose

# Ver logs del loader
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

---

## ✅ Checklist de Producción

Antes de hacer deploy a producción:

- [ ] Todas las variables de entorno configuradas en Vercel
- [ ] Test de build local exitoso
- [ ] Test de preview local exitoso
- [ ] Backup de la base de datos de Notion
- [ ] Rollback plan documentado y probado
- [ ] Webhook de rebuild configurado y probado
- [ ] Monitoreo de errores activo (Sentry, LogRocket, etc.)

---

## 🎉 ¡Migración Completa!

Tu portfolio ahora usa:
- ✅ **Astro v5** con las últimas features
- ✅ **Notion como CMS** (sin base de datos adicional)
- ✅ **Content Layer API** (la forma oficial de Astro v5)
- ✅ **Imágenes optimizadas** (descargadas y procesadas)
- ✅ **Arquitectura mantenible** (mismo código, nueva fuente)

**Happy coding! 🚀**

---

*Última actualización: 2025-11-25*
