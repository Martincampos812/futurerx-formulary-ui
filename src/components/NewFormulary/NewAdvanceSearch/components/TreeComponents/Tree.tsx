import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Tree.scss";

const Tree = ({ data = [], isChild = false }) => {
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data.map((tree) => (
          <TreeNode node={tree} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.children ? true : false;

  return (
    <li className="d-tree-node border-0">
      <div className="d-flex" onClick={(e) => setChildVisiblity((v) => !v)}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
            {/* <FontAwesomeIcon icon="caret-right" /> */}
            <svg
              className="caret-right "
              style={{ cursor: "pointer" }}
              // onClick={this.onHandleIcons}
              width="5"
              height="10"
              viewBox="0 0 5 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.333344 8.59902L0.333344 1.29698C0.333344 0.791821 0.854356 0.539244 1.15969 0.896825L4.27849 4.54643C4.46751 4.76779 4.46751 5.12821 4.27849 5.34957L1.15969 8.99917C0.854356 9.35675 0.333344 9.10418 0.333344 8.59902Z"
                fill="#707683"
              />
            </svg>
          </div>
        )}

        <div className="col d-tree-head">
          {/* <i className={`mr-1 ${node.icon}`}> </i> */}

          {node.label}
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <Tree data={node.children} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;
