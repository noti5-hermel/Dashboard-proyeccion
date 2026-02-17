
const salesHistoryModel = require('../models/salesHistoryModel');
const uploadService = require('./uploadService');

// --- Helper Functions ---

function convertExcelDate(serial) {
  if (typeof serial !== 'number' || serial <= 0) return serial;
  const date = new Date((serial - 25569) * 86400 * 1000);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

/**
 * Parsea una cadena de fecha (ej. '4/13/26') al formato 'YYYY-MM-DD'.
 * Asume el formato de entrada MM/DD/YY.
 */
function parseDateString(dateStr) {
    if (typeof dateStr !== 'string') {
        return dateStr;
    }

    const trimmedStr = dateStr.trim();
    const normalizedStr = trimmedStr.replace(/-/g, '/');
    const parts = normalizedStr.split('/');

    if (parts.length !== 3) {
        return dateStr;
    }

    // --- CORRECCIÓN: Se invierte el orden de mes y día ---
    let [month, day, year] = parts;

    if (year.length === 2) {
        const yearNum = parseInt(year, 10);
        year = (yearNum < 70) ? `20${year}` : `19${year}`; // Convierte '26' a '2026'
    }

    day = day.padStart(2, '0');
    month = month.padStart(2, '0');

    return `${year}-${month}-${day}`; // Formato correcto: YYYY-MM-DD
}

function validateRows(data) {
  const integerColumns = ['invoice_number', 'route_number', 'tax'];
  for (const row of data) {
    for (const column of integerColumns) {
      const value = row[column];
      if (value !== null && value !== undefined && !Number.isInteger(Number(value))) {
        throw new Error(`Error de validación en la columna '${column}' con valor "${value}". No es un número entero válido.`);
      }
    }
  }
}

// --- Main Batch Processing Function ---
const uploadSalesHistoryInBatches = async (file) => {
  const allData = uploadService.parseExcel(file);
  if (!allData || allData.length === 0) {
    throw new Error('El archivo Excel está vacío o no contiene datos.');
  }

  const BATCH_SIZE = 1000;
  console.log(`Comenzando procesamiento por lotes de ${allData.length} filas, en lotes de ${BATCH_SIZE}.`);

  for (let i = 0; i < allData.length; i += BATCH_SIZE) {
    const batch = allData.slice(i, i + BATCH_SIZE);
    console.log(`Procesando lote: filas ${i + 1} a ${i + batch.length}...`);

    const transformedBatch = batch.map(row => {
      let convertedDate = row.transaction_date;
      if (convertedDate) {
        if (typeof convertedDate === 'number') {
          convertedDate = convertExcelDate(convertedDate);
        } else {
          convertedDate = parseDateString(convertedDate);
        }
      }
      return { ...row, transaction_date: convertedDate };
    });

    validateRows(transformedBatch);
    await salesHistoryModel.insert(transformedBatch);
    console.log(`Lote de ${batch.length} filas insertado correctamente.`);
  }
  console.log('Todas las filas han sido procesadas e insertadas.');
};

// --- Standard CRUD Functions ---
const createSale = async (sale) => await salesHistoryModel.create(sale);
const getSalesHistory = async () => await salesHistoryModel.get();
const getSalesByInvoiceNumber = async (invoiceNumber) => await salesHistoryModel.getByInvoiceNumber(invoiceNumber);
const updateSalesByInvoiceNumber = async (invoiceNumber, sale) => await salesHistoryModel.updateByInvoiceNumber(invoiceNumber, sale);
const deleteSalesByInvoiceNumber = async (invoiceNumber) => await salesHistoryModel.removeByInvoiceNumber(invoiceNumber);

module.exports = {
  uploadSalesHistoryInBatches,
  createSale,
  getSalesHistory,
  getSalesByInvoiceNumber,
  updateSalesByInvoiceNumber,
  deleteSalesByInvoiceNumber,
};
