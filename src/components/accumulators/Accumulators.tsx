import React from "react";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { TabInfo } from "../../models/tab.model";
import NotesPopup from "../member/MemberNotesPopup";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";

import FrxTabs from "../shared/FrxTabs/FrxTabs";
import FrxMiniTabs from "../shared/FrxMiniTabs/FrxMiniTabs";
import {
  getAccumulatorTabNames,
  getStepperConfig,
  getAccumulatorMiniTabNames,
  getStepper2Config,
  getAccumulatorData,
} from "../../mocks/AccumulatorsMock";
import AccumulatorsGrid from "../AccumulatorsGrid/AccumulatorsGrid";

import "./Accumulators.scss";
import Stepper from "../shapes/Stepper";

class Accumulators extends React.Component {
  state = {
    tabs: getAccumulatorTabNames(),
    activeTabIndex: 0,
    miniTabs: getAccumulatorMiniTabNames(),
    activeMiniTabIndex: 0,
    isNotesOpen: false,
    openGridDialog: false,
  };

  openNotesDialog = () => {
    console.log("sssssssssss");
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  openGridDialog = () => {
    console.log("openGridDialog clicked");
    this.setState({
      openGridDialog: !this.state.openGridDialog,
    });
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

  handleStepperClick = (stage: number) => {
    console.log("clicked stage", stage);
    this.setState({
      openGridDialog: !this.state.openGridDialog,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Card variant="outlined" className="accumulators-root">
          <div className="accumulators-root__note-icon">
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
              category="Accumulators"
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
          {this.state.activeTabIndex === 0 ? (
            <div className="accumulators-root__tabcontent">
              <Grid
                className="accumulators-root__tabcontent__header"
                container
                xs={12}
              >
                <Grid item xs={6}>
                  <FrxMiniTabs
                    tabList={this.state.miniTabs}
                    activeTabIndex={this.state.activeMiniTabIndex}
                    onClickTab={this.onClickMiniTab}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  className="accumulators-root__tabcontent__header__legend"
                >
                  <ul>
                    <li>
                      <svg height={10} width={10}>
                        <circle cx={5} cy={5} r={5} fill={"#8FAADA"} />
                      </svg>
                      IN PROGRESS
                    </li>
                    <li>
                      <svg height={10} width={10}>
                        <circle cx={5} cy={5} r={5} fill={"#80C483"} />
                      </svg>
                      LIMIT MET
                    </li>
                    <li>
                      <svg height={10} width={10}>
                        <circle cx={5} cy={5} r={5} fill={"#694298"} />
                      </svg>
                      LIMIT NOT MET
                    </li>
                  </ul>
                </Grid>
              </Grid>
              <Grid
                className="accumulators-root__tabcontent__body"
                container
                xs={12}
              >
                <Stepper
                  numStages={3}
                  config={getAccumulatorData()}
                  handleStepperClick={this.handleStepperClick}
                />
              </Grid>
            </div>
          ) : this.state.activeTabIndex === 1 ? (
            <div className="accumulators-root__tabcontent">
              <Grid
                className="accumulators-root__tabcontent__header"
                container
                xs={12}
              >
                <Grid item xs={6}>
                  <FrxMiniTabs
                    tabList={this.state.miniTabs}
                    activeTabIndex={this.state.activeMiniTabIndex}
                    onClickTab={this.onClickMiniTab}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  className="accumulators-root__tabcontent__header__legend"
                >
                  <ul>
                    <li>
                      <svg height={10} width={10}>
                        <circle cx={5} cy={5} r={5} fill={"#8FAADA"} />
                      </svg>
                      IN PROGRESS
                    </li>
                    <li>
                      <svg height={10} width={10}>
                        <circle cx={5} cy={5} r={5} fill={"#80C483"} />
                      </svg>
                      LIMIT MET
                    </li>
                    <li>
                      <svg height={10} width={10}>
                        <circle cx={5} cy={5} r={5} fill={"#694298"} />
                      </svg>
                      LIMIT NOT MET
                    </li>
                  </ul>
                </Grid>
              </Grid>
              <Grid
                className="accumulators-root__tabcontent__body"
                container
                xs={12}
              >
                <Stepper
                  numStages={3}
                  config={getAccumulatorData()}
                  handleStepperClick={this.handleStepperClick}
                />
              </Grid>
            </div>
          ) : (
            ""
          )}
          <DialogPopup
            positiveActionText="save"
            negativeActionText="cancel"
            title="ACCUMULATOR DETAILS"
            handleClose={this.openGridDialog}
            handleAction={this.openGridDialog}
            open={this.state.openGridDialog}
            showActions={false}
            showCloseIcon={false}
            className="accumulators-root__grid-dialog-popup"
          >
            <AccumulatorsGrid />
          </DialogPopup>
        </Card>
      </React.Fragment>
    );
  }
}

export default Accumulators;
