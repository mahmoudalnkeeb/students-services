const router = require('express').Router();
const appearanceRouter = require('./appearance');
const servicesRouter = require('./services');
const reviewsRouter = require('./reviews');
const ordersRouter = require('./orders');

router.use('/services', servicesRouter);
router.use('/appearance', appearanceRouter);
router.use('/reviews', reviewsRouter);
router.use('/orders', ordersRouter);

module.exports = router;
