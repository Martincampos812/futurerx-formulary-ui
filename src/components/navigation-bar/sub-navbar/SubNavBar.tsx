import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Select } from "antd";

import { Grid, Container } from "@material-ui/core";
import AdvanceSearchContainer from "../../advance-search/AdvanceSearchContainer";
import DialogPopup from "../../shared/FrxDialogPopup/FrxDialogPopup";

import "./SubNavBar.scss";
import FrxLoader from "../../shared/FrxLoader/FrxLoader";

const { Option } = Select;
interface Props {
  history: any;
}
interface State {}

class SubNavBar extends Component<Props, State> {
  state = {
    advanceSearchPopUpOpen: false,
    searchType: "member"
  };

  handleAdvanceSearchPopUp = () => {
    this.setState({
      advanceSearchPopUpOpen: !this.state.advanceSearchPopUpOpen
    });
  };

  handleSearch = () => {
    console.log("search router histore ", this.props, this.state.searchType);
    setTimeout(() => {
      if (this.state.searchType !== "") {
        // window.location.pathname = `/search/${this.state.searchType}`
        console.log(
          "search router histore ",
          this.props,
          this.state.searchType
        );
        this.handleAdvanceSearchPopUp();
        this.props.history.push(`/search/${this.state.searchType}`);
      }
    }, 300);
  };
  render() {
    return (
      <div className="sub-navbar">
        <AppBar position="static">
          <Toolbar>
            <Grid container>
              {/* <Grid item sm="auto" /> */}
              <Grid item sm={10}>
                <span className="subNavBar-icon-select-dropdown-container">
                  <svg
                    width="11"
                    height="9"
                    viewBox="0 0 11 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.42998 5.18394V8.55105C9.42998 8.67264 9.38677 8.77786 9.30034 8.86672C9.21392 8.95557 9.11158 9 8.99331 9H6.37333V6.30631H4.62667V9H2.00669C1.88842 9 1.78608 8.95557 1.69966 8.86672C1.61323 8.77786 1.57002 8.67264 1.57002 8.55105V5.18394C1.57002 5.17927 1.57116 5.17225 1.57343 5.1629C1.57571 5.15355 1.57684 5.14653 1.57684 5.14186L5.5 1.81684L9.42316 5.14186C9.4277 5.15121 9.42998 5.16524 9.42998 5.18394ZM10.9515 4.69992L10.5285 5.21902C10.4921 5.26111 10.4443 5.28683 10.3852 5.29618H10.3647C10.3056 5.29618 10.2578 5.27981 10.2214 5.24708L5.5 1.19953L0.778567 5.24708C0.723983 5.28449 0.6694 5.30086 0.614817 5.29618C0.555686 5.28683 0.507926 5.26111 0.471537 5.21902L0.0485183 4.69992C0.0121296 4.65316 -0.00379049 4.59821 0.000758098 4.53507C0.00530669 4.47194 0.0303239 4.42167 0.0758098 4.38426L4.98146 0.182385C5.12702 0.060795 5.29986 0 5.5 0C5.70014 0 5.87298 0.060795 6.01854 0.182385L7.68332 1.61341V0.245518C7.68332 0.180047 7.70379 0.126267 7.74473 0.0841777C7.78567 0.0420889 7.83797 0.0210444 7.90165 0.0210444H9.21165C9.27533 0.0210444 9.32764 0.0420889 9.36857 0.0841777C9.40951 0.126267 9.42998 0.180047 9.42998 0.245518V3.10756L10.9242 4.38426C10.9697 4.42167 10.9947 4.47194 10.9992 4.53507C11.0038 4.59821 10.9879 4.65316 10.9515 4.69992Z"
                      fill="white"
                    />
                  </svg>
                  <Select
                    // value={serviceDropdown}
                    // style={defaultSelectStyle}
                    placeholder="My Home"
                    // onChange={handleChange}
                    // onClick={onCaretChange}
                    size="large"
                    className="subBar-dropdown-container"
                    suffixIcon={
                      <>
                        <svg
                          className="ant-select-suffix"
                          width="9"
                          height="5"
                          viewBox="0 0 9 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          // style={{
                          //   display: !serviceDropdownCaret ? "block" : "none",
                          // }}
                        >
                          <path
                            d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                            fill="white"
                          />
                        </svg>
                        {/* <svg
                      // style={{
                      //   display: !serviceDropdownCaret ? "none" : "block",
                      // }}
                      width="6"
                      height="3"
                      viewBox="0 0 6 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.79875 3H0.20125C0.0333594 3 -0.0603867 2.85282 0.0435863 2.75234L2.84234 0.0578451C2.92245 -0.0192819 3.0767 -0.0192819 3.15766 0.0578451L5.95641 2.75234C6.06039 2.85282 5.96664 3 5.79875 3Z"
                        fill="#999999"
                      />
                    </svg> */}
                      </>
                    }
                    dropdownClassName="subNavBar-select-dropdown"
                  >
                    <Option
                      style={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "11px"
                      }}
                      className="antd-select-dropdown-options"
                      value=""
                    >
                      options
                    </Option>
                  </Select>
                </span>
                <span className="subNavBar-icon-select-dropdown-container">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.36 1.641L3.0005 0L3.719 0.7195L1.719 2.7195L1.3595 3.063L1 2.7195L0 1.7195L0.7195 0.9995L1.36 1.641ZM5.36 1.8595V0.8595H11.86V1.8595H5.36ZM1.36 5.6405L3.0005 4L3.7195 4.719L1.7195 6.719L1.36 7.0625L1.0005 6.719L0.000499964 5.719L0.7195 5.0005L1.36 5.6405ZM5.36 5.8595V4.8595H11.86V5.8595H5.36ZM5.36 9.8595V8.8595H11.86V9.8595H5.36ZM2 10C2.55228 10 3 9.55229 3 9C3 8.44771 2.55228 8 2 8C1.44772 8 1 8.44771 1 9C1 9.55229 1.44772 10 2 10Z"
                      fill="white"
                    />
                  </svg>

                  <Select
                    // value={serviceDropdown}
                    // style={defaultSelectStyle}
                    placeholder="Tasks"
                    // onChange={handleChange}
                    // onClick={onCaretChange}
                    size="large"
                    className=" subBar-dropdown-container"
                    suffixIcon={
                      <>
                        <svg
                          className="ant-select-suffix"
                          width="9"
                          height="5"
                          viewBox="0 0 9 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          // style={{
                          //   display: !serviceDropdownCaret ? "block" : "none",
                          // }}
                        >
                          <path
                            d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                            fill="white"
                          />
                        </svg>
                        {/* <svg
                      // style={{
                      //   display: !serviceDropdownCaret ? "none" : "block",
                      // }}
                      width="6"
                      height="3"
                      viewBox="0 0 6 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.79875 3H0.20125C0.0333594 3 -0.0603867 2.85282 0.0435863 2.75234L2.84234 0.0578451C2.92245 -0.0192819 3.0767 -0.0192819 3.15766 0.0578451L5.95641 2.75234C6.06039 2.85282 5.96664 3 5.79875 3Z"
                        fill="#999999"
                      />
                    </svg> */}
                      </>
                    }
                    dropdownClassName="subNavBar-select-dropdown"
                  >
                    <Option
                      style={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "11px"
                      }}
                      className="antd-select-dropdown-options"
                      value=""
                    >
                      options
                    </Option>
                  </Select>
                </span>
                <span className="subNavBar-icon-select-dropdown-container">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 0H2.33333L0 6.6H2.33333L1.16667 12L6.41667 4.2H3.50292L7 0Z"
                      fill="white"
                    />
                  </svg>

