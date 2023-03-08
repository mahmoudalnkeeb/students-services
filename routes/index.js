const router = require('express').Router();
const appearanceRouter = require('./appearance');
const servicesRouter = require('./services');
const sectionsRouter = require('./sections');
const reviewsRouter = require('./reviews');
const ordersRouter = require('./orders');
const uploadFile = require('../utils/uploadFile');
const serviceImage = require('../utils/sharp');
const fs = require('fs');
const {
  SECTIONS_IMAGES_PATH,
  SERVICES_IMAGES_PATH,
} = require('../configs/constants');
const path = require('path');

// upload route
router.post('/upload', uploadFile.any(), async (req, res) => {
  try {
    let filename = await serviceImage(req.files[0]);
    res.status(201).json({ filename });
  } catch (error) {
    next(
      new Error(`error occurred when saving file - ${error.message}`, {
        cause: error,
      })
    );
  }
});

router.get('/image', (req, res, next) => {
  try {
    let { image, folder } = req.query;
    let folders = {
      sections: SECTIONS_IMAGES_PATH,
      services: SERVICES_IMAGES_PATH,
    };
    let imagePath = path.resolve(path.join(folders[folder], image));
    let found = fs.existsSync(imagePath);
    if (!found) return res.status(404).send('file not found');
    res.status(200).sendFile(imagePath);
  } catch (error) {
    next(
      new Error(`error occurred when getting image file - ${error.message}`, {
        cause: error,
      })
    );
  }
});

//---
router.use('/', appearanceRouter);
router.use('/services', servicesRouter);
router.use('/sections', sectionsRouter);
router.use('/orders', ordersRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
