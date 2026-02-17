
const xlsx = require('xlsx');

const parseExcel = (file) => {
  const workbook = xlsx.read(file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // La opción `raw: false` lee la cadena de texto formateada de las celdas.
  const jsonData = xlsx.utils.sheet_to_json(sheet, { raw: false });

  // --- NUEVO: Elimina espacios en blanco de los encabezados ---
  // Esto previene errores si los nombres de columna en Excel tienen espacios.
  const trimmedData = jsonData.map(row => {
    const newRow = {};
    for (const key in row) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        const trimmedKey = key.trim();
        newRow[trimmedKey] = row[key];
      }
    }
    return newRow;
  });

  return trimmedData;
};

module.exports = { parseExcel };
