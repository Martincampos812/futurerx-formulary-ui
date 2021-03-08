import React, { Component } from "react";
import { Checkbox, Button, Grid } from "@material-ui/core";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { getTier } from "../../../../../redux/slices/formulary/tier/tierActionCreation";
import * as tierConstants from "../../../../../api/http-tier";
import * as commonConstants from "../../../../../api/http-commons";
import { connect } from "react-redux";

import "./Tire.scss";

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    getTier: (a) => dispatch(getTier(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id
  };
};

interface Props {
  tierChanged: (a) => void;
  advancedSearchBody: any;
  formulary_lob_id: any;
  formulary: any;
  getTier: (a) => any;
}
interface State { }
const tires = [
  {
    id: 1,
    lable: "Tier 0",
    key: 0,
    isDisabled: false,
  },
  {
    id: 2,
    lable: "Tier 1",
    key: 1,
    isDisabled: false,
  },
  {
    id: 3,
    lable: "Tier 2",
    key: 2,
    isDisabled: false,
  },
  {
    id: 4,
    lable: "Tier 3",
    key: 3,
    isDisabled: false,
  },
  {
    id: 5,
    lable: "Tier 4",
    key: 4,
    isDisabled: false,
  },
  {
    id: 6,
    lable: "Tier 5",
    key: 5,
    isDisabled: false,
  },
  {
    id: 7,
    lable: "Tier 6",
    key: 6,
    isDisabled: false,
  },
  {
    id: 8,
    lable: "Tier 7",
    key: 7,
    isDisabled: false,
  },
  {
    id: 9,
    lable: "Tier 8",
    key: 8,
    isDisabled: false,
  },
  {
    id: 10,
    lable: "No Tier ",
    key: -1,
    isDisabled: false,
  },
];

const tiresNonMcr = [
  {
    id: 2,
    lable: "Tier 1",
    key: 1,
    isDisabled: false,
  },
  {
    id: 3,
    lable: "Tier 2",
    key: 2,
    isDisabled: false,
  },
  {
    id: 4,
    lable: "Tier 3",
    key: 3,
    isDisabled: false,
  },
  {
    id: 5,
    lable: "Tier 4",
    key: 4,
    isDisabled: false,
  },
  {
    id: 6,
    lable: "Tier 5",
    key: 5,
    isDisabled: false,
  },
  {
    id: 7,
    lable: "Tier 6",
    key: 6,
    isDisabled: false,
  },
  {
    id: 8,
    lable: "Tier 7",
    key: 7,
    isDisabled: false,
  },
  {
    id: 9,
    lable: "Tier 8",
    key: 8,
    isDisabled: false,
  },
  {
    id: 10,
    lable: "Tier 9",
    key: 9,
    isDisabled: false,
  },
  {
    id: 11,
    lable: "Tier 10",
    key: 10,
    isDisabled: false,
  },
  {
    id: 12,
    lable: "Tier 11",
    key: 11,
    isDisabled: false,
  },
  {
    id: 13,
    lable: "Tier 12",
    key: 12,
    isDisabled: false,
  },
  {
    id: 14,
    lable: "Tier 13",
    key: 13,
    isDisabled: false,
  },
  {
    id: 15,
    lable: "Tier 14",
    key: 14,
    isDisabled: false,
  },
  {
    id: 16,
    lable: "Tier 15",
    key: 15,
    isDisabled: false,
  },
  {
    id: 17,
    lable: "Tier 16",
    key: 16,
    isDisabled: false,
  },
  {
    id: 18,
    lable: "Tier 17",
    key: 17,
    isDisabled: false,
  },
  {
    id: 19,
    lable: "Tier 18",
    key: 18,
    isDisabled: false,
  },
  {
    id: 20,
    lable: "Tier 19",
    key: 19,
    isDisabled: false,
  },
  {
    id: 21,
    lable: "Tier 20",
    key: 20,
    isDisabled: false,
  },
  {
    id: 22,
    lable: "No Tier ",
    key: -1,
    isDisabled: false,
  },
];

class Tire extends Component<Props, State> {
  state = {
    tireList: [],
    selectedTire: [],
  };

  onSelectTire = (e, selectedTire) => {
    let currentTires: any = [...this.state.tireList];
    let currentSelectedTire: any = [...this.state.selectedTire];
    if (e.target.checked) {
      currentSelectedTire.push(selectedTire);
      currentTires.map((tire) => {
        if (tire.id === selectedTire.id) {
          tire["isChecked"] = e.target.checked;
        }
      });

      this.props.tierChanged(currentTires);

      this.setState({
        tireList: currentTires,
        selectedTire: currentSelectedTire,
      });
    } else {
      currentTires = currentTires.map((tire) => {
        if (tire.id === selectedTire.id) {
          tire["isChecked"] = e.target.checked;
        }
        return tire;
      });

      currentSelectedTire = currentSelectedTire.filter(
        (tire) => tire.id !== selectedTire.id
      );

      /*this.setState({
        tireList: currentTires.map((tire) => {
          if (tire.id === selectedTire.id) {
            tire["isChecked"] = e.target.checked;
          }
          return tire;
        }),
        selectedTire: currentSelectedTire.filter(
          (tire) => tire.id !== selectedTire.id
        ),
      });*/

      this.props.tierChanged(currentTires);

      this.setState({
        tireList: currentTires,
        selectedTire: currentSelectedTire,
      });
    }
  };

