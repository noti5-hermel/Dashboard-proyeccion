
const express = require('express');
const router = express.Router();
const salesHistoryController = require('../controllers/salesHistoryController');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route for massive data upload from Excel
router.post('/upload/sales-history', upload.single('file'), salesHistoryController.upload);

// Standard CRUD routes
router.post('/sales-history', salesHistoryController.create);
router.get('/sales-history', salesHistoryController.get);
router.get('/sales-history/:invoiceNumber', salesHistoryController.getByInvoiceNumber);
router.put('/sales-history/:invoiceNumber', salesHistoryController.update);
router.delete('/sales-history/:invoiceNumber', salesHistoryController.remove);

module.exports = router;
