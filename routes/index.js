const router = require('express').Router();
const appearanceRouter = require('./appearance');
const servicesRouter = require('./services');
const sectionsRouter = require('./sections');
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
router.use('/', appearanceRouter);
router.use('/services', servicesRouter);
router.use('/sections', sectionsRouter);
router.use('/orders', ordersRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
