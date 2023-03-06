const router = require('express').Router();
const appearanceController = require('../controllers/appearanceController');
const uploadFile = require('../utils/uploadFile');

router
  .get('/logo', appearanceController.getLogo)
  .get('/theme', appearanceController.getTheme)
  .get('/info', appearanceController.getInfo);
router.post(
  '/logo',
  uploadFile.single('logo'),
  appearanceController.changeLogo
);
router
  .put('/contact', appearanceController.changeContact)
  .put('/social', appearanceController.changeSocial)
  .put('/theme', appearanceController.changeThemeColor);

/*
 experimental
    get custom css [ ]
    change custom css [ ]
*/
module.exports = router;
