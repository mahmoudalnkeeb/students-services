const router = require('express').Router();
const multer = require('multer');
const appearanceController = require('../controllers/appearanceController');
const upload = multer()

router
  .get('/logo', appearanceController.getLogo)
  .get('/theme', appearanceController.getTheme)
  .get('/contacts', appearanceController.getContactsInfo)
  .get('/socials', appearanceController.getSocialInfo);

// CONTROL PANEL ONLY
router.post(
  '/logo',
  upload.single('logo'),
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
