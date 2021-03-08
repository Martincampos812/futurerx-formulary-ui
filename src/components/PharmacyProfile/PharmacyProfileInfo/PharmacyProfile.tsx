// import { Tab, Tabs } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { connect } from "react-redux";
import {
  getBarChartData,
  getPrescribedAverageTotalCost,
  getPrescribedMemberServiced
} from "../../../mocks/ChartMock";
import { PrescriberTab5DrugColumns } from "../../../utils/grid/columns";
import { getPrescriberTabDrugData } from "../../../mocks/grid/prescriber-tabdrug-mock";
import { getPharmacyAddress } from "../../../mocks/prescriber-address-mock";
import { PharmacyAddressModel } from "../../../models/pharmacyprofile/pharmacyprofile-address.model";
import { getPharmacyMemberName } from "../../../mocks/PrescriberNameMock";
import { PharmacyMemberNameInfoModel } from "../../../models/pharmacyprofile/pharmacyprofile-name.model";
import {
  getPharmacyTabDemography,
  getPharmacyTabSpeciality,
  getPharmacyTabLicensure
} from "../../../mocks/prescriber-tabbed-mock";
import {
  PharmacyTabDemographyModel,
  PharmacyTabSpecilaityModel,
  PharmacyTabLicensureModel
} from "../../../models/pharmacyprofile/pharmacyprofile-tabbed.model";
import { TabInfo } from "../../../models/tab.model";
import { getPrescriberProfileTabNames } from "../../../utils/text-labels";
import Accumulators from "../../accumulators/Accumulators";
import Claim from "../../claim/Claim";
import FrxLoader from "../../shared/FrxLoader/FrxLoader";
import FrxTabs from "../../shared/FrxTabs/FrxTabs";
import PrescriberNameInfo from "../../prescriber/PrescriberMemberDetail/PrescriberName";
import PrescriberTabbedView from "../../prescriber/PrescriberTabbedView/PrescriberTabbedView";
import PrescriberClaimSummaryDonut from "../../prescriber/PrescriberClaimsSummary/PrescriberClaimsSummaryDonut";
import "./PharmacyProfile.scss";
import PrescriberAddress from "../../prescriber/PrescriberAddress/PrescriberAddress";
import FrxColumnChart from "../../shared/FrxColumnChart/FrxColumnChart";
import FrxGraphCard from "../../shared/FrxGraphCard/FrxGraphCard";

const metaTabs = [
  { id: 1, text: "Demographics" },
  { id: 2, text: "Speciality" },
  { id: 3, text: "State Licensure" }
];

const topFiveTabs = [
  { id: 1, text: "TOP 5 DiSPENSED DRUGS" },
  { id: 2, text: "TOP 5 INFERRED DISEASED STATES" }
  // { id: 3, text: "TOP 5 HIGHEST COST DRUGS" },
  // { id: 4, text: "TOP 5  PLAN UTILIZATION" }
];

interface PharmacyProfileComponentState {
  tabs: TabInfo[];

  activeTabIndex: number;
  pharmacyName: PharmacyMemberNameInfoModel | undefined;
  pharmacyAddress: PharmacyAddressModel | undefined;
  pharmacyTabDemography: PharmacyTabDemographyModel | undefined;
  pharmacyTabSpeciality: PharmacyTabSpecilaityModel | undefined;
  pharmacyTabLicensure: PharmacyTabLicensureModel | undefined;
  activeMetaTabIndex: number;
  activeTopFiveTabIndex: number;
  loading: boolean;
  summaryType: "paid" | "rejected" | undefined;
  isFetchingData: boolean;
  data: any;
  filteredData: any;
}

interface PharmacyProfileComponentProps { }
// Redux store related functions.
// Dispatch action
/**
 *
 * @param dispatch
 * For now, ensure the same member_id is used for both action creators.
 * TODO: Fix the above.
 */
function mapDispatchToProps(dispatch) {
  return {
    // getMemberSummary: member_id => {
    //   dispatch(getMemberSummary(member_id));
    // },
    // getMemberAddress: member_id => {
    //   dispatch(getMemberAddress(member_id));
    // }
  };
}

// Get state as props
const mapStateToProps = state => {
  return {
    // memberSummary: state.member_summary
  };
};

