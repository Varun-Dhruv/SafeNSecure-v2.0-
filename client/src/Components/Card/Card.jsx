import React from "react";
import "./Card.css";
import spidy from "../../assets/stb.svg";

const Card = (props) => {
  return (
    <div className="card">
      <div className="box">
        <div className="content">
          <img src={spidy} alt="" />
          
          <p>
            Name: {props.Name}
          </p> 
          <p> Account: {props.Account}</p>
          <a href={'/Profile/'+props.Account}>Download</a>
        </div>
      </div>
    </div>
  );
};

export default Card;