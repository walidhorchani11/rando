const express = require('express');
const userController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', userController.signup);

// router
//   .route('/')
//   .get(placeController.getAllPlaces)
//   .post(placeController.createPlace);

// router
//   .route('/:pid')
//   .get(placeController.getOnePlace)
//   .patch(placeController.updatePlace)
//   .delete(placeController.deletePlace);

module.exports = router;
