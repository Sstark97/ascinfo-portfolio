---
title: "Arquitectura hexagonal en Spring"
image: "/images/blog/spring.webp"
description: "En estas semanas he estado redescubriendo Java, con el objetivo de pulir las bases y practicar muchos de 
los conceptos comunes del desarrollo..."
canonical_url: "https://www.sstark.dev/blog/arquitectura-hexagonal-en-spring"
date: 2023-08-17
isPublished: false
tags:
    - "clean code"
    - "java"
    - "spring"
    - "arquitectura hexagonal"
---
En estas semanas he estado redescubriendo Java, con el objetivo de pulir las bases y practicar muchos de los conceptos 
comunes del desarrollo. Además también empecé a aprender uno de sus frameworks más conocidos, Spring Boot.
Para ello decidí hacer una pequeña API para un market-place en el que tuviera 4-5 entidades para ir probando un poco 
el funcionamiento.
También quería aprender un poco de arquitectura, por lo que decidí implementar la API siguiendo una arquitectura hexagonal.
Mi idea era tener el siguiente esquema:
```
src/main/java/com/sstark/generalmarket/
|-- application/
|   |-- services/
|   |
|   |-- repositories/
|   |
|-- domain/
|   |-- models/
|   |
|-- infrasctructure/
|   |-- adapters/
|   |   
|   |-- configuration/
|   |   
|   |-- entities/
|   |   
|   |-- repositories/
|   |   
|   |-- controllers/ 
```

De está estructura lo más importante en la carpeta de configuración y los diferentes adaptadores, que serán los repositorios que inyecte Spring en los servicios.
Veamos paso a paso el proceso para que funcione todo correctamente.

<span class="read-more">[Leer más...](https://www.sstark.dev/blog/arquitectura-hexagonal-en-spring)</span>