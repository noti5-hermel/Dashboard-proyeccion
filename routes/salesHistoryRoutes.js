
const express = require('express');
const router = express.Router();
const salesHistoryController = require('../controllers/salesHistoryController');
const multer = require('multer');

// Configure multer for file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for massive data upload from Excel with an extended timeout
router.post('/upload/sales-history', upload.single('file'), (req, res, next) => {
  // Set a 10-minute timeout for this specific route
  req.setTimeout(600000); 
  salesHistoryController.upload(req, res, next);
});

// Standard CRUD routes
router.post('/sales-history', salesHistoryController.create);
router.get('/sales-history', salesHistoryController.get);
router.get('/sales-history/:invoiceNumber', salesHistoryController.getByInvoiceNumber);
router.put('/sales-history/:invoiceNumber', salesHistoryController.update);
router.delete('/sales-history/:invoiceNumber', salesHistoryController.remove);

module.exports = router;
