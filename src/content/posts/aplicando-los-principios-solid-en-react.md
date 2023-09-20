---
title: "Aplicando los principios SOLID en React"
image: "/images/blog/solid.webp"
description: "Los principios SOLID son uno de los fundamentos más importantes en la arquitectura y desarrollo de software. 
SOLID es un acrónimo acuñado por Michael Feathers..."
date: 2023-04-11
isPublished: true
tags:
    - "clean code"
    - "solid"
    - "react"
---
Los principios SOLID son uno de los fundamentos más importantes en la arquitectura y desarrollo de software.
SOLID es un acrónimo acuñado por Michael Feathers, basado en los principios de la POO (programación orientada a objetos) 
que recopilaba Robert C. Martin en su libro *Design Principles and Design Patterns*. 

Estos principios son:
1. **Single responsability principle** - SRP (principio de responsabilidad única)
2. **Open-closed principle** - OCP (principio abierto-cerrado)
3. **Liskov substitution principle** - LSP (principio de sustitución de Liskov)
4. **Interface segregation principle** - ISP (principio de segregación de interfaces)
5. **Dependency Inversion Principle** - DIP (principio de inversión de dependencias)

Estos principios son útiles incluso más allá de la programación orientada a objetos, son parcialmente aplicables a otros estilos de programación, como puede ser el caso de la programación funcional o el desarrollo de componentes en los frameworks actuales de JavaScript.

Como muchos sabemos, React es una de las librerías más usadas en la actualidad para desarrollar aplicaciones web. Si conoces SOLID y React, puedes llegar a hacerte la siguiente pregunta: ¿Se pueden aplicar los principios SOLID en React?
La respuesta es sí, veamos como podríamos aplicarlos.

## Principio de responsabilidad única (SRP)
Este principio nos especifica que **una clase debería tener una, y solo una, razón para cambiar**, en el caso de React en lugar de una clase podría ser un componente.
En el siguiente ejemplo tenemos un componente que incumple dicho principio:

```tsx
import { useEffect, useState } from "react"
import axios from "axios"

type Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [isFetching, setIsFetching] = useState(true)
    
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
                const currentTodos = response.data
                setTodos(currentTodos)
            } catch (error) {
                console.log(error)
            } finally {
                setIsFetching(false)
            }
        }
    }, [])
    
    if (isFetching) {
        return <p>...loading<p>
    }
            
    return (
        <ul>
            {todos.map(todo => 
                <li key={todo.id}>
                    <span>{todo.id}</span>
                    <span>{todo.name}</span>
                </li>
            )}
        </ul>
    )
}
```

Podemos ver como el componente *TodoList* tiene varias responsabilidades, entre ellas:
- Gestionar el estado
- Hacer el fetching de datos
- Renderizar una lista de Todos
- Decidir como mostrar los elementos de la lista

Podemos mejorarlo un poco generando el siguiente custom hook:

*useTodos*
```tsx
import { useEffect, useState } from "react"
import axios from "axios"
import type { Todo } from "../types"

const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [isFetching, setIsFetching] = useState(true)
    
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
                const currentTodos = response.data
                setTodos(currentTodos)
            } catch (error) {
                console.log(error)
            } finally {
                setIsFetching(false)
            }
        }
    }, [])
    
    return { todo, isFetching}
}

export default useTodos
```

*TodosList*
```tsx
import useTodos from "../hooks/useTodos"
import type { Todo } from "../types"

const TodoList = () => {
    const { todos, isFetching } = useTodos()
    
    if (isFetching) {
        return <p>...loading<p>
    }
            
    return (
        <ul>
            {todos.map(todo => 
                <li key={todo.id}>
                    <span>{todo.id}</span>
                    <span>{todo.name}</span>
                </li>
            )}
        </ul>
    )
}
```

De esta forma hemos pasado la responsabilidad de realizar el fetching de datos a otro artefacto, aliviando así la carga del componente.
Sin embargo, nuestro custom hook no está del todo bien, gestiona el estado y carga los ToDos. Separemos este comportamiento en una función:

*todos.service.ts*
```tsx
const loadTodos = async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
        const currentTodos = response.data
        
        return currentTodos
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    loadTodos
}
```

