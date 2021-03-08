import * as React from "react";
import { Component } from "react";

import "./FrxGridSorterIcon.scss";

interface FrxGridSorterIconProps {
  isMultiSort?: boolean;
  columnKey: string;
  multiSortedArray: string[];
  multiSortedInfo?: any[];
  singleSortedInfo: any;
}

class FrxGridSorterIcon extends Component<FrxGridSorterIconProps, any> {
  render() {
    const {
      multiSortedArray,
      columnKey,
      multiSortedInfo,
      singleSortedInfo,
      isMultiSort
    } = this.props;
    let order: string = "";
    if (
      isMultiSort &&
      multiSortedInfo &&
      multiSortedArray.includes(columnKey)
    ) {
      multiSortedInfo.forEach(item => {
        if (item.columnKey === columnKey) {
          order = item.order;
        }
      });
    }

    if (!isMultiSort && singleSortedInfo) {
      if (columnKey === singleSortedInfo.columnKey) {
        order = singleSortedInfo.order;
      }
    }

    return (
      <span className="frx-grid-sorter-icon-root">
        {isMultiSort &&
          multiSortedArray &&
          multiSortedArray.includes(columnKey) &&
          order === "ascend" && (
            <span className="frx-grid-sorter-icon-root__sorter-up">
              <svg
                viewBox="0 0 1024 1024"
                focusable="false"
                className=""
                data-icon="caret-up"
                width="1em"
                height="0.75em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
              </svg>
            </span>
          )}

        {isMultiSort &&
          multiSortedArray &&
          multiSortedArray.includes(columnKey) &&
          order === "descend" && (
            <span className="frx-grid-sorter-icon-root__sorter-down">
              <svg
                viewBox="0 0 1024 1024"
                focusable="false"
                className=""
                data-icon="caret-down"
                width="1em"
                height="0.75em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
              </svg>
            </span>
          )}

        {!isMultiSort && order === "ascend" && (
          <span className="frx-grid-sorter-icon-root__sorter-up">
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              className=""
              data-icon="caret-up"
              width="1em"
              height="0.75em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
            </svg>
          </span>
        )}

        {!isMultiSort && order === "descend" && (
          <span className="frx-grid-sorter-icon-root__sorter-down">
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              className=""
              data-icon="caret-down"
              width="1em"
              height="0.75em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
            </svg>
          </span>
        )}

        {/* <span className="ant-table-column-sorter ant-table-column-sorter-full">
          <span className="ant-table-column-sorter-inner">
            <span
              role="img"
              aria-label="caret-up"
              className={`anticon anticon-caret-up ant-table-column-sorter-up ${
                this.props.isMultiSort &&
                multiSortedArray &&
                multiSortedArray.includes(columnKey) &&
                order === "ascend"
                  ? "active"
                  : ""
              }`}
            >
              <svg
                viewBox="0 0 1024 1024"
                focusable="false"
                className=""
                data-icon="caret-up"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
              </svg>
            </span>
            <span
              role="img"
              aria-label="caret-down"
              className={`anticon anticon-caret-down ant-table-column-sorter-down ${
                this.props.isMultiSort &&
                multiSortedArray &&
                multiSortedArray.includes(columnKey) &&
                order === "descend"
                  ? "active"
                  : ""
              }`}
            >
              <svg
                viewBox="0 0 1024 1024"
                focusable="false"
                className=""
                data-icon="caret-down"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
              </svg>
            </span>
          </span>
        </span> */}
      </span>
    );
  }
}

export default FrxGridSorterIcon;
