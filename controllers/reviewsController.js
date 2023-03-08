const reviews = require('../models/Review');

/*--------------

async function name(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}
---------------*/

async function getReviews(req, res, next) {
  try {
    let allReviews = await reviews.getReviews();
    res.status(200).json(allReviews);
  } catch (error) {
    next(error);
  }
}

async function getReviewsPagination(req, res, next) {
  try {
    let { page, limit } = req.query;
    let allReviews = await reviews.getReviewsPagination(page, limit);
    res.status(200).json(allReviews);
  } catch (error) {
    next(error);
  }
}

async function getOneReview(req, res, next) {
  try {
    let { id } = req.params;
    let review = await reviews.getOneReview(id);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    let { name, email, phone, rate, review_text, order_id } = req.body;
    let review = await reviews.createReview(
      name,
      email,
      phone,
      rate,
      review_text,
      order_id
    );
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
}

async function updateReview(req, res, next) {
  try {
    let { name, email, phone, rate, review_text } = req.body;
    let { id } = req.params;
    let newReview = await reviews.updateReview(
      id,
      name,
      email,
      phone,
      rate,
      review_text
    );
    res.status(200).json(newReview);
  } catch (error) {
    next(error);
  }
}

async function acceptReview(req, res, next) {
  try {
    let { id } = req.params;
    let accept = await reviews.acceptReview(id);
    res.status(200).json({
      review: id,
      accepted: accept,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    let { id } = req.params;
    let deletedReview = await reviews.deleteReview(id);
    res.status(200).json(deletedReview);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getReviews,
  getReviewsPagination,
  getOneReview,
  createReview,
  updateReview,
  acceptReview,
  deleteReview,
};
