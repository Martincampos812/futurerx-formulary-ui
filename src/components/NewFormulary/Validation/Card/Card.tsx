import { divide } from "lodash";
import React from "react";
import "./Card.css";

function Card({ label, value, color }) {
  return (
    <div className="Card-card" style={{ backgroundColor: color }}>
      <div style={{ textAlign: "center" }}>
        <span className="Card-value">{value}</span>
        <span className="Card-label">{label}</span>
      </div>
    </div>
  );
}

export default Card;
