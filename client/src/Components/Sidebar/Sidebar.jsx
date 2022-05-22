import React, { useState } from "react";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { BiX } from "react-icons/bi";
import "./Sidebar.css";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="sidebar">
      <AiOutlineAlignLeft
        className={`toggle-icon toggle-line ${!toggle ? "active" : ""}`}
        onClick={() => setToggle(true)}
      />
      <div className={`sidebar-toggle ${toggle ? "active" : ""}`}>
        <BiX className="toggle-icon" onClick={() => setToggle(false)} />

        <div>
            {/* All the code for sidebar here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
