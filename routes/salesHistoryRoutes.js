
const express = require('express');
const router = express.Router();
const salesHistoryController = require('../controllers/salesHistoryController');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route for massive data upload from Excel
router.post('/upload', upload.single('file'), salesHistoryController.upload);

// Standard CRUD routes
router.post('/', salesHistoryController.create);
router.get('/', salesHistoryController.get);
router.get('/:invoiceNumber', salesHistoryController.getByInvoiceNumber);
router.put('/:invoiceNumber', salesHistoryController.update);
router.delete('/:invoiceNumber', salesHistoryController.remove);

module.exports = router;
