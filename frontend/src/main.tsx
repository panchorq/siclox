import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import App from './App';
import './index.css';

// Configuración de React Query
const queryClient = new QueryClient();

// Cargar las traducciones
const loadTranslations = async () => {
  await Promise.all(
    ['en', 'es', 'pt'].map(lng => 
      import(`../public/locales/${lng}/translation.json`)
        .then(translation => {
          i18n.addResourceBundle(lng, 'translation', translation.default);
        })
    )
  );
};

// Cargar las traducciones antes de renderizar
loadTranslations().then(() => {
  // Renderizado principal
  createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
});
