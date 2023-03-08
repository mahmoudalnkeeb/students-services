const router = require('express').Router();
const sectionsController = require('../controllers/sectionsController');

router
  .get('/all', sectionsController.getSections)
  .get('/', sectionsController.getSectionsPagination)
  .get('/:id', sectionsController.getOneSection)
  .post('/add', sectionsController.createSection)
  .put('/edit/:id', sectionsController.updateSection)
  .put('/delete/:id', sectionsController.deleteSection);

module.exports = router;
