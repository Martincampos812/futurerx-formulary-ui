import React from "react";

import "./TreeNodeTitle.scss";
const TreeNodeTitle = ({ groupTitle, title }) => {
  return (
    <span className="tree-node-title">
      {groupTitle && (
        <span className="tree-node-title__group">{groupTitle}​​​​​​​​</span>
      )}

      <span className="tree-node-title__text">{title}​​​​​​​​</span>
    </span>
  );
};

export default TreeNodeTitle;