*useTodos*
```tsx
import { useEffect, useState } from "react"
import { loadTodos } from "../services/todos.service"
import type { Todo } from "../types"

const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [isFetching, setIsFetching] = useState(true)
    
    useEffect(() => {
        const saveTodosInState = async () => {
            try {
                const currentTodos = await loadTodos()
                setTodos(currentTodos)
            } catch (error) {
                console.log(error)
            } finally {
                setIsFetching(false)
            }
        }
        
        saveTodosInState()
    }, [])
    
    return { todo, isFetching}
}

export default useTodos
```

Al hacerlo de esta forma, podemos sustituir fácilmente la librería con la que estamos solicitando los ToDos, que nuestro hook seguiría funcionando de la misma forma.

Nuestro hook cumple con el principio de responsabilidad única, sin embargo, nuestro componente ToDoList aún se encarga de varias cosas, es el quién decide como se van a renderizar cada uno de los ToDos.
Podríamos crear un componente ToDoItem que sea el que renderice cada ToDo.

*TodoItem*
```tsx
const TodoItem = ({id, name}: {id: number, name: string}) => (
    <li>
        <span>{id}</span>
        <span>{name}</span>
    </li>
)
```

*TodoList*
```tsx
import useTodos from "../hooks/useTodos"
import type { Todo } from "../types"

const TodoList = () => {
    const { todos, isFetching } = useTodos()
    
    if (isFetching) {
        return <p>...loading<p>
    }
            
    return (
        <ul>
            {todos.map(todo => 
                <TodoItem key={todo.id} id={todo.id} name={todo.name}/>
            )}
        </ul>
    )
}
```

Con este último cambio hemos conseguido aplicar SRP. Podríamos dar otra vuelta de tuerca y crear otro componente que se encargue de renderizar el estado de carga, sin embargo, debemos tener presente que estos principios no son un dogma. Muchas veces cumplirlos de manera estricta puede llegar a ser contraproducente.
Podríamos acabar repartiendo una misma responsabilidad entre dos o más artefactos, perdiendo cohesión y generando un acoplamiento públicamente visible.

### Componentes Ortogonales
**Un componente Ortogonal es aquel que puede ser modificado sin que afecte a otro**. Si los cambios en un artefacto obligan a cambios en otro para mantener el sistema funcionando, no sería un diseño ortogonal. Es evidente que para conseguir este diseño, se debe cumplir con el principio de responsabilidad única. Si los componentes son ortogonales, pueden intercambiarse, reemplazarse y componerse sin mayor problema.

## Principio abierto-cerrado (OCP)
Se dice que **un artefacto** debe admitir modificaciones en su comportamiento sin necesidad de cambiar su código, es decir, **debe estar abierto a extensión y cerrado a modificación**.

Como mencione anteriormente, debemos tener cuidado con aplicar estos principios al pie de la letra, podríamos acabar con una complejidad accidental bastante difícil de manejar.

Supongamos que tenemos el siguiente componente Header y algunas páginas que lo utilizan:

```tsx
const Header = () => {
  const { pathname } = useRouter()
  
  return (
    <header>
      <Logo />
      <Actions>
        {pathname === '/dashboard' && <Link to="/events/new">Create event</Link>}
        {pathname === '/' && <Link to="/dashboard">Go to dashboard</Link>}
      </Actions>
    </header>
  )
}

const HomePage = () => (
  <>
    <Header />
    <OtherHomeStuff />
  </>
)
const DashboardPage = () => (
  <>
    <Header />
    <OtherDashboardStuff />
  </>
)
```

Si observamos con detenimiento el Header con detenimiento nos damos cuenta de que estamos renderizando un componente Link en función del pathname.
El problema es que si en un futuro necesitamos añadir otra ruta, tendremos que modificar el código, y violaríamos el principio OCP.
Una posible solución sería el uso de **children**:

```tsx
const Header = ({ children }) => (
  <header>
    <Logo />
    <Actions>
      {children}
    </Actions>
  </header>
)
const HomePage = () => (
  <>
    <Header>
      <Link to="/dashboard">Go to dashboard</Link>
    </Header>
    <OtherHomeStuff />
  </>
)
const DashboardPage = () => (
  <>
    <Header>
      <Link to="/events/new">Create event</Link>
    </Header>
    <OtherDashboardStuff />
  </>
)
```

