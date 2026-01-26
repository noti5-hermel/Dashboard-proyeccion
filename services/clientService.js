
const clientModel = require('../models/clientModel');
const uploadService = require('./uploadService');

const uploadClients = async (file) => {
  const data = uploadService.parseExcel(file);
  if (data.length === 0) {
    throw new Error('Excel file is empty or has no data.');
  }
  return await clientModel.insert(data);
};

const createClient = async (client) => {
  return await clientModel.create(client);
};

const getClients = async () => {
  return await clientModel.get();
};

const getClientById = async (id) => {
  return await clientModel.getById(id);
};

const updateClient = async (id, client) => {
  return await clientModel.update(id, client);
};

const deleteClient = async (id) => {
  return await clientModel.remove(id);
};

module.exports = {
  uploadClients,
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
