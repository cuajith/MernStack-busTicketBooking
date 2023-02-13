import { message, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../helpers/axiosInstance";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const AdminBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const dateToday = moment(new Date()).format("YYYY-MM-DD");

  const getBookings = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/bookings/get-bookings");
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            ...booking.user,
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
      title: "Journey Date",
      dataIndex: "date",
      render: (date) => {
        return moment(date).format("DD-MM-YYYY");
      },
      key: "bus",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "user",
    },
    {
      title: "Bus",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Departure",
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
      title: "status",
      dataIndex: "",
      render: (data) => {
        if (data.date > dateToday) {
          return <p className="text-md text-green">Upcoming</p>;
        } else {
          return <p className="text-md text-danger">Completed</p>;
        }
      },
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <Table dataSource={bookings} columns={columns} />
    </div>
  );
};

export default AdminBookingPage;
