const express = require('express');
const router = express.Router();
const busController = require('../controller/busController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/add-bus').post(authMiddleware, busController.addBus);
router.route('/get-all-buses').post(authMiddleware, busController.getAllBuses);
router.route('/update-bus').post(authMiddleware, busController.updateBuses);
router.route('/delete-bus').post(authMiddleware, busController.deleteBus);
router.route('/get-bus-by-id').post(authMiddleware, busController.getBusById);

module.exports = router;