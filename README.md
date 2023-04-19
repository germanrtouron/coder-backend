
# Backend Ecommerce

El proyecto es un Backend de un ecommerce desarrollado con Node.js, MongoDB y Express. Se trata de una plataforma que cuenta con un API REST que permite a los usuarios realizar distintas acciones en función de sus roles.

En primer lugar, los administradores del ecommerce tienen acceso a rutas que les permiten gestionar los productos de la base de datos de manera sencilla. Entre otras cosas, pueden agregar, modificar o eliminar productos, y administrar los carritos de compra de cualquier usuario. Además, tienen la posibilidad de visualizar la información de cualquier usuario registrado en la plataforma, incluyendo su historial de compras.

Por otro lado, los usuarios normales también tienen acceso a la plataforma, pero cuentan con un conjunto de funcionalidades más reducido. En su caso, pueden agregar productos a su propio carrito de compras, borrarlos, cambiar las cantidades y generar una orden de compra. Además, pueden visualizar su propia información de usuario.

Cabe destacar que cuando un usuario se registra por primera vez en la plataforma, o cuando genera una orden de compra, se envía un email al administrador con la información correspondiente.

Por último, la plataforma cuenta con un sistema de autenticación que permite a los usuarios registrarse, iniciar sesión y cerrar sesión. Esto contribuye a mejorar la seguridad y privacidad de los datos de los usuarios.
## Instalación y ejecución local

Antes de ejecutar la aplicación, debes asegurarte de tener MongoDB, Node.js y Nodemon instalados en tu sistema.

Clona este repositorio en tu máquina local:

`$ git clone https://github.com/germanrtouron/coder-backend.git`

Instala las dependencias:

```bash
npm install
```

Ejecuta en modo desarrollador:

```bash
npm run start-dev
```

Ejecuta en modo producción:

```bash
npm run start-prod
```

Ejecuta en modo test:

```bash
npm run test
```
## Tecnologías

**Servidor:** NodeJS, Express

**Base de datos:** MongoDB

**Librerías:** axios, bcrypt, dotenv, nodemailer, log4js, passport
## API Rutas

Existen rutas para usuarios y administradores.
Los administradores también pueden acceder a las rutas de usuarios.

### Rutas para usuarios

#### Productos

***

```
  GET /api/product/
  
  Retorna todos los productos de la base de datos.
```

***

```
  GET /api/product/:id
  
  Retorna un producto específico por su ID.

  Parámetros de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del producto |

***

#### Usuarios

***

```
  GET /api/user/
  
  Retorna la información del usuario autenticado.
```

***

#### Carro de compras

***

```
  GET /api/cart/
  
  Retorna la información del carro de compras del usuario autenticado.
```

***

```
  POST /api/cart/
  
  Agrega un producto al carro de compras del usuario autenticado.

  Cuerpo de la solicitud:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `product` | `string` | **Requerido**. Id del producto |

***

```
  PUT /api/cart/:productID
  
  Modifica la cantidad de un producto en el carro de compras del usuario autenticado.

  Parámetros de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `productID` | `string` | **Requerido**. Id del producto |

```
Cuerpo de la solicitud:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `quantity` | `number` | **Requerido**. Cantidad del producto |

***

```
  DELETE /api/cart/
  
  Elimina el carro de compras del usuario autenticado.
```

***

```
  DELETE /api/cart/:productID
  
  Elimina un producto del carro de compras del usuario autenticado.

  Parámetros de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `productID` | `string` | **Requerido**. Id del producto |

***

#### Órdenes de compra

***

```
  GET /api/order/
  
  Retorna la información de la/s orden de compra del usuario autenticado.
```

***

```
  POST /api/order/
  
  Genera la orden de compra a partir del carro de compras del usuario autenticado.
```

***

### Rutas para administradores

#### Productos

***

```
  POST /api/product/admin/
  
  Agrega un producto a la base de datos.
  
  Cuerpo de la solicitud:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Requerido**. Nombre del producto |
| `description` | `string` | **Requerido**. Descripción del producto |
| `code` | `string` | **Requerido**. Código del producto |
| `thumbnail` | `string` | **Requerido**. Imagen del producto |
| `price` | `Number` | **Requerido**. Precio del producto |
| `stock` | `Number` | **Requerido**. Stock del producto |

***

```
  PUT /api/product/admin/:id
  
  Modifica un producto de la base de datos.

  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del producto |

```  
  Cuerpo de la solicitud:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Requerido**. Nombre del producto |
