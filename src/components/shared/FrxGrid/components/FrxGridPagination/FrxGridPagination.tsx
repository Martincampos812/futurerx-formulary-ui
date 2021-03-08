/**
 * Component to be used with grid for gird controls eg: pagination
 * @author Deepak_T
 * @version 1.0.0
 */

//ant design icons import
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// ant design imports
import { Button, Form, Input, Pagination, Select, Switch } from "antd";
// react imports
import * as React from "react";
import { Component } from "react";
import { PagintionPosition } from "../../../../../models/grid.model";
import "./FrxGridPagination.scss";

const { Option } = Select;

interface FrxGridPaginationProps<T> {
  filteredInfo: any;
  filterTable: T[];
  data: T[];
  isMultiSort: boolean;
  sortedInfo: any;
  showTotal: string;
  pages: number;
  pageSize: number;
  currentPage: number;
  lastPage: number;
  goToPageValue: number;
  position: PagintionPosition;
  hideClearFilter;
  hideItemsPerPage;
  hideMultiSort;
  hidePageJumper;
  hideResults;

  onToggleMultiSort: () => void;
  onClearAll: () => void;
  onGoToPageValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPageChange: (p: number) => void;
  onPageSizeChange: (v: number) => void;
  onGoToSpecificPage: () => void;
  onGotToFirstPage: () => void;
  onGotToLastPage: () => void;
}

