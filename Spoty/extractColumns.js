const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const folderPath = './playlists'; // Ruta a la carpeta "playlists"

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file) === '.csv') {
      const filePath = path.join(folderPath, file);
      const results = [];

      fs.createReadStream(filePath)
        .pipe(csv({ separator: ',' })) // Asegúrate de que el separador sea correcto
        .on('data', (data) => results.push(data))
        .on('end', () => {
          if (results.length > 1) { // Asegúrate de que haya al menos dos filas
            for (let i = 1; i < results.length; i++) {
              const row = results[i];
              const secondColumn = Object.values(row)[1]; // Obtiene el valor de la segunda columna
              const thirdColumn = Object.values(row)[2]; // Obtiene el valor de la tercera columna
              console.log(secondColumn, thirdColumn);
            }
          } else {
            console.log(`El archivo ${file} no tiene suficientes filas.`);
          }
        });
    }
  });
});