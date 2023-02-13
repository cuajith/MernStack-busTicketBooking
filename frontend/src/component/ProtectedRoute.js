import { message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validToken = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.removeItem("token");
        message.error(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.removeItem("token");
      message.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validToken();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>;
};

export default ProtectedRoute;
