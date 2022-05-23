import React, { useState } from "react";
import "./Dropdown.css";
import { IoMdNotificationsOutline } from "react-icons/io";

const Dropdown = () => {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  return (
    <div className="dropdown-container">
      <div className="click-dropdown">
        <IoMdNotificationsOutline
          onClick={() => setDropdownToggle(!dropdownToggle)}
        />
      </div>
      <div className={`dropdown ${dropdownToggle ? "active" : ""}`}></div>
    </div>
  );
};

export default Dropdown;
