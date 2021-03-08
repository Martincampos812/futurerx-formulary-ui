import React, {Component} from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import {Avatar} from "@material-ui/core";
//import Logo from "../../assets/icons/RemedyOne.svg";
import Logo from "../../assets/icons/FRX1.jpg";
import Logo_f from "../../assets/icons/_branding.png";

import NavIcon from "../../assets/icons/_avatar.png";
import DropDown from "../shared/Frx-components/dropdown/DropDown";
import {Container} from "@material-ui/core";

import SubNavBar from "./sub-navbar/SubNavBar";

import "./NavBar.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

interface Props extends RouteComponentProps{
  history: any;
}


interface State {}

class NavBar extends Component<Props, State> {
  state = {};

  render() {
    const { history } = this.props;
    let avatarIcon = (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12.5"
          cy="12.5"
          r="12"
          stroke="#CCCCCC"
          stroke-dasharray="2 2"
        />
      </svg>
    );
    return (
      // <Grid container>
      //   <Grid item >
      <React.Fragment>
        <div className="main-nav-bar">
          <AppBar position="static">
            <Toolbar>
              <div className="brand-logo">
                <img src={Logo} alt="company-log" />
              </div>
              <div
                className="navbar-menu-container"
                // style={{border: "1px solid red"}}
              >
                <Container className="navbar-item-grid">
                  <svg
                    className="navbar-item"
                    width="14.9"
                    height="16"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.0004 12.45C14.3511 12.9924 14.7732 13.4852 15.2554 13.915C15.3087 13.9619 15.3515 14.0195 15.3808 14.0842C15.4101 14.1489 15.4253 14.219 15.4254 14.29V14.97C15.4254 15.1026 15.3727 15.2298 15.2789 15.3236C15.1852 15.4173 15.058 15.47 14.9254 15.47H1.02539C0.892783 15.47 0.765605 15.4173 0.671837 15.3236C0.578069 15.2298 0.525391 15.1026 0.525391 14.97V14.29C0.525481 14.219 0.540687 14.1489 0.569999 14.0842C0.599311 14.0195 0.642056 13.9619 0.695391 13.915C1.17049 13.4839 1.58583 12.9912 1.93039 12.45C2.31328 11.7013 2.54277 10.8836 2.60539 10.045V7.57501C2.60276 6.26783 3.07393 5.00399 3.93165 4.01757C4.78938 3.03114 5.97552 2.38898 7.27039 2.21001V1.55501C7.27039 1.37798 7.34072 1.2082 7.4659 1.08302C7.59108 0.957838 7.76086 0.887512 7.93789 0.887512C8.11492 0.887512 8.2847 0.957838 8.40988 1.08302C8.53506 1.2082 8.60539 1.37798 8.60539 1.55501V2.20001C9.91197 2.36694 11.1126 3.00525 11.9818 3.995C12.8509 4.98475 13.3287 6.25782 13.3254 7.57501V10.045C13.388 10.8836 13.6175 11.7013 14.0004 12.45ZM2.78539 12.97C2.44019 13.517 2.0306 14.0206 1.56539 14.47H14.3904C13.9252 14.0206 13.5156 13.517 13.1704 12.97C12.6881 12.0658 12.4067 11.068 12.3454 10.045V7.57501C12.3652 6.98903 12.2669 6.40505 12.0564 5.85785C11.8458 5.31064 11.5273 4.8114 11.1198 4.38986C10.7122 3.96832 10.2241 3.6331 9.6843 3.40415C9.14453 3.1752 8.56421 3.05722 7.97789 3.05722C7.39157 3.05722 6.81125 3.1752 6.27148 3.40415C5.73171 3.6331 5.24353 3.96832 4.83601 4.38986C4.4285 4.8114 4.10997 5.31064 3.89941 5.85785C3.68885 6.40505 3.59056 6.98903 3.61039 7.57501V10.045C3.54911 11.068 3.2677 12.0658 2.78539 12.97ZM8.8537 16.8057C8.61762 17.0143 8.31537 17.1327 8.0004 17.14C7.67681 17.1447 7.36254 17.0317 7.11605 16.822C6.86956 16.6123 6.70764 16.3202 6.6604 16H9.2904C9.24446 16.3117 9.08978 16.5971 8.8537 16.8057Z"
                      fill="#CCCCCC"
                    />
                  </svg>

                  <Divider orientation="vertical" className="navbar-item" />
                  <AccountCircleIcon className="empty-avatar navbar-item"></AccountCircleIcon>

                  {/* <Avatar
                    className="navbar-item"
                    component="span"
                    style={{height: "25px", width: "25px"}}
                    alt="NavIcon"
                    src={NavIcon}
                  /> */}

                  <DropDown
                    placeholder="Preeti Patel"
                    options={["Select ", "Preeti Patel"]}
                  />
                </Container>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <SubNavBar history={history} />
      </React.Fragment>
      // </Grid>
      // </Grid>
    );
  }
}

export default NavBar;
