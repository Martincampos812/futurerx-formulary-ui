import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import { getDrugDetailsOTHERSummary } from "../../../../../redux/slices/formulary/drugDetails/other/otherActionCreation";
import {
  GET_DRUG_SUMMARY_OTHER,
  KEY_ENTITY_ID,
} from "../../../../../api/http-drug-details";
import { checkIfApplicable } from "./MMOtherRemove";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsOTHERSummary: (a) => dispatch(getDrugDetailsOTHERSummary(a)),
  };
}
class MMOtherReplace extends React.Component<any, any> {
  state = {
    otherData: [] as any[],
  };

  getOTHERSummary = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_DRUG_SUMMARY_OTHER;
    apiDetails["pathParams"] = this.props.drug.id_formulary;
    apiDetails["keyVals"] = [
      { key: KEY_ENTITY_ID, value: this.props.drug.id_formulary },
    ];

    this.props.getDrugDetailsOTHERSummary(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          key: ele["id_edit"],
          udf: ele["edit_name"],
          code_value: ele["code_value"],
        };
        return curRow;
      });

      this.setState({
        otherData: settingsRows,
      });
    });
  };

  componentDidMount() {
    this.getOTHERSummary();
  }

  onDropdownChange = (e) => {
    console.log(e);
    let selDrpdwn: any = this.state.otherData.filter((a) => a.udf === e);
    this.setState({ selectedCriteria: selDrpdwn }); //, drug.id_formulary

    let drpDwnObj = {
      selection: selDrpdwn,
      formularyId: this.props.drug.id_formulary,
    };
    this.props.onDropdownChange(drpDwnObj);
  };

  render() {
    const { drug, activeTabIndex } = this.props;
    const { otherData } = this.state;
    let drpdwnoptions = otherData.map((e) => e.udf);

    return (
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfApplicable(drug) ? (
          <Grid item xs={5}>
            <div className="group other-label">
              <label>
                USER DEFINED FIELD <span className="astrict">*</span>
              </label>
              <DropDown
                className="formulary-type-dropdown"
                placeholder="Select"
                options={drpdwnoptions}
                key={activeTabIndex}
                onChange={(e) => this.onDropdownChange(e)}
              />
            </div>
          </Grid>
        ) : (
          <p>Not applicable for this formulary</p>
        )}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(MMOtherReplace);
