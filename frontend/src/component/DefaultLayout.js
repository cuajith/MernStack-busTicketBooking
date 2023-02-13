import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../resources/layout.css";

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {user} = useSelector(state => state.users);
  const navigate = useNavigate();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-r-line",
    },
  ]
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-fill",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-r-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  let activeMenu = window.location.pathname;
  if(window.location.pathname.includes('book-now')) {
    activeMenu = '/'
  }
  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">ST</div>
          <div className="role">{user?.Name}</div>
        </div>
        <div className="sidebar-1">
          {menuToBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeMenu === item.path && "active-menu-items"
                } menu-items`}
                onClick={() => {
                  if (item.path === "/logout") {
                    localStorage.removeItem("token");
                    navigate("/login");
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                <i className={item.icon}></i>
                {!collapsed && (
                  <span>
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header">
          {collapsed ? (
            <i
              class="ri-menu-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          ) : (
            <i
              class="ri-close-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
