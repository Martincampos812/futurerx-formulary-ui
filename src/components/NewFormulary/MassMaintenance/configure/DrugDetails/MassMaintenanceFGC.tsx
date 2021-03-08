import React from "react";
import { connect } from "react-redux";
import { Checkbox } from "antd";
import {
  APPLY_FGC_DRUG,
  GET_DRUG_FGC_TIERS,
  KEY_ENTITY_ID,
} from "../../../../../api/http-drug-details";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import PanelHeader from "../../../DrugDetails/components/FormularyConfigure/components/PanelHeader";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import {
  getDrugDetailsFGCTiers,
  postApplyFGCDrug,
} from "../../../../../redux/slices/formulary/drugDetails/fgc/fgcActionCreation";
import "./MassMaintenanceDrugDetails.scss";
import Button from "../../../../shared/Frx-components/button/Button";
import getLobCode from "../../../Utils/LobUtils";
import { checkIfTABApplicableByCode } from "./MMUtils";

const mapStateToProps = (state) => {
  return {
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
    id_lob: state.maintenance?.selectedRow?.id_lob,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsFGCTiers: (a) => dispatch(getDrugDetailsFGCTiers(a)),
    postApplyFGCDrug: (a) => dispatch(postApplyFGCDrug(a)),
  };
}

interface fgcApplyPayload {
  full_gap_coverage: any[];
  partial_gap_coverage: any[];
}

const initialApplyPayload: fgcApplyPayload = {
  full_gap_coverage: [],
  partial_gap_coverage: [],
};

class FGCPanelGrid extends React.Component<any, any> {
  render() {
    const panelTitleAl = this.props.panelTitleAlignment;
    const classesArray = panelTitleAl !== undefined ? panelTitleAl : null;

    const panelGridTop = this.props.panelGridTitle.map((e, index) => {
      const classes = `item ${classesArray ? classesArray[index] : null}`;
      return <div className={classes}>{e}</div>;
    });

    let panelGridBottom = (
      <div className="row">
        <div className="item no-data">No Rows to Display</div>
      </div>
    );

    let panelGridValue1List = this.props.panelGridValue;
    const formularyId = this.props.formularyId;

    if (panelGridValue1List && panelGridValue1List.length > 0) {
      let panelGridValue = panelGridValue1List.find(
        (e) => e.formularyId === formularyId
      )?.grid;

      if (panelGridValue && panelGridValue.length > 0) {
        panelGridBottom = panelGridValue.map((e, index) => {
          let eLen = e?.length;
          return (
            <div className="row">
              {e.map((text, index) => {
                const classes = `item ${
                  classesArray ? classesArray[index] : null
                }`;

                let renderedText;

                if (text?.type === "checkbox") {
                  renderedText = (
                    <Checkbox
                      defaultChecked={false}
                      checked={text?.checked}
                      name={text?.name}
                      onChange={this.props.checkBoxHandler}
                    />
                  );
                } else {
                  renderedText = text;
                }
                return (
                  <div className={classes}>
                    <span>{renderedText}</span>
                  </div>
                );
              })}
            </div>
          );
        });
      }
    }
    return (
      <div className="panel-grid text-center first-left">
        <div className="top">{panelGridTop}</div>
        <div className="bottom fgc-grid">{panelGridBottom}</div>
      </div>
    );
  }
}

class MassMaintenanceFGC extends React.Component<any, any> {
  state = {
    gridColumns: getColumns(),
    panelGridTitle1: [
      "Tier Number",
      "Tier Descripion",
      "Full Gap Coverage",
      "Partial Gap Coverage",
    ],
    panelTitleAlignment1: ["left", "left", "center", "center"],
    panelGridValue1: [] as any[],
  };

  applyPayload: fgcApplyPayload = {
    full_gap_coverage: [],
    partial_gap_coverage: [],
  };

  addNew = () => {};

  checkBoxHandler = (e, formularyId) => {
    console.log(e);
    let checkBoxName = e?.target?.name;
    let splitCB = checkBoxName.split("-");

    let altSplitIndex = splitCB[0];
    let altSplitType = splitCB[1];
    let altChecboxName =
      altSplitIndex + "-" + (altSplitType === "FGC" ? "PGC" : "FGC");

    let checkBoxValue = e?.target?.checked;

    let panelGridValues = this.state.panelGridValue1.find(
      (a) => a.formularyId === formularyId
    )?.grid;

    if (panelGridValues && panelGridValues.length > 0) {
      panelGridValues.forEach((pgElement: any) => {
        console.log(pgElement);

        pgElement.forEach((element) => {
          if (checkBoxName === element?.name && element?.type === "checkbox") {
            element.checked = checkBoxValue;
          }

          if (
            altChecboxName === element?.name &&
            element?.type === "checkbox" &&
            checkBoxValue === true
          ) {
            element.checked = !checkBoxValue;
          }
        });

        console.log(pgElement);
      });

      let panelGridValuesTemp = [...this.state.panelGridValue1];
      panelGridValuesTemp = panelGridValuesTemp.filter(
        (e) => e.formularyId !== formularyId
      );

      let panelGridobj = {
        formularyId,
        grid: panelGridValues,
      };

      panelGridValuesTemp.push(panelGridobj);

      this.setState({
        panelGridValue1: panelGridValuesTemp,
      });
    }
  };

