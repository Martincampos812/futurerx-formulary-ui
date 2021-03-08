import {Container} from "@material-ui/core";
import React, {Component} from "react";
import {getClaimsGridData} from "../../mocks/grid/claims-mock";
import {
  AdvancedSearchCallsGridColumns,
  AdvancedSearchDocumentsGridColumns,
  AdvancedSearchGrienvanceGridColumns,
  AdvancedSearchMemberGridColumns,
  AdvancedSearchOthersGridColumns,
  AdvancedSearchPaidReversedClaimsGridColumns,
  AdvancedSearchPAInitialGridColumns,
  AdvancedSearchPAppealGridColumns,
  AdvancedSearchPharmacyGridColumns,
  AdvancedSearchPrescriberGridColumns,
  AdvancedSearchTestClaimsGridColumns,
  authOveridesGridColumns,
  grievancesGridColumns,
  testClaimsGridColumns,
  _claimsGridColumns,
  _testClaimsGridColumns,
} from "../../utils/grid/columns";
import {
  getAdvancedSearchCallsGridData,
  getAdvancedSearchMemberGridData,
  getAdvancedSearchOthersGridData,
  getAdvancedSearchPaidReversedClaimsGridData,
  getAdvancedSearchPAInitialClaimsGridData,
  getAdvancedSearchPAAppealClaimsGridData,
  getAdvancedSearchPharmacyGridData,
  getAdvancedSearchPrescriberGridData,
  getAdvancedSearchTestClaimsGridData,
  getAdvancedSearchCommunicationsGridData,
  getAdvancedSearchGrievancesData,
} from "../../mocks/grid/advanced-search-mock";
import TestClaimsGrid from "../TestClaimsGrid/TestClaimsGrid";
import "./AdvancedSearch.scss";
import FrxLoader from "../shared/FrxLoader/FrxLoader";
import {getGrieviencesSearchData} from "../../mocks/search/grievences-search-mock";
import {getGrievancesGridData} from "../../mocks/grid/grievances-mock";
import {getAuthOverridesGridData} from "../../mocks/grid/auth-override-mock";

// material ui
import {Button} from "@material-ui/core";

// components
import GridAdavncedMemberSearch from "./SearchComponents/GridAdvancedMemberSearch";
import GridAdvancedPharmacySearch from "./SearchComponents/GridAdvancedPharmacySearch";
import GridAdvancedPrescriberSearch from "./SearchComponents/GridAdvancedPrescriberSearch";
import GridAdvancedTestClaimsSearch from "./SearchComponents/GridAdvancedTestClaimsSearch";
import GridAdvancedClaimsSearch from "./SearchComponents/GridAdvancedClaimsSearch";
import GridAdvancedPaSearch from "./SearchComponents/GridAdvancedPaSearch";
import GridAdvancedGrievenceSearch from "./SearchComponents/GridAdvancedGrievenceSearch";
import GridAdvancedAuthSearch from "./SearchComponents/GridAdvancedAuthSearch";
import GridAdvancedCommunicationSearch from "./SearchComponents/GridAdvancedCommunicationSearch";
import NewTestClaim from "../member/NewTestClaim";
import FrxDialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import AuthEditModeBlank from "../AuthsAndOverrides/AuthandOverrideEditModeInfo/AuthEditModeBlank";
import AuthEditModeOverBlank from "../AuthsAndOverrides/AuthandOverrideEditModeInfo/AuthEditModeOverBlank";

interface Props {
  match: any;
  history: any;
}
interface State {
  type: String;
  data: any;
  columns: any;
  isLoaded: boolean;
  searchType: string;
  newTestClaimPopup: boolean;
  onColumnCellClick: any;
  isOpen: boolean;
  authType: String;
  authText: String;
  settingsWidth:number;
}

export default class AdvancedSearch extends Component<Props, State> {
  state = {
    type: "",
    data: [],
    columns: [],
    isLoaded: false,
    searchType: "",
    newTestClaimPopup: false,
    onColumnCellClick: undefined,
    isOpen: false,
    authText: '',
		authType: '',
    activeCommunicationTab:0,
    settingsWidth: 0
  };
  componentDidMount() {
    this.intializeResults();
  }

  onButtonClick = (e) => {
    console.log(e);
    this.setState({
      isOpen: true,
      authType: e,
      authText: e == "auth" ? "NEW AUTHORIZATION" : "NEW OVERRIDE",
    });
  };

  handleClosePopup = () => {
    this.setState({
      isOpen: false,
      authType: "",
      authText: "",
    });
  };

