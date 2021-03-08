import React, { Component } from "react";
import { NodeIcon } from "./../../index";
import { Checkbox } from 'antd'
import "./styles.scss";

const DropDownIcon = (props: any) => {
  const { color = "" } = props;

  return (
    <span className="dropdown-icon-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="4"
        viewBox="0 0 8 4"
        fill="none"
      >
        <path
          d="M0.734671 0.417968L7.26509 0.417969C7.46096 0.417969 7.57033 0.566025 7.44903 0.667102L4.18382 3.37767C4.09036 3.45526 3.91039 3.45526 3.81594 3.37767L0.550729 0.667101C0.429427 0.566024 0.538798 0.417968 0.734671 0.417968Z"
          fill={color}
        />
      </svg>
    </span>
  );
};

export interface IProps {}

export interface IState {}

class TreeNode extends Component<any, IState> {
  handleClick = () => {
    const { onClick } = this.props;

    if (typeof onClick === "function") {
      onClick();
    }
  };

  render() {
    const { data: d, connectorColor, collapseStatus, checkable, nodeIcon } = this.props;

    if(checkable) {
      
      return (
        <div
          className="tree-node"
          style={{ ...d.styles }}
        >
          <div className="tree-node__title-container">
            {/* Connector */}
  
            <div>
              <div
                className="tree-node__title-cube-left-line"
                style={{ backgroundColor: connectorColor }}
              ></div>
            </div>
            
            <Checkbox/>
  
            <div
              className={`tree-node__title-dropdown-icon ${
                !collapseStatus && "tree-node__title-dropdown-icon-closed"
              }`}
              onClick={this.handleClick}
            >
              <DropDownIcon color={d.styles.color} />
            </div>
  
            <div
              className="tree-node__title-circle"
              style={{ backgroundColor: d.styles.color }}
            ></div>
    
            <div className="tree-node__title">{d.title}</div>
            {
              d.tags && <div>{d.tags}</div>
            }
    
          </div>
  
          <div className="tree-node__body">{d.value}</div>
        </div>
      );
    } else {
      return (
        <div
          className="tree-node"
          style={{ ...d.styles }}
        >
          <div className="tree-node__title-container">
            {/* <div className="tree-node__title-cube-bottom-space"></div> */}
            {/* Connector */}
  
            <div>
              <div
                className="tree-node__title-cube-left-line"
                style={{ backgroundColor: connectorColor }}
              ></div>
            </div>
            
            { 
              nodeIcon === NodeIcon.Default &&             
              <div
                className="tree-node__title-cube"
                style={{ backgroundColor: d.styles.color }}
              ></div>
            }

            { 
              nodeIcon === NodeIcon.Expandable &&             
              <div className="expandable">
                <span className="expandable__closed">+</span>
              </div>
            }
            
            <div
              className={`tree-node__title-dropdown-icon ${
                !collapseStatus && "tree-node__title-dropdown-icon-closed"
              }`}
              onClick={this.handleClick}
            >
              <DropDownIcon color={d.styles.color} />
            </div>
  
            <div
              className="tree-node__title-circle"
              style={{ backgroundColor: d.styles.color }}
            ></div>
            <div className="tree-node__title">{d.title}</div>
            {
              d.tags && <div>{d.tags}</div>
            }
          </div>
  
          <div className="tree-node__body">{d.value}</div>
        </div>
      );
    }
  }
}

export default TreeNode;
