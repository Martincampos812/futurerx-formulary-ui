import React from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import PanelHeader from "./PanelHeader";
import { Checkbox } from "antd";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import getLobCode from "../../../../Utils/LobUtils";
import showMessage from "../../../../Utils/Toast";
import { getDrugDetailsFGCTiers, postApplyFGCDrug } from "../../../../../../redux/slices/formulary/drugDetails/fgc/fgcActionCreation";
import * as fgcConstants from "../../../../../../api/http-drug-details";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsFGCTiers: (a) => dispatch(getDrugDetailsFGCTiers(a)),
    postApplyFGCDrug: (a) => dispatch(postApplyFGCDrug(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary_lob_id: state?.application?.formulary_lob_id,
  };
};

class FGCPanelGrid extends React.Component<any, any> {
  render() {
    const classesArray =
      this.props.panelTitleAlignment !== undefined
        ? this.props.panelTitleAlignment
        : null;
    const panelGridTop = this.props.panelGridTitle.map((e, index) => {
      const classes = `item ${classesArray ? classesArray[index] : null}`;
      return <div className={classes}>{e}</div>;
    });
    let panelGridBottom = (
      <div className="row">
        <div className="item no-data">No Rows to Display</div>
      </div>
    );
    if (this.props.panelGridValue.length > 0) {
      panelGridBottom = this.props.panelGridValue.map((e, index) => {
        let eLen = e?.length;
        return (
          <div className="row">
            {e.map((text, index) => {
              const classes = `item ${
                classesArray ? classesArray[index] : null
              }`;

              let renderedText;
              
              if(text?.type === "checkbox") {
                renderedText = <Checkbox defaultChecked={false} checked={text?.checked} name={text?.name} onChange={this.props.checkBoxHandler} />
              } else  {
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
    return (
      <div className="panel-grid text-center first-left">
        <div className="top">{panelGridTop}</div>
        <div className="bottom">{panelGridBottom}</div>
      </div>
    );
  }
}

interface fgcApplyPayload {
  full_gap_coverage: any[],
  partial_gap_coverage: any[]
}

const initialApplyPayload: fgcApplyPayload = {
  full_gap_coverage: [],
  partial_gap_coverage: [],
}

class FGC extends React.Component<any, any> {
  state = {
    panelGridTitle1: [
      "Tier Number",
      "Tier Descripion",
      "Full Gap Coverage",
      "Partial Gap Coverage",
    ],
    panelTitleAlignment1: ["left", "left", "center", "center"],
    panelGridValue1: [],
  };
  
  loadPanel = true;

  applyPayload: fgcApplyPayload = {
    full_gap_coverage: [],
    partial_gap_coverage: []
  }

  buildPayload = () => {
    this.applyPayload.full_gap_coverage = [];
    this.applyPayload.partial_gap_coverage = [];
    let panelGridValues = this.state.panelGridValue1;
    panelGridValues.forEach((e: any) => {
      e.forEach(element => {
        if(element?.type === "checkbox" && element?.checked === true) {

          let fgcId = element?.name.split("-")[0];
          let fgcType = element?.name.split("-")[1];

          if(fgcType === "FGC"){
            let addEle = true;
            this.applyPayload.full_gap_coverage.forEach(e => {
              if(e === fgcId) {
                addEle = false;
                return;
              }
            });

            if(addEle) {
              this.applyPayload.full_gap_coverage.push(fgcId);
            }

          } else if(fgcType === "PGC"){
            let addEle = true;
            this.applyPayload.partial_gap_coverage.forEach(e => {
              if(e === fgcId) {
                addEle = false;
                return;
              }
            });

            if(addEle) {
              this.applyPayload.partial_gap_coverage.push(fgcId);
            }

          }
        }
      });
    })
  }

  onApplyHandler = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = fgcConstants.APPLY_FGC_DRUG;
    apiDetails["keyVals"] = [
      { key: fgcConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
    ];
    apiDetails["messageBody"] = {};

    this.buildPayload();
    
    apiDetails["messageBody"] = this.applyPayload;
    apiDetails["pathParams"] = this.props?.formulary_id + "/" +  getLobCode(this.props.formulary_lob_id) ;
    console.log("The API Details - ", apiDetails);

    // Replace and Append Drug method call
    this.props.postApplyFGCDrug(apiDetails).then((json) => {
      if (json.payload && json.payload.code && json.payload.code === "200") {
        showMessage("Success", "success");
        this.getFGCTiers();
      } else {
        showMessage("Failure", "error");
      }
    });
  };

  getFGCTiers = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = fgcConstants.GET_DRUG_FGC_TIERS;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [{ key: fgcConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];

    this.props.getDrugDetailsFGCTiers(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.data ? json.payload.data : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["tier_value"],
          ele["tier_label"],
        ];
        let checkBoxFGC = {
          type: "checkbox",
          name: ele["id_formulary_tier"] + "-FGC",
          checked: ele["coverageType"] === "FGC" ? true : false,
        }
        let checkBoxPGC = {
          type: "checkbox",
          name: ele["id_formulary_tier"] + "-PGC",
          checked: ele["coverageType"] === "PGC" ? true : false,
        }
        curRow.push(checkBoxFGC);
        curRow.push(checkBoxPGC);
        return curRow;
      });

      this.setState({
        panelGridValue1: rows,
      });

      this.loadPanel = false;
    });
  }

  checkBoxHandler = (e) => {
    console.log(e);
    let checkBoxName = e?.target?.name;
    let splitCB = checkBoxName.split("-");

    let altSplitIndex = splitCB[0];
    let altSplitType = splitCB[1];
    let altChecboxName = altSplitIndex + "-" + (altSplitType === "FGC" ? "PGC" : "FGC");

    let checkBoxValue = e?.target?.checked;
    
    let panelGridValues = this.state.panelGridValue1;
    panelGridValues.forEach((pgElement: any) => {
      console.log(pgElement);

      pgElement.forEach(element => {
        if (checkBoxName === element?.name && element?.type === "checkbox") {
          element.checked = checkBoxValue;
        }

        if(altChecboxName === element?.name && element?.type === "checkbox" && checkBoxValue === true) {
          element.checked = !checkBoxValue;
        }
      });

      console.log(pgElement);
    });
    
    this.setState({
      panelGridValue1: panelGridValues,
    })
  }

  componentDidMount() {
    if(this.loadPanel) {
      this.getFGCTiers();
    }
  }

  render() {
    return (
      <>
        <div className="bordered">
          <PanelHeader title="Full Gap Coverage" tooltip="Full Gap Coverage" />
          <div className="inner-container bg-light-grey">
            <FGCPanelGrid
              panelGridTitle={this.state.panelGridTitle1}
              panelGridValue={this.state.panelGridValue1}
              panelTitleAlignment={this.state.panelTitleAlignment1}
              checkBoxHandler={this.checkBoxHandler}
            />
          </div>
        </div>
        <Box display="flex" justifyContent="flex-end">
          <Button label="Apply" onClick={this.onApplyHandler} />
        </Box>
        <ToastContainer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FGC);
