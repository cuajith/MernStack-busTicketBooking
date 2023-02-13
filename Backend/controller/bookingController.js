const Booking = require("../models/bookingModel");
const Bus = require("../models/busModel");
const Stripe = require("stripe");
const stripe = Stripe(
  ""
);
const { v4: uuidv4 } = require("uuid");

//Seat Booking
const bookSeat = async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      user: req.body.userId,
    });
    await newBooking.save();
    const bus = await Bus.findById(req.body.bus);
    bus.seatBooked = [...bus.seatBooked, ...req.body.seats];
    await bus.save();
    res.status(200).send({
      message: "Booking successful",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking Failed",
      data: error,
      success: false,
    });
  }
};

//Make payment
const makePayment = async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: "inr",
        receipt_email: token.email,
        payment_method_types: ["card"],
      },
      { idempotencyKey: uuidv4() }
    );
    if (payment) {
      res.status(200).send({
        message: "Payment Successful",
        data: {
          transactionId: payment.id,
        },
        success: true,
      });
    } else {
      res.status(500).send({
        message: "Payment Failed",
        data: error,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
      data: null,
      success: false,
    });
  }
};

//get bookings by userId
const getBookigsById = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("bus")
      .populate("user");
    res.status(200).send({
      message: "Booking fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking fetched Failed",
      data: error,
      success: false,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("bus").populate("user")
    // console.log(bookings.bus.name)
    res.send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Bookings fetches failed",
      data: error,
      success: false,
    });
  }
};

exports.bookSeat = bookSeat;
exports.makePayment = makePayment;
exports.getBookigsById = getBookigsById;
exports.getBookings = getBookings;
