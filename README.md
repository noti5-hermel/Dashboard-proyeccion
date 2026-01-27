
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

### Productos

- **`POST /upload/product`**: Carga un archivo Excel para añadir productos masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /product`**: Crea un nuevo producto.

- **`GET /product`**: Obtiene la lista de todos los productos.

- **`GET /product/:id`**: Obtiene un producto por su ID.

- **`PUT /product/:id`**: Actualiza un producto existente.

- **`DELETE /product/:id`**: Elimina un producto.

### Clientes

- **`POST /upload/client`**: Carga un archivo Excel para añadir clientes masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /client`**: Crea un nuevo cliente.

- **`GET /client`**: Obtiene la lista de todos los clientes.

- **`GET /client/:id`**: Obtiene un cliente por su ID.

- **`PUT /client/:id`**: Actualiza un cliente existente.

- **`DELETE /client/:id`**: Elimina un cliente.

### Rutas

- **`POST /upload/route`**: Carga un archivo Excel para añadir rutas masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /route`**: Crea una nueva ruta.

- **`GET /route`**: Obtiene la lista de todas las rutas.

- **`GET /route/:id`**: Obtiene una ruta por su ID.

- **`PUT /route/:id`**: Actualiza una ruta existente.

- **`DELETE /route/:id`**: Elimina una ruta.

### Historial de Ventas (Sales History)

- **`POST /upload/sales-history`**: Carga un archivo Excel para añadir registros de ventas masivamente.
  - **Body**: `form-data`, `key`: "file", `value`: (tu archivo .xlsx)

- **`POST /sales-history`**: Crea un nuevo registro de venta.
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

- **`GET /sales-history`**: Obtiene todos los registros de ventas.

- **`GET /sales-history/:invoiceNumber`**: Obtiene todos los registros asociados a un número de factura.

- **`PUT /sales-history/:invoiceNumber`**: Actualiza los registros de un número de factura.

- **`DELETE /sales-history/:invoiceNumber`**: Elimina todos los registros asociados a un número de factura.
