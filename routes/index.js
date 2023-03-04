const router = require('express').Router();
const appearanceRouter = require('./appearance');
const servicesRouter = require('./services');
const reviewsRouter = require('./reviews');
const ordersRouter = require('./orders');
const uploadFile = require('../utils/uploadFile');

// upload route
router.post('/upload', uploadFile.single('file'), (req, res) => {
  try {
    res.status(200).json({ filePath: req.file.path });
  } catch (error) {
    res.status(500).send('error occurred when saving file');
  }
});

//---
router.use('/services', servicesRouter);
router.use('/appearance', appearanceRouter);
router.use('/reviews', reviewsRouter);
router.use('/orders', ordersRouter);

module.exports = router;
