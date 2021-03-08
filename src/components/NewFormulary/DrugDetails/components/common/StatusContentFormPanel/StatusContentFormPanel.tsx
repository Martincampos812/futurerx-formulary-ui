import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { Menu, Dropdown } from "antd";

import PanelHeader from "../../../../../shared/Frx-components/panel-header/PanelHeader";

import "./StatusContentFormPanel.scss";

const ArrowDownIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 9 6"
    height="6"
    width="9"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#323C47"
      d="M0.223886 0.942758C0.53186 0.627905 0.960622 0.603197 1.33711 0.942758L4.09758 3.58795L6.85804 0.942758C7.23453 0.603197 7.664 0.627905 7.96986 0.942758C8.27783 1.25691 8.25805 1.78778 7.96986 2.08286C7.68307 2.37795 4.65348 5.26104 4.65348 5.26104C4.58134 5.33577 4.49487 5.39521 4.39924 5.4358C4.30361 5.47639 4.20077 5.49731 4.09687 5.49731C3.99297 5.49731 3.89014 5.47639 3.7945 5.4358C3.69887 5.39521 3.6124 5.33577 3.54026 5.26104C3.54026 5.26104 0.512082 2.37795 0.223886 2.08287C-0.0650165 1.78778 -0.0840883 1.25691 0.223886 0.942758Z"
    />
  </svg>
);

const CorrectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
  >
    <path
      d="M6.50009 0.619141C3.25244 0.619141 0.619141 3.25244 0.619141 6.50009C0.619141 9.74774 3.25244 12.381 6.50009 12.381C9.74774 12.381 12.381 9.74774 12.381 6.50009C12.381 3.25244 9.74774 0.619141 6.50009 0.619141ZM9.04019 4.57959L6.27562 8.41272C6.23698 8.46665 6.18604 8.51059 6.12703 8.54091C6.06802 8.57122 6.00263 8.58703 5.93628 8.58703C5.86994 8.58703 5.80455 8.57122 5.74554 8.54091C5.68652 8.51059 5.63559 8.46665 5.59695 8.41272L3.95999 6.14435C3.91011 6.07477 3.95999 5.97763 4.04532 5.97763H4.66098C4.79488 5.97763 4.92221 6.04196 5.00098 6.15222L5.93563 7.44918L7.99921 4.58747C8.07797 4.47852 8.20399 4.41288 8.3392 4.41288H8.95487C9.04019 4.41288 9.09008 4.51002 9.04019 4.57959Z"
      fill="#80C483"
    />
  </svg>
);

const InCorrectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M6 0C2.69163 0 0 2.69163 0 6C0 9.30837 2.69163 12 6 12C9.30837 12 12 9.30837 12 6C12 2.69163 9.30837 0 6 0ZM8.1724 7.5199C8.21707 7.56234 8.25278 7.61328 8.27744 7.66973C8.30211 7.72618 8.31522 7.787 8.31601 7.8486C8.3168 7.9102 8.30525 7.97133 8.28204 8.0284C8.25883 8.08546 8.22443 8.13731 8.18087 8.18087C8.13731 8.22443 8.08546 8.25883 8.0284 8.28204C7.97133 8.30525 7.9102 8.3168 7.8486 8.31601C7.787 8.31522 7.72618 8.30211 7.66973 8.27744C7.61328 8.25278 7.56234 8.21707 7.5199 8.1724L6 6.65279L4.4801 8.1724C4.39284 8.25531 4.27664 8.30084 4.15629 8.2993C4.03594 8.29776 3.92095 8.24926 3.83584 8.16416C3.75074 8.07905 3.70224 7.96406 3.7007 7.84371C3.69916 7.72336 3.74469 7.60716 3.8276 7.5199L5.34721 6L3.8276 4.4801C3.74469 4.39284 3.69916 4.27664 3.7007 4.15629C3.70224 4.03594 3.75074 3.92095 3.83584 3.83584C3.92095 3.75074 4.03594 3.70224 4.15629 3.7007C4.27664 3.69916 4.39284 3.74469 4.4801 3.8276L6 5.34721L7.5199 3.8276C7.60716 3.74469 7.72336 3.69916 7.84371 3.7007C7.96406 3.70224 8.07905 3.75074 8.16416 3.83584C8.24926 3.92095 8.29776 4.03594 8.2993 4.15629C8.30084 4.27664 8.25531 4.39284 8.1724 4.4801L6.65279 6L8.1724 7.5199Z"
      fill="#E76262"
    />
  </svg>
);

const DropdownArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="3"
    viewBox="0 0 6 3"
    fill="none"
  >
    <path
      d="M0.403717 0H5.59628C5.9555 0 6.13512 0.382449 5.88084 0.606582L3.28556 2.89594C3.12815 3.03469 2.87185 3.03469 2.71444 2.89594L0.119165 0.606582C-0.135116 0.382449 0.0444952 0 0.403717 0Z"
      fill="#707683"
    />
  </svg>
);

