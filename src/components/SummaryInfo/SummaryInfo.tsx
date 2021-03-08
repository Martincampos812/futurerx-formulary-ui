// React imports
import React from "react";

// Material imports
import { Container, Grid } from "@material-ui/core";

import Demographics from "../member/Demographics";
import Eligibility from "../member/Eligibility";
import Providers from "../member/Providers";
import Preferences from "../member/Preferences";

// Styling imports
import "./SummaryInfo.scss";

class SummaryInfo extends React.Component<any> {
  render() {
    return (
      <Container className="summary-info-root">
        <Grid container direction="row" spacing={1}>
          <Grid md={3} item>
            <Demographics
              memberInfo={this.props ? this.props.memberInfo : undefined}
              demographicsData={this.props.demographicsData}
            />
          </Grid>
          <Grid md={3} item>
            <Eligibility elegibilityData={this.props.elegibilityData} />
          </Grid>
          <Grid md={3} item>
            <Providers providersData={this.props.providersData} />
          </Grid>
          <Grid md={3} item>
            <Preferences prefrencesData={this.props.prefrencesData} />
          </Grid>
        </Grid>
        <div className="dev-status wip">TODO: QA ready</div>
      </Container>
    );
  }
}

export default SummaryInfo;
