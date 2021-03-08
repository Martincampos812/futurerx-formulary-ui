/**
 * Component to be used with grid for showing the secondary hidden columns
 */

import * as React from "react";
import { Component } from "react";

interface FrxGridBarProps {
  toggleSecondaryColumns: () => void;
  showSecondaryColumns: boolean;
}

class FrxGridBar extends Component<FrxGridBarProps> {
  render() {
    const { toggleSecondaryColumns, showSecondaryColumns } = this.props;
    return (
      <div
        onClick={toggleSecondaryColumns}
        className="frx-right-arrow ng-star-inserted"
      >
        <div className="collapose-expand-arrow">
          <i
            className={
              showSecondaryColumns
                ? "fal fa-arrow-to-left"
                : "fal fa-arrow-to-right"
            }
          ></i>
        </div>
        <div className="grid-bar">
          <div className="collapose-expand-bars">
            <div className="verticle-line low-gray"></div>
            <div className="verticle-line low-gray"></div>
            <div className="verticle-line  low-gray"></div>
          </div>
          <div className="collapose-expand-arrow center">
            <i
              className={
                showSecondaryColumns
                  ? "fal fa-arrow-to-left"
                  : "fal fa-arrow-to-right"
              }
            ></i>
          </div>
        </div>
        <div className="collapose-expand-arrow">
          <i
            className={
              showSecondaryColumns
                ? "fal fa-arrow-to-left"
                : "fal fa-arrow-to-right"
            }
          ></i>
        </div>
      </div>
    );
  }
}

export default FrxGridBar;
