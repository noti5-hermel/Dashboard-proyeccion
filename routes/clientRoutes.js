
const express = require('express');
const router = express.Router();
const multer = require('multer');
const clientController = require('../controllers/clientController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload/client', upload.single('file'), clientController.upload);
router.post('/client', clientController.create);
router.get('/client', clientController.get);
router.put('/client/:id', clientController.update);
router.delete('/client/:id', clientController.remove);

module.exports = router;
