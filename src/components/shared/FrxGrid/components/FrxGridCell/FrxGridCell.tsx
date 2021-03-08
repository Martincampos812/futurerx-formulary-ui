/**
 * Component to render each cell in grid except settings column
 * @author Deepak_T
 * @version 1.0.0
 */

import { Tooltip, Checkbox } from "antd";
import * as React from "react";
import "./FrxGridCell.scss";

export interface FrxGridCellProps {
  dataRow: any;
  dataKey: string;
  className?: string;
  showToolTip?: boolean;
  formatter?: JSX.Element;
  dataType: "string" | "date" | "number" | undefined;
  showDecimals?: boolean;
  customToolTip?: JSX.Element;
  customContent?: JSX.Element;
  handleSelectEachRow?: (
    key: string,
    dataRow: any,
    isSelected: boolean
  ) => void;
  componentToOpenOnClickingCell?: (props) => JSX.Element;
  onCellClick?: (
    dataRow: any,
    dataKey: string,
    componentToOpenOnClickingCell?: (props) => JSX.Element
  ) => void;
}

class FrxGridCell extends React.Component<FrxGridCellProps> {
  /**
   * @function handleRowSelection
   * to select each row in the grid
   * @param e the change event
   * @author Deepak_T
   */
  handleRowSelection = e => {
    if (e && e.target) {
      if (this.props.handleSelectEachRow)
        this.props.handleSelectEachRow(
          this.props.dataKey,
          this.props.dataRow,
          e.target.checked
        );
    }
  };
  render() {
    const {
      dataRow,
      dataKey,
      className,
      onCellClick,
      showToolTip,
      customToolTip,
      customContent,
      formatter,
      showDecimals,
      dataType,
      componentToOpenOnClickingCell
    } = this.props;

    return (
      <>
        {dataKey === "checkbox" ? (
          <Checkbox
            checked={dataRow.isChecked}
            onChange={this.handleRowSelection}
          />
        ) : (
          <>
            {!showToolTip ? (
              <span
                onClick={() => {
                  if (onCellClick)
                    onCellClick(
                      dataRow,
                      dataKey,
                      componentToOpenOnClickingCell
                    );
                }}
                className={`frx-grid-cell ${
                  className ? `frx-grid-cell--${className}` : ``
                }`}
              >
                {formatter ? (
                  <>
                    {" "}
                    <span className="frx-grid-cell__cell-formatter">
                      {formatter}
                    </span>{" "}
                    {dataType === "number" && showDecimals
                      ? parseInt(dataRow[dataKey]).toFixed(2)
                      : dataRow[dataKey]}
                  </>
                ) : (
                  <>
                    {customContent
                      ? customContent
                      : dataType === "number" && showDecimals
                      ? parseInt(dataRow[dataKey]).toFixed(3)
                      : dataRow[dataKey]}
                  </>
                )}
              </span>
            ) : (
              <Tooltip
                overlayClassName="frx-grid-cell__tooltip"
                // arrowPointAtCenter={true}
                placement="top"
                title={
                  <>
                    {customToolTip ? (
                      <>{customToolTip}</>
                    ) : (
                      <div className="frx-grid-cell__tooltip--innercontent">
                        <span className="frx-grid-cell__tooltip--innercontent__druglabel">
                          {dataRow[dataKey]}
                        </span>
                      </div>
                    )}
                  </>
                }
              >
                <span
                  onClick={() => {
                    if (onCellClick)
                      onCellClick(
                        dataRow,
                        dataKey,
                        componentToOpenOnClickingCell
                      );
                  }}
                  className={`frx-grid-cell ${
                    className ? `frx-grid-cell--${className}` : ``
                  }`}
                >
                  {formatter ? (
                    <>
                      {" "}
                      <span className="frx-grid-cell__cell-formatter">
                        {formatter}
                      </span>{" "}
                      {dataType === "number"
                        ? parseInt(dataRow[dataKey]).toFixed(3)
                        : dataRow[dataKey]}
                    </>
                  ) : (
                    <>
                      {customContent
                        ? customContent
                        : dataType === "number" && showDecimals
                        ? parseInt(dataRow[dataKey]).toFixed(2)
                        : dataRow[dataKey]}
                    </>
                  )
                  // dataRow[dataKey]
                  }
                </span>
              </Tooltip>
            )}
          </>
        )}
      </>
    );
  }
}

export default FrxGridCell;
