
const salesHistoryService = require('../services/salesHistoryService');

const upload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }
  try {
    await salesHistoryService.uploadSalesHistory(req.file);
    res.status(200).send({ message: 'Sales history uploaded successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error uploading sales history.', error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const sale = await salesHistoryService.createSale(req.body);
    res.status(201).send(sale);
  } catch (error) {
    res.status(500).send({ message: 'Error creating sale.', error: error.message });
  }
};

const get = async (req, res) => {
  try {
    const salesHistory = await salesHistoryService.getSalesHistory();
    res.status(200).send(salesHistory);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching sales history.', error: error.message });
  }
};

const getByInvoiceNumber = async (req, res) => {
  try {
    const sales = await salesHistoryService.getSalesByInvoiceNumber(req.params.invoiceNumber);
    if (!sales || sales.length === 0) {
      return res.status(404).send({ message: 'Sales with that invoice number not found.' });
    }
    res.status(200).send(sales);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching sales.', error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedSales = await salesHistoryService.updateSalesByInvoiceNumber(req.params.invoiceNumber, req.body);
    if (!updatedSales || updatedSales.length === 0) {
      return res.status(404).send({ message: 'Sales with that invoice number not found to update.' });
    }
    res.status(200).send(updatedSales);
  } catch (error) {
    res.status(500).send({ message: 'Error updating sales.', error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await salesHistoryService.deleteSalesByInvoiceNumber(req.params.invoiceNumber);
    res.status(200).send({ message: 'Sales with the specified invoice number deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting sales.', error: error.message });
  }
};

module.exports = { 
  upload, 
  create, 
  get, 
  getByInvoiceNumber, 
  update, 
  remove 
};
