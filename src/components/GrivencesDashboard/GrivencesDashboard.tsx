import React from "react";
import "./GrivencesDashboard.scss";
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

import { TabInfo } from "../../models/tab.model";
import FrxGrievenceChart from "../shared/FrxChart/FrxGrievenceChart";
import { getGrivencesBarChartData } from "../../mocks/GrivencesChartMock";
import GrivencesDashboardGrid from "./Components/GrivencesDashboardGrid/GrivencesDashboardGrid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GrievanceOverlay from "../Grievances/components/GrievanceOverlay/GrievanceOverlay";
interface State {
  summaryType: "open" | "closed" | "withdrawn" | "total";
  activeTabIndex: number;
  newGrievances: boolean;
}
interface Props {
  // selectedItem: string;
  // loading: boolean;
  onSwitchNewGrievance: any;
}

class GrivencesDashboard extends React.Component<Props> {
  state: State = {
    summaryType: "total",
    activeTabIndex: 0,
    newGrievances: false,
  };

  onSelectStatItem = (statType: string) => {
    console.log("stat type ", statType);
    this.setState({ summaryType: statType });
  };
  onNewGrievancesClickHandler = () => {
    console.log("new grievances");
    this.setState({ activeTabIndex: 0 });
    this.props.onSwitchNewGrievance();
  };
  onGrievancesClickHandler = () => {
    console.log("grivences hyperlnk", this.props);
    this.setState({
      newGrievances: !this.state.newGrievances,
    });
  };

  render() {
    return (
      <div className="grievance-content">
        <FrxGrievenceChart
          onSelectStatItem={this.onSelectStatItem}
          data={getGrivencesBarChartData()}
        />
        <div className="claims-accordion">
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={
                  <div className="claims-accordion-summary spaceleft">
                    <div className="claims-accordion-summary-heading">
                      Grievances
                    </div>
                    <div className="claims-accordion-summary-button">
                      <Button onClick={this.onNewGrievancesClickHandler}>
                        + New Grievance
                      </Button>
                    </div>
                  </div>
                }
                label=""
              />
            </AccordionSummary>
            <AccordionDetails>
              <div className="claims-grid-container">
                <GrivencesDashboardGrid
                  isPaid={this.state.summaryType.toLowerCase() === "open"}
                  onColumnCellClick={this.onGrievancesClickHandler}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default GrivencesDashboard;
