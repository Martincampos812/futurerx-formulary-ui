/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "../AuthGridModel.scss";

//components
// import AuthMemberEditInfo from "../AuthandOverrideEditModeInfo/AuthEditMode";
import AuthMemberEditRest from "../AuthandOverrideEditModeInfo/AuthEditModeRest";
import AuthMemberEditOver from "../AuthandOverrideEditModeInfo/AuthEditModeOver";
// import AuthMemberEditInfoAdminClinical from "../AuthandOverrideEditModeInfo/AuthEditModeAdminClinical";
// import AuthMemberEditInfoAdministrative from "../AuthandOverrideEditModeInfo/AuthEditModeAdminAdministrative";
// import AuthMemberEditInfoRest from "../AuthandOverrideEditModeInfo/AuthEditModeOverRest";
// import AuthMemberEditInfoClinical from "../AuthandOverrideEditModeInfo/AuthEditModeOverClinical";
// import AuthMemberEditInfoOverrideAdmin from "../AuthandOverrideEditModeInfo/AuthEditModeOverAdministrative";
import { TabInfo } from "../../../models/tab.model";
import { getClaimModalFolderTabData } from "../../../mocks/ClaimGridModelMock";
import FrxDialogPopup from "../../shared/FrxDialogPopup/FrxDialogPopup";

export interface ClaimsGridModelProps {
  data: any;
  isOpen: boolean;
  isEditCopy: boolean;
  onClose: () => void;
}

export interface ClaimsGridModelState {
  // isCaimsModelOpen: boolean;
  // folderTab: any;
}

class AuthGridEditModel extends React.Component<
  ClaimsGridModelProps,
  ClaimsGridModelState
  > {
  state = {
    folderTab: getClaimModalFolderTabData(),
    activeTabIndex: 0,
    popUpClose: false,
  };

  componentDidMount() {
    console.log(this.props.data);
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
  handleClosePopupAfter = () => {
    console.log("close", this.props.isOpen);
    this.props.onClose();
  };

  render() {
    const claimData = this.props.data;
    console.log(claimData);
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
                {this.props.isEditCopy ? (
                  <>
                    <label htmlFor="Auth ID:">New {claimData.recordType}</label>
                    {/* <span>{claimData.authOverrideId}</span> */}
                  </>
                ) :
                  (
                    <>
                      <label htmlFor="Auth ID:">{claimData.recordType} ID:</label>
                      <span>{claimData.authOverrideId}</span>
                    </>
                  )
                }
              </div>
              <div className="auth-grid-model-root__content--header__sequence sequencespace">
                <label>Date Created</label>
                <span>MM/DD/YYYY</span>
              </div>
              <div className="auth-grid-model-root__content--header__icons">
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
              {claimData && claimData.recordType == "Authorization" ? (
                <AuthMemberEditRest
                  claimData={claimData}
                  parentFn={() => this.handleClosePopupAfter()}
                />
              ) : (
                  ""
                )}
              {claimData && claimData.recordType == "Override" ? (
                <AuthMemberEditOver
                  claimData={claimData}
                  parentFn={() => this.handleClosePopupAfter()}
                />
              ) : (
                  ""
                )}

              <div className="auth-grid-model-root__content--data__folder-tab"></div>
            </div>
          </div>
        </div>
      </FrxDialogPopup>
    );
  }
}

export default AuthGridEditModel;
