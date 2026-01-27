# API de Carga de Datos Masiva

Esta es una API para un sistema de gestión de productos, clientes, rutas e historial de ventas, con la capacidad de cargar datos masivamente desde archivos Excel.

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

Todos los endpoints tienen el prefijo `/api`.

### Productos

- **`POST /api/upload/product`**: Carga un archivo Excel para añadir productos masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /api/product`**: Crea un nuevo producto.
  - **Ejemplo de Body**:
    ```json
    {
      "code": "P001",
      "description": "Descripción del Producto"
    }
    ```

- **`GET /api/product`**: Obtiene la lista de todos los productos.

- **`GET /api/product/:id`**: Obtiene un producto por su ID.

- **`PUT /api/product/:id`**: Actualiza un producto existente.

- **`DELETE /api/product/:id`**: Elimina un producto.

### Clientes

- **`POST /api/upload/client`**: Carga un archivo Excel para añadir clientes masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /api/client`**: Crea un nuevo cliente.
  - **Ejemplo de Body**:
    ```json
    {
      "code": "C001",
      "name_c": "Nombre del Cliente",
      "route_number": 101
    }
    ```

- **`GET /api/client`**: Obtiene la lista de todos los clientes.

- **`GET /api/client/:id`**: Obtiene un cliente por su ID.

- **`PUT /api/client/:id`**: Actualiza un cliente existente.

- **`DELETE /api/client/:id`**: Elimina un cliente.

### Rutas

- **`POST /api/upload/route`**: Carga un archivo Excel para añadir rutas masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /api/route`**: Crea una nueva ruta.
  - **Ejemplo de Body**:
    ```json
    {
      "route_number": 101
    }
    ```

- **`GET /api/route`**: Obtiene la lista de todas las rutas.

- **`GET /api/route/:id`**: Obtiene una ruta por su ID.

- **`PUT /api/route/:id`**: Actualiza una ruta existente.

- **`DELETE /api/route/:id`**: Elimina una ruta.

### Historial de Ventas (Sales History)

- **`POST /api/sales-history/upload`**: Carga un archivo Excel para añadir registros de ventas masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /api/sales-history`**: Crea un nuevo registro de venta.
  - **Ejemplo de Body**:
    ```json
    {
        "code_p": "P001",
        "description_p": "Producto A",
        "shipped_quantity": 10,
        "invoice_number": 9876,
        "code_c": "C001",
        "name_c": "Cliente Uno",
        "extended_amount": 150.50,
        "route_number": 101,
        "transaction_date": "2023-10-27",
        "your": "dato1",
        "tax": 15
    }
    ```

- **`GET /api/sales-history`**: Obtiene todos los registros de ventas.

- **`GET /api/sales-history/:invoiceNumber`**: Obtiene todos los registros asociados a un número de factura.

- **`PUT /api/sales-history/:invoiceNumber`**: Actualiza los registros de un número de factura.

- **`DELETE /api/sales-history/:invoiceNumber`**: Elimina todos los registros asociados a un número de factura.
