import React from "react";
import { useNavigate } from "react-router-dom";

const Bus = ({ bus }) => {
  const navigate = useNavigate();
  const bookBus = () => {
    navigate(`/book-now/${bus._id}`);
  };
  return (
    <div className="card card-bus p-3">
      <h1 className="text-lg">{bus.name}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <p className="text-sm fw-bold">From</p>
          <p className="text-sm">{bus.from}</p>
        </div>
        <div>
          <p className="text-sm fw-bold">To</p>
          <p className="text-sm">{bus.to}</p>
        </div>
        <div>
          <p className="text-sm fw-bold">Fare</p>
          <p className="text-sm">{bus.price}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-end mt-3">
        <div>
          <p className="text-sm fw-bold">Journey Date</p>
          <p>{bus.date}</p>
        </div>
        <div>
          <span onClick={bookBus} className="bus-book">
            Book Now
          </span>
        </div>
      </div>
    </div>
  );
};

export default Bus;