| `description` | `string` | **Requerido**. Descripción del producto |
| `code` | `string` | **Requerido**. Código del producto |
| `thumbnail` | `string` | **Requerido**. Imagen del producto |
| `price` | `Number` | **Requerido**. Precio del producto |
| `stock` | `Number` | **Requerido**. Stock del producto |

***

```
  DELETE /api/product/admin/:id
  
  Elimina un producto de la base de datos.

  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del producto |

***

```
  DELETE /api/product/admin/
  
  Elimina todos los productos de la base de datos.
```

***

#### Usuarios

***

```
  GET /api/user/admin/
  
  Retorna la información de todos los usuarios de la base de datos.
```

***

```
  GET /api/user/admin/dto/
  
  Retorna los campos nombre completo, email, y admin
  de todos los usuarios de la base de datos.
```

***

```
  GET /api/user/admin/:id
  
  Retorna la información de un usuario por su ID.

  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del usuario |

***

```
  POST /api/user/admin/
  
  Agrega un usuario a la base de datos.

  Cuerpo de la solicitud:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Requerido**. Email del usuario |
| `password` | `string` | **Requerido**. Password del usuario |
| `isAdmin` | `boolean` | True: Es administrador. |
| `name` | `string` | **Requerido**. Nombre del usuario |
| `lastname` | `string` | **Requerido**. Apellido del usuario |
| `phone` | `string` | **Requerido**. Teléfono del usuario |
| `address` | `object` | **Requerido**. Dirección del usuario |
| `avatar` | `string` | Imagen del usuario |

```
El objeto "address" tiene los parámetros:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `street` | `string` | **Requerido**. Calle |
| `number` | `string` | **Requerido**. Número |
| `city` | `string` | **Requerido**. Ciudad |
| `stateOrProvince` | `string` | **Requerido**. Estado o provincia |
| `zipCode` | `string` | **Requerido**. Código postal |
| `country` | `string` | **Requerido**. País |
| `additionalReferences` | `string` | **Requerido**. Información adicional |

***

```
  DELETE /api/user/admin/:id
  
  Elimina un usuario por su ID de la base de datos.

  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del usuario |

***

#### Carro de compras

***

```
  GET /api/cart/admin/
  
  Retorna todos los carros de compras de la base de datos.
```

***

```
  GET /api/cart/admin/:id
  
  Retorna un carro de compras por el ID del carro.
  
  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del carro |

***

```
  POST /api/cart/admin/:id
  
  Agrega un producto a un carro de compras por el ID del carro.
  
  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del carro |

```  
  Cuerpo de la solicitud:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `product` | `string` | **Requerido**. Id del producto |

***

```
  PUT /api/cart/admin/:cartID/:productID
  
  Modifica la cantidad de un producto de un carro de compras por el ID del carro.
  
  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `cartID` | `string` | **Requerido**. Id del carro |
| `productID` | `string` | **Requerido**. Id del producto |

```  
  Cuerpo de la solicitud:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `quantity` | `number` | **Requerido**. Cantidad del producto |

***

```
  DELETE /api/cart/admin/:cartID/:productID
  
  Elimina un producto de un carro de compras por el ID del carro.
  
  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `cartID` | `string` | **Requerido**. Id del carro |
| `productID` | `string` | **Requerido**. Id del producto |

***

```
  DELETE /api/cart/admin/:cartID
  
  Elimina un carro de compras por el ID del carro.
  
  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Requerido**. Id del carro |

***

#### Órdenes de compra

***

```
  GET /api/order/admin/
  
  Retorna la información de todas las ordenes de compra de la base de datos.
```

***

```
  GET /api/order/admin/:orderID
  
  Retorna la información la orden de compra por su ID.

  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `orderID` | `string` | **Requerido**. Id de la orden de compra |

***

```
  GET /api/order/admin/user/:userID
  
  Retorna la información la/s orden/es de compra por el ID de un usuario.

  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `userID` | `string` | **Requerido**. Id del usuario |

***

```
  DELETE /api/order/admin/:orderID
  
  Elimina la orden de compra por su ID.

  Parámetro de ruta:
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `orderID` | `string` | **Requerido**. Id de la orden de compra |

***

## Feedback

Si tienes cualquier sugerencia, contactar a: germanrtouron@hotmail.com



## Autor

- [@germanrtouron](https://github.com/germanrtouron)