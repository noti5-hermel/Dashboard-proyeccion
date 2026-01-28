
const salesHistoryModel = require('../models/salesHistoryModel');
const uploadService = require('./uploadService');

/**
 * Converts an Excel serial number date to a YYYY-MM-DD format.
 * @param {number} serial - The Excel serial number for the date.
 * @returns {string|null} The date in YYYY-MM-DD format or the original value if invalid.
 */
function convertExcelDate(serial) {
  if (typeof serial !== 'number' || serial <= 0) {
    return serial; // Return original value if it's not a valid serial number
  }
  // The number of days between the Unix epoch (1970-01-01) and the Excel epoch (1900-01-01) is 25569.
  // We create a date in UTC to avoid timezone-related issues.
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

  // Transform the date field for each row before inserting
  const transformedData = jsonData.map(row => {
    // Check if the transaction_date field exists and is a number (Excel serial date)
    if (row.transaction_date && typeof row.transaction_date === 'number') {
      return {
        ...row,
        transaction_date: convertExcelDate(row.transaction_date),
      };
    }
    return row;
  });

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
