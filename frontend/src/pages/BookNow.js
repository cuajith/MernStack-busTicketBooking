import { message, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import SeatSelection from "../component/SeatSelection";
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import StripeCheckout from "react-stripe-checkout";
import "../resources/bus.css";

const BookNow = () => {
  const [bus, setBus] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const getAllBuses = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async (transactionId) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
        transactionId
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate('/bookings')
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/bookings/make-payment",
      {
        token,
        amount: bus.price * selectedSeats.length * 100,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAllBuses();
  }, []);

  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={20}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-xl text-primary">{bus.name}</h1>
            <h1 className="text-md">
              {bus.from} - {bus.to}
            </h1>
            <hr />
            <div className="flex flex-col gap-2">
              <p>
                <b>Date:</b> {bus.date}
              </p>
              <p>
                <b>Departure Time:</b> {bus.departure}
              </p>
              <p>
                <b>Arrival Time:</b> {bus.arrival}
              </p>
              <p>
                <b>Rs.</b> {bus.price} /-
              </p>
              <p>
                <b>Capacity: </b>
                {bus.capacity}
              </p>
              <p>
                <b>Tickets Left: </b>{" "}
                {bus.capacity - (bus.seatBooked && bus.seatBooked.length)}
              </p>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              <h1 className="text-md">
                <b>Selected Seats</b>: {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-lg">
                Total: {bus.price * selectedSeats.length}
              </h1>
            </div>
            <StripeCheckout
              billingAddress
              amount={bus.price * selectedSeats.length *100 }
              currency="INR"
              token={onToken}
              stripeKey=""
            >
              <button
                className={`secondary-btn ${
                  selectedSeats.length === 0 && "disabled-btn"
                }`}
              >
                Book Now
              </button>
            </StripeCheckout>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookNow;
