import { Form, Modal, Row, Col, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const BusForm = ({
  showBusForm,
  setShowBusForm,
  type,
  selectedBus,
  getData,
  setSelectedBus,
}) => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/buses/add-bus", {
          ...values,
        });
      } else {
        response = await axiosInstance.post("/buses/update-bus", {
          ...values,
          _id: selectedBus._id,
        });
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      setShowBusForm(false);
      setSelectedBus(null);
      getData();
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  return (
    <Modal
      width={800}
      visible={showBusForm}
      onCancel={() => {
        setShowBusForm(false);
        setSelectedBus(null);
      }}
      footer={false}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ ...selectedBus }}
      >
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Bus Name" name="name">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Number" name="number">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Capacity" name="capacity">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="From" name="from">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="To" name="to">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Date" name="date">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Departure" name="departure">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Arrival" name="arrival">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Type" name="type">
            <select name="" id="">
                <option value="AC SLEEPER">AC SLEEPER</option>
                <option value="SLEEPER NON-AC">SLEEPER NON-AC </option>
                <option value="ULTRA DELUXE">ULTRA DELUXE</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Price" name="price">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="status">
              <select name="" id="">
                <option value="Yet To Start">Yet To Start</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button className="bus-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default BusForm;
