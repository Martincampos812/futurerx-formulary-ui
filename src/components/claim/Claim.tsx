import { Button, Card, Container, Grid } from "@material-ui/core";
// Accordion imports
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { getBarChartData } from "../../mocks/ChartMock";
import {
  getAuthorizationLabels,
  getAuthorizationNumbers,
  getOverrideLabels,
  getOverrideNumbers,
  getTop5FilledDrugsLabels,
  getTop5FilledDrugsNumbers,
} from "../../mocks/ClaimsMock";
import { TabInfo } from "../../models/tab.model";
import PaDashboard from "../PA-Dashboard/PaDashboard";
import GrievanceDashboard from "../GrivencesDashboard/GrivencesDashboard";
import AuthsOverrides from "../AuthsAndOverrides/AuthsAndOverrides";
import ClaimsGrid from "../ClaimsGrid/ClaimsGrid";
import Communication from "../communication/Communication";
import NotesPopup from "../member/MemberNotesPopup";
import PieChart from "../shapes/PieChart";
import FrxChart from "../shared/FrxChart/FrxChart";
import FrxMiniTabs from "../shared/FrxMiniTabs/FrxMiniTabs";
import StatsSummary from "../shared/FrxStatsSummary/FrxStatsSummary";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import "./Claim.scss";
import FrxLoader from "../shared/FrxLoader/FrxLoader";
import PriorAuthorizations from "../prior-Authorizations/PriorAuthorizations";
import NewTestClaim from "../member/NewTestClaim";

const tabs = [
  { id: 1, text: "Claims" },
  { id: 2, text: "Top 5 filled drugs" },
  { id: 3, text: "PA" },
  { id: 4, text: "Grievances" },
  { id: 5, text: "Auths & Overrides" },
  { id: 6, text: "Communications" },
];

const miniTabs = [
  { id: 1, text: "Part D" },
  { id: 2, text: "Part B/C" },
];

interface Props {
  activeIndex: number;
  onSwitchNewGrievance?: any;
  memberInformation?: any;
  contactInformation?: any;
}
interface State {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
  miniTabs: Array<TabInfo>;
  activeMiniTabIndex: number;
  isNotesOpen: boolean;
  summaryType: "paid" | "rejected" | "total";
  loading: boolean;
  openPopup: boolean;
}
class Claim extends React.Component<Props, State> {
  state: State = {
    tabs: tabs,
    activeTabIndex: 0,
    miniTabs: miniTabs,
    activeMiniTabIndex: 0,
    isNotesOpen: false,
    loading: false,
    summaryType: "total",
    openPopup: false,
  };

  top5FilledData: Array<number> = getTop5FilledDrugsNumbers();
  top5FilledLabels: Array<string> = getTop5FilledDrugsLabels();

  authorizationData: Array<number> = getAuthorizationNumbers();
  overrideData: Array<number> = getOverrideNumbers();

  authorizationLabels: Array<string> = getAuthorizationLabels();
  overrideLabels: Array<string> = getOverrideLabels();