class PharmacyProfileComponent extends React.Component<
  any,
  PharmacyProfileComponentState
  > {
  state = {
    tabs: getPrescriberProfileTabNames(),
    metaTabs: metaTabs,
    activeTabIndex: 0,
    pharmacyName: undefined,
    pharmacyAddress: undefined,
    pharmacyTabDemography: undefined,
    pharmacyTabSpeciality: undefined,
    pharmacyTabLicensure: undefined,
    activeMetaTabIndex: 0,
    activeTopFiveTabIndex: 0,
    loading: true,
    summaryType: undefined,
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[]
  };

  componentDidMount() {
    const pharmacyName = getPharmacyMemberName();
    const pharmacyAddress = getPharmacyAddress();
    const pharmacyTabDemography = getPharmacyTabDemography();
    const pharmacyTabSpeciality = getPharmacyTabSpeciality();
    const pharmacyTabLicensure = getPharmacyTabLicensure();
    const data = getPrescriberTabDrugData();
    setTimeout(() => {
      this.setState({
        loading: false,
        pharmacyName,
        pharmacyAddress,
        pharmacyTabDemography,
        pharmacyTabSpeciality,
        pharmacyTabLicensure,
        data,
        filteredData: data
      });
    }, 2000);
    console.log("pharmacyTabDemography", pharmacyTabDemography);
  }

  handleSearch = searchObject => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          d => d.status === searchObject.status
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    this.setState({ tabs, activeTabIndex });
  };

  onMetaTabChange = (selectedTabIndex: number) => {
    this.setState({ activeMetaTabIndex: selectedTabIndex });
  };

  onTopFiveTabChange = (selectedTabIndex: number) => {
    this.setState({ activeTopFiveTabIndex: selectedTabIndex });
  };

  onSelectStatItem = (statType: any) => {
    console.log("stat type ", statType);
    this.setState({ summaryType: statType });
  };

  render() {
    return (
      <div className="prescriber-profile-root">
        {this.state.loading ? (
          <FrxLoader />
        ) : (
            <>
              <FrxTabs
                tabList={this.state.tabs}
                typeCard={"line"}
                activeTabIndex={this.state.activeTabIndex}
                onClickTab={this.onClickTab}
              />
              {this.state.activeTabIndex === 0 ? (
                <>
                  <Container className="tab-content">
                    {/* <PrescriberInfo /> */}

                    <div>
                      <Container className="member-components-container">
                        <PrescriberNameInfo
                          prescriberName={this.state.pharmacyName}
                        />
                        <Grid container>
                          <Grid item xs={4}>
                            {/* PRESCRIBER ADDRESS COMPONENT */}
                            <div className="bg-white cdh1-mn-container">
                              <PrescriberAddress
                                prescriberAddress={this.state.pharmacyAddress}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={8}>
                            {/* PRESCRIBER DEMOGRAPHICS & CLAIMNS SUMMARY COMPONENTS */}
                            <div className="bg-white cdh-mn-container">
                              <PrescriberTabbedView
                                tabs={metaTabs}
                                activeTabIndex={this.state.activeMetaTabIndex}
                                onTabChange={this.onMetaTabChange}
                                prescriberTabDemography={
                                  this.state.pharmacyTabDemography
                                }
                                prescriberTabSpeciality={
                                  this.state.pharmacyTabSpeciality
                                }
                                prescriberTabLicensure={
                                  this.state.pharmacyTabLicensure
                                }
                              />
                            </div>
                            <div className="bg-white cdh-mn-container">
                              <PrescriberClaimSummaryDonut
                                onSelectStatItem={this.onSelectStatItem}
                                data={getBarChartData()}
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </Container>
                    </div>
                    <div>
                      <Container className="member-components-container">
                        <Grid container>
                          <Grid item xs={12}>
                            <div className="bg-white acc-barr-container">
                              {/* BAR CHART */}
                              <FrxColumnChart />
                            </div>
                          </Grid>
                        </Grid>
                      </Container>
                    </div>
                    <div>
                      <Container className="member-components-container">
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <div className="bg-white acc-barr-container">
                              {/* MINI BAR CHART */}
                              <FrxGraphCard
                                data={getPrescribedMemberServiced()}
                                type="MemberServiced"
                                title="Members Serviced"
                                textFormatter="text"
                                showText={true}
                                colorMap={{
                                  "Member Serviced": "#C2CFE0",
                                  "Average Total Cost": "#90A0B7"
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div className="bg-white acc-barr-container">
                              {/* MINI BAR CHART */}
                              <FrxGraphCard
                                data={getPrescribedAverageTotalCost()}
                                type="AverageTotalCost"
                                title="Average Total Cost"
                                textFormatter="currency"
                                showText={true}
                                colorMap={{
                                  "Member Serviced": "#C2CFE0",
                                  "Average Total Cost": "#90A0B7"
                                }}
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </Container>
                    </div>
                    <div>
                      <Container className="member-components-container">
                        <Grid item xs={12}>
                          <div className="bg-white cdh-mn-container">
                            <PrescriberTabbedView
                              tabs={topFiveTabs}
                              activeTabIndex={this.state.activeTopFiveTabIndex}
                              onTabChange={this.onTopFiveTabChange}
                              filteredData={this.state.filteredData}
                              columns={PrescriberTab5DrugColumns()}
                              isFetchingData={this.state.isFetchingData}
                              handleSearch={this.handleSearch}
                            />
                          </div>
                        </Grid>
                      </Container>
                    </div>

                    {/* </Container> */}
                  </Container>
                </>
              ) : this.state.activeTabIndex === 1 ? (
                <Container className="tab-content formulary-content">
                  {/* CLAIMS */}
                  <></>
                </Container>
              ) : this.state.activeTabIndex === 2 ? (
                <Container className="tab-content">
                  {/* Members */}
                  <></>
                </Container>
              ) : this.state.activeTabIndex === 3 ? (
                <Container className="tab-content">
                  {/* PA-Search */}
                  <></>
                </Container>
              ) : this.state.activeTabIndex === 4 ? (
                <Container className="tab-content">
                  {/* Grievances */}
                  <></>
                </Container>
              ) : null}
            </>
          )}
      </div>
    );
  }
}

// Connect component with store.
const PharmacyProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(PharmacyProfileComponent);
export default PharmacyProfile;
