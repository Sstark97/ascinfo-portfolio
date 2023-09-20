---
title: "Arquitectura de islas en Astro"
image: "/images/blog/astro-islands.webp"
description: "La arquitectura de islas o Astro Islands se refiere a la existencia de componentes de UI interactivos en 
una página HTML predominantemente estática. Pueden coexistir varias islas en una misma página, y esa isla se renderiza 
de manera aislada...."
date: 2023-09-20
isPublished: true
tags:
    - "astro"
    - "web"
    - "arquitectura"
---
## Introducción
Astro es uno de los framework web más sonados en los últimos meses. Y es que su premisa es bastante bastante prometedora, desarrollar sitos estáticos y enviar cero JavaScript al cliente.

Podemos crear componentes de Astro reutilizables, con una sintáxis similar a la de jsx, pudiendo escribir código JavaScript en la parte superior del fichero.

```jsx
---
const title = "Hello Astro! 🪐";
const technlogies = ["react", "vue", "svelte", "solid.js", "lit"];
---
    
<h1>{title}</h1>
<section>
    <h2>Technologies</h2>
{technologies.map(technology => <p>{technology}</p>})}
</section>    
```

Este código JavaScript se ejecutará únicamente a la hora de generar los ficheros estáticos de nuestro sitio web.
Sin embargo podemos aprovechar otra de las grandes virtudes de este framework, la arquitectura de islas.

## Arquitectura de Islas (Astro Islands)
La arquitectura de islas o Astro Islands se refiere a la existencia de componentes de UI interactivos en una página HTML predominantemente estática. Pueden coexistir varias islas en una misma página, y esa isla se renderiza de manera aislada. El equipo de Astro comenta:
> Piensa en ellos como islas en un mar de HTML estático y no interactivo.

![](https://hackmd.io/_uploads/By7hUePyp.png)

Además estos componentes de UI pueden ser de distintos frameworks o librerías, no tienen porque ser de la misma tecnología. Podemos mezclar varios, o utilizar con el que más estemos cómodos (React, Svelte, Vue, Preact, Lit, etc.)

[Frameworks y Librerías compatibles](https://docs.astro.build/es/core-concepts/framework-components/)

Los componentes de otros frameworks podemos utilizarlos en páginas de Astro de la siguiente forma:
```jsx
---
// Ejemplo: Usa un componente estático React en la página, sin JavaScript.
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<!-- 100% HTML, ¡Cero JavaScript cargado en la página! -->
<MyReactComponent />
```
## Directivas del cliente
Para decidir como hidratar esos componentes podemos añadirle una serie de directivas.
```jsx
---
// Ejemplo: Usa un componente dinámico de React en la página.
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<!-- ¡Este componente ahora es interactivo en la página!
     El resto de tu sitio web se mantendrá estático con cero JS. -->
<MyReactComponent client:load />
```
En este ejemplo se usa la directiva client:load, que indica que esté componente debe ser interactivo en el cliente lo antes posible.
Algunas de las directivas son:

### client:idle
Elementos de menor prioridad (media), que no necesitan ser cargados inmediatamente. Carga y se hidrata una vez termine la carga inicial de la página.
Esta directiva puede no ser compatible con todos los navegadores, en cuyo caso se usará la directiva load.

```jsx
---
import LoginButton from "./components/LoginButton.jsx"
---
<header>
    <!-- Bóton que despliega un modal de Login -->
    <LoginButton client:idle />
</header>
```

### client:visible
Elementos de baja prioridad, que se encuentran en la parte inferior de la página o que requieren de tantos recursos que es preferible no cargarlos. Se cargan únicamente cuando están en el viewport.

```jsx
---
import Footer from "./components/Footer.jsx"
---
<header>
    <!-- Algún menu de navegación, logo, etc -->
</header>
<main>
    <!-- Contenido principal de la página-->
</main>
<!-- Cargará cuando este en el viewport -->
<Footer client:visible />
```

### client:media
Para elementos que sólo necesiten ser cargados en ciertos tamaños de pantalla, haciendo uso de media queries (CSS).

```jsx
---
import HamburgerNav from "./components/HamburgerNav.jsx"
---
<nav>
    <!-- Cargará unicamente en dicho tamaño de pantalla -->
    <HamburgerNav client:media="(max-width: 768px)" />
</nav>
```

### client:only
El elemento sólo se renderiza en el lado del cliente. Tienes que especificarle el tipo de framework correcto para que funcione correctamente.

```jsx
---
import PaginatedTable from "./components/PaginatedTable.jsx"
---
<section>
    <PaginatedTable client:only="react" />
</section>
```

Existen algunas directivas más, no solo para el cliente, que se pueden consultar en la [documentación](https://docs.astro.build/es/reference/directives-reference/) de Astro.

## Conclusión
Desde mi punto de vista este framework tiene un potencial muy grande para generar páginas estáticas, como portfolios, blogs o web personales, que no requieren una carga muy pesada de JavaScript.
Además es el primer framework agnóstico, podemos usar cualquier framework de UI en nuestro proyecto de Astro, dandonos la versatilidad de reutilizar o combinar otros componentes en nuestro proyecto.
Yo lo estoy usando para rediseñar mi [portfolio](https://ascinfo.dev) y añadir una sección para mí [blog](https://www.ascinfo.dev/blog). Comparto por [aquí](https://github.com/Sstark97/ascinfo-portfolio) el repositorio con el código para mostrar un ejemplo de uso de está herramienta.
Tiene muchísimas cosas que comentar y explorar, está en constante evolución. Hace poco salió la versión 3 y una nueva funcionalidad, compatibilidad con la [API de ViewTransitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).
Estás y otras mcuhas novedades merecen su artículo propio para explorarlas en profundidad.

## Referencias
Muchos de los ejemplos y explicaciones están basados en la documentación de Astro, a continuación los enlaces a las diferentes secciones:
- [Astro Islands](https://docs.astro.build/es/concepts/islands/)
- [Directivas del Cliente](https://docs.astro.build/es/reference/directives-reference/#directivas-del-cliente)