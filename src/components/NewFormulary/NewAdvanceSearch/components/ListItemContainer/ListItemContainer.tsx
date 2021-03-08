import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Input,
} from "@material-ui/core";
import { Select } from "antd";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { connect } from "react-redux";

import "./ListItemContainer.scss";
const { Option } = Select;

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    listItemStatus: state?.advancedSearch?.listItemStatus,
  };
};

interface BorderType {
  className: string;
  showIcon: any;
}
interface Props {
  title: string;
  children?: any;
  nodeId: any;
  listItemStatus: any;
  onParentDataUpdated: (nodeId, isIncluded) => void;
}
interface State {}

class ListItemContainer extends Component<Props, State> {
  state = {
    selectedOpt: "",
    generalTitles: ["File Type", "Tier", "UM Filter"],
  };

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    let option = "exclude";
    if (this.props.listItemStatus) {
      console.log(
        "List item container. props list:" +
          JSON.stringify(this.props.listItemStatus)
      );
      option =
        this.props.listItemStatus["" + this.props.nodeId] === true
          ? "include"
          : "exclude";
    }
    this.setState({
      selectedOpt: option,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      "LIST CONTAINER: props received:" +
        JSON.stringify(nextProps.listItemStatus)
    );
    if (nextProps.listItemStatus) {
      let option = "exclude";
      option =
        nextProps.listItemStatus["" + this.props.nodeId] === true
          ? "include"
          : "exclude";
      console.log("Node is:" + this.props.nodeId + " Option:" + option);
      this.setState({
        selectedOpt: option,
      });
    }
  }

  onHandleSelected = (opt) => {
    console.log("[opt]", opt);
    this.props.onParentDataUpdated(this.props.nodeId, opt === "include");
    this.setState({ selectedOpt: opt });
  };

  addColor = (opt): BorderType => {
    switch (opt) {
      case "include":
        return {
          className: "green-border",
          showIcon: (
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.50009 0.619141C3.25244 0.619141 0.619141 3.25244 0.619141 6.50009C0.619141 9.74774 3.25244 12.381 6.50009 12.381C9.74774 12.381 12.381 9.74774 12.381 6.50009C12.381 3.25244 9.74774 0.619141 6.50009 0.619141ZM9.04019 4.57959L6.27562 8.41272C6.23698 8.46665 6.18604 8.51059 6.12703 8.54091C6.06802 8.57122 6.00263 8.58703 5.93628 8.58703C5.86994 8.58703 5.80455 8.57122 5.74554 8.54091C5.68652 8.51059 5.63559 8.46665 5.59695 8.41272L3.95999 6.14435C3.91011 6.07477 3.95999 5.97763 4.04532 5.97763H4.66098C4.79488 5.97763 4.92221 6.04196 5.00098 6.15222L5.93563 7.44918L7.99921 4.58747C8.07797 4.47852 8.20399 4.41288 8.3392 4.41288H8.95487C9.04019 4.41288 9.09008 4.51002 9.04019 4.57959Z"
                fill="#80C483"
              />
            </svg>
          ),
        };

      case "exclude":
        return {
          className: "red-border",
          showIcon: (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 0C2.69163 0 0 2.69163 0 6C0 9.30837 2.69163 12 6 12C9.30837 12 12 9.30837 12 6C12 2.69163 9.30837 0 6 0ZM8.1724 7.5199C8.21707 7.56234 8.25278 7.61328 8.27744 7.66973C8.30211 7.72618 8.31522 7.787 8.31601 7.8486C8.3168 7.9102 8.30525 7.97133 8.28204 8.0284C8.25883 8.08546 8.22443 8.13731 8.18087 8.18087C8.13731 8.22443 8.08546 8.25883 8.0284 8.28204C7.97133 8.30525 7.9102 8.3168 7.8486 8.31601C7.787 8.31522 7.72618 8.30211 7.66973 8.27744C7.61328 8.25278 7.56234 8.21707 7.5199 8.1724L6 6.65279L4.4801 8.1724C4.39284 8.25531 4.27664 8.30084 4.15629 8.2993C4.03594 8.29776 3.92095 8.24926 3.83584 8.16416C3.75074 8.07905 3.70224 7.96406 3.7007 7.84371C3.69916 7.72336 3.74469 7.60716 3.8276 7.5199L5.34721 6L3.8276 4.4801C3.74469 4.39284 3.69916 4.27664 3.7007 4.15629C3.70224 4.03594 3.75074 3.92095 3.83584 3.83584C3.92095 3.75074 4.03594 3.70224 4.15629 3.7007C4.27664 3.69916 4.39284 3.74469 4.4801 3.8276L6 5.34721L7.5199 3.8276C7.60716 3.74469 7.72336 3.69916 7.84371 3.7007C7.96406 3.70224 8.07905 3.75074 8.16416 3.83584C8.24926 3.92095 8.29776 4.03594 8.2993 4.15629C8.30084 4.27664 8.25531 4.39284 8.1724 4.4801L6.65279 6L8.1724 7.5199Z"
                fill="#E76262"
              />
            </svg>
          ),
        };
      default:
        return { className: "default_class", showIcon: null };
    }
    // if (opt === "") {
    //   return "";
    // } else if (opt == "include") {
    //   return "green-border";
    // } else return "";
  };

