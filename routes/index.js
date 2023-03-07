const router = require('express').Router();
const appearanceRouter = require('./appearance');
const servicesRouter = require('./services');
const reviewsRouter = require('./reviews');
const ordersRouter = require('./orders');
const uploadFile = require('../utils/uploadFile');
const serviceImage = require('../utils/sharp');

// upload route
router.post('/upload', uploadFile.single('file'), async (req, res) => {
  try {
    let path = await serviceImage(req.file);
    res.status(201).json({ path });
  } catch (error) {
    throw new Error(`error occurred when saving file - ${error.message}`, {
      cause: error,
    });
  }
});

//---
router.use('/services', servicesRouter);
router.use('/appearance', appearanceRouter);
router.use('/reviews', reviewsRouter);
router.use('/orders', ordersRouter);

module.exports = router;
