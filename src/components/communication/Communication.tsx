import { Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import {
  getMemberLabels,
  getMemberNumbers,
  getOtherLabels,
  getOtherNumbers,
  getPharmacyLabels,
  getPharmacyNumbers,
  getProviderLabels,
  getProviderNumbers,
  getTotalLabels,
  getTotalNumbers
} from "../../mocks/ClaimsMock";
import { TabInfo } from "../../models/tab.model";
import FrxMiniTabs from "../shared/FrxMiniTabs/FrxMiniTabs";
import StatsSummary from "../shared/FrxStatsSummary/FrxStatsSummary";
import "./Communication.scss";

// Minitab grids
import CallsGrid from "./Grid/CallsGrid/CallsGrid";
import DocumentsGrid from "./Grid/DocumentsGrid/DocumentsGrid"
import OtherGrid from "./Grid/OtherGrid/OtherGrid"

const miniTabs = [
  { id: 1, text: "Calls" },
  { id: 2, text: "Documents" },
  { id: 3, text: "Other" }
];

interface State {
  miniTabs: Array<TabInfo>;
  activeMiniTabIndex: number;
}

class Communication extends React.Component<any> {
  state: State = {
    miniTabs: miniTabs,
    activeMiniTabIndex: 0
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

  MemberData: Array<number> = getMemberNumbers();
  ProviderData: Array<number> = getProviderNumbers();
  PharmacyData: Array<number> = getPharmacyNumbers();
  OtherData: Array<number> = getOtherNumbers();
  TotalData: Array<number> = getTotalNumbers();

  MemberLabels: Array<string> = getMemberLabels();
  ProviderLabels: Array<string> = getProviderLabels();
  PharmacyLabels: Array<string> = getPharmacyLabels();
  OtherLabels: Array<string> = getOtherLabels();
  TotalLabels: Array<string> = getTotalLabels();

  getMiniTabContent = () => {
    if(this.state.activeMiniTabIndex == 0){
      return (
        <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="communication-root--legend__accordion-summary">
            <div className="communication-root--legend__accordion-summary-heading">
              Recent Calls
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="communication-root--legend__accordion__grid-container">
            <CallsGrid />
          </div>
        </AccordionDetails>
      </Accordion>
      )
    }else if(this.state.activeMiniTabIndex == 1){
      return (
        <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="communication-root--legend__accordion-summary">
            <div className="communication-root--legend__accordion-summary-heading">
              Recent Documents
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="communication-root--legend__accordion__grid-container">
            <DocumentsGrid />
          </div>
        </AccordionDetails>
      </Accordion>
      )
    }else if(this.state.activeMiniTabIndex == 2){
      return (
        <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="communication-root--legend__accordion-summary">
            <div className="communication-root--legend__accordion-summary-heading">
              Other
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="communication-root--legend__accordion__grid-container">
            <OtherGrid />
          </div>
        </AccordionDetails>
      </Accordion>
      )
  }
}

  render() {
    return (
      <div className="communication-root">
        <FrxMiniTabs
          tabList={this.state.miniTabs}
          activeTabIndex={this.state.activeMiniTabIndex}
          onClickTab={this.onClickMiniTab}
        />
        <Grid md={12} item className="communication-root--legend">
          <StatsSummary
            data={this.MemberData}
            labels={this.MemberLabels}
            total={2}
            heading={"Member"}
          />
          <StatsSummary
            data={this.ProviderData}
            labels={this.ProviderLabels}
            total={2}
            heading={"Prescriber"}
          />
          <StatsSummary
            data={this.PharmacyData}
            labels={this.PharmacyLabels}
            total={2}
            heading={"Pharmacy"}
          />
          <StatsSummary
            data={this.OtherData}
            labels={this.OtherLabels}
            total={2}
            heading={"Other"}
          />
          <StatsSummary
            data={this.TotalData}
            labels={this.TotalLabels}
            total={2}
            heading={"Total"}
          />
        </Grid>
        <div className="communication-root--legend__accordion">
          {this.getMiniTabContent()}
        </div>
      </div>
    );
  }
}

export default Communication;
