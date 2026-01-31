
const xlsx = require('xlsx');

const parseExcel = (file) => {
  const workbook = xlsx.read(file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // --- Solution ---
  // The `raw: false` option forces the library to read the formatted string
  // of cells (e.g., "2397.5") instead of their raw underlying numeric value.
  // This ensures that numbers and dates are parsed as you see them in Excel.
  return xlsx.utils.sheet_to_json(sheet, { raw: false });
};

module.exports = { parseExcel };
