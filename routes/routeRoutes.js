
const express = require('express');
const router = express.Router();
const multer = require('multer');
const routeController = require('../controllers/routeController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload/route', upload.single('file'), routeController.upload);
router.post('/route', routeController.create);
router.get('/route', routeController.get);
router.get('/route/:id', routeController.getById);
router.put('/route/:id', routeController.update);
router.delete('/route/:id', routeController.remove);

module.exports = router;
