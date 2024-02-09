// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3001;

// Configure multer pour gérer les téléchargements de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Sauvegarde des fichiers dans le répertoire public/images
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Ajoute un horodatage au nom de fichier pour le rendre unique
    },
});

const upload = multer({ storage: storage });

// Gère les requêtes POST à /recherche
app.post('/recherche', upload.single('image'), (req, res) => {
    // Gère le fichier téléchargé ici
    console.log(req.file);
    res.send('Fichier téléchargé avec succès');
});

app.listen(port, () => {
    console.log(`Le serveur fonctionne à l'adresse http://localhost:${port}`);
});
