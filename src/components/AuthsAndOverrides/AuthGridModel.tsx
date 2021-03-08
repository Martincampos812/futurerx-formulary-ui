/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./AuthGridModel.scss";

//components
import CustomSelect from "../shared/Frx-components/dropdown/DropDown";
import AuthMemberInfo from "../authmemberinfo/AuthMemberInfo";
import ClaimDetail from "../ClaimsGridModel/Components/ClaimDetail/ClaimDetail";
import ClaimTransaction from "../ClaimsGridModel/Components/ClaimTransaction/ClaimTransaction";
import ClaimsHistory from "../ClaimsGridModel/Components/ClaimsHistory/ClaimsHistory";
import AuthMemberInfoData from "../authmemberinfodata/AuthMemberInfodata";
import FrxFolderTabs from "../shared/FrxTabs/FrxTabs";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { ReactComponent as IconAudit } from "../../assets/icons/IconAudit.svg";
import { TabInfo } from "../../models/tab.model";
import { getClaimModalFolderTabData } from "../../mocks/ClaimGridModelMock";
import AuthClinical from "../AuthClinical/AuthClinical";
import AuthAdminInfo from "../authmemberinfodata/AuthAdminInfodata";
import OverRideAdminInfo from "../authmemberinfodata/OverrideAdminInfodata";
import OverRideRestInfo from "../authmemberinfodata/OverriderestInfodata";
import OverRideClinicalInfo from "../authmemberinfodata/Overrideclinicalinfodata";
import AuthCommonDateInfo from "../authcommondateInfo/AuthCommonDateInfodata";
import AuthRestInfo from "../authmemberinfodata/AuthRestMemberInfodata";
import FrxDialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";

export interface ClaimsGridModelProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
  callBacks?: any;
}

export interface ClaimsGridModelState {
  // isCaimsModelOpen: boolean;
  // folderTab: any;
}

