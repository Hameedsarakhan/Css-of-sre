import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="user-menu-container">
      <form className="user-menu-form">
        <div className="form-group">
          <NavLink
            to="/dashboard/user/profile"
            className="form-control"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </div>
        <div className="form-group">
          <NavLink
            to="/dashboard/user/orders"
            className="form-control"
            activeClassName="active"
          >
            Orders
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default UserMenu;
