# 🍔 Mc Ronald's - Sistema de Pedido de Comida

## 📌 Descripción General
Mc Ronald's es un sistema desarrollado para un restaurante de comida rápida, cuyo objetivo es digitalizar y agilizar la experiencia de compra de los clientes mediante **pantallas táctiles** ubicadas dentro de los locales.  

Los clientes podrán:
- Visualizar el menú con promociones y productos disponibles.
- Realizar un pedido como **invitado** (solo colocando su nombre).
- Pagar con **tarjeta** o **Yape**.
- Entrega de su boleta o factura y recibir su orden en caja cuando esté lista.

- Además, el sistema incluye dos roles principales:
- **Administrador (ADMIN)**  
  - Gestión de usuarios (CRUD).  
  - Gestión del menú (CRUD).  
- **Cocinero (COCINERO)**  
  - Visualización en tiempo real de los pedidos realizados por los clientes.  

---

## ⚙️ Tecnologías Usadas
- **Backend:** Spring Boot (Java 11+)  
- **Frontend:** React con Vite / Create React App (dependiendo del setup)  
- **Base de datos:** MySQL 
- **Seguridad:** Spring Security + JWT (para manejo de sesiones y roles) 
- **Estilos:** TailwindCSS / Bootstrap (a definir según diseño)  
- **Control de versiones:** Git + GitHub
- **Dispositivos de interacción:** Pantallas táctiles/tablets para pedidos en local  

---

## 📋 Responsabilidades

| Nombre |  Rol  | Funciones | 
|:-----|:--------:|:--------:|
| Abraham Vergara   | Full Stack | Gestionar todo el ciclo de vida del desarrollo.|
| Angel Salazar   | Backend|Crear y gestionar servicios backend para que se comunique de manera eficiente con el servidor.|
| Erixon Castillo   | Full Stack |Desarrollar tanto el frontend como el backend.|
| Francis Moreno   |  Frontend |Diseñar y desarrollar la interfaz de usuario.|
| Samanta Cordova   | Full Stack |Crear herramientas administrativas para gestionar usuarios y contenido.|


---

## :jigsaw: Flujo de trabajo con Git

**1. Ramas utilizadas**

- `main` → Rama estable, lista para producción.

- `develop-Nombre` → Rama de desarrollo.

- `feature/nombre` → Para nuevas funcionalidades.

- `fix/nombre` → Para correcciones de errores.
#### Ejemplo
  ```bash
  git checkout -b feature/whatsapp-code
  ```
<img width="940" height="166" alt="image" src="https://github.com/user-attachments/assets/87dfbc82-0295-4297-908c-bb635671ff3e" />

  
#### Ejemplo
  ```bash
  git checkout -b hotfix/security
  ```
<img width="940" height="158" alt="image" src="https://github.com/user-attachments/assets/e4e8897a-4025-4173-9b67-152711928d4b" />


**2. Commits**
- Commits atómicos y descriptivos..
#### Ejemplo
  ```bash
  git commit -m "feat: agregar CRUD de usuarios en backend"
  git commit -m "fix: corregir validación de contraseña en registro"
  ```
**3. Uso de comandos Git**

Durante el desarrollo se documentaron los siguientes comandos:

#### 🔄 Restaurar archivos
  ```bash
  git restore src/components/Menu.jsx
  ```
**📌 Por qué:** Cuando se modificó accidentalmente el componente Menu.jsx y se necesitó volver al estado previo.

#### ⏪ Resetear cambios
  ```bash
  git reset --soft HEAD~1
  ```
**📌 Por qué:** Para deshacer el último commit sin perder los cambios en el área de staging
#### 🔀 Cambiar de ramas
  ```bash
  git switch develop
  ```
**📌 Por qué:** Al pasar del desarrollo de una nueva feature hacia la rama develop.
  ```bash
  git checkout -b fix/error-pago
  ```
**📌 Por qué:** Para crear una rama de corrección desde la rama estable

**4. Pull Request (PR) / Merge Request (MR)**

Se generó una Pull Request desde `develop-angel` hacia `main.`
- Descripción clara del cambio.

- Checklist de revisión.

- Revisión y aprobación antes de hacer merge.

  <img width="886" height="406" alt="image" src="https://github.com/user-attachments/assets/dbc4c276-ede4-4f7f-927d-0b0dcab030d8" />


**5. Resolución de Conflictos**
Ejemplo:

Al intentar fusionar `feature/gestion-usuarios` con `develop`, hubo un conflicto en:

