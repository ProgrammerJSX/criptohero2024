const express = require('express');
const app = express();
app.use(express.json()); // Permite que tu servidor maneje JSON en el cuerpo de las solicitudes.
app.use('/images', express.static('images')); // Sirve archivos estáticos desde la carpeta 'images'

let imagenes = [
    {
        id: 1,
        nombre: "CriptoHeroe1",
        tipo: "rare",
        descripcion: "Descripción del CriptoHeroe 1",
        familia: "criptoheroe",
        precio: 100,
        urlImagen: "/images/bitcoin.jpg"
    },
    {
        id: 2,
        nombre: "CriptoVillano1",
        tipo: "normal",
        descripcion: "Descripción del CriptoVillano 1",
        familia: "criptovillano",
        precio: 150,
        urlImagen: "/images/bitcoinLGTB.jpg"
    }
];

// Obtener todas las imágenes
app.get('/imagenes', (req, res) => {
    res.json(imagenes);
});

// Obtener una imagen por ID
app.get('/imagenes/:id', (req, res) => {
    const { id } = req.params;
    const imagen = imagenes.find(img => img.id == id);
    if (imagen) {
        res.json(imagen);
    } else {
        res.status(404).send('Imagen no encontrada');
    }
});

// Agregar una nueva imagen
app.post('/imagenes', (req, res) => {
    const { nombre, tipo, descripcion, familia, precio, urlImagen } = req.body;
    const nuevaImagen = {
        id: imagenes.length + 1,
        nombre,
        tipo,
        descripcion,
        familia,
        precio,
        urlImagen
    };
    imagenes.push(nuevaImagen);
    res.status(201).send(nuevaImagen);
});

// Eliminar una imagen por ID
app.delete('/imagenes/:id', (req, res) => {
    const { id } = req.params;
    const index = imagenes.findIndex(img => img.id == id);
    if (index !== -1) {
        imagenes.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Imagen no encontrada');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
