
const salesHistoryModel = require('../models/salesHistoryModel');
const uploadService = require('./uploadService');

function convertExcelDate(serial) {
  if (typeof serial !== 'number' || serial <= 0) {
    return serial;
  }
  const date = new Date((serial - 25569) * 86400 * 1000);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const uploadSalesHistory = async (file) => {
  const jsonData = uploadService.parseExcel(file);
  if (!jsonData || jsonData.length === 0) {
    throw new Error('Excel file is empty or has no data.');
  }

  const transformedData = jsonData.map(row => {
    if (row.transaction_date && typeof row.transaction_date === 'number') {
      return { ...row, transaction_date: convertExcelDate(row.transaction_date) };
    }
    return row;
  });

  // --- Validation Step (Corrected for the new schema) ---
  // Columns that MUST be integers according to the new schema.
  const integerColumns = ['invoice_number', 'route_number', 'tax'];

  for (let i = 0; i < transformedData.length; i++) {
    const row = transformedData[i];
    for (const column of integerColumns) {
      const value = row[column];
      // Check if value exists and is not a valid integer.
      if (value !== null && value !== undefined && !Number.isInteger(Number(value))) {
        throw new Error(`Error en la fila ${i + 2} del Excel: La columna '${column}' tiene el valor "${value}", que no es un número entero válido. Por favor, corrija el archivo.`);
      }
    }
  }

  return await salesHistoryModel.insert(transformedData);
};

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
  uploadSalesHistory,
  createSale,
  getSalesHistory,
  getSalesByInvoiceNumber,
  updateSalesByInvoiceNumber,
  deleteSalesByInvoiceNumber,
};