                  <Select
                    // value={serviceDropdown}
                    // style={defaultSelectStyle}
                    placeholder="Quick Actions"
                    // onChange={handleChange}
                    // onClick={onCaretChange}
                    size="large"
                    className="subBar-dropdown-container"
                    suffixIcon={
                      <>
                        <svg
                          className="ant-select-suffix"
                          width="9"
                          height="5"
                          viewBox="0 0 9 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          // style={{
                          //   display: !serviceDropdownCaret ? "block" : "none",
                          // }}
                        >
                          <path
                            d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                            fill="white"
                          />
                        </svg>
                        {/* <svg
                      // style={{
                      //   display: !serviceDropdownCaret ? "none" : "block",
                      // }}
                      width="6"
                      height="3"
                      viewBox="0 0 6 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.79875 3H0.20125C0.0333594 3 -0.0603867 2.85282 0.0435863 2.75234L2.84234 0.0578451C2.92245 -0.0192819 3.0767 -0.0192819 3.15766 0.0578451L5.95641 2.75234C6.06039 2.85282 5.96664 3 5.79875 3Z"
                        fill="#999999"
                      />
                    </svg> */}
                      </>
                    }
                    dropdownClassName="subNavBar-select-dropdown"
                  >
                    <Option
                      style={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "11px"
                      }}
                      className="antd-select-dropdown-options"
                      value=""
                    >
                      options
                    </Option>
                  </Select>
                </span>
                <span className="subNavBar-icon-select-dropdown-container">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6279 1.99438C11.2833 1.64733 10.8735 1.37182 10.422 1.18368C9.97058 0.995551 9.48639 0.898507 8.9973 0.898132C8.0722 0.898284 7.18087 1.2458 6.4998 1.87188C5.81881 1.2457 4.92744 0.898161 4.0023 0.898132C3.51264 0.898642 3.02791 0.995982 2.57602 1.18455C2.12412 1.37312 1.71397 1.64919 1.36918 1.99688C-0.101445 3.47376 -0.10082 5.78376 1.37043 7.25438L6.4998 12.3838L11.6292 7.25438C13.1004 5.78376 13.1011 3.47376 11.6279 1.99438Z"
                      fill="white"
                    />
                  </svg>

                  <Select
                    // value={serviceDropdown}
                    // style={defaultSelectStyle}
                    placeholder="My Favorites"
                    // onChange={handleChange}
                    // onClick={onCaretChange}
                    size="large"
                    className=" subBar-dropdown-container"
                    suffixIcon={
                      <>
                        <svg
                          className="ant-select-suffix"
                          width="9"
                          height="5"
                          viewBox="0 0 9 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          // style={{
                          //   display: !serviceDropdownCaret ? "block" : "none",
                          // }}
                        >
                          <path
                            d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                            fill="white"
                          />
                        </svg>
                        {/* <svg
                      // style={{
                      //   display: !serviceDropdownCaret ? "none" : "block",
                      // }}
                      width="6"
                      height="3"
                      viewBox="0 0 6 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.79875 3H0.20125C0.0333594 3 -0.0603867 2.85282 0.0435863 2.75234L2.84234 0.0578451C2.92245 -0.0192819 3.0767 -0.0192819 3.15766 0.0578451L5.95641 2.75234C6.06039 2.85282 5.96664 3 5.79875 3Z"
                        fill="#999999"
                      />
                    </svg> */}
                      </>
                    }
                    dropdownClassName="subNavBar-select-dropdown"
                  >
                    <Option
                      style={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "11px"
                      }}
                      className="antd-select-dropdown-options"
                      value=""
                    >
                      options
                    </Option>
                  </Select>
                </span>
                <span className="subNavBar-icon-select-dropdown-container">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.269762 7.2718L1.35309 9.14597C1.42502 9.27028 1.54337 9.36094 1.68212 9.39802C1.82087 9.43509 1.96867 9.41555 2.09301 9.34368L2.84918 8.90709C3.16334 9.15464 3.51055 9.35776 3.87564 9.50943V10.375C3.87564 10.5187 3.9327 10.6564 4.03429 10.758C4.13587 10.8596 4.27364 10.9167 4.4173 10.9167H6.58397C6.72763 10.9167 6.8654 10.8596 6.96699 10.758C7.06857 10.6564 7.12564 10.5187 7.12564 10.375V9.50943C7.49358 9.35624 7.83891 9.15359 8.1521 8.90709L8.90826 9.34368C9.16664 9.49264 9.49922 9.40326 9.64818 9.14597L10.7315 7.2718C10.8028 7.14733 10.822 6.99972 10.785 6.86114C10.748 6.72255 10.6577 6.60421 10.5338 6.53189L9.79064 6.10234C9.8487 5.70286 9.84834 5.29705 9.78955 4.89768L10.5327 4.46814C10.7906 4.31918 10.8799 3.98605 10.7304 3.72822L9.6471 1.85405C9.57517 1.72974 9.45682 1.63908 9.31807 1.602C9.17932 1.56493 9.03152 1.58447 8.90718 1.65634L8.15101 2.09293C7.83822 1.84613 7.49303 1.64346 7.1251 1.49059V0.62501C7.1251 0.481351 7.06803 0.343576 6.96644 0.241994C6.86486 0.140412 6.72709 0.0833435 6.58343 0.0833435H4.41676C4.2731 0.0833435 4.13533 0.140412 4.03375 0.241994C3.93216 0.343576 3.87509 0.481351 3.87509 0.62501V1.49059C3.50715 1.64378 3.16182 1.84643 2.84864 2.09293L2.09301 1.65634C2.03146 1.62068 1.96348 1.59751 1.89297 1.58815C1.82245 1.57879 1.75078 1.58342 1.68206 1.60178C1.61334 1.62015 1.54891 1.65188 1.49246 1.69517C1.43601 1.73845 1.38866 1.79244 1.35309 1.85405L0.269762 3.72822C0.198472 3.8527 0.179249 4.0003 0.216279 4.13888C0.253309 4.27747 0.343593 4.39581 0.46747 4.46814L1.21064 4.89768C1.15221 5.29711 1.15221 5.70291 1.21064 6.10234L0.46747 6.53189C0.209637 6.68084 0.120262 7.01397 0.269762 7.2718ZM5.5001 3.33334C6.69501 3.33334 7.66676 4.30509 7.66676 5.50001C7.66676 6.69493 6.69501 7.66668 5.5001 7.66668C4.30518 7.66668 3.33343 6.69493 3.33343 5.50001C3.33343 4.30509 4.30518 3.33334 5.5001 3.33334Z"
                      fill="white"
                    />
                  </svg>

                  <Select
                    // value={serviceDropdown}
                    // style={defaultSelectStyle}
                    placeholder="Setup"
                    // onChange={handleChange}
                    // onClick={onCaretChange}
                    size="large"
                    className=" subBar-dropdown-container"
                    suffixIcon={
                      <>
                        <svg
                          className="ant-select-suffix"
                          width="9"
                          height="5"
                          viewBox="0 0 9 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          // style={{
                          //   display: !serviceDropdownCaret ? "block" : "none",
                          // }}
                        >
                          <path
                            d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                            fill="white"
                          />
                        </svg>
                        {/* <svg
                      // style={{
                      //   display: !serviceDropdownCaret ? "none" : "block",
                      // }}
                      width="6"
                      height="3"
                      viewBox="0 0 6 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.79875 3H0.20125C0.0333594 3 -0.0603867 2.85282 0.0435863 2.75234L2.84234 0.0578451C2.92245 -0.0192819 3.0767 -0.0192819 3.15766 0.0578451L5.95641 2.75234C6.06039 2.85282 5.96664 3 5.79875 3Z"
                        fill="#999999"
                      />
                    </svg> */}
                      </>
                    }
                    dropdownClassName="subNavBar-select-dropdown"
                  >
                    <Option
                      style={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "11px"
                      }}
                      className="antd-select-dropdown-options"
                      value=""
                    >
                      options
                    </Option>
                  </Select>
                </span>
              </Grid>
              <Grid
                item
                container
                sm={2}
                justify="flex-end"
                alignContent="center"
                className="subNavBar-search-icon"
              >
                <svg
                  onClick={this.handleAdvanceSearchPopUp}
                  className="subNavBar-search-icons"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8368 10.3748L9.49991 8.03828C9.39444 7.93282 9.25146 7.87423 9.10145 7.87423H8.71939C9.36631 7.04697 9.75071 6.00644 9.75071 4.87452C9.75071 2.18182 7.56852 0 4.87536 0C2.18219 0 0 2.18182 0 4.87452C0 7.56723 2.18219 9.74905 4.87536 9.74905C6.00747 9.74905 7.04817 9.36471 7.87558 8.7179V9.09989C7.87558 9.24988 7.93417 9.39283 8.03965 9.49829L10.3765 11.8348C10.5969 12.0551 10.9531 12.0551 11.1711 11.8348L11.8345 11.1716C12.0548 10.9513 12.0548 10.5951 11.8368 10.3748ZM4.87536 7.87423C3.2182 7.87423 1.87514 6.53374 1.87514 4.87452C1.87514 3.21765 3.21586 1.87482 4.87536 1.87482C6.53251 1.87482 7.87558 3.21531 7.87558 4.87452C7.87558 6.53139 6.53485 7.87423 4.87536 7.87423Z"
                    fill="white"
                  />
                </svg>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <DialogPopup
          className="frx-advance-serach"
          open={this.state.advanceSearchPopUpOpen}
          positiveActionText="Search"
          negativeActionText="Cancel"
          title="Advanced Search"
          showCloseIcon
          showActions={true}
          handleClose={this.handleAdvanceSearchPopUp}
          handleAction={this.handleSearch}
        >
          <AdvanceSearchContainer
            onSelect={(c: any) => {
              console.log("sub nav ", c);
              this.setState({ searchType: c });
            }}
          />
        </DialogPopup>
      </div>
    );
  }
}
export default SubNavBar;