Con en esta pequeña modificación evitamos cambiar el Header si quisiéramos añadir una nueva ruta, será cada página la que renderice los Links que necesite.
Si bien es cierto que no es muy buena idea dejar un componente tan abierto, y es que children puede ser cualquier cosa, por lo que debemos asegurarnos de controlar estos casos.

## Principio de Sustitución de Liskov (LSP)
Este principio indica que **un tipo base, pueda ser sustituido por cualquiera de sus subtipos**, sin romper la funcionalidad del programa.
Esto aplica a cualquier artefacto que cumpla con una determinada interfaz, entendiendo como interfaz a un conjunto de métodos públicos (aunque no se utilice una interface como tal), es decir, un contrato.

Supongamos que tenemos un componente Title que renderiza un título basándonos en las props que le pasemos:

```tsx
const Title = ({ content }) => (
    <>{content}</>
)

const Page = () => (
    const title = <h1>Example Page</h1>
    <section>
        <Title content={title} />
    </section>
)
```

A priori es un componente bastante sencillo que se encarga de renderizar un título.
Pero, ¿que pasaría si como content pasásemos un objeto?

```jsx
const Title = ({ content }) => <> {content} </>;

const Page = () => (
  <section>
    <Title content={{ content: "Example"}} />
  </section>
)
```

Aparantemente el código no da fallos a la hora de compilarlo, pero si vamos al navegador...

