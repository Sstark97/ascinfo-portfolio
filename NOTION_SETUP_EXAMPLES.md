# 📸 Ejemplos Visuales: Configuración de Notion

Esta guía visual te ayudará a configurar correctamente tus databases de Notion.

---

## 🗂️ Estructura de Database: Posts

### Vista de Properties (Schema)

Tu database debe tener estas columnas en Notion:

```
┌────────────────────────────────────────────────────────────────┐
│ Posts Database                                        [+]       │
├────────────────────────────────────────────────────────────────┤
│ Title          │ Description │ Date       │ Published │ Tags   │
│ (Title)        │ (Text)      │ (Date)     │ (Checkbox)│(Multi) │
├────────────────┼─────────────┼────────────┼───────────┼────────┤
│ Arquitectura   │ La arq...   │ 2023-09-20 │ ☑️        │ astro  │
│ de Islas...    │             │            │           │ web    │
├────────────────┼─────────────┼────────────┼───────────┼────────┤
│ Testing Rust   │ Cómo te...  │ 2023-08-15 │ ☑️        │ rust   │
│                │             │            │           │ testing│
├────────────────┼─────────────┼────────────┼───────────┼────────┤
│ Draft Post     │ Work in...  │ 2023-11-01 │ ☐         │ draft  │
│ (No publicar)  │             │            │           │        │
└────────────────┴─────────────┴────────────┴───────────┴────────┘
                                                 👆
                              Solo los posts con ☑️ se buildean
```

---

## 📝 Ejemplo: Post Individual

### Configuración de Página

