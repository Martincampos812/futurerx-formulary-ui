import React from "react";
import "./PaDashboard.scss";
// material ui
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Button,
  Card,
  Container,
  Grid,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@material-ui/core";

import {TabInfo} from "../../models/tab.model";
import FrxMiniTabs from "../shared/FrxMiniTabs/FrxMiniTabs";
import FrxPaChart from "../shared/FrxChart/FrxPaChart";
import {getPaBarChartData} from "../../mocks/PaChartMock";
import PaDashboardGrid from "./Components/PaDashboardGrid/PaDashboardGrid";

const miniTabs = [
  {id: 1, text: "Initial Cases"},
  {id: 2, text: "Appeals"},
];

interface State {
  miniTabs: Array<TabInfo>;
  activeMiniTabIndex: number;
  summaryType: "open" | "approved" | "denied" | "withdrawn" | "total";
}
interface Props {
  selectedItem: string;
  loading: boolean;
}

class PaDashboard extends React.Component {
  state: State = {
    miniTabs: miniTabs,
    activeMiniTabIndex: 0,
    summaryType: "total",
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

    this.setState({miniTabs, activeMiniTabIndex});
  };

  onSelectStatItem = (statType: string) => {
    console.log("stat type ", statType);
    this.setState({summaryType: statType});
  };

  render() {
    const {activeMiniTabIndex} = this.state;
    return (
      <div className="PA-content">
        <FrxMiniTabs
          tabList={this.state.miniTabs}
          activeTabIndex={this.state.activeMiniTabIndex}
          onClickTab={this.onClickMiniTab}
        />
        <FrxPaChart
          onSelectStatItem={this.onSelectStatItem}
          data={getPaBarChartData()}
        />
        <div className="claims-accordion">
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="claims-accordion-summary">
                <div className="claims-accordion-summary-heading">
                  Prior authorizations
                </div>
                <div className="claims-accordion-summary-button">
                  <Button> + New PA</Button>
                  <Button> + Appeal</Button>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="claims-grid-container">
                <PaDashboardGrid
                  isPaid={this.state.summaryType.toLowerCase() === "open"}
                  activetabs={activeMiniTabIndex}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default PaDashboard;
