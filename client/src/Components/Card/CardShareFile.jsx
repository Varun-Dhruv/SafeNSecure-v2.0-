import "./CardFiles.css"

import React from "react";
import "./CardFiles.css";
import spidy from "../../assets/stb.svg";
import Identicon from 'react-identicons';
import { useParams } from "react-router-dom";
import { convertBytes } from "../../helpers";
const CardFiles = (props) => {

  
  props.files.filter((file) => {
    if (file.uploader === props.Account) return true
    return false
  })
  return (
    <div className="Profile-Files">
      <h1>Files</h1>

      {props.files.map((file, key) => {
        console.log(file)
        return (
          <div className="card">
            <div className="box">
              <div className="content">
                <img src={spidy} alt="" />
                <div className="File-Info">
                  <ul>
                    <li>Name: {file[4]}</li>
                    <li>Size: {convertBytes(file[2])}</li>
                    <li></li>
                  </ul>
                </div>
                <button onClick={() => { props.setSelectedFile(file) }}>Select File</button>
              </div>
            </div>
          </div>)
      })}
    </div>
  );
};

export default CardFiles;