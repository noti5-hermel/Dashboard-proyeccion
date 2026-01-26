
const routeModel = require('../models/routeModel');
const uploadService = require('./uploadService');

const uploadRoutes = async (file) => {
  const data = uploadService.parseExcel(file);
  if (data.length === 0) {
    throw new Error('Excel file is empty or has no data.');
  }
  return await routeModel.insert(data);
};

const createRoute = async (route) => {
  return await routeModel.create(route);
};

const getRoutes = async () => {
  return await routeModel.get();
};

const getRouteById = async (id) => {
  return await routeModel.getById(id);
};

const updateRoute = async (id, route) => {
  return await routeModel.update(id, route);
};

const deleteRoute = async (id) => {
  return await routeModel.remove(id);
};

module.exports = {
  uploadRoutes,
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
};
