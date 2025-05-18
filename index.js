import express from 'express';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 🟡 CORS abierto temporalmente (para pruebas desde cualquier dispositivo)
app.use(cors());  // Esto equivale a origin: '*'

// Middleware para leer JSON
app.use(express.json());

// Ruta de procesamiento de historia
app.post('/api/generar-historia', async (req, res) => {
  console.log('✅ Recibido en el backend:', req.body);
  try {
    const { historia, ide } = req.body;
    const historiaLocal = [];

    for (let i = 0; i < historia.length; i++) {
      const { texto, imagen } = historia[i];
      historiaLocal.push({ texto, imagen });
    }

    const jsonNombre = `${ide}_historia.json`;
    const dataJsonGuardar = {
      titulo: "Título de la historia",
      historia: historiaLocal,
    };

    // Si quieres guardar el archivo en local (opcional)
    // fs.writeFileSync(path.join(__dirname, 'imagenes', jsonNombre), JSON.stringify(dataJsonGuardar, null, 2));

    res.json({
      mensaje: 'Historia generada correctamente',
      archivo: jsonNombre,
      historia: historiaLocal
    });
  } catch (err) {
    console.error('❌ Error en el backend:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// 🟢 Escuchar en red local y puerto dinámico o 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en red: http://0.0.0.0:${PORT}`);
});
