import * as React from "react";
import { Component } from "react";
import PieChart from "../../shapes/PieChart";
import { Grid, Card } from "@material-ui/core";
import {
  getTop5FilledDrugsNumbers,
  getTop5FilledDrugsLabels,
  getAuthorizationNumbers,
  getOverrideNumbers,
  getAuthorizationLabels,
  getOverrideLabels
} from "../../../mocks/ClaimsMock";
import StatsSummary from "../../shared/FrxStatsSummary/FrxStatsSummary";

class PrescriberClaimsSummary extends Component {
  top5FilledData: Array<number> = getTop5FilledDrugsNumbers();
  top5FilledLabels: Array<string> = getTop5FilledDrugsLabels();

  authorizationData: Array<number> = getAuthorizationNumbers();
  overrideData: Array<number> = getOverrideNumbers();

  authorizationLabels: Array<string> = getAuthorizationLabels();
  overrideLabels: Array<string> = getOverrideLabels();
  render() {
    return (
      <Card variant="outlined" className="prescriber-claims-summary-root">
        <Grid container direction="row">
          <Grid md={3} item>
            <PieChart
              data={this.top5FilledData}
              tooltips={this.top5FilledLabels}
              total={this.top5FilledData.length}
            />
          </Grid>
          <Grid md={9} item className="prescriber-claims-summary-root__stats">
            <StatsSummary
              data={this.authorizationData}
              labels={this.authorizationLabels}
              total={2}
              heading={"Claims"}
            />
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default PrescriberClaimsSummary;
