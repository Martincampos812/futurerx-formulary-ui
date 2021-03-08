import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../../mocks/formulary/mock-data";
import CustomizedSwitches from "./CustomizedSwitches";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import STS from "./STS";
import STF from "./STF";
import {
  getStSummary,
  getStGrouptDescriptions,
  getStTypes,
  getDrugLists,
} from "../../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";

function mapDispatchToProps(dispatch) {
  return {
    getStSummary: (a) => dispatch(getStSummary(a)),
    getStGrouptDescriptions: (a) => dispatch(getStGrouptDescriptions(a)),
    getStTypes: (a) => dispatch(getStTypes(a)),
    getDrugLists: (a) => dispatch(getDrugLists(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    current_formulary: state.application.formulary,
    stData: state.stepTherapyReducer.data,
  };
};

interface tabsState {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  panelGridValue: any;
}

class StepTherapy extends React.Component<any, tabsState> {
  state = {
    miniTabs: getMiniTabs(),
    activeMiniTabIndex: 0,
    tabs: getTapList(),
    panelGridTitle: [
      "Type",
      "Number Of Groups",
      "Added Groups",
      "Removed Groups",
      "Number OF Drugs",
      "Added Drugs",
      "Removed Drugs",
    ],
    panelGridValue: [],
  };
  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };

  componentWillReceiveProps(nextProps) {
    // debugger;
    console.log("TIER: componentWillReceiveProps", nextProps);

    let tmpData = nextProps.stData;
    if (tmpData && Array.isArray(tmpData) && tmpData.length > 0) {
      var tierOption: any[] = [];
      var result = tmpData.map(function (el) {
        var curRow = [
          el["st_type_name"],
          el["total_group_description_count"],
          el["added_group_description_count"],
          el["removed_group_description_count"],
          el["total_drug_count"],
          el["added_drug_count"],
          el["removed_drug_count"],
        ];
        return curRow;
      });
      // if (tierOption.length > 0) {
      //   let lastTier = tierOption[tierOption.length - 1];
      //   this.state.newTierId = lastTier.id_tier + 1;
      // }
      this.setState({
        // tierDefinationColumns: TierColumns,
        panelGridValue: result,
        //tierOption: tierOption
      });
    }
  }
  componentDidMount() {
    const TierDefinationData = this.props
      .getStSummary(this.props?.formulary_id)
      .then((json) => {
        // debugger;
        let tmpData = json.payload.result;
        var rows = tmpData.map(function (el) {
          var curRow = [
            el["st_type_name"],
            el["total_group_description_count"],
            el["added_group_description_count"],
            el["removed_group_description_count"],
            el["total_drug_count"],
            el["added_drug_count"],
            el["removed_drug_count"],
          ];
          return curRow;
        });

        this.setState({
          panelGridValue: rows,
        });
      });
  }
  render() {
    return (
      <div className="drug-detail-LA-root">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader title="STEP THERAPY - DRUG SELECTION" />
                    <div className="inner-container">
                      <PanelGrid
                        panelGridTitle={this.state.panelGridTitle}
                        panelGridValue={this.state.panelGridValue}
                      />
                      <br />
                      <STS />
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepTherapy);
