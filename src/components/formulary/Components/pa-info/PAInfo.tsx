import React, {Component} from "react";
import {Grid, Typography, Container} from "@material-ui/core";
import DialogPopup from "../../../shared/FrxDialogPopup/FrxDialogPopup";

import "./PAInfo.scss";

export interface PAInfoProps {
  openPopup: boolean;
  onClose: any;
  paInfo: any;
}
interface State {}

export default class PAInfo extends Component<PAInfoProps, State> {
  state = {};

  componentDidMount() {
    console.log(this.props.paInfo);
  }
  render() {
    const {paInfo} = this.props;
    return (
      <DialogPopup
        className="frx-PA-Info-Dialogpopup"
        open={this.props.openPopup}
        positiveActionText="Set Location"
        negativeActionText="Cancel"
        title=""
        showActions={false}
        handleClose={this.props.onClose}
        handleAction={() => {
          console.log("do some action");
        }}
        height="100vh"
      >
        <div className="PAInfo-contianer">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h2">{paInfo.title}</Typography>
            </Grid>
            <Grid container item sm={12}>
              <Grid item sm={12}>
                <Typography variant="subtitle2">Indications</Typography>
              </Grid>
              <Grid item>
                {/* <Container> */}
                <Typography>{paInfo.indication}</Typography>
                {/* </Container> */}
              </Grid>
            </Grid>
            <Grid container item sm={12}>
              <Grid item sm={12}>
                <Typography variant="subtitle2">
                  Required Medical Information
                </Typography>
              </Grid>
              <Grid item sm={12}>
                {/* <Container> */}
                <Typography>{paInfo.medicalInfo}</Typography>
                {/* </Container> */}
              </Grid>
            </Grid>
            <Grid container item sm={12}>
              <Grid item sm={12}>
                <Typography variant="subtitle2">Coverage Duration</Typography>
                <Typography>{paInfo.coverage_duration}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </DialogPopup>
    );
  }
}
