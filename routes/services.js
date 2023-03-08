const router = require('express').Router();
const servicesController = require('../controllers/servicesController');

router
  .get('/all', servicesController.getServices)
  .get('/', servicesController.getServicesPagination)
  .get('/:id', servicesController.getOneService)
  .post('/add', servicesController.createService)
  .put('/edit/:id', servicesController.updateService)
  .put('/delete/:id', servicesController.deleteService);

module.exports = router;
