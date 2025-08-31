import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Configuración de CORS
const corsOptions = {
  origin: isProduction 
    ? ['https://tudominio.com', 'https://www.tudominio.com'] // Reemplaza con tu dominio real
    : 'http://localhost:5173', // Solo para desarrollo
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Servir archivos estáticos en producción
if (isProduction) {
  import('path').then(({ default: path }) => {
    const __dirname = path.resolve();
    // Apuntar a la carpeta dist dentro de frontend
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    // Manejar rutas de SPA
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
  });
}

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Ruta para enviar correos
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validar datos
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Inicializar Resend con tu API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Enviar correo
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Puedes configurar tu dominio más adelante
      to: 'fcomlopezortiz@gmail.com',
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).json({ error: 'Error al enviar el correo' });
    }

    res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
