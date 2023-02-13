import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Bus from "../component/Bus";
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const Home = () => {
  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  const getAllBuses = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      } 
    });
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "/buses/get-all-buses",
        tempFilters
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setBuses(response.data.data);
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
      <div className="filter px-2 px-3 align-center">
        <Row gutter={[20, 10]}>
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="Source"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="Destination"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </Col>
          <Col lg={3} sm={24}>
            <button className="filter-btn" onClick={() => getAllBuses()}>
              Filter
            </button>
          </Col>
          <Col lg={3} sm={24}>
            <button className="filter-clear-btn" onClick={() => setFilters({
              from: "",
              to: "",
              date: ""
            })}>
              Clear
            </button>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[20, 20]}>
          {buses
            .filter((x) => x.status === "Yet To Start")
            .map((bus) => (
              <Col lg={12} xs={24} sm={24}>
                <Bus bus={bus} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