  render() {
    const { selectedOpt } = this.state;
    const borderColor: BorderType = this.state.generalTitles.includes(this.props.title) ? this.addColor("include") : this.addColor(selectedOpt);
    console.log(borderColor);
    return (
      <div className="ListItemContianer__root">
        <Card className={`__root-card ${borderColor.className}`}>
          {/* <CardHeader className="__card-header" title={this.props.title} /> */}
          {/* <Grid container className="__main-grid"> */}
          {/* <Grid item sm={1} className="__icon-grid"></Grid> */}
          {/* <Grid item className="__content-grid"> */}
          <CardContent className="__card-content">
            <div className="card-header__container">
              <span className="__header">
                <span className="__title">{this.props.title}</span>
                <span className="title_info">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33398 3.66634H7.66732V4.99967H6.33398V3.66634ZM6.33398 6.33301H7.66732V10.333H6.33398V6.33301ZM7.00065 0.333008C3.32065 0.333008 0.333984 3.31967 0.333984 6.99967C0.333984 10.6797 3.32065 13.6663 7.00065 13.6663C10.6807 13.6663 13.6673 10.6797 13.6673 6.99967C13.6673 3.31967 10.6807 0.333008 7.00065 0.333008ZM7.00065 12.333C4.06065 12.333 1.66732 9.93967 1.66732 6.99967C1.66732 4.05967 4.06065 1.66634 7.00065 1.66634C9.94065 1.66634 12.334 4.05967 12.334 6.99967C12.334 9.93967 9.94065 12.333 7.00065 12.333Z"
                      fill="#1D54B4"
                    />
                  </svg>
                </span>
              </span>
              {!this.state.generalTitles.includes(this.props.title) ? (
                <div className={`__icon-select-box `}>
                  {borderColor.showIcon}
                  {/* <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.50009 0.619141C3.25244 0.619141 0.619141 3.25244 0.619141 6.50009C0.619141 9.74774 3.25244 12.381 6.50009 12.381C9.74774 12.381 12.381 9.74774 12.381 6.50009C12.381 3.25244 9.74774 0.619141 6.50009 0.619141ZM9.04019 4.57959L6.27562 8.41272C6.23698 8.46665 6.18604 8.51059 6.12703 8.54091C6.06802 8.57122 6.00263 8.58703 5.93628 8.58703C5.86994 8.58703 5.80455 8.57122 5.74554 8.54091C5.68652 8.51059 5.63559 8.46665 5.59695 8.41272L3.95999 6.14435C3.91011 6.07477 3.95999 5.97763 4.04532 5.97763H4.66098C4.79488 5.97763 4.92221 6.04196 5.00098 6.15222L5.93563 7.44918L7.99921 4.58747C8.07797 4.47852 8.20399 4.41288 8.3392 4.41288H8.95487C9.04019 4.41288 9.09008 4.51002 9.04019 4.57959Z"
                    fill="#80C483"
                  />
                </svg> */}
                  <Select
                    size="small"
                    className="__select-box"
                    value={this.state.selectedOpt}
                    suffixIcon={
                      <svg
                        width="6"
                        height="3"
                        viewBox="0 0 6 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.403717 0H5.59628C5.9555 0 6.13512 0.382449 5.88084 0.606582L3.28556 2.89594C3.12815 3.03469 2.87185 3.03469 2.71444 2.89594L0.119165 0.606582C-0.135116 0.382449 0.0444952 0 0.403717 0Z"
                          fill="#707683"
                        />
                      </svg>
                    }
                    onSelect={this.onHandleSelected}
                  >
                    <Option value="include">include</Option>
                    <Option value="exclude">exclude</Option>
                  </Select>
                </div>
              ) : null}
            </div>

            <div className="dynamic-contenet">{this.props.children}</div>
          </CardContent>
          {/* </Grid> */}
          {/* <Grid item sm={1}></Grid> */}
          {/* </Grid> */}
        </Card>
        {/* <svg
          width="13"
          height="15"
          viewBox="0 0 13 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.75065 13.0417C1.75065 13.9125 2.46315 14.625 3.33398 14.625H9.66732C10.5382 14.625 11.2507 13.9125 11.2507 13.0417V3.54167H1.75065V13.0417ZM12.0423 1.16667H9.27148L8.47982 0.375H4.52148L3.72982 1.16667H0.958984V2.75H12.0423V1.16667Z"
            fill="#C4C4C4"
          />
        </svg> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemContainer);
