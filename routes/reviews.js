const reviewsController = require('../controllers/reviewsController');

const router = require('express').Router();

//-- TODO LIST --
// get reviews [ ]
router.get('/all', reviewsController.getReviews);
// get review by id [ ]
router.get('/:id', reviewsController.getOneReview);
// add review [ ]
router.post('/add', reviewsController.createReview);
// update review [ ]
router.put('/:id', reviewsController.updateReview);
// accept review [ ]
router.patch('/accept/:id', reviewsController.acceptReview);
// delete review [ ]
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