`src/components/Header.jsx`
  ```bash
  <<<<<<< HEAD
<h1>Bienvenido a Mc Ronald's</h1>
=======
<h1>Mc Ronald's - Sistema de Pedidos</h1>
>>>>>>> feature/gestion-usuarios
  ```
**✅ Solución:** Se unificaron los cambios y se mantuvo el mensaje más completo:
  ```bash
  <h1> Bienvenido a Mc Ronald's - Sistema de Pedidos </h1>
  ```
**6. Historial de commits (puntos de control)**

#### Ejemplo de salida:
  ```bash
  git log
  ```
#### Muestra:
  <img width="771" height="944" alt="image" src="https://github.com/user-attachments/assets/25d6a5e9-989e-4891-b9de-433e26dc664f" />
  
**7.Historial de cabeceras**
  ```bash
  git reflog
  ```
#### Simulación:
  ```bash
  d4e5f6g HEAD@{0}: commit: fix: corregir error en validación de usuario
h7i8j9k HEAD@{1}: commit: feat: agregar login con JWT
l0m1n2o HEAD@{2}: commit (initial): init: configuración inicial de Spring Boot
  ```

---

## 🔷 Estructura de backend

<img width="361" height="602" alt="Image" src="https://github.com/user-attachments/assets/3b05aa64-4a79-4741-917b-c537643ea0e5" />


---

## 🔶 Estructura de frontend

<img width="291" height="552" alt="Image" src="https://github.com/user-attachments/assets/093e102f-d0e6-4bf4-a79e-e1bb19c95917" />


---

---

## ⚙️ Integración y Despliegue Continuo (CI/CD)

Este proyecto utiliza **GitHub Actions** para automatizar los procesos de Integración Continua (CI) y Despliegue Continuo (CD).

### 1. Integración Continua (CI)

La Integración Continua se gestiona mediante el archivo `.github/workflows/ci.yml`.

| Aspecto | Detalles |
| :--- | :--- |
| **Workflow** | `ci.yml` |
| **Ubicación** | `back/McRonalds` (Spring Boot/Maven) |
| **Disparador** | Cada `push` a las ramas principales. |
| **Propósito** | Asegurar que el código se compila correctamente, se empaqueta y pasa todas las pruebas unitarias antes de cualquier intento de despliegue. |
| **Acciones** | Checkout del código, configuración de Java, y ejecución de `mvn verify` o similar. |

### 2. Despliegue Continuo (CD)

El Despliegue Continuo (CD) se enfoca en el backend alojado en Render y se gestiona mediante el archivo `.github/workflows/deploy.yml`.

| Aspecto | Detalles |
| :--- | :--- |
| **Workflow** | `deploy.yml` |
| **Servicio** | Backend (carpeta `back/`) |
| **Plataforma** | Render |
| **Disparador** | Cada `push` a la rama `main` (o la configurada) **solo si hay cambios en la carpeta `back/**`**. |
| **Método** | Activación del **Render Deploy Hook URL** mediante una solicitud `cURL`. |

---

## ☁️ Despliegue con Render

El backend de la aplicación se despliega como un **Web Service** en Render, aprovechando el `Dockerfile` ubicado en `back/McRonalds/`.

### Configuración Necesaria

Para que el flujo de CD funcione, es **obligatorio** configurar un Secreto de Repositorio en GitHub:

1.  **Obtener el Deploy Hook URL:** En el panel de control de Render, navega a tu servicio backend y copia el **Deploy Hook URL** generado.
2.  **Crear el Secreto:** En tu repositorio de GitHub, ve a **Settings** > **Secrets and variables** > **Actions**.
3.  Crea un nuevo secreto con el siguiente nombre y valor:

| Secreto de GitHub | Valor |
| :--- | :--- |
| `RENDER_DEPLOY_HOOK_URL` | URL del Gancho de Despliegue de Render. |

### Proceso de Despliegue

Cada vez que se realiza un `push` a la rama de despliegue (`main`) y se detectan cambios en la carpeta `back/`, el workflow `deploy.yml`:
1.  Ejecuta un comando `curl` a la URL secreta.
2.  Render recibe la señal, extrae el código más reciente del repositorio (incluyendo el `Dockerfile` y el código Java), construye la nueva imagen Docker y la despliega automáticamente.

---

<img width="1237" height="178" alt="Image" src="https://github.com/user-attachments/assets/5865f2ad-a588-47a7-aeda-430509c6ec32" />

<img width="1031" height="689" alt="image" src="https://github.com/user-attachments/assets/ba079eee-7141-413b-85f6-23d41c79ff85" />


