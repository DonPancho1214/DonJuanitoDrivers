# DonJuanitoDrivers

Esta es una landing page dinámica y moderna para una autoescuela/escuela de conducción, diseñada para facilitar la reserva de clases, interactuar con los usuarios a través de un chatbot, y mostrar información de las sedes y reseñas.

## Tecnologías

El proyecto está construido utilizando las siguientes tecnologías y herramientas:

*   **React**
*   **Vite**
*   **Tailwind CSS**
*   **Supabase**
*   **Framer Motion**
*   **Groq API**
*   **Telegram Bot API**
*   **Google Places API**

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2.  **Instalar las dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar las variables de entorno:**
    Copia el archivo `.env.example` y renómbralo a `.env`. Luego, llena las variables con tus credenciales.
    ```bash
    cp .env.example .env
    ```

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## Variables de entorno

El archivo `.env` requiere las siguientes configuraciones para el correcto funcionamiento de las integraciones:

*   **Groq API:** Utilizada para potenciar el asistente de inteligencia artificial (chatbot).
*   **Telegram Bot API:** Utilizada para enviar notificaciones automáticas cuando un usuario agenda un servicio.
*   **Google Places API:** Utilizada para obtener y mostrar las reseñas de Google de la autoescuela.
*   **Supabase:** Utilizada como base de datos y backend para gestionar el sistema de reseñas propias y otras configuraciones dinámicas.

Asegúrate de revisar el archivo `.env.example` para ver los nombres exactos de las variables requeridas.

## Scripts disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

*   `npm run dev`: Inicia el servidor de desarrollo para trabajar localmente.
*   `npm run build`: Construye la aplicación para producción en la carpeta `dist`.
*   `npm run preview`: Inicia un servidor local para previsualizar la compilación de producción generada por el comando build.
