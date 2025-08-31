// Configuración de la API
export const API_BASE_URL = import.meta.env.PROD
  ? 'https://tudominio.com/api'  // Reemplaza con tu dominio de producción
  : 'http://localhost:3001/api';  // URL de desarrollo

// Configuración de Resend
export const RESEND_CONFIG = {
  from: 'contacto@tudominio.com',  // Reemplaza con tu email verificado en Resend
  to: 'fcomlopezortiz@gmail.com',
};