  componentDidMount = () => {
    this.setState({
      activeTabIndex: this.props.activeIndex,
    });
  };
  componentWillReceiveProps = (newProps) => {
    if (newProps.activeIndex != this.props.activeIndex) {
      this.setState({
        activeTabIndex: newProps.activeIndex,
        loading: true,
      });
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 1000);
    }
  };
  onClickTab = (selectedTabIndex: number) => {
    console.log("claimsn tab clicked ", selectedTabIndex);
    let activeTabIndex = 0;

    const newtabs = tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    console.log(" active tab ", activeTabIndex, tabs[activeTabIndex]);

    this.setState({ tabs: newtabs, activeTabIndex });
  };

  onClickMiniTab = (selectedTabIndex: number) => {
    let activeMiniTabIndex = 0;

    const miniTabs = this.state.miniTabs.map(
      (miniTab: TabInfo, index: number) => {
        if (index === selectedTabIndex) {
          activeMiniTabIndex = index;
        }
        return miniTab;
      }
    );

    this.setState({ miniTabs, activeMiniTabIndex });
  };

  openNotesDialog = () => {
    console.log("sssssssssss");
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  onSelectStatItem = (statType: any) => {
    console.log("stat type ", statType);
    this.setState({ summaryType: statType });
  };

  onButtonClick = () => {
    console.log("invoked onButtonClick", this.state.openPopup);

    this.setState({
      openPopup: !this.state.openPopup,
    });
  };

  renderActiveTabContent = () => {
    if (this.state.activeTabIndex === 0) {
      return (
        <div className="claims-content">
          <FrxMiniTabs
            tabList={this.state.miniTabs}
            activeTabIndex={this.state.activeMiniTabIndex}
            onClickTab={this.onClickTab}
          />
          <FrxChart
            onSelectStatItem={this.onSelectStatItem}
            data={getBarChartData()}
          />
          <div className="claims-accordion">
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className="claims-accordion-summary">
                  <div className="claims-accordion-summary-heading">Claims</div>
                  <div className="claims-accordion-summary-button">
                    <Button onClick={this.onButtonClick}>
                      {" "}
                      + New Test Claim
                    </Button>
                    {this.state.openPopup ? (
                      <NewTestClaim
                        isOpen={this.state.openPopup}
                        onClose={this.onButtonClick}
                        panelName="demographics-tab"
                        title="New Test Claim"
                      />
                    ) : (
                        ""
                      )}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="claims-grid-container">
                  <ClaimsGrid
                    isPaid={this.state.summaryType.toLowerCase() === "paid"}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      );
    } else if (this.state.activeTabIndex === 1) {
      return (
        <div className="top-5-drugs-content">
          <Container>
            <Grid container direction="row">
              <Grid md={3} item>
                <PieChart
                  data={this.top5FilledData}
                  tooltips={this.top5FilledLabels}
                  total={this.top5FilledData.length}
                />
              </Grid>
              <Grid md={9} item className="summary-container">
                <StatsSummary
                  onSelectStatItem={this.onSelectStatItem}
                  data={this.top5FilledData}
                  labels={this.top5FilledLabels}
                  total={this.top5FilledLabels.length}
                  heading={"Last 12 months"}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      );
    } else if (this.state.activeTabIndex === 2) {
      return (
        <div className="claims-content">
          <PaDashboard />
        </div>
      );
    } else if (this.state.activeTabIndex === 3) {
      return (
        <div className="claims-content">
          <GrievanceDashboard onSwitchNewGrievance={this.props.onSwitchNewGrievance} />
        </div>
      );
    } else if (this.state.activeTabIndex === 4) {
      return (
        <div className="claims-content">
          {/* <PriorAuthorizations /> */}
          <AuthsOverrides />
        </div>
      );
    } else if (this.state.activeTabIndex === 5) {
      return (
        <div className="claims-content">
          <Communication />
        </div>
      );
    } else {
      console.log("end");
    }
  };

  render() {
    let noteValue = "Claims";
    noteValue =
      this.state.activeTabIndex == 1 ? "Top-5 Filled Drugs" : noteValue;
    noteValue = this.state.activeTabIndex == 2 ? "PA" : noteValue;
    noteValue = this.state.activeTabIndex == 3 ? "Grievances" : noteValue;
    noteValue =
      this.state.activeTabIndex == 4 ? "Auths and Overrides" : noteValue;
    noteValue = this.state.activeTabIndex == 5 ? "Communications" : noteValue;

    return (
      <React.Fragment>
        <Card variant="outlined" className="claim-root">
          <div className="claim-root__note-icon">
            <svg
              onClick={this.openNotesDialog}
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cd-history-root__header__icon-container__note-icon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                fill="#2055B5"
              />
            </svg>
          </div>
          {this.state.isNotesOpen ? (
            <NotesPopup
              category={noteValue}
              openPopup={this.state.isNotesOpen}
              onClose={this.openNotesDialog}
            />
          ) : (
              ""
            )}
          <FrxTabs
            tabList={this.state.tabs}
            activeTabIndex={this.state.activeTabIndex}
            onClickTab={this.onClickTab}
          />
          {this.renderActiveTabContent()}
        </Card>
      </React.Fragment>
    );
  }
}

export default Claim;
