import { message, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../helpers/axiosInstance";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const AdminUsers = () => {
  const [users, setUsers] = useState();
  const dispatch = useDispatch();

  const updateUserPermission = async (users, action) => {
    try {
      dispatch(showLoading());
      let payload = "";
      if (action === "make-admin") {
        payload = {
          ...users,
          isAdmin: true,
        };
      } else if (action === "remove-admin") {
        payload = {
          ...users,
          isAdmin: false,
        };
      } else if (action === "block") {
        payload = {
          ...users,
          isBlocked: true,
        };
      } else if (action === "Unblock") {
        payload = {
          ...users,
          isBlocked: false,
        };
      }
      const response = await axiosInstance.post("/update-user-permission", 
        payload,
      );
      dispatch(hideLoading());
      if (response.data.success) {
        getAllUsers();
        message.success(response.data.message);
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "",
      render: (data) => {
        if (data?.isBlocked) {
          return "Blocked";
        } else {
          return "Active";
        }
      },
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => {
        if (data?.isAdmin === true) {
          return "Admin";
        } else {
          return "User";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          {record.isBlocked && (
            <p
              className="text-md underline"
              onClick={() => updateUserPermission(record, "Unblock")}
            >
              Unblock
            </p>
          )}
          {!record.isBlocked && (
            <p
              className="text-md underline"
              onClick={() => updateUserPermission(record, "block")}
            >
              Block
            </p>
          )}
          {record.isAdmin && (
            <p
              className="text-md underline"
              onClick={() => updateUserPermission(record, "remove-admin")}
            >
              Remove Admin
            </p>
          )}
          {!record.isAdmin && (
            <p
              className="text-md underline"
              onClick={() => updateUserPermission(record, "make-admin")}
            >
              Make Admin
            </p>
          )}
        </div>
      ),
    },
  ];

  const getAllUsers = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/get-all-users", {});
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setUsers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default AdminUsers;
