# 🎮 Level-Up Gamer

**Level-Up Gamer** es una plataforma de comercio electrónico Fullstack diseñada para la venta de productos gaming. Este proyecto integra un Frontend moderno en React con un Backend robusto en Spring Boot, implementando seguridad con JWT y persistencia de datos en MySQL.

Desarrollado como parte de la evaluación de la carrera de **Analista Programador** en **Duoc UC**.

---

## 👥 Autores

* **Rodrigo Calfiqueo** - *Analista Programador - Duoc UC*
* **Jordy Mondaca** - *Analista Programador - Duoc UC*

---

## 🚀 Tecnologías Utilizadas

### Frontend ⚛️
* **React + Vite:** Para una experiencia de usuario rápida y reactiva.
* **Bootstrap 5:** Diseño responsivo y estilizado.
* **Axios:** Comunicación HTTP con el Backend.
* **React Router DOM:** Gestión de navegación y rutas protegidas.
* **CSS Moderno:** Estilos personalizados con Glassmorphism y paleta Neon.

### Backend ☕
* **Java 17 + Spring Boot:** Framework principal.
* **Spring Security + JWT:** Autenticación y autorización basada en tokens.
* **Spring Data JPA (Hibernate):** ORM para la gestión de base de datos.
* **MySQL:** Base de datos relacional.
* **Lombok:** Reducción de código repetitivo.
* **Swagger / OpenAPI:** Documentación automática de la API.

---

## ⚙️ Funcionalidades Principales

1.  **Catálogo Público:** Visualización de productos con imágenes y precios.
2.  **Carrito de Compras:** Gestión de items, cálculo de totales y persistencia local.
3.  **Autenticación:** Registro de usuarios y Login seguro (Token JWT).
4.  **Checkout:** Generación de órdenes de compra conectadas a la base de datos.
5.  **Panel de Administración (Protegido):**
    * **Dashboard:** Resumen de métricas.
    * **CRUD de Productos:** Crear, Editar y Eliminar productos del catálogo.
    * **Historial de Órdenes:** Visualización de las ventas realizadas.
6.  **Seguridad por Roles:** Rutas protegidas para evitar acceso no autorizado al Admin.

---

## 🛠️ Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1. Base de Datos 🗄️
1.  Asegúrate de tener **XAMPP** (o MySQL Server) corriendo.
2.  Crea una base de datos vacía llamada:
    ```sql
    CREATE DATABASE levelup_db;
    ```

### 2. Backend (Spring Boot)
1.  Abre la carpeta `backend` en tu terminal.
2.  Ejecuta el servidor:
    ```bash
    ./mvnw spring-boot:run
    # O en Windows CMD:
    .\mvnw.cmd spring-boot:run
    ```
3.  El servidor iniciará en: `http://localhost:8080`
4.  **Documentación API (Swagger):** `http://localhost:8080/swagger-ui/index.html`

### 3. Frontend (React)
1.  Abre la carpeta `frontend` (o `level-up-gamer-react`) en una nueva terminal.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Ejecuta el proyecto:
    ```bash
    npm run dev
    ```
4.  Abre el navegador en: `http://localhost:5173`

---

## 🧪 Usuarios de Prueba

Para probar los diferentes roles, puedes registrarte o usar estos roles en la base de datos:

* **Rol Cliente:** Se asigna por defecto al registrarse. (Acceso a Tienda y Compras).
* **Rol Admin:** Debes cambiar manualmente el campo `rol` en la tabla `usuarios` de `CLIENTE` a `ADMIN`. (Acceso total al Panel `/admin`).

---

## 📄 Estado del Proyecto
* **Evaluación 3:** Completada ✅ (Integración Front/Back, JWT, CRUD Real).

---
© 2025 Level-Up Gamer - Duoc UC