  getFGCTiers = (formularyId) => {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_DRUG_FGC_TIERS;
    apiDetails["pathParams"] = formularyId;
    apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

    this.props.getDrugDetailsFGCTiers(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.data ? json.payload.data : [];

      let rows = tmpData.map((ele) => {
        let curRow = [ele["tier_value"], ele["tier_label"]];
        let checkBoxFGC = {
          type: "checkbox",
          name: ele["id_formulary_tier"] + "-FGC",
          checked: ele["coverageType"] === "FGC" ? true : false,
        };
        let checkBoxPGC = {
          type: "checkbox",
          name: ele["id_formulary_tier"] + "-PGC",
          checked: ele["coverageType"] === "PGC" ? true : false,
        };
        curRow.push(checkBoxFGC);
        curRow.push(checkBoxPGC);
        return curRow;
      });

      let panelGridValues = [...this.state.panelGridValue1];
      panelGridValues = panelGridValues.filter(
        (e) => e.formularyId !== formularyId
      );

      let panelGridobj = {
        formularyId,
        grid: rows,
      };

      panelGridValues.push(panelGridobj);

      this.setState({
        panelGridValue1: panelGridValues,
      });
    });
  };

  componentDidMount() {
    const formularyList = this.props.maintenanceFormularies.list;
    formularyList.forEach((drug) => this.getFGCTiers(drug.id_formulary));
  }

  renderPanelContent = () => {
    const formularyList = this.props.maintenanceFormularies.list;
    const {
      panelGridTitle1,
      panelTitleAlignment1,
      panelGridValue1,
    } = this.state;

    return (
      <>
        {formularyList.map((drug) => {
          let applicable = checkIfTABApplicableByCode(drug, "FGC");
          return (
            applicable && (
              <div className="bordered details-top">
                <PanelHeader
                  title="Full Gap Coverage"
                  tooltip="Full Gap Coverage"
                />
                <div className="inner-container bg-light-grey">
                  <FGCPanelGrid
                    formularyId={drug.id_formulary}
                    panelGridTitle={panelGridTitle1}
                    panelGridValue={panelGridValue1}
                    panelTitleAlignment={panelTitleAlignment1}
                    checkBoxHandler={(e) =>
                      this.checkBoxHandler(e, drug.id_formulary)
                    }
                  />
                </div>
              </div>
            )
          );
        })}
      </>
    );
  };

  buildPayload = (payload: any, formularyId: string) => {
    payload.full_gap_coverage = [];
    payload.partial_gap_coverage = [];
    let panelGridValues = this.state.panelGridValue1.find(
      (e) => e.formularyId === formularyId
    )?.grid;

    if (panelGridValues && panelGridValues.length > 0) {
      panelGridValues.forEach((e: any) => {
        e.forEach((element) => {
          if (element?.type === "checkbox" && element?.checked === true) {
            let fgcId = element?.name.split("-")[0];
            let fgcType = element?.name.split("-")[1];

            if (fgcType === "FGC") {
              let addEle = true;
              payload.full_gap_coverage.forEach((e) => {
                if (e === fgcId) {
                  addEle = false;
                  return;
                }
              });

              if (addEle) {
                payload.full_gap_coverage.push(fgcId);
              }
            } else if (fgcType === "PGC") {
              let addEle = true;
              payload.partial_gap_coverage.forEach((e) => {
                if (e === fgcId) {
                  addEle = false;
                  return;
                }
              });

              if (addEle) {
                payload.partial_gap_coverage.push(fgcId);
              }
            }
          }
        });
      });
    }
  };

  handleSave = () => {
    this.props.maintenanceFormularies.list.map((drug) => {
      if (checkIfTABApplicableByCode(drug, "FGC")) {
        this.applyPayload = initialApplyPayload;

        let formularyId = drug.id_formulary;

        let apiDetails = {};
        apiDetails["apiPart"] = APPLY_FGC_DRUG;
        apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];
        apiDetails["messageBody"] = {};

        this.buildPayload(this.applyPayload, formularyId);

        apiDetails["messageBody"] = this.applyPayload;
        apiDetails["pathParams"] =
          formularyId + "/" + getLobCode(this.props.id_lob);
        console.log("The API Details - ", apiDetails);

        // Replace and Append Drug method call
        this.props.postApplyFGCDrug(apiDetails).then((json) => {
          if (
            json.payload &&
            json.payload.code &&
            json.payload.code === "200"
          ) {
            console.log(`---- API Success----`);
            const formularyList = this.props.maintenanceFormularies.list;
            formularyList.forEach((drug) =>
              this.getFGCTiers(drug.id_formulary)
            );
          } else {
            console.log(`---- API Failed----`);
          }
        });
      }
    });
  };

  render() {
    const { gridColumns } = this.state;

    return (
      <div className="mm-tier-root">
        <MMDDSelectedFormulariesGrid
          gridColumns={gridColumns}
          maintenanceFormularies={this.props.maintenanceFormularies}
          addNew={this.addNew}
        />

        <div className="bordered mm-configure-pa-auth details-top">
          {this.renderPanelContent()}

          <div className="inner-container mm-configure-pa-auth-grid p-20">
            <div className="button-container-root">
              <span className="white-bg-btn">
                <Button label="Save" onClick={this.handleSave} />
              </span>
              <Button label="Save &amp; Continue" onClick={this.handleSave} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenanceFGC);
