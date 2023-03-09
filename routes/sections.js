const router = require('express').Router();
const sectionsController = require('../controllers/sectionsController');
const validatePagination = require('../middlewares/validatePagination');

router
  .get('/all', sectionsController.getSections)
  .get('/',validatePagination, sectionsController.getSectionsPagination)
  .get('/:id', sectionsController.getOneSection)
  .post('/add', sectionsController.createSection)
  .put('/edit/:id', sectionsController.updateSection)
  .put('/delete/:id', sectionsController.deleteSection);

module.exports = router;
