import React, { Component } from "react";
import TreeNode from "../TreeNode";
import { ConnectedColors } from './../../index';
import "./styles.scss";

export interface IProps {}

export interface IState {}

class TreeNodesList extends Component<any, IState> {
  state = {
    collapseStatus: true,
  };

  handleCollapseStatus = () => {
    const { collapseStatus } = this.state;

    this.setState({
      collapseStatus: !collapseStatus,
    });
  };
  
  
  getColorVariant = (color: string) => {
    const { connectedLinesColor } = this.props;
    console.log("🚀 ~ file: index.tsx ~ line 26 ~ TreeNodesList ~ connectedLinesColor", connectedLinesColor)
    let assignedColor;
    switch (connectedLinesColor) {
      case ConnectedColors.Grey:
          assignedColor = "#C4C4C4"
        break;
      case ConnectedColors.Default:
        assignedColor = color
        break;
      default:
        assignedColor = '#000'
        break;
    }
    
    return assignedColor;
  }

  render() {
    const {
      data,
      connectorColor = null,
      checkable = false,
      nodeIcon,
      connectedLinesColor
    } = this.props;
    
    const { collapseStatus } = this.state;
    const childrenLength = data.length;

    return (
      <>
        <div>
          {data.map((dataNode: any, key: any) => {
            let lastChild = childrenLength === key + 1;

            return (
              <div
                className="tree-node-container"
                key={key}
                style={{
                  position: "relative",
                  backgroundColor: lastChild ? "#fff" : "",
                }}
              >
                {collapseStatus && dataNode.children && (
                  <div
                    style={{
                      width: "2px",
                      height: "100%",
                      backgroundColor: this.getColorVariant(dataNode.styles.color),
                      position: "absolute",
                      top: "20.5px",
                      left: "7px",
                    }}
                  />
                )}

                {lastChild && (
                  <div
                    style={{
                      width: "2px",
                      height: "160%",
                      backgroundColor: "#fff",
                      position: "absolute",
                      top: "8px",
                      left: "-19px",
                    }}
                  />
                )}

                <TreeNode
                  data={dataNode}
                  connectorColor={connectorColor}
                  collapseStatus={collapseStatus}
                  checkable={checkable}
                  nodeIcon={nodeIcon}
                  onClick={this.handleCollapseStatus}
                />

                {collapseStatus && (
                  <>
                    {dataNode.children !== undefined &&
                      dataNode.children &&
                      dataNode.children.length > 0 && (
                        <>
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              left: `26px`,
                            }}
                          >
                            <TreeNodesList
                              data={dataNode.children}
                              checkable={checkable}
                              nodeIcon={nodeIcon}
                              connectorColor={this.getColorVariant( dataNode.styles.color)}
                              connectedLinesColor={connectedLinesColor}
                            />
                          </div>
                        </>
                      )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default TreeNodesList;
