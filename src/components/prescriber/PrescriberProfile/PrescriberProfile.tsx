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
import {
  PrescriberTab5DrugColumns,
  PrescriberProfileClaimGridColumns
} from "../../../utils/grid/columns";
import { getPrescriberTabDrugData } from "../../../mocks/grid/prescriber-tabdrug-mock";
import { getPrescriberClaimGridData } from "../../../mocks/grid/profile-claim-grid";
import { getPrescriberAddress } from "../../../mocks/prescriber-address-mock";
import { PrescriberAddressModel } from "../../../models/prescriber/prescriber-address.model";
import { getPrescriberMemberName } from "../../../mocks/PrescriberNameMock";
import { PrescriberMemberNameInfoModel } from "../../../models/prescriber/prescriber-name.model";
import {
  getPrescriberTabDemography,
  getPrescriberTabSpeciality,
  getPrescriberTabLicensure
} from "../../../mocks/prescriber-tabbed-mock";
import {
  PrescriberTabDemographyModel,
  PrescriberTabSpecilaityModel,
  PrescriberTabLicensureModel
} from "../../../models/prescriber/prescriber-tabbed.model";
import { TabInfo } from "../../../models/tab.model";
import { getPrescriberProfileTabNames } from "../../../utils/text-labels";
import Accumulators from "../../accumulators/Accumulators";
import Claim from "../../claim/Claim";
import FrxLoader from "../../shared/FrxLoader/FrxLoader";
import FrxTabs from "../../shared/FrxTabs/FrxTabs";
import PrescriberNameInfo from "../PrescriberMemberDetail/PrescriberName";
import PrescriberTabbedView from "../PrescriberTabbedView/PrescriberTabbedView";
import PrescriberClaimSummaryDonut from "../PrescriberClaimsSummary/PrescriberClaimsSummaryDonut";
import "./PrescriberProfile.scss";
import PrescriberAddress from "../PrescriberAddress/PrescriberAddress";
import FrxColumnChart from "../../shared/FrxColumnChart/FrxColumnChart";
import ProfileClaimGrid from "../ClaimGridComponent/ProfileClaimGrid";
import FrxGraphCard from "../../shared/FrxGraphCard/FrxGraphCard";

const metaTabs = [
  { id: 1, text: "Demographics" },
  { id: 2, text: "Speciality" },
  { id: 3, text: "State Licensure" }
];

const topFiveTabs = [
  { id: 1, text: "TOP 5 DiSPENSED DRUGS" },
  { id: 2, text: "TOP 5 INFERRED DISEASED STATES" },
  { id: 3, text: "TOP 5 HIGHEST COST DRUGS" },
  { id: 4, text: "TOP 5  PLAN UTILIZATION" }
];

interface PrescriberProfileComponentState {
  tabs: TabInfo[];

  activeTabIndex: number;
  prescriberName: PrescriberMemberNameInfoModel | undefined;
  prescriberAddress: PrescriberAddressModel | undefined;
  prescriberTabDemography: PrescriberTabDemographyModel | undefined;
  prescriberTabSpeciality: PrescriberTabSpecilaityModel | undefined;
  prescriberTabLicensure: PrescriberTabLicensureModel | undefined;
  activeMetaTabIndex: number;
  activeTopFiveTabIndex: number;
  loading: boolean;
  summaryType: "paid" | "rejected" | undefined;
  isFetchingData: boolean;
  data: any;
  filteredData: any;
}

interface PrescriberProfileComponentProps {}
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

class PrescriberProfileComponent extends React.Component<
  any,
  PrescriberProfileComponentState
> {
  state = {
    tabs: getPrescriberProfileTabNames(),
    metaTabs: metaTabs,
    activeTabIndex: 0,
    prescriberName: undefined,
    prescriberAddress: undefined,
    prescriberTabDemography: undefined,
    prescriberTabSpeciality: undefined,
    prescriberTabLicensure: undefined,
    activeMetaTabIndex: 0,
    activeTopFiveTabIndex: 0,
    loading: true,
    summaryType: undefined,
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[]
  };

  componentDidMount() {
    const prescriberName = getPrescriberMemberName();
    const prescriberAddress = getPrescriberAddress();
    const prescriberTabDemography = getPrescriberTabDemography();
    const prescriberTabSpeciality = getPrescriberTabSpeciality();
    const prescriberTabLicensure = getPrescriberTabLicensure();
    const data = getPrescriberTabDrugData();
    setTimeout(() => {
      this.setState({
        loading: false,
        prescriberName,
        prescriberAddress,
        prescriberTabDemography,
        prescriberTabSpeciality,
        prescriberTabLicensure,
        data,
        filteredData: data
      });
    }, 2000);
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
                        prescriberName={this.state.prescriberName}
                      />
                      <Grid container>
                        <Grid item xs={4}>
                          {/* PRESCRIBER ADDRESS COMPONENT */}
                          <div className="bg-white cdh1-mn-container">
                            <PrescriberAddress
                              prescriberAddress={this.state.prescriberAddress}
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
                                this.state.prescriberTabDemography
                              }
                              prescriberTabSpeciality={
                                this.state.prescriberTabSpeciality
                              }
                              prescriberTabLicensure={
                                this.state.prescriberTabLicensure
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
                          <div className="bg-white acc-barr-container-graphCard">
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
                          <div className="bg-white acc-barr-container-graphCard">
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
                <PrescriberNameInfo
                  prescriberName={this.state.prescriberName}
                />
                <ProfileClaimGrid
                  columns={PrescriberProfileClaimGridColumns()}
                  isFetchingData={this.state.isFetchingData}
                  handleSearch={this.handleSearch}
                />
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
            ) : this.state.activeTabIndex === 1 ? (
              <Container className="tab-content">
                {/* CLAIMS */}
                <PrescriberNameInfo
                  prescriberName={this.state.prescriberName}
                />
                <ProfileClaimGrid
                  columns={PrescriberProfileClaimGridColumns()}
                  isFetchingData={this.state.isFetchingData}
                  handleSearch={this.handleSearch}
                />
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
const PrescriberProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrescriberProfileComponent);
export default PrescriberProfile;
