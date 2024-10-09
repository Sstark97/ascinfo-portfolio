---
title: "Testing en Rust"
image: "/images/blog/testing_rust.webp"
description: "Descubre cómo realizar pruebas TDD en Rust, incluyendo tests unitarios y el uso de mocks, con ejemplos prácticos."
date: 2024-10-09
isPublished: true
canonical_url: "https://www.codemotion.com/magazine/es/devops-es/testeo/testing-en-rust/"
tags:
- "testing"
- "tdd"
- "rust"
---
Este es un artículo profundizamos en como hacer unit test en Rust. En este caso, el lenguaje te ofrece una serie de 
aserciones nativas, que nos permiten realizar tests sin dependencias externas.

## Introducción
En Rust, hacer pruebas está integrado directamente en el lenguaje, lo que facilita verificar el comportamiento del 
código sin necesidad de frameworks externos. Esto, si aplicas técnicas como TDD, te permite mantener el ciclo de 
desarrollo ágil y enfocado en la calidad desde el principio.

Para ejecutar un test en Rust, solo necesitas marcar una función como prueba usando el atributo #[test]. Al usar este 
atributo, Rust sabe que esa función debe ejecutarse cuando corres el comando cargo test, que es la herramienta para 
gestionar pruebas en Rust.

Si quieres leer el artículo completo, puedes hacerlo en [Codemotion](https://www.codemotion.com/magazine/es/devops-es/testeo/testing-en-rust/).