  onSelectAll = () => {
    const currentTires: any = [...this.state.tireList];
    currentTires.map((tire) => {
      tire["isChecked"] = tire["isDisabled"] ? false : true;
    });
    this.props.tierChanged(currentTires);
    this.setState({ tireList: currentTires, selectedTire: currentTires });
  };

  onUnselectAll = () => {
    const currentTires: any = [...this.state.tireList];
    currentTires.map((tire) => {
      tire["isChecked"] = false;
    });
    this.props.tierChanged(currentTires);
    this.setState({ tireList: currentTires, selectedTire: currentTires });
  };

  componentDidMount = () => {
    let setTiers = Array();
    let noTier: any = false;
    if (this.props.advancedSearchBody && this.props.advancedSearchBody.additional_filter) {
      setTiers = this.props.advancedSearchBody.additional_filter.tiers;
      noTier = this.props.advancedSearchBody.additional_filter.is_no_tier;
    }
    if (this.props.formulary_lob_id == 1) {
      tires.map((tire) => (tire["isChecked"] = (setTiers.includes(tire['key']) || (noTier && tire['key'] == -1) ? true : false)));
      this.props.tierChanged(tires);
      this.setState({ tireList: tires });
    } else {
      if (this.props.formulary) {
        let apiDetails = {};
        apiDetails["apiPart"] = tierConstants.FORMULARY_TIERS;
        apiDetails["pathParams"] = this.props.formulary.id_formulary;
        apiDetails["keyVals"] = [
          { key: commonConstants.KEY_ENTITY_ID, value: this.props.formulary.id_formulary },
        ];

        const TierDefinationData = this.props.getTier(apiDetails).then((json) => {
          if (json.payload && json.payload.data) {
            let tmpData = json.payload.data;
            let formularyTiers = Array();
            tmpData.map(function (el) {
              formularyTiers.push(el['id_tier']);
            });
            tiresNonMcr.map(tierItem => {
              if (formularyTiers.includes(tierItem.key)) {
                tierItem.isDisabled = false;
              } else {
                if (tierItem.key != -1) {
                  tierItem.isDisabled = true;
                }
              }
            })
            tiresNonMcr.map((tire) => (tire["isChecked"] = (setTiers.includes(tire['key']) || (noTier && tire['key'] == -1) ? true : false)));
            this.props.tierChanged(tiresNonMcr);
            this.setState({ tireList: tiresNonMcr });
          } else {
            tiresNonMcr.map((tire) => (tire["isChecked"] = (setTiers.includes(tire['key']) || (noTier && tire['key'] == -1) ? true : false)));
            this.props.tierChanged(tiresNonMcr);
            this.setState({ tireList: tiresNonMcr });
          }
        });
      } else {
        tiresNonMcr.map((tire) => (tire["isChecked"] = (setTiers.includes(tire['key']) || (noTier && tire['key'] == -1) ? true : false)));
        this.props.tierChanged(tiresNonMcr);
        this.setState({ tireList: tiresNonMcr });
      }
    }
  };

  render() {
    const { tireList } = this.state;
    let renderElement: any;
    if (tireList.length >= 0) {
      renderElement = (
        <div className="tire-list">
          {/* <Grid container> */}
          {tireList.map((tire: any) => (
            // <Grid item sm={3} zeroMinWidth>
            <span key={tire.id} className="__list">
              <Checkbox
                color="primary"
                style={{ borderRadius: "15px" }}
                onClick={(e) => {
                  this.onSelectTire(e, tire);
                }}
                checked={tire.isDisabled ? false : tire.isChecked}
                disabled={tire.isDisabled}
                size="small"
              />
              <label htmlFor="" className="__list-lable">
                {tire.lable}
              </label>
            </span>
            // </Grid>
          ))}
          {/* </Grid> */}
        </div>
      );
    } else {
      renderElement = null;
    }

    return (
      <div className="__root-tire-container">
        <div
          className="tire-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span className="heading">Select the Tier:</span>
          <div>
            <Button className="select_all_button" onClick={this.onSelectAll} style={{marginRight:5}}>
              Select All
          </Button>
            <Button className="select_all_button" onClick={this.onUnselectAll}>
              Unselect All
          </Button>
          </div>
        </div>
        <div className="tire-list-contianer">{renderElement}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tire);
