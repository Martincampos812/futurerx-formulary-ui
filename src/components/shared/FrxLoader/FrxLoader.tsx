import React from "react";
import "./FrxLoader.scss";
import loadImg from "../../../assets/img/loader.gif";

const FrxLoader = () => {
  return (
    <div className="frx-loader">
      <img
        src={loadImg}
        alt="loader"
        className="frx-loader__img"
      />
    </div>
  );
};

export default FrxLoader;
