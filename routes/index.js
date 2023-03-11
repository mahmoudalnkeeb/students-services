const router = require('express').Router();
const appearanceRouter = require('./appearance');
const servicesRouter = require('./services');
const sectionsRouter = require('./sections');
const reviewsRouter = require('./reviews');
const ordersRouter = require('./orders');
const multer = require('multer');
const uploadFile = require('../utils/firebase');
const upload = multer();

// test
router.get('/test', (req, res) => res.status(200).json({ status: 'working' }));

// upload route
router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    let url = await uploadFile(req.file);
    res.status(200).json({url});
  } catch (error) {
    next(error);
  }
});

//---
router.use('/', appearanceRouter);
router.use('/services', servicesRouter);
router.use('/sections', sectionsRouter);
router.use('/orders', ordersRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
