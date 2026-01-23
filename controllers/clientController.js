
const clientService = require('../services/clientService');

const upload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    await clientService.uploadClients(req.file);
    res.status(200).send('Client data uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const create = async (req, res) => {
  try {
    const newClient = await clientService.createClient(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating client.');
  }
};

const get = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting clients.');
  }
};

const update = async (req, res) => {
  try {
    const updatedClient = await clientService.updateClient(req.params.id, req.body);
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating client.');
  }
};

const remove = async (req, res) => {
  try {
    await clientService.deleteClient(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting client.');
  }
};

module.exports = { upload, create, get, update, remove };
