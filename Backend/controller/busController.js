const Bus = require("../models/busModel");

const addBus = async (req, res) => {
  try {
    const existBus = await Bus.findOne({ number: req.body.number });
    if (existBus) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
    const bus = new Bus(req.body);
    await bus.save();
    return res.status(200).send({
      success: true,
      message: "Bus Added Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find(req.body);
    return res.send({
      success: true,
      message: "Buses fetched successfully",
      data: buses,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateBuses = async (req, res) => {
  try {
    await Bus.findByIdAndUpdate(req.body._id, req.body);
    return res.send({
      success: true,
      message: "Bus Updated Successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.body._id);
    return res.send({
      success: true,
      message: "Bus Deleted Successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.body._id);
    return res.send({
      success: true,
      message: "Book Your Bus",
      data: bus,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.addBus = addBus;
exports.getAllBuses = getAllBuses;
exports.updateBuses = updateBuses;
exports.deleteBus = deleteBus;
exports.getBusById = getBusById;
