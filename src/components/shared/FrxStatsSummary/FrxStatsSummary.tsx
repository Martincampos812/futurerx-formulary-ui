import { Tooltip } from "@material-ui/core";
import React, { Component } from "react";
import "./FrxStatsSummary.scss";

interface Props {
  data: Array<number>;
  labels: Array<string>;
  total: number;
  heading: string;
  tooltips?: Array<string>;
  colors?: Array<string>;
  onSelectStatItem?: (label: string) => void;
}
class StatsSummary extends Component<Props, any> {
  colors: Array<string>;
  total: number;

  constructor(props: Props) {
    super(props);

    this.colors = [
      "#F65A1C",
      "#E5AC25",
      "#59B35E",
      "#5069C5",
      "#37B0AB",
      "#694298"
    ];
    this.total = 0;
  }

  validateTotal = () => {
    this.total = this.props.total;
    if (this.total > this.props.data.length) {
      this.total = this.props.data.length;
    }
    if (this.total > this.props.labels.length) {
      this.total = this.props.labels.length;
    }
    console.log("StatsSummary: total: " + this.total);
  };

  componentDidMount = () => {
    this.validateTotal();
  };

  componentDidUpdate = () => {
    this.validateTotal();
  };

  onSelectStatItem = (label: string) => {
    if (this.props.onSelectStatItem) this.props.onSelectStatItem(label);
  };

  getStatsSummaryItem = (index: number) => {
    console.log("StatsSummary: getStatsSummaryItem: " + index);
    if (index >= this.total || index < 0) {
      return <div key={index + ""}> </div>;
    }

    const getSeparator = function(index: number, total: number) {
      if (index < total - 1) {
        return <div className="ss-rectangle"></div>;
      }
    };

    const colors = this.props.colors ? this.props.colors : this.colors;
    const num = this.props.data[index];
    const label = this.props.labels[index];
    const color = colors[index % colors.length];
    return (
      <>
        <div className="stats-summary-item">
          <Tooltip
            title={label}
            placement="bottom"
            arrow={true}
            classes={{
              tooltip: "FrxStatsSummary-tooltip",
              arrow: "FrxStatsSummary-arrow"
            }}
          >
            <div className="ss-label">
              {label}
              {/* <span className="ss-tooltiptext">{label}</span> */}
            </div>
          </Tooltip>
          <div
            onClick={() => this.onSelectStatItem(label)}
            className="ss-number"
            style={{ color: color }}
          >
            {num}
          </div>
          {/* TODO: CHECK IF THIS IS REQUIRED .REMOVED FOR NOW. */}
          {/* <div className="ToolTip">
            <div className="tooltip-data">{label}</div>
          </div> */}
          {getSeparator(index, this.total)}
        </div>
      </>
    );
  };

  render() {
    this.validateTotal();

    return (
      <div className="stats-summary-root">
        <h5 className="stats-summary-heading">{this.props.heading}</h5>
        <div className="stats-summary-box">
          {this.props.data.map((d, index) => {
            return this.getStatsSummaryItem(index);
          })}
        </div>
      </div>
    );
  }
}

export default StatsSummary;