```
┌─────────────────────────────────────────────────────────────────┐
│  📄 Arquitectura de Islas en Astro                              │
│                                                                  │
│  🖼️ [Cover Image]                                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │         [Imagen de islas con componentes]                 │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Properties:                                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Title           │ Arquitectura de Islas en Astro          │ │
│  │ Description     │ La arquitectura de islas o Astro...     │ │
│  │ Date            │ September 20, 2023                       │ │
│  │ Published       │ ☑️                                       │ │
│  │ Tags            │ [astro] [web] [arquitectura]            │ │
│  │ Canonical URL   │ (empty)                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Content:                                                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ## Introducción                                            │ │
│  │                                                            │ │
│  │ Astro es uno de los framework web más sonados en los      │ │
│  │ últimos meses...                                           │ │
│  │                                                            │ │
│  │ ### ¿Qué son las Islas?                                   │ │
│  │                                                            │ │
│  │ Las islas son componentes interactivos...                 │ │
│  │                                                            │ │
│  │ ```javascript                                             │ │
│  │ // Ejemplo de código                                      │ │
│  │ const island = <MyComponent client:load />                │ │
│  │ ```                                                       │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Configuración de Properties (Tipos de Datos)

### 1. Title (Type: Title)

```
┌──────────────────────────────────────┐
│ Property Name: Title                 │
│ Type:          [Title ▼]             │
│                                      │
│ ✅ Correcto: "Title" o "Name"        │
│ ❌ Incorrecto: Text, Rich text       │
└──────────────────────────────────────┘
```

**Ejemplo de valor:**
```
Arquitectura de Islas en Astro
```

---

### 2. Description (Type: Text)

```
┌──────────────────────────────────────┐
│ Property Name: Description           │
│ Type:          [Text ▼]              │
│                                      │
│ ✅ Correcto: Text                    │
│ ❌ Incorrecto: Title, Rich text      │
└──────────────────────────────────────┘
```

**Ejemplo de valor:**
```
La arquitectura de islas o Astro Islands se refiere
a la existencia de componentes de UI interactivos en
una página HTML predominantemente estática...
```

---

### 3. Date (Type: Date)

```
┌──────────────────────────────────────┐
│ Property Name: Date                  │
│ Type:          [Date ▼]              │
│ Date format:   [YYYY-MM-DD ▼]        │
│                                      │
│ ✅ Correcto: Date                    │
│ ❌ Incorrecto: Text, Created time    │
└──────────────────────────────────────┘
```

**Ejemplo de valor:**
```
2023-09-20
```

---

### 4. Published (Type: Checkbox)

```
┌──────────────────────────────────────┐
│ Property Name: Published             │
│ Type:          [Checkbox ▼]          │
│                                      │
│ ✅ Correcto: Checkbox                │
│ ❌ Incorrecto: Select, Status        │
│                                      │
│ Comportamiento:                      │
│ ☑️ = Se buildea (visible en web)    │
│ ☐ = No se buildea (draft)           │
└──────────────────────────────────────┘
```

**Valores:**
- `☑️ Checked` → Post publicado
- `☐ Unchecked` → Post en borrador (no se buildea)

---

### 5. Tags (Type: Multi-select)

```
┌──────────────────────────────────────┐
│ Property Name: Tags                  │
│ Type:          [Multi-select ▼]     │
│                                      │
│ Options:                             │
│ • astro     [#00DFFC]                │
│ • web       [#22C55E]                │
│ • rust      [#EF4444]                │
│ • testing   [#F59E0B]                │
│ • tutorial  [#8B5CF6]                │
│                                      │
│ ✅ Correcto: Multi-select            │
│ ❌ Incorrecto: Select, Text          │
└──────────────────────────────────────┘
```

**Ejemplo de valor:**
```
[astro] [web] [arquitectura]
```

---

### 6. Canonical URL (Type: URL) - Opcional

```
┌──────────────────────────────────────┐
│ Property Name: Canonical URL         │
│ Type:          [URL ▼]               │
│                                      │
│ ✅ Correcto: URL                     │
│ ❌ Incorrecto: Text                  │
└──────────────────────────────────────┘
```

**Ejemplo de valor:**
```
https://dev.to/ascinfo/arquitectura-de-islas-en-astro
```

---

## 🖼️ Cover Image

### Añadir Cover Image a un Post

```
1. Abre el post en Notion
2. Haz hover sobre el título
3. Haz clic en "Add cover"
4. Opciones:
   ┌─────────────────────────────────────┐
   │ • Upload     ← Sube desde tu PC     │
   │ • Link       ← URL externa          │
   │ • Unsplash   ← Fotos gratis         │
   │ • Gallery    ← Galería de Notion    │
   └─────────────────────────────────────┘

Durante el build, la imagen se descargará automáticamente
y se guardará en: public/images/notion/posts/
```

---

## 📊 Database Views Recomendadas

### View 1: Published Posts (Default)

```
┌─────────────────────────────────────────────────────────────┐
│ 📋 Published Posts                                 [+View]  │
├─────────────────────────────────────────────────────────────┤
│ Filter: Published is Checked                                │
│ Sort:   Date (Descending)                                   │
│                                                             │
│ 📄 Arquitectura de Islas en Astro          2023-09-20      │
│ 📄 Testing en Rust                          2023-08-15      │
│ 📄 Smart Pointers en Rust                  2023-07-10      │
└─────────────────────────────────────────────────────────────┘
```

**Configuración:**
```
Filter:  Published [is] [Checked ✓]
Sort by: Date [Descending ▼]
```

---

### View 2: Drafts

```
┌─────────────────────────────────────────────────────────────┐
│ 📝 Drafts                                          [+View]  │
├─────────────────────────────────────────────────────────────┤
│ Filter: Published is Unchecked                              │
│ Sort:   Date (Descending)                                   │
│                                                             │
│ 📝 Post en progreso                         2023-11-01      │
│ 📝 Ideas para futuros posts                2023-10-20      │
└─────────────────────────────────────────────────────────────┘
```

**Configuración:**
```
Filter:  Published [is] [Unchecked ☐]
Sort by: Date [Descending ▼]
```

---

### View 3: By Tag (Gallery View)

```
┌─────────────────────────────────────────────────────────────┐
│ 🏷️ By Tag                                          [+View]  │
├─────────────────────────────────────────────────────────────┤
│ View type: Gallery                                          │
│ Group by:  Tags                                             │
│                                                             │
│ 🔵 astro (3)                                                │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│ │  🖼️     │ │  🖼️     │ │  🖼️     │                       │
│ │ Arq...  │ │ Isla... │ │ View... │                       │
│ └─────────┘ └─────────┘ └─────────┘                       │
│                                                             │
│ 🟠 rust (2)                                                 │
│ ┌─────────┐ ┌─────────┐                                   │
│ │  🖼️     │ │  🖼️     │                                   │
│ │ Testing │ │ Smart P │                                   │
│ └─────────┘ └─────────┘                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔗 Compartir Database con la Integración

### Paso a Paso

```
1. Abre tu database en Notion

2. Haz clic en los tres puntos (⋯) arriba a la derecha
   ┌──────────────────────────────────────┐
   │ Posts Database              [⋯]      │
   └──────────────────────────────────────┘
                                   👆 Aquí

3. En el menú, selecciona:
   ┌──────────────────────────────────────┐
   │ • Duplicate                          │
   │ • Copy link                          │
   │ • Customize page                     │
   │ • Lock page                          │
   │ • Add connections...      👈 AQUÍ   │
   │ • Export                             │
   │ • Delete                             │
   └──────────────────────────────────────┘

4. Busca tu integración:
   ┌──────────────────────────────────────┐
   │ Search connections...                │
   │ ┌──────────────────────────────────┐ │
   │ │ Portfolio CMS        [Connect]   │ │ 👈 Clic aquí
   │ └──────────────────────────────────┘ │
   └──────────────────────────────────────┘

5. Verás el icono de conexión:
   ┌──────────────────────────────────────┐
   │ Posts Database    [🔗 Portfolio CMS] │
   └──────────────────────────────────────┘
                        👆 Conectado!
```

---

## 🎨 Tips de Contenido

### Escribir en Notion

```
✅ SOPORTADO:

• Headings (H1, H2, H3...)
• Párrafos normales
• Listas (bullet, numbered, toggle)
• Code blocks (con syntax highlighting)
• Quotes
• Callouts
• Dividers
• Links
• Bold, italic, underline, strikethrough
• Inline code
• Images (se descargan automáticamente)

⚠️ CON LIMITACIONES:

• Tablas (se convierten a markdown básico)
• Databases embebidas (se ignoran)
• Menciones (@user) (se convierten a texto)
• Ecuaciones LaTeX (depende del renderer)

❌ NO SOPORTADO:

• Synced blocks
• Toggle lists anidados complejos
• Databases inline
• Botones
• Embeds de terceros (YouTube, Twitter, etc.)
```

---

## 🧪 Probar la Configuración

### Comando de Verificación

```bash
npm run test:notion
```

**Salida esperada (éxito):**

```
🔍 Verificando conexión con Notion...

✅ NOTION_API_KEY encontrada

✅ NOTION_POSTS_DATABASE_ID encontrada

🔗 Conectando a Notion API...
✅ Conexión exitosa!
📊 Total de páginas en la database: 5

📋 Verificando estructura de la primera página...

✅ Title (title)
✅ Description (rich_text)
✅ Date (date)
✅ Published (checkbox)
✅ Tags (multi_select)

🎉 ¡Todo configurado correctamente!

📝 Siguiente paso:
   npm run build
```

---

## 🐛 Errores Comunes

### ❌ "Database not found"

```
Problema: El Database ID es incorrecto

Solución:
1. Abre la database en Notion
2. Copia la URL completa:
   https://notion.so/workspace/a1b2c3d4e5f6...?v=123
                              ^^^^^^^^^^^^^^^^
3. Usa SOLO estos caracteres (sin guiones ni otros símbolos)
```

---

### ❌ "Unauthorized"

```
Problema: No has compartido la database con la integración

Solución:
1. Abre la database
2. Tres puntos (⋯) → Add connections
3. Selecciona "Portfolio CMS" (o el nombre de tu integración)
4. Verifica que aparezca el icono 🔗
```

---

### ❌ "Property not found: Published"

```
Problema: La propiedad "Published" no existe o tiene otro nombre

Solución:
Opción A (renombrar en Notion):
1. Abre el database
2. Haz clic derecho en la columna → Rename
3. Cámbiale el nombre a "Published"

Opción B (cambiar en código):
Edita: src/content/config.notion.ts
publishedProperty: "Status"  // ← Tu nombre personalizado
```

---

## 📚 Recursos Adicionales

### Templates de Notion

Puedes duplicar estos templates públicos:

1. **Blog Post Template:**
   - Incluye todas las propiedades necesarias
   - Estructura de contenido sugerida
   - Checklist de publicación

2. **Tutorial Post Template:**
   - Secciones pre-configuradas
   - Bloques de código de ejemplo
   - Tabla de contenidos

*(Links de templates se pueden crear y compartir desde tu workspace)*

---

## 🎯 Checklist Final

Antes de hacer el primer build, verifica:

```
✅ Checklist de Configuración de Notion

Database:
[ ] Database "Posts" creada
[ ] Propiedad "Title" (type: Title)
[ ] Propiedad "Description" (type: Text)
[ ] Propiedad "Date" (type: Date)
[ ] Propiedad "Published" (type: Checkbox)
[ ] Propiedad "Tags" (type: Multi-select)
[ ] Database compartida con la integración

Contenido:
[ ] Al menos 1 post de prueba creado
[ ] Post tiene cover image
[ ] Checkbox "Published" marcado (☑️)
[ ] Tags asignados
[ ] Contenido escrito (headings, párrafos, etc.)

Código:
[ ] .env configurado con NOTION_API_KEY
[ ] .env configurado con NOTION_POSTS_DATABASE_ID
[ ] Dependencias instaladas (npm install)
[ ] Test de conexión exitoso (npm run test:notion)

Listo para:
[ ] npm run build
[ ] npm run preview
[ ] Deploy a producción
```

---

**¿Listo para comenzar? → [QUICK_START.md](./QUICK_START.md)**
