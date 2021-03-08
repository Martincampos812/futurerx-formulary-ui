/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./ClaimsGridModel.scss";

// antd
import { Button, Table, Tag, Space } from "antd";

//components
import CustomSelect from "../shared/Frx-components/dropdown/DropDown";
import MemberInfo from "./Components/MemberInfo";
import ClaimDetail from "./Components/ClaimDetail/ClaimDetail";
import ClaimTransaction from "./Components/ClaimTransaction/ClaimTransaction";
import ClaimsHistory from "./Components/ClaimsHistory/ClaimsHistory";
import FrxFolderTabs from "../shared/FrxTabs/FrxTabs";
import FrxDialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import { TabInfo } from "../../models/tab.model";
import { getClaimModalFolderTabData, claimDetailData } from "../../mocks/ClaimGridModelMock";
import NewTestClaim from "../member/NewTestClaim";
import AuthEditModeBlank from "../AuthsAndOverrides/AuthsAndOverridesEditMode/AuthGridModel";
import AuthEditModeOverBlank from "../AuthsAndOverrides/AuthandOverrideEditModeInfo/AuthEditModeOverBlank";

export interface ClaimsGridModelProps {
  data: any;
  isOpen: boolean;
  isTestClaim?: boolean;
  onClose: () => void;
}

export interface ClaimsGridModelState {
  // isCaimsModelOpen: boolean;
  // folderTab: any;
}

