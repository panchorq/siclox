import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configuración de CORS (temporalmente permisiva para pruebas)
app.use(cors({
  origin: '*', // En producción, reemplazar con los dominios permitidos
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Log de las solicitudes entrantes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(express.json());

// Ruta de salud
app.get('/', (req, res) => {
  res.json({ 
    status: 'API en funcionamiento',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    service: 'siclox-backend',
    version: '1.0.0'
  });
});

// Ruta para enviar correos
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone = '', message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Los campos nombre, email y mensaje son obligatorios' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: 'Siclox <onboarding@resend.dev>',
      to: 'fcomlopezortiz@gmail.com',
      subject: `Nuevo mensaje de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        ${phone ? `Teléfono: ${phone}\n` : ''}
        Mensaje: ${message}
      `
    });

    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).json({ error: 'Error al enviar el mensaje' });
    }

    res.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
