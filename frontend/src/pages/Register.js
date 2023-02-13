import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate('/login');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  return (
    <div className="main d-flex justify-content-center align-items-center">
      <div className="w-300 card">
        <Form layout="vertical" onFinish={onFinish}>
          <h2 className="text-2xl">Register</h2>
          <Form.Item label="Name" name="Name">
            <input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" />
          </Form.Item>
          <button className="primary-btn" type="submit">
            Register
          </button>
        </Form>

        <p className="redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
