
const routeService = require('../services/routeService');

const upload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    await routeService.uploadRoutes(req.file);
    res.status(200).send('Route data uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const create = async (req, res) => {
  try {
    const newRoute = await routeService.createRoute(req.body);
    res.status(201).json(newRoute);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating route.');
  }
};

const get = async (req, res) => {
  try {
    const routes = await routeService.getRoutes();
    res.status(200).json(routes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting routes.');
  }
};

const getById = async (req, res) => {
  try {
    const route = await routeService.getRouteById(req.params.id);
    res.status(200).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting route.');
  }
};

const update = async (req, res) => {
  try {
    const updatedRoute = await routeService.updateRoute(req.params.id, req.body);
    res.status(200).json(updatedRoute);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating route.');
  }
};

const remove = async (req, res) => {
  try {
    await routeService.deleteRoute(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting route.');
  }
};

module.exports = { upload, create, get, getById, update, remove };
