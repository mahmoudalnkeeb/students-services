const router = require('express').Router();
const servicesController = require('../controllers/servicesController');

//-- TODO LIST --
// get services [DONE]
router.get('/all', servicesController.getServices);
// get service by id [DONE]
router.get('/:id', servicesController.getOneService);
// add service [DONE]
router.post('/add', servicesController.createService);
// update service [DONE]
router.put('/edit/:id', servicesController.updateService);
// delete service [DONE]
router.put('/delete/:id', servicesController.deleteService);

module.exports = router;
