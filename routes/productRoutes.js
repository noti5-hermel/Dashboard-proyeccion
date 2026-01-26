
const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload/product', upload.single('file'), productController.upload);
router.post('/product', productController.create);
router.get('/product', productController.get);
router.get('/product/:id', productController.getById);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.remove);

module.exports = router;
