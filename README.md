
# API de Carga de Datos Masiva

Esta es una API para un sistema de gestión de productos, clientes y rutas, con la capacidad de cargar datos masivamente desde archivos Excel.

## Requisitos

- Node.js
- npm
- PostgreSQL

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env`:
   ```
   DB_USER=your_db_user
   DB_HOST=your_db_host
   DB_DATABASE=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=your_db_port
   ```
4. Inicia la aplicación:
   - Para producción:
     ```bash
     npm start
     ```
   - Para desarrollo (con reinicio automático):
     ```bash
     npm run dev
     ```

## Endpoints de la API

### Productos

- **`POST /upload/product`**: Carga un archivo Excel para añadir productos masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /product`**: Crea un nuevo producto.
  - **Header**: `Content-Type: application/json`
  - **Ejemplo de Body**:
    ```json
    {
      "code": "P001",
      "description": "Descripción del Producto"
    }
    ```
  - **Respuesta Exitosa (201 Created)**:
    ```json
    {
      "code": "P001",
      "description": "Descripción del Producto"
    }
    ```

- **`GET /product`**: Obtiene la lista de todos los productos.

- **`GET /product/:id`**: Obtiene un producto por su ID.

- **`PUT /product/:id`**: Actualiza un producto existente.

- **`DELETE /product/:id`**: Elimina un producto.

### Clientes

- **`POST /upload/client`**: Carga un archivo Excel para añadir clientes masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /client`**: Crea un nuevo cliente.
  - **Header**: `Content-Type: application/json`
  - **Ejemplo de Body**:
    ```json
    {
      "code": "C001",
      "name_c": "Nombre del Cliente",
      "route_number": 101
    }
    ```
  - **Respuesta Exitosa (201 Created)**:
    ```json
    {
      "code": "C001",
      "name_c": "Nombre del Cliente",
      "route_number": 101
    }
    ```

- **`GET /client`**: Obtiene la lista de todos los clientes.

- **`GET /client/:id`**: Obtiene un cliente por su ID.

- **`PUT /client/:id`**: Actualiza un cliente existente.

- **`DELETE /client/:id`**: Elimina un cliente.

### Rutas

- **`POST /upload/route`**: Carga un archivo Excel para añadir rutas masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /route`**: Crea una nueva ruta.
  - **Header**: `Content-Type: application/json`
  - **Ejemplo de Body**:
    ```json
    {
      "route_number": 101
    }
    ```
  - **Respuesta Exitosa (201 Created)**:
    ```json
    {
      "route_number": 101
    }
    ```

- **`GET /route`**: Obtiene la lista de todas las rutas.

- **`GET /route/:id`**: Obtiene una ruta por su ID.

- **`PUT /route/:id`**: Actualiza una ruta existente.

- **`DELETE /route/:id`**: Elimina una ruta.
