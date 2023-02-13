const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');


router.route('/book-seat').post(authMiddleware, bookingController.bookSeat);
router.route('/make-payment').post(authMiddleware, bookingController.makePayment);
router.route('/get-bookings-by-id').post(authMiddleware, bookingController.getBookigsById);
router.route('/get-bookings').post(authMiddleware, bookingController.getBookings);

module.exports = router;