class ClaimsGridModel extends React.Component<
  ClaimsGridModelProps,
  ClaimsGridModelState
  > {
  state = {
    folderTab: getClaimModalFolderTabData(),
    activeTabIndex: 0,
    popUpClose: false,
    testClaimPopup : false,
    authType: "",
    authText: "",
    isOpen: false
  };

  componentDidMount() {
    console.log(this.props);
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

  handleTestClaimPopUp = () => {
    this.setState({
      testClaimPopup: !this.state.testClaimPopup
    })
  }

  onButtonClick = (e) => {
    // console.log(e);
    this.setState({
      isOpen: true,
      authType: e,
      authText: e == "auth" ? "NEW AUTHORIZATION" : "NEW OVERRIDE",
    });
  };


  handleOverrideClosePopup = () => {
    this.setState({
      isOpen: false,
      authType: "",
      authText: "",
    });
  };

  handleClosePopupAfter = () => {
    this.setState({
      isOpen: false,
      authType: "",
      authText: "",
    });
  };

  render() {
    const claimData = this.props.data;
    const {authType, authText} = this.state;
    return (
      <div className="claims-grid-model-root">
        <div className="claims-grid-model-root__content">
          {/* Member Info */}
          <div className="claims-grid-model-root__content--header">
            <div className="claims-grid-model-root__content--header__claimid">
              {(this.props.isTestClaim) ? (
                <label htmlFor="Claim ID:">Test Claim ID:</label>
              ) : (
                  <label htmlFor="Claim ID:">Claim ID:</label>
                )}
              <span>{claimData.claimId}</span>
            </div>
            <div className="claims-grid-model-root__content--header__sequence">
              <label>Sequence</label>
              <CustomSelect
                placeholder="Select Sequence"
                options={["Select Sequence", "01 - B1", "02 - B3", "03 - N1"]}
              />
            </div>
            <div className="claims-grid-model-root__content--header__sequence--btn__actions">
              <Button onClick={() => this.onButtonClick("over")}>+ New Override</Button>
              <Button onClick={this.handleTestClaimPopUp}>+ New Test Claim</Button>
              {this.state.testClaimPopup ? (
                <NewTestClaim 
                  isOpen={this.state.testClaimPopup}
                  onClose={this.handleTestClaimPopUp}
                  panelName=""
                  title="New Test Claim"
                />
              ):null}
            </div>
            <div className="claims-grid-model-root__content--header__closeicon">
              <svg onClick={() => this.handleClosePopup()} width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.81641 5.25856L9.86641 0.97555C9.95743 0.863157 10.005 0.718582 9.99959 0.570718C9.99418 0.422853 9.93622 0.28259 9.83728 0.177956C9.73834 0.0733219 9.60571 0.0120243 9.46589 0.00631293C9.32607 0.000601565 9.18936 0.050897 9.08308 0.147148L5.03308 4.43016L0.98308 0.141273C0.876801 0.0450217 0.740093 -0.0052732 0.600272 0.000438163C0.460452 0.00614953 0.32782 0.0674465 0.228878 0.17208C0.129937 0.276714 0.0719742 0.416978 0.0665736 0.564843C0.0611729 0.712707 0.108732 0.857282 0.199747 0.969675L4.24975 5.25856L0.194191 9.54158C0.136035 9.59425 0.088801 9.65906 0.0554548 9.73195C0.0221085 9.80484 0.00336926 9.88424 0.000413989 9.96515C-0.00254129 10.0461 0.0103509 10.1267 0.0382812 10.2021C0.0662115 10.2775 0.108577 10.346 0.162719 10.4033C0.21686 10.4605 0.281609 10.5053 0.3529 10.5349C0.424192 10.5644 0.500488 10.578 0.576999 10.5749C0.653509 10.5718 0.728583 10.552 0.797508 10.5167C0.866433 10.4814 0.92772 10.4315 0.977524 10.37L5.03308 6.08697L9.08308 10.37C9.18936 10.4662 9.32607 10.5165 9.46589 10.5108C9.60571 10.5051 9.73834 10.4438 9.83728 10.3392C9.93622 10.2345 9.99418 10.0943 9.99959 9.94641C10.005 9.79855 9.95743 9.65397 9.86641 9.54158L5.81641 5.25856Z" fill="#666666" />
              </svg>
            </div>
          </div>
          <div className="claims-grid-model-root__content--data scroll-bar">
            <MemberInfo claimData={claimData} />
            {/* Member Info */}
            <div
              className={
                claimData.status === "Reversed"
                  ? "claims-grid-model-root__content--data__folder-tabreversed"
                  : "claims-grid-model-root__content--data__folder-tab"
              }
            >
              <div className="claims-grid-model-root__content--data__folder-tab__note">
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                    fill="#2055B5"
                  />
                </svg>
              </div>
              <FrxFolderTabs
                tabList={
                  this.props.isTestClaim
                    ? this.state.folderTab.filter((item: any) => item.id !== 4)
                    : this.state.folderTab
                }
                activeTabIndex={this.state.activeTabIndex}
                onClickTab={this.onClickTab}
              />
              <>
                {this.state.activeTabIndex === 0 ? (
                  <>
                    <ClaimDetail claimData={claimData} />
                  </>
                ) : this.state.activeTabIndex === 1 ? (
                  <>
                    <ClaimTransaction claimData={claimData} />
                  </>
                ) : this.state.activeTabIndex === 3 ? (
                  <>
                    {claimData.status === "Reversed" ? (
                      <>
                      </>
                    ) : (
                        <>
                          <ClaimsHistory />
                        </>
                      )}
                  </>
                ) : (
                        ""
                      )}
              </>
            </div>
          </div>
        </div>
        {this.state.isOpen ? (
          <FrxDialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title=""
            handleClose={this.handleOverrideClosePopup}
            handleAction={() => {}}
            open={this.state.isOpen}
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
                    <label htmlFor="Auth ID:">{authText}</label>
                    {/* <span>1231456678234</span> */}
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
                      onClick={() => this.handleOverrideClosePopup()}
                    >
                      <path
                        d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99419 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600273 0.000414325C0.460452 0.00581497 0.32782 0.0637771 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.352901 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99419 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
                        fill="#666666"
                      />
                    </svg>
                  </div>
                </div>

                <div className="auth-grid-model-root__content--data scroll-bar">
                  {authType && authType == "over" ? (
                    <AuthEditModeOverBlank
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
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ClaimsGridModel;
