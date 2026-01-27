
const salesHistoryModel = require('../models/salesHistoryModel');
const uploadService = require('./uploadService');

const uploadSalesHistory = async (file) => {
  const data = uploadService.parseExcel(file);
  if (data.length === 0) {
    throw new Error('Excel file is empty or has no data.');
  }
  return await salesHistoryModel.insert(data);
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