![](https://i.imgur.com/qZnt5Sa.png)


Esto ocurre porque nuestro componente no cumple ningún contrato, nadie nos garantiza que el content vaya a ser un elemento de JSX.

Si utilizáramos TypeScript en nuestro proyecto, podríamos acabar con el problema de raíz:

```tsx
interface TitleProps {
    content: JSX.Element
}

const Title = ({ content }: TitleProps) => (
    <>{content}</>
)

const Page = () => (
  <section>
    <Title content={{ content: "Example"}} />
  </section>
)
```

De esta forma nuestro componente solo aceptará que le pasemos elementos de JSX como props, y si intentamos pasarle nuevamente algo que no cumpla la firma de interfaz TypeScript nos dará el aviso:

![](https://i.imgur.com/0TZgJsE.png)

## Principio de Segregación de Interfaces (ISP)
En este cuarto principio se explica que **todos los métodos de una interfaz deben ser consumidos por un único cliente**.
Si una interfaz tiene varios consumidores que utilizan subconjuntos de métodos diferentes de dicha interfaz, probablemente dicha interfaz esté inflada, y podamos subdividirla en tantas interfaces como subconjuntos estemos utilizando.
Además, estos malos diseños **acoplan a los consumidores entre sí**, desde que se cambie una interfaz para cumplir con los requisitos, los otros clientes deberán actualizarse aunque no les afecte a nivel funcional.

Supongamos que tenemos los siguientes componentes:

*VideoList*
```tsx
interface Video {
  title: string
  duration: number
  coverUrl: string
}

interface VideoListProps {
  items: Array<Video>
}
    
const VideoList = ({ items }: Props) => {
  return (
    <ul>
      {items.map(item => 
        <Thumbnail 
          key={item.title} 
          video={item} 
        />
      )}
    </ul>
  )
}
```

*Thumbnail*
```tsx
interface ThumbnailProps {
  video: Video
}

const Thumbnail = ({ video }: ThumbnailProps) => {
  return <img src={video.coverUrl} />
}
```

Si nos fijamos bien en el componente Thumbnail, nos daremos cuenta de que está recibiendo todo el objeto Vídeo, y solo hace uso de la propiedad coverUrl.
Podríamos mejorar este diseño, si en lugar del vídeo, pasáramos directamente la propiedad que necesita Thumbnail, cambiando la interface de la siguiente forma:

*VideoList*
```tsx
interface Video {
  title: string
  duration: number
  coverUrl: string
}

interface VideoListProps {
  items: Array<Video>
}
    
const VideoList = ({ items }: VideoListProps) => {
  return (
    <ul>
      {items.map(item => 
        <Thumbnail 
          key={item.title} 
          video={item.coverUrl} 
        />
      )}
    </ul>
  )
}
```

*Thumbnail*
```tsx
interface ThumbnailProps {
  coverUrl: string
}

const Thumbnail = ({ coverUrl }: ThumbnailProps) => {
  return <img src={coverUrl} />
}
```

Hemos conseguido aplicar ISP en nuestro componente, dejándolo más limpio y eficiente, al solo recibir las propiedades que necesita.


## Principio de inversión de las dependencias (DIP)
**Un artefacto con un nivel de abstracción alto no debería depender de otro con un nivel de abstracción más bajo**. Cuando hablamos de nivel alto nos referimos al más cercano al negocio, mientras que bajo significa más cercano a la infraestructura.
El objetivo de este principio es reducir las dependencias entre módulos, alcanzar un nivel bajo de acoplamiento.

Analicemos el siguiente componente Todo, que gestiona las peticiones y el estado mediante la librería [SWR](https://swr.vercel.app/es-ES):

```tsx
import useSWR from "swr";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    
    return res.json();
}

const Todo = () => {
    const { data: todos } = useSWR("https://jsonplaceholder.typicode.com/todos", fetcher)
    
    if(!todos) {
        return <p>Loading...</p>
    }
    
    return (
        <ul>
            {todos.map((todo: Todo) => (
                <li key={todo.id}>
                    <span>{todo.id}</span>
                    <span>{todo.name}</span>
                </li>
            ))}
        </ul>
    )
```

Si nos fijamos bien, podemos observar una dependencia con el hook *useSWR*, nuestro componente depende del para obtener los datos. Un artefacto con un nivel mayor de abstracción depende de otro con menos abstracción.
Esto podríamos solucionarlo añadiendo una capa más de abstracción con un *customHook*, que se encargue de dicha responsabilidad.

*useTodos*
```tsx
import useSWR from "swr"

interface UseTodos {
    key: string,
    fetcher: () => Promise<Todo[]>
}
    
interface Response {
    todos: Todo[] | undefined
    error: string | undefined
    isValidating: boolean
}
    
const useTodos = ({key, fetcher}: UseTodos): Response => {
        const { data: todos, error, isValidating} = useSWR(key, fetcher)
}

return { todos, error, isValidating }
    
export default useTodos;
```

*Todo*
```tsx
import useTodos from "../useTodos";

const fetcher = async (): Promise<Todo[]> => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    const res = await fetch(url);
    
    return res.json();
}

const Todo = () => {
    const { todos } = useTodos({key: "/todos", fetcher})
    
    if(!todos) {
        return <p>Loading...</p>
    }
    
    return (
        <ul>
            {todos.map((todo: Todo) => (
                <li key={todo.id}>
                    <span>{todo.id}</span>
                    <span>{todo.name}</span>
                </li>
            ))}
        </ul>
    )
```

Esta implementación nos da mucha flexibilidad, al igual que pasaba con SRP, si más adelante cambiamos la implementación del *fetcher* o cómo realiza nuestro hook la solicitud de los datos (Por ejemplo con GraphQL), nuestro componente no se enteraría, la aplicación seguiría funcionando sin problemas.

## Conclusión
Los principios SOLID pueden ayudarnos a conseguir un **código más legible, mantenible y escalable**. En muchas ocasiones nos permitirá reducir el acoplamiento entre componentes y, por lo tanto, aumentará la cohesión en nuestro código.

Podemos ver que en React se pueden adaptar perfectamente estos principios, a pesar de que en sus orígenes estaban pensados para la programación orientada a objetos.

Sin embargo, n**o debemos tomarnos estos principios como leyes escritas en piedra**, todo principio llevado al límite puede suponer una piedra en el camino que puede hacernos tropezar y hacer que el resultado sea el efecto contrario al deseado.

**Podemos buscar la mejor forma de aplicarlos**, sin obsesionarnos por cumplir todos y cada uno de los principios al pie de la letra. Entendamos que todo tiene su caso de uso y sus particularidades, y saber adaptar estos principios es la mejor forma de sacarles partido y obtener los beneficios que nos aportan.


## Bibliografía
[Código Sostenible](https://savvily.es/libros/codigo-sostenible/)
[SOLID: los 5 principios que te ayudarán a desarrollar software de calidad](https://profile.es/blog/principios-solid-desarrollo-software-calidad/#1_Principio_de_Responsabilidad_Unica)
[Applying the Liskov Substitution Principle in React](https://betterprogramming.pub/applying-the-liskov-substitution-principle-in-react-3a0614a42a08))
