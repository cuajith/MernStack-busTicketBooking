import { message, Table } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BusForm from "../../component/BusForm";
import PageTitle from "../../component/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const AdminBuses = () => {
  const [showBusForm, setShowBusForm] = useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const dispatch = useDispatch();

  const getAllBuses = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/buses/get-all-buses", {});
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

  const deleteBus = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/buses/delete-bus", {
        _id: id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getAllBuses();
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "date",
      render: (data) => {
        return moment(data).format("DD-MM-YYYY")
      }
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            class="ri-pencil-line"
            onClick={() => {
              setSelectedBus(record);
              setShowBusForm(true);
            }}
          ></i>
          <i
            class="ri-delete-bin-line"
            onClick={() => deleteBus(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between p-2">
        <PageTitle title="Buses" />
        <button className="bus-btn" onClick={() => setShowBusForm(true)}>
          Add Bus
        </button>
      </div>
      <Table dataSource={buses} columns={columns} />
      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          setSelectedBus={setSelectedBus}
          getData={getAllBuses}
        />
      )}
    </>
  );
};

export default AdminBuses;
