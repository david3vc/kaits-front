# Kaits — Frontend (React + Vite + TypeScript)
Aplicación web desarrollada en React + TypeScript que permite gestionar pedidos, clientes y productos de manera ágil e intuitiva.
Forma parte del sistema Kaits, compuesto por un backend en .NET y este frontend SPA, que consume sus servicios mediante API REST.
El sistema permite registrar pedidos con múltiples productos, calcular subtotales y totales automáticamente, filtrar por fechas y realizar operaciones CRUD completas.

---

## 🧩 Instrucciones para ejecutar el proyecto
### ⚙️ Requisitos previos
- Node.js 20.19.5 (versión recomendada)
- npm 10.8.2
- Conexión al backend de Kaits (API .NET) ejecutándose en local o remoto.
1. Clonar el repositorio
```bash
git clone https://github.com/david3vc/kaits-front.git
cd kaits-front
```
2. Instalar dependencias
```bash
npm install
```
3. Configurar la URL del backend
- Edita el archivo .env.local en la raíz del proyecto.
- Define la variable VITE_API_BASE_URL con la dirección de tu API:
```bash
VITE_API_BASE_URL=https://localhost:7217
```
4. Ejecutar en modo desarrollo
```bash
npm run dev
```
---

## 🧱 Arquitectura elegida y decisiones técnicas
El proyecto sigue una arquitectura modular basada en capas, separando la lógica de negocio, servicios y presentación. Esto facilita la escalabilidad, el mantenimiento y la reutilización de componentes.
```bash
src/
├─ core/               # Componentes, helpers y configuraciones globales
│  ├─ components/      # Componentes reutilizables (Botones, Cards, Layouts)
│  ├─ constants/       # Variables globales (ej. API_BASE_URL)
│  ├─ helpers/         # Funciones de utilidad general
│  ├─ layouts/         # Layout base (Admin Layout)
│  ├─ router/          # Configuración de rutas (React Router)
│  └─ styles/          # Estilos globales SCSS
├─ services/           # Capa de comunicación con la API (Axios)
│  └─ apis/            # Servicios específicos (Pedidos, Productos, Clientes)
├─ types/              # Tipos TypeScript para Requests/Responses
├─ views/              # Módulos de negocio (Pedidos, Productos, Clientes)
└─ main.tsx            # Punto de entrada principal

```
### Decisiones técnicas clave
- Vite + TypeScript: proporciona alta velocidad de compilación y tipado estático.
- React Query 5: para manejo avanzado del estado de servidor y cacheo automático de datos.
- Formik + Yup: elegidos para validaciones declarativas y formularios dinámicos.
- React-Bootstrap + Bootstrap 5: asegura una UI moderna y consistente.
- Axios: centraliza las peticiones HTTP hacia la API del backend.
- React Router 6: organiza las rutas del sistema bajo un layout principal.
- Arquitectura desacoplada: cada módulo (pedido, producto, cliente) contiene sus propios hooks y servicios.
- Localización de fechas: react-datepicker configurado con soporte para español.
- Alertas y notificaciones: integradas con SweetAlert2 y ToastMe para mejorar la experiencia del usuario.
---

## 📦 Librerías principales utilizadas

### Dependencias de ejecución


| Librería | Propósito |
|-----------|------------|
| react, react-dom | Base del frontend (UI y renderizado). |
| react-router-dom | Navegación de rutas (SPA). |
| @tanstack/react-query | Manejo de estado asíncrono y cache de datos del servidor. |
| axios | Cliente HTTP para llamadas al backend. |
| formik, yup | Formularios controlados con validaciones. |
| react-bootstrap, bootstrap | Componentes visuales y estilos responsivos. |
| react-datepicker | Selector de fechas con localización en español. |
| dayjs | Manipulación ligera de fechas. |
| sweetalert2, toastmejs | Alertas modales y notificaciones. |
| qs | Serialización de parámetros en URLs. |
| simplebar, flatpickr, feather-icons | Mejoras visuales y usabilidad. |

### Dependencias de desarrollo

| Librería | Propósito |
|-----------|------------|
| vite | Bundler ultrarrápido con HMR. |
| typescript | Tipado estático para mayor robustez. |
| eslint + plugins de React y TypeScript | Linting y buenas prácticas de código. |
| @vitejs/plugin-react | Soporte completo para JSX y Fast Refresh. |

---

## 👤 Autor
David Vera
Software Developer — .NET | SQL Server | React
