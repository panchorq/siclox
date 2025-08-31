# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c17d9907-afb1-4ecf-8ade-bfd8cd145a81

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c17d9907-afb1-4ecf-8ade-bfd8cd145a81) and start prompting.

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd siclox-digital-hub
   ```

2. Instalar dependencias del workspace:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Crear archivo `.env` en la raíz con las siguientes variables:
     ```
     # Frontend
     VITE_API_URL=http://localhost:3001
     
     # Backend
     PORT=3001
     RESEND_API_KEY=tu_api_key_de_resend
     NODE_ENV=development
     ```

## Desarrollo

### Iniciar solo el frontend
```bash
npm run dev:frontend
```

### Iniciar solo el backend
```bash
npm run dev:backend
```

### Iniciar frontend y backend juntos
```bash
npm run dev
```

El frontend estará disponible en: http://localhost:5173  
El backend estará disponible en: http://localhost:3001

## Producción

### Construir el frontend
```bash
npm run build:frontend
```

### Iniciar el backend en producción
```bash
npm run start:backend
```

## Despliegue

### Frontend
El frontend puede desplegarse en cualquier servicio de hosting estático como Vercel, Netlify o GitHub Pages.

### Backend
El backend puede desplegarse en servicios como Render, Railway o Heroku. Se incluye un archivo `render.yaml` para facilitar el despliegue en Render.
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c17d9907-afb1-4ecf-8ade-bfd8cd145a81) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