  handleColumnCellClick = (data, key) => {
    if (key === "pharmacyName") {
      this.props.history.push("/pharmacy-profile");
    } else if (key === "memberName") {
      this.props.history.push("/");
    } else if (key === "prescriberName") {
      this.props.history.push("/prescriber");
    } else {
      console.log("key", key);
    }
  };

  intializeResults = (_type?: string) => {
    var type: string = _type ? _type : this.props.match.params.type;
    console.log("searching for ", type);
    var columns: any = [];
    var data: any = [];
    var title: string = "";
    var onColumnCellClick: any;
    var settingsWidth: any;
    switch (type) {
      case "member":
        {
          columns = AdvancedSearchMemberGridColumns;
          data = getAdvancedSearchMemberGridData;
          title = "Member";
          onColumnCellClick = this.handleColumnCellClick;
          settingsWidth=45
        }
        break;
      case "pharmacy":
        {
          columns = AdvancedSearchPharmacyGridColumns;
          data = getAdvancedSearchPharmacyGridData;
          title = "Pharmacy";
          onColumnCellClick = this.handleColumnCellClick;
          settingsWidth=30
        }
        break;
      case "prescriber":
        {
          columns = AdvancedSearchPrescriberGridColumns;
          data = getAdvancedSearchPrescriberGridData;
          title = "Prescriber";
          onColumnCellClick = this.handleColumnCellClick;
          settingsWidth=30
        }
        break;
      case "testclaims":
        {
          columns = AdvancedSearchTestClaimsGridColumns;
          data = getClaimsGridData;
          title = "Test Claims";
          settingsWidth=20
        }
        break;
      case "claims":
        {
          columns = AdvancedSearchTestClaimsGridColumns;
          data = getClaimsGridData;
          title = "Claims";
          settingsWidth= 20
        }
        break;
      case "pacasesintial":
        {
          columns = AdvancedSearchPAInitialGridColumns;
          data = getAdvancedSearchPAInitialClaimsGridData;
          title = "PA";
          settingsWidth=20
        }
        break;
      case "pacasesappeals":
        {
          columns = AdvancedSearchPAppealGridColumns;
          data = getAdvancedSearchPAAppealClaimsGridData;
          title = "PA";
          settingsWidth=20
        }
        break;
      case 'grievances': {
        columns = AdvancedSearchGrienvanceGridColumns
        data = getAdvancedSearchGrievancesData
        title = 'Grievance'
        settingsWidth=20
      }
        break;
      case "authoverrides":
        {
          columns = authOveridesGridColumns;
          data = getAuthOverridesGridData;
          title = "Auth/Override";
          settingsWidth=40
        }
        break;
      case "communicationsother":
        {
          columns = AdvancedSearchOthersGridColumns;
          data = getAdvancedSearchOthersGridData;
          title = "Communications";
          settingsWidth=45
        }
        break;
      case "communicationscall":
        {
          columns = AdvancedSearchCallsGridColumns;
          data = getAdvancedSearchCallsGridData;
          title = "Communications";
          settingsWidth=40
        }
        break;
      case "communicationsdocument":
        {
          columns = AdvancedSearchDocumentsGridColumns;
          data = getAdvancedSearchCommunicationsGridData;
          title = "Communications";
          settingsWidth=45
        }
        break;
    }
    this.setState({
      type: title,
      searchType: type,
      data: data,
      columns: columns,
      isLoaded: true,
      onColumnCellClick: onColumnCellClick,
      settingsWidth: settingsWidth
    });
  };

  componentWillReceiveProps(newProps: any) {
    console.log(newProps);
    if (
      newProps.match.params &&
      newProps.match.params.type &&
      newProps.match.params.type !== this.props.match.params.type
    ) {
      this.setState({
        isLoaded: false,
      });
      setTimeout(() => {
        this.intializeResults(newProps.match.params.type);
      }, 1000);
    }
  }
  componentDidUpdate(previousProps, previousState) {
    if (
      this.props.match &&
      this.props.match.params &&
      previousProps.match &&
      previousProps.match.params
    )
      if (previousProps.match.params.type && this.props.match.params.type) {
        if (previousProps.match.params.type !== this.props.match.params.type) {
          console.log("updating data and columns");
          this.intializeResults();
        }
      }
  }

  handleNewTestClaim = () => {
    this.setState({
      newTestClaimPopup: !this.state.newTestClaimPopup,
    });
  };
  handleClosePopupAfter = () => {
    this.setState({
      isOpen: false,
      authType: "",
      authText: "",
    });
  };

  onCommunicationTabChange = (selectedTab: number) => {
    this.setState({
      searchType:
        selectedTab === 0
          ? this.props.history.push("/search/communicationscall")
          : selectedTab === 1
          ? this.props.history.push("/search/communicationsdocument")
          : selectedTab === 2
          ? this.props.history.push("/search/communicationsother")
          : "",
    });
  };