const StatusContentFormPanel = (props) => {
  const {
    title = "",
    type,
    children,
    handleStatus,
    isAdditionalCriteria,
    deleteIconHandler,
    showDelete = true,
    isReadOnly,
    editable,
  } = props;

  const [statusType, setStatusType] = useState(type ? type : "covered");

  const menu = (
    <Menu>
      <Menu.Item key="covered" onClick={(e) => handleStatus(e.key)}>
        {isAdditionalCriteria ? "Include" : "Covered"}
      </Menu.Item>
      <Menu.Item key="not-covered" onClick={(e) => handleStatus(e.key)}>
        {isAdditionalCriteria ? "Exclude" : "Not Covered"}
      </Menu.Item>
    </Menu>
  );

  const renderStatusDropdown = () => {
    switch (type) {
      case "covered":
        return (
          <>
            <CorrectIcon />
            {isAdditionalCriteria ? <span>include</span> : <span>covered</span>}
            <DropdownArrowIcon />
          </>
        );
      case "not-covered":
        return (
          <>
            <InCorrectIcon />
            {isAdditionalCriteria ? (
              <span>exclude</span>
            ) : (
              <span>not covered</span>
            )}
            <DropdownArrowIcon />
          </>
        );
      default:
        break;
    }
  };

  return (
    <div className="status-content-form-panel">
      <div className="status-content-form-panel__container">
        <div className="status-content-form-panel__arrow-wrapper">
          <Box component="span" display="block">
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.97993 9.87637C3.03294 9.8763 3.08544 9.88669 3.13443 9.90695C3.18341 9.9272 3.22792 9.95692 3.2654 9.9944C3.30289 10.0319 3.33261 10.0764 3.35286 10.1254C3.37312 10.1744 3.38351 10.2269 3.38344 10.2799L3.38344 14.4768L4.99511 12.8652C5.07069 12.7896 5.17319 12.7471 5.28008 12.7471C5.38696 12.7471 5.48947 12.7896 5.56504 12.8652C5.64062 12.9407 5.68308 13.0432 5.68308 13.1501C5.68308 13.257 5.64062 13.3595 5.56504 13.4351L3.28531 15.7148C3.20974 15.7904 3.10723 15.8329 3.00035 15.8329C2.89346 15.8329 2.79096 15.7904 2.71538 15.7148L2.70747 15.7069C2.7031 15.7029 2.69881 15.6988 2.6946 15.6946C2.6904 15.6904 2.68629 15.6861 2.68229 15.6817L0.435649 13.4351C0.360071 13.3595 0.317612 13.257 0.317612 13.1501C0.317612 13.0432 0.360071 12.9407 0.435649 12.8652C0.511227 12.7896 0.613732 12.7471 0.720615 12.7471C0.827498 12.7471 0.930004 12.7896 1.00558 12.8652L2.57642 14.436L2.57642 10.2799C2.57635 10.2269 2.58674 10.1744 2.607 10.1254C2.62725 10.0764 2.65697 10.0319 2.69445 9.9944C2.73194 9.95692 2.77645 9.9272 2.82543 9.90695C2.87442 9.88669 2.92692 9.8763 2.97993 9.87637ZM2.57642 1.56447L2.57642 5.72042C2.57642 5.82744 2.61893 5.93007 2.6946 6.00574C2.77028 6.08142 2.87291 6.12393 2.97993 6.12393C3.08695 6.12393 3.18958 6.08142 3.26526 6.00574C3.34093 5.93007 3.38344 5.82744 3.38344 5.72042V1.52347L4.99519 3.13522C5.07077 3.2108 5.17328 3.25326 5.28016 3.25326C5.38704 3.25326 5.48955 3.2108 5.56513 3.13522C5.6407 3.05964 5.68316 2.95714 5.68316 2.85025C5.68316 2.74337 5.6407 2.64087 5.56513 2.56529L3.28539 0.285557C3.20982 0.209979 3.10731 0.167521 3.00043 0.16752C2.89355 0.16752 2.79104 0.20998 2.71546 0.285558L2.712 0.289021C2.70599 0.294347 2.70014 0.299858 2.69445 0.305547C2.68876 0.311237 2.68325 0.317089 2.67793 0.323093L0.435731 2.56529C0.360153 2.64087 0.317694 2.74337 0.317694 2.85025C0.317694 2.95714 0.360153 3.05964 0.435731 3.13522C0.511309 3.2108 0.613814 3.25326 0.720698 3.25326C0.827581 3.25326 0.930086 3.2108 1.00566 3.13522L2.57642 1.56447Z"
                fill="#707683"
              />
            </svg>
          </Box>
        </div>

        <div
          className={`status-content-form-panel__content-wrapper status-content-form-panel__content-wrapper--variant-${
            type === "covered" ? 1 : 2
          }`}
        >
          <div className="status-content-form-panel__content-header">
            <PanelHeader title={title} tooltip={title}></PanelHeader>

            <div className="status-content-form-panel__type-dropdown-container">
              <Dropdown
                disabled={editable || isReadOnly}
                overlay={menu}
                placement="bottomCenter"
                trigger={["click"]}
              >
                <div className="status-content-form-panel__type-dropdown">
                  {renderStatusDropdown()}
                </div>
              </Dropdown>
            </div>

            <span className="status-content-form-panel__down-arrow-wrapper">
              <ArrowDownIcon />
            </span>
          </div>

          <div className="status-content-form-panel__content-body">
            {children}
          </div>
        </div>

        {showDelete ? (
          <div className="status-content-form-panel__delete-wrapper">
            <Box component="span" display="block" onClick={deleteIconHandler}>
              <svg
                width="13"
                height="15"
                viewBox="0 0 13 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z"
                  fill="#999999"
                />
              </svg>
            </Box>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StatusContentFormPanel;
