import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.href="/"
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
          <h2 className="text-2xl">Login</h2>
          <Form.Item label="Email" name="email">
            <input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" />
          </Form.Item>
          <button className="primary-btn" type="submit">
            Login
          </button>
        </Form>

        <p className="redirect">
          New User? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
