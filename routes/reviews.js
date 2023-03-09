const reviewsController = require('../controllers/reviewsController');
const validatePagination = require('../middlewares/validatePagination');

const router = require('express').Router();

router
  .get('/all', reviewsController.getReviews)
  .get('/', validatePagination, reviewsController.getReviewsPagination)
  .get('/:id', reviewsController.getOneReview)
  .post('/add', reviewsController.createReview)
  .put('/:id', reviewsController.updateReview)
  .patch('/accept/:id', reviewsController.acceptReview)
  .delete('/:id', reviewsController.deleteReview);

module.exports = router;