class AuthGridModel extends React.Component<
  ClaimsGridModelProps,
  ClaimsGridModelState
  > {
  state = {
    folderTab: getClaimModalFolderTabData(),
    activeTabIndex: 0,
    popUpClose: false,
  };

  componentDidMount() {
    console.log(this.props.callBacks);
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    const folderTabs = this.state.folderTab.map(
      (tab: TabInfo, index: number) => {
        if (index === selectedTabIndex) {
          activeTabIndex = index;
        }
        return tab;
      }
    );
    this.setState({ folderTabs, activeTabIndex });
  };

  handleClosePopup = () => {
    // this.setState({
    //   isOpen: this.props.isOpen
    // })
    console.log("close", this.props.isOpen);
    this.props.onClose();
  };

  render() {
    const claimData = this.props.data;
    // console.log(claimData);
    return (
      <FrxDialogPopup
        positiveActionText=""
        negativeActionText="Close"
        title=""
        handleClose={this.handleClosePopup}
        handleAction={() => { }}
        open={!this.state.popUpClose}
        showActions={false}
        showCloseIcon={false}
        className="authPopup"
        height="100%"
        width="100%"
      >
        {" "}
        <div className="auth-grid-model-root">
          <div className="auth-grid-model-root__content">
            {/* Member Info */}
            <div className="auth-grid-model-root__content--header">
              <div className="auth-grid-model-root__content--header__claimid">
                <label htmlFor="Auth ID:">{claimData.recordType} ID:</label>
                <span>{claimData.authOverrideId}</span>
              </div>
              <div className="auth-grid-model-root__content--header__sequence">
                <label>Date Created</label>
                <span>MM/DD/YYYY</span>
              </div>
              <div className="auth-grid-model-root__content--header__icons">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icons"
                  onClick={() => {
                    this.handleClosePopup();
                    this.props.callBacks?.copy(this.props.data)
                  }}
                >
                  <path
                    d="M13.5938 0C14.3704 0 15 0.62959 15 1.40625V9.84375C15 10.6204 14.3704 11.25 13.5938 11.25H5.15625C4.37959 11.25 3.75 10.6204 3.75 9.84375V1.40625C3.75 0.62959 4.37959 0 5.15625 0H13.5938ZM5.15625 12.1875C3.86391 12.1875 2.8125 11.1361 2.8125 9.84375V3.75H1.40625C0.62959 3.75 0 4.37959 0 5.15625V13.5938C0 14.3704 0.62959 15 1.40625 15H9.84375C10.6204 15 11.25 14.3704 11.25 13.5938V12.1875H5.15625Z"
                    fill="#2055B5"
                  />
                </svg>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icons"
                  onClick={() => {
                    this.handleClosePopup();
                    this.props.callBacks?.edit(this.props.data)
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.9461 0L13 2.05393L11.4342 3.6204L9.3803 1.56647L10.9461 0ZM3.42322 9.57679H5.47715L10.4662 4.58779L8.41222 2.53386L3.42322 7.52286V9.57679ZM3.53139 11.6307H10.9543V7.06551L12.3236 5.69622V11.6307C12.3236 11.9939 12.1793 12.3422 11.9225 12.5989C11.6657 12.8557 11.3175 13 10.9543 13H1.36929C0.614125 13 0 12.3866 0 11.6307V2.0457C0 1.28985 0.614125 0.676412 1.36929 0.676412H7.42633L6.05704 2.0457H1.36929V11.6307H3.40884C3.4199 11.631 3.4308 11.6326 3.44162 11.6341C3.45358 11.6359 3.46544 11.6376 3.47731 11.6376C3.48621 11.6376 3.49528 11.6358 3.50435 11.6341C3.51342 11.6324 3.52249 11.6307 3.53139 11.6307Z"
                    fill="#2055B5"
                  />
                </svg>

                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icons"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 0C5.44772 0 5 0.447715 5 1V4C5 4.55228 5.44772 5 6 5H7V9H1C0.447715 9 0 9.44771 0 10V11C0 11.5523 0.447715 12 1 12H15C15.5523 12 16 11.5523 16 11V10C16 9.44772 15.5523 9 15 9H9V5H10C10.5523 5 11 4.55228 11 4V1C11 0.447715 10.5523 0 10 0H6ZM1 13.5C1 13.2239 1.22386 13 1.5 13H14.5C14.7761 13 15 13.2239 15 13.5C15 13.7761 14.7761 14 14.5 14H1.5C1.22386 14 1 13.7761 1 13.5Z"
                    fill="#2055B5"
                  />
                </svg>

                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => this.handleClosePopup()}
                >
                  <path
                    d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99419 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600273 0.000414325C0.460452 0.00581497 0.32782 0.0637771 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.352901 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99419 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
                    fill="#666666"
                  />
                </svg>
              </div>
            </div>

            <div className="auth-grid-model-root__content--data scroll-bar">
              <AuthMemberInfo claimData={claimData} />
              <div className="auth-grid-model-root__content--data__folder-tab">
                {/* <AuthMemberInfoData claimData={claimData} /> */}
                {/* {claimData && crecordType?} */}
                {claimData.recordType == "Authorization" &&
                  claimData.overrideType === "Restrictive" ? (
                    <AuthRestInfo claimData={claimData} />
                  ) : (
                    ""
                  )}
                {claimData.recordType == "Authorization" &&
                  claimData.overrideType === "Clinical" ? (
                    <div>
                      <AuthAdminInfo claimData={claimData} />
                      <AuthClinical claimData={claimData} />
                    </div>
                  ) : (
                    ""
                  )}
                {claimData.recordType === "Authorization" &&
                  claimData.overrideType === "Administrative" ? (
                    <div>
                      <AuthAdminInfo claimData={claimData} />
                      <AuthClinical claimData={claimData} />
                    </div>
                  ) : (
                    ""
                  )}
                {claimData.recordType === "Override" &&
                  claimData.overrideType === "Administrative" ? (
                    <div>
                      <OverRideAdminInfo claimData={claimData} />
                      <AuthClinical claimData={claimData} />
                    </div>
                  ) : (
                    ""
                  )}

                {claimData.recordType === "Override" &&
                  claimData.overrideType === "Restrictive" ? (
                    <OverRideRestInfo claimData={claimData} />
                  ) : (
                    ""
                  )}
                {claimData.recordType === "Override" &&
                  claimData.overrideType === "Clinical" ? (
                    <div>
                      <OverRideClinicalInfo claimData={claimData} />
                      <AuthClinical claimData={claimData} />
                    </div>
                  ) : (
                    ""
                  )}
                <AuthCommonDateInfo claimData={claimData} />
              </div>
            </div>
          </div>
        </div>
      </FrxDialogPopup>
    );
  }
}

export default AuthGridModel;
