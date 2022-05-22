import React from "react";
import "./Card.css";
import spidy from "../../assets/spidy.png";

const Card = () => {
  return (
    <div className="card">
      <div className="box">
        <div className="content">
          <img src={spidy} alt="" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            autem recusandae, quis, nemo debitis iste, reprehenderit illo
            voluptatibus nostrum est magni animi sunt.{" "}
          </p>
          <a href="#">Download</a>
        </div>
      </div>
    </div>
  );
};

export default Card;
