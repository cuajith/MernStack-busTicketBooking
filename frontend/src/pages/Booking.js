import { message, Modal, Table } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import PageTitle from "../component/PageTitle";
import moment from "moment/moment";
import { useReactToPrint } from "react-to-print";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [showPrint, setShowPrint] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const dateToday = moment(new Date()).format("YYYY-MM-DD");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getAllBookings = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/bookings/get-bookings-by-id");
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "date",
      render: (date) => {
        return moment(date).format("DD-MM-YYYY");
      },
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
    {
      title: "Status",
      dataIndex: "",
      render: (data) => {
        if (data.date > dateToday) {
          return <p className="text-md text-green">Upcoming</p>;
        } else {
          setStatus(true);
          return <p className="text-md text-danger">Completed</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <h1
            className={`text-md underline ${status && "pointer"}`}
            onClick={() => {
              setShowPrint(true);
              setSelectedBooking(record);
            }}
          >
            Print Ticket
          </h1>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div>
      <PageTitle title="Bookings" />
      <Table dataSource={bookings} columns={columns} />
      {showPrint && (
        <Modal
          title="Your Bookings"
          onCancel={() => setShowPrint(false)}
          visible={showPrint}
          okText="Print"
          onOk={handlePrint}
        >
          <hr />
          <div className="d-flex flex-column p-5" ref={componentRef}>
            <h1 className="text-md">{selectedBooking.name}</h1>
            <h1 className="text-xs">
              {selectedBooking.from} - {selectedBooking.to}
            </h1>
            <hr />
            <h1 className="text-xs">Name: {user.Name}</h1>
            <h1 className="text-xs">
              Date: {moment(selectedBooking.date).format("DD-MM-YYYY")}
            </h1>
            <h1 className="text-xs">
              Departure Time: {selectedBooking.departure}
            </h1>
            <h1 className="text-xs">Arrival Time: {selectedBooking.arrival}</h1>
            <hr />
            <h1 className="text-xs">Seat Numbers</h1>
            <h1 className="text-xs">{selectedBooking.seats.join(", ")}</h1>
            <hr />
            <h1 className="text-xs">Amount</h1>
            <h1 className="text-xs">
              ₹ {selectedBooking.price * selectedBooking.seats.length}
            </h1>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Booking;
