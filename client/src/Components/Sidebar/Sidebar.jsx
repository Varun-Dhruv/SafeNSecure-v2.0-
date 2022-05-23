import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { AiOutlineFolderOpen, AiOutlineAlignLeft } from "react-icons/ai";
import { MdOutlineHome } from "react-icons/md";
import stb from "../../assets/stb.svg";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="sidebar">
      <AiOutlineAlignLeft
        className={`toggle-icon toggle-line ${!toggle ? "active" : ""}`}
        onClick={() => setToggle(true)}
      />
      <div className={`sidebar-toggle ${toggle ? "active" : ""}`}>
        <div className="sidebar-top">
          <BiX className="toggle-i" onClick={() => setToggle(false)} />
          <img src={stb} alt="" />
        </div>
        <div className="sidebar-links">
          <div className="sidebar-link active">
            <MdOutlineHome />
            <div className="link-content"><Link to="/">Home</Link></div>
          </div>
          <div className="sidebar-link">
            <AiOutlineFolderOpen />
            <div className="link-content"><Link to="/View">Files</Link></div>
          </div>
          <div className="sidebar-link">
            <MdOutlineHome />
            <div className="link-content"><Link to="/Upload">Upload</Link></div>
          </div>
          <div className="sidebar-link">
            <AiOutlineFolderOpen />
            <div className="link-content"><Link to="/Share">Share</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;