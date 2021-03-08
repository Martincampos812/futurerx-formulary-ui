import React from "react";
import { Radio, Checkbox } from "antd";

class PanelGrid extends React.Component<any, any> {
  render() {
    const classesArray =
      this.props.panelTitleAlignment !== undefined
        ? this.props.panelTitleAlignment
        : null;
    const panelGridTop = this.props.panelGridTitle.map((e, index) => {
      const classes = `item ${classesArray ? classesArray[index] : null}`;
      return <div className={classes}>{e}</div>;
    });
    let panelGridBottom = (
      <div className="row-summary-grid">
        <div className="item no-data">No Rows to Display</div>
      </div>
    );
    if (this.props.panelGridValue.length > 0) {
      panelGridBottom = this.props.panelGridValue.map((e, index) => {
        return (
          <div className="row-summary-grid">
            {e.map((text, index) => {
              const classes = `item ${
                classesArray ? classesArray[index] : null
              }`;
              const renderedText =
                text === "checkbox" ? (
                  <Checkbox defaultChecked={false} />
                ) : (
                  text
                );
              return (
                <div className={classes}>
                  <span>{renderedText}</span>
                </div>
              );
            })}
          </div>
        );
      });
    }
    return (
      <div className="panel-grid text-center first-left">
        <div className="top">{panelGridTop}</div>
        <div className="bottom">{panelGridBottom}</div>
      </div>
    );
  }
}

export default PanelGrid;