class FrxGridPagination extends Component<FrxGridPaginationProps<any>> {
  render() {
    const {
      isMultiSort,
      onToggleMultiSort,
      onClearAll,
      filteredInfo,
      filterTable,
      data,

      showTotal,
      pages,
      hideClearFilter,
      hideItemsPerPage,
      hideMultiSort,
      hidePageJumper,
      hideResults,

      onGoToPageValueChange,
      goToPageValue,
      pageSize,
      lastPage,
      currentPage,
      onPageChange,
      onPageSizeChange,
      onGoToSpecificPage,
      onGotToFirstPage,
      onGotToLastPage
    } = this.props;
    return (
      <div className="frx-grid-pagination">
        {!hideMultiSort && (
          <Form
            layout="inline"
            labelAlign="right"
            className="frx-grid-pagination__mutlisort-form"
            colon={false}
          >
            <Form.Item label="Multi Sort" labelAlign="right" colon={false}>
              <Switch checked={!!isMultiSort} onChange={onToggleMultiSort} />
            </Form.Item>
          </Form>
        )}
        {!hideClearFilter && (
          <Button
            onClick={onClearAll}
            className={`frx-grid-pagination__clerall-btn 
				${filteredInfo ? "frx-grid-pagination__clerall-btn--highlighted" : ""}`}
          >
            {/* <svg className="frx-grid-pagination__clerall-btn__close-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C2.68636 0 0 2.68636 0 6C0 9.31364 2.68636 12 6 12C9.31364 12 12 9.31364 12 6C12 2.68636 9.31364 0 6 0ZM4.12137 10.5354C4.71697 10.7821 5.35533 10.9091 6 10.9091C7.30197 10.9091 8.55062 10.3919 9.47125 9.47125C10.3919 8.55062 10.9091 7.30197 10.9091 6C10.9091 4.69803 10.3919 3.44938 9.47125 2.52875C8.55062 1.60812 7.30197 1.09091 6 1.09091C5.35533 1.09091 4.71697 1.21789 4.12137 1.46459C3.52577 1.7113 2.9846 2.0729 2.52875 2.52875C2.0729 2.9846 1.7113 3.52577 1.46459 4.12137C1.21789 4.71697 1.09091 5.35533 1.09091 6C1.09091 6.64467 1.21789 7.28303 1.46459 7.87863C1.7113 8.47423 2.0729 9.0154 2.52875 9.47125C2.9846 9.9271 3.52577 10.2887 4.12137 10.5354ZM8.49165 4.36654C8.46194 4.43172 8.41967 4.49041 8.36728 4.53927L6.77128 6.02727L8.25873 7.62327C8.31048 7.67506 8.35128 7.73675 8.37868 7.80464C8.40609 7.87254 8.41954 7.94526 8.41824 8.01847C8.41694 8.09167 8.40092 8.16387 8.37113 8.23075C8.34133 8.29763 8.29838 8.35783 8.24482 8.40776C8.19127 8.45769 8.12821 8.49633 8.0594 8.52136C7.9906 8.5464 7.91746 8.55733 7.84434 8.5535C7.77122 8.54967 7.69962 8.53116 7.63381 8.49907C7.568 8.46698 7.50932 8.42197 7.46128 8.36672L5.97328 6.77072L4.37728 8.25818C4.32528 8.30894 4.26366 8.34881 4.19604 8.37543C4.12842 8.40205 4.05616 8.41489 3.98351 8.4132C3.91086 8.4115 3.83928 8.39531 3.77297 8.36556C3.70667 8.33582 3.64697 8.29313 3.5974 8.23999C3.54782 8.18685 3.50936 8.12434 3.48428 8.05614C3.4592 7.98793 3.44801 7.9154 3.45135 7.8428C3.45469 7.77021 3.47251 7.69901 3.50375 7.6334C3.53499 7.56779 3.57903 7.50908 3.63328 7.46072L5.22982 5.97272L3.74182 4.37672C3.64699 4.27033 3.59756 4.13105 3.60412 3.98868C3.61067 3.84631 3.67269 3.71217 3.7769 3.61494C3.88111 3.51772 4.01923 3.46514 4.16171 3.46847C4.30419 3.47179 4.43971 3.53075 4.53928 3.63272L6.02728 5.22927L7.62328 3.74127C7.67567 3.69241 7.73718 3.65436 7.80429 3.62928C7.87139 3.6042 7.94278 3.59258 8.01437 3.59509C8.08596 3.59759 8.15636 3.61418 8.22155 3.64389C8.28673 3.67361 8.34543 3.71587 8.39428 3.76827C8.44313 3.82066 8.48118 3.88217 8.50626 3.94927C8.53135 4.01638 8.54296 4.08776 8.54046 4.15936C8.53795 4.23095 8.52137 4.30135 8.49165 4.36654Z" fill="#666666"/>
</svg> */}

            <HighlightOffIcon className="frx-grid-pagination__clerall-btn__close-icon" />
            <span>Clear All Filters</span>
          </Button>
        )}
        {!hideResults && (
          <span className="frx-grid-pagination__results">
            Results:&nbsp;&nbsp;{showTotal}
          </span>
        )}
        {!hideItemsPerPage && (
          <div
            className="frx-grid-pagination__items-per-page"
            // style={{ display: "flex", marginLeft: -8 }}
          >
            <label className="frx-grid-pagination__items-per-page__label">
              Items per page
            </label>

            <Select
              suffixIcon={
                <svg
                  className="frx-grid-pagination__items-per-page__select-suffix"
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.73167 0H0.268334C0.0444792 0 -0.0805157 0.21739 0.0581151 0.365801L3.78978 4.34571C3.89659 4.45963 4.10227 4.45963 4.21022 4.34571L7.94188 0.365801C8.08052 0.21739 7.95552 0 7.73167 0Z"
                    fill="#CCCCCC"
                  />
                </svg>

                // <CaretDownOutlined  />
              }
              value={pageSize}
              onChange={onPageSizeChange}
              getPopupContainer={node => node.parentNode}
              className="frx-grid-pagination__items-per-page__select"
            >
              <Option value="10">10</Option>
              <Option value="20">20</Option>
              <Option value="30">30</Option>
              <Option value="50">50</Option>
            </Select>
          </div>
        )}

        <div className="frx-grid-pagination__page-numbers">
          <Button
            onClick={onGotToFirstPage}
            className="frx-grid-pagination__page-numbers__first"
            disabled={currentPage <= 1}
            style={{
              backgroundColor: currentPage > 1 ? "#ffffff" : "#e5e5e5"
            }}
            // icon={<VerticalRightOutlined />}
          >
            <svg
              className="frx-grid-pagination__page-numbers__first__icon"
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.70711 1.05022C10.0976 1.44074 10.0976 2.07391 9.70711 2.46443L6.17157 5.99996L9.70711 9.5355C10.0976 9.92602 10.0976 10.5592 9.70711 10.9497C9.31658 11.3402 8.68342 11.3402 8.29289 10.9497L4.05025 6.70707C3.65973 6.31655 3.65973 5.68338 4.05025 5.29286L8.29289 1.05022C8.68342 0.659693 9.31658 0.659693 9.70711 1.05022Z"
                fill="#666666"
              />
              <rect
                width="2"
                height="10"
                rx="1"
                transform="matrix(-1 0 0 1 2 1)"
                fill="#666666"
              />
            </svg>

            {/* <FirstPageIcon  /> */}
          </Button>
          
          <div>
            <Pagination
              defaultPageSize={10}
              onChange={onPageChange}
              pageSize={pageSize}
              showQuickJumper={false}
              // hideOnSinglePage={true}
              current={currentPage}
              total={
                filterTable && filterTable.length > 0
                  ? filterTable.length
                  : typeof data === "number" ? data : data.length
              }
            />
          </div>
          <Button
            className="frx-grid-pagination__page-numbers__last"
            disabled={currentPage >= lastPage}
            style={{
              backgroundColor: currentPage < lastPage ? "#ffffff" : "#e5e5e5"
            }}
            onClick={onGotToLastPage}
          >
            <svg
              className="frx-grid-pagination__page-numbers__last__icon"
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.292893 1.05022C-0.0976311 1.44074 -0.0976311 2.07391 0.292893 2.46443L3.82843 5.99996L0.292893 9.5355C-0.0976311 9.92602 -0.0976311 10.5592 0.292893 10.9497C0.683417 11.3402 1.31658 11.3402 1.70711 10.9497L5.94975 6.70707C6.34027 6.31655 6.34027 5.68338 5.94975 5.29286L1.70711 1.05022C1.31658 0.659693 0.683417 0.659693 0.292893 1.05022Z"
                fill="#666666"
              />
              <rect x="8" y="1" width="2" height="10" rx="1" fill="#666666" />
            </svg>

            {/* <LastPageIcon  /> */}
          </Button>
        </div>

        {!hidePageJumper && (
          <div className="frx-grid-pagination__gotopage">
            <label className="frx-grid-pagination__gotopage__label">
              Go to page
            </label>
            <Input
              type="text"
              className="frx-grid-pagination__gotopage__input"
              pattern="^[1-9][0-9]*$"
              value={goToPageValue}
              onChange={onGoToPageValueChange}
            />
            <label className="frx-grid-pagination__gotopage__label">
              of&nbsp;&nbsp;{pages}
            </label>
            <span
              className="frx-grid-pagination__gotopage__go"
              onClick={onGoToSpecificPage}
            >
              Go{" "}
              <svg
                width="5"
                height="8"
                viewBox="0 0 5 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.992838 8L5 4L0.992838 0L0 0.991063L3.01432 4L0 7.00893L0.992838 8Z"
                  fill="#2055B5"
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default FrxGridPagination;
