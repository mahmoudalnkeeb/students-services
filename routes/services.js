const router = require('express').Router();
const servicesController = require('../controllers/servicesController');
const validatePagination = require('../middlewares/validatePagination');

router
  .get('/all', servicesController.getServices)
  .get('/',validatePagination, servicesController.getServicesPagination)
  .get('/:id', servicesController.getOneService)
  .post('/add', servicesController.createService)
  .put('/edit/:id', servicesController.updateService)
  .put('/delete/:id', servicesController.deleteService);

module.exports = router;
