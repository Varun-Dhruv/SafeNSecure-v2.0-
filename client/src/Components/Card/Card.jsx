import React from "react";
import "./Card.css";
import spidy from "../../assets/stb.svg";
import Identicon from 'react-identicons';
const Card = (props) => {
  return (
    <div className="card">
      <div className="box">
        <div className="content">
        <Identicon string={props.Account} size=' 40' />
          {/* <img src={spidy} alt="" /> */}
          <div className="Info">
          <p>
            Name: {props.Name}
          </p> 
          <p> Account: {props.Account}</p>
          </div>
          <a href={'/Profile/'+props.Account}>View Files</a>
        </div>
      </div>
    </div>
  );
};

export default Card;