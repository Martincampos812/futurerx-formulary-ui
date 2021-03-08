import React from "react";
import "./FrxCategoryTag.scss";
function FrxCategoryTag(props) {
  const { category, bgColor } = props;
  return (
    <div className={`border-round ${bgColor}`}>
      <span className="category-text-font">{category}</span>
    </div>
  );
}

export default FrxCategoryTag;
