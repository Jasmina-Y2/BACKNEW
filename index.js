import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch'; // Usando import para node-fetch
import { fileURLToPath } from 'url';

const app = express();

// Obtiene el directorio actual, equivalente a __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Habilita CORS y el parsing de JSON
app.use(cors());
app.use(express.json());

// Ruta para generar la historia
app.post('/api/generar-historia', async (req, res) => {
  console.log('✅ Recibido en el backend:', req.body);
  try {
    const { historia, ide } = req.body;
    const historiaLocal = [];

    for (let i = 0; i < historia.length; i++) {
      const { texto, imagen } = historia[i];
      
      // Aquí se debería hacer el manejo de la imagen, ya sea descargándola
      // o utilizando la URL proporcionada. En este caso, las imágenes son
      // URLs externas, por lo que simplemente las dejamos tal cual.
      
      historiaLocal.push({ texto, imagen });
    }

    const jsonNombre = `${ide}_historia.json`;
    const dataJsonGuardar = {
      titulo: "Título de la historia", // Puedes agregar un título si lo deseas
      historia: historiaLocal,
    };

    // Aquí puedes guardar el archivo JSON si lo necesitas.
    // fs.writeFileSync(path.join(__dirname, 'imagenes', jsonNombre), JSON.stringify(dataJsonGuardar, null, 2));

    // Responder con el JSON
    res.json({
      mensaje: 'Historia guardada',
      archivo: jsonNombre,
      historia: historiaLocal
    });
  } catch (err) {
    console.error('❌ Error en el backend:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});



// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