  onPriorAuthTabChange = (selectedTab: number) => {
    this.setState({
      searchType:
        selectedTab === 0
          ? this.props.history.push("/search/pacasesintial")
          : selectedTab === 1
          ? this.props.history.push("/search/pacasesappeals")
          : "",
    });
  };

  render() {
    const {authType, authText, isOpen} = this.state;
    return (
      <div className="advancedSearch-root">
        {this.state.isLoaded ? (
          <Container className="tab-content">
            <div className="claims-root">
              <TestClaimsGrid
                type="CLAIMS"
                header={(callBack: any) => {
                  return (
                    <div className="claimsbuttongroup-root">
                      <div className="heading">
                        <h4>{this.state.type} Search Results</h4>
                        {this.state.type === "Member" ? (
                          <div className="header-action-btn">
                            <Button className="btn-claims">+ New Member</Button>
                          </div>
                        ) : this.state.type === "Test Claims" ? (
                          <div className="header-action-btn">
                            <Button
                              className="btn-claims"
                              onClick={this.handleNewTestClaim}
                            >
                              + New Test Claim
                            </Button>
                            {this.state.newTestClaimPopup ? (
                              <NewTestClaim
                                isOpen={this.state.newTestClaimPopup}
                                onClose={this.handleNewTestClaim}
                                panelName=""
                                title="New Test Claim"
                              />
                            ) : null}
                          </div>
                        ) : this.state.type === "PA" ? (
                          <div className="header-action-btn">
                            <Button className="btn-claims">+ New PA</Button>
                            <Button className="btn-claims">+ Appeal</Button>
                          </div>
                        ) : this.state.type === "Grievance" ? (
                          <div className="header-action-btn">
                            <Button className="btn-claims">
                              + New Grievance
                            </Button>
                          </div>
                        ) : this.state.type === "Auth/Override" ? (
                          <div className="header-action-btn">
                            <Button className="btn-claims" onClick={() => this.onButtonClick("auth")}>
                              + New Auth
                            </Button>
                            <Button className="btn-claims" onClick={() => this.onButtonClick("over")}>
                              + New Override
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        {this.state.type === "Member" ? (
                          <GridAdavncedMemberSearch />
                        ) : this.state.type === "Pharmacy" ? (
                          <GridAdvancedPharmacySearch />
                        ) : this.state.type === "Prescriber" ? (
                          <GridAdvancedPrescriberSearch />
                        ) : this.state.type === "Test Claims" ? (
                          <GridAdvancedTestClaimsSearch />
                        ) : this.state.type === "Claims" ? (
                          <GridAdvancedClaimsSearch />
                        ) : this.state.type === "PA" ? (
                          <GridAdvancedPaSearch
                            searchType={this.state.searchType}
                            onPriorAuthTabChange={this.onPriorAuthTabChange}
                          />
                        ) : this.state.type === "Grievance" ? (
                          <GridAdvancedGrievenceSearch />
                        ) : this.state.type === "Auth/Override" ? (
                          <GridAdvancedAuthSearch />
                        ) : this.state.type === "Communications" ? (
                          <GridAdvancedCommunicationSearch
                            onCommunicaionTabChange={
                              this.onCommunicationTabChange
                            }
                            searchType={this.state.searchType}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                }}
                columns={this.state.columns}
                data={this.state.data}
                hideSettings={false}
                searchOptions={() => {
                  return [];
                }}
                onColumnCellClick={this.state.onColumnCellClick}
                searchType={this.state.searchType}
                settingsWidth={this.state.settingsWidth}
              />
            </div>
            {isOpen ? (
              <FrxDialogPopup
                positiveActionText=""
                negativeActionText="Close"
                title=""
                handleClose={this.handleClosePopup}
                handleAction={() => {}}
                open={isOpen}
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
                  </div>
                  <div className="auth-grid-model-root__content--data scroll-bar">
                    {authType && authType == "auth" ? (
                      <AuthEditModeBlank
                        parentFn={() => this.handleClosePopupAfter()}
                      />
                    ) : (
                      ""
                    )}
                    {authType && authType == "over" ? (
                      <AuthEditModeOverBlank
                        parentFn={() => this.handleClosePopupAfter()}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </FrxDialogPopup>
            ) : (
              ""
            )}
          </Container>
        ) : (
          <FrxLoader />
        )}
        {this.state.isOpen ? (
          <FrxDialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title=""
            handleClose={this.handleClosePopup}
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
                  {authType && authType == "auth" ? (
                    <AuthEditModeBlank
                      parentFn={() => this.handleClosePopupAfter()}
                    />
                  ) : (
                    ""
                  )}
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
