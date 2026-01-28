
const salesHistoryModel = require('../models/salesHistoryModel');
const uploadService = require('./uploadService');

// --- Helper Functions ---
function convertExcelDate(serial) {
  if (typeof serial !== 'number' || serial <= 0) return serial;
  const date = new Date((serial - 25569) * 86400 * 1000);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

function validateRows(data) {
  const integerColumns = ['invoice_number', 'route_number', 'tax'];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (const column of integerColumns) {
      const value = row[column];
      if (value !== null && value !== undefined && !Number.isInteger(Number(value))) {
        // Note: The row number here is relative to the batch, not the Excel file.
        // For true accuracy, we would pass the global index.
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

  const BATCH_SIZE = 1000; // Process 1000 rows at a time
  console.log(`Comenzando procesamiento por lotes de ${allData.length} filas, en lotes de ${BATCH_SIZE}.`);

  for (let i = 0; i < allData.length; i += BATCH_SIZE) {
    const batch = allData.slice(i, i + BATCH_SIZE);
    console.log(`Procesando lote: filas ${i + 1} a ${i + batch.length}...`);

    // 1. Transform dates in the current batch
    const transformedBatch = batch.map(row => {
      if (row.transaction_date && typeof row.transaction_date === 'number') {
        return { ...row, transaction_date: convertExcelDate(row.transaction_date) };
      }
      return row;
    });

    // 2. Validate the current batch
    validateRows(transformedBatch);

    // 3. Insert the validated and transformed batch into the database
    await salesHistoryModel.insert(transformedBatch); // The model's insert is already transactional
    console.log(`Lote de ${batch.length} filas insertado correctamente.`);
  }
  console.log('Todas las filas han sido procesadas e insertadas.');
};

// --- Standard CRUD Functions (remain unchanged) ---
const createSale = async (sale) => {
  return await salesHistoryModel.create(sale);
};

const getSalesHistory = async () => {
  return await salesHistoryModel.get();
};

const getSalesByInvoiceNumber = async (invoiceNumber) => {
  return await salesHistoryModel.getByInvoiceNumber(invoiceNumber);
};

const updateSalesByInvoiceNumber = async (invoiceNumber, sale) => {
  return await salesHistoryModel.updateByInvoiceNumber(invoiceNumber, sale);
};

const deleteSalesByInvoiceNumber = async (invoiceNumber) => {
  return await salesHistoryModel.removeByInvoiceNumber(invoiceNumber);
};

module.exports = {
  uploadSalesHistoryInBatches, // Correctly exported the new function
  createSale,
  getSalesHistory,
  getSalesByInvoiceNumber,
  updateSalesByInvoiceNumber,
  deleteSalesByInvoiceNumber,
};
