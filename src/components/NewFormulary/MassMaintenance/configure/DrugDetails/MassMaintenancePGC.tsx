import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import {
  postRemovePGCDrug,
  postReplacePGCDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pgc/pgcActionCreation";
import { postMaintenaceDrugPA } from "../../../../../redux/slices/formulary/pa/paActionCreation";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../../shared/Frx-components/button/Button";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import DrugGrid from "../DrugGrid";
import { checkIfTABApplicableByCode, onClickTab } from "./MMUtils";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import getLobCode from "../../../Utils/LobUtils";
import RadioButton from "../../../../shared/Frx-components/radio-button/RadioButton";
import {
  APPLY_PGC_DRUG,
  KEY_ENTITY_ID,
  TYPE_REMOVE,
  TYPE_REPLACE,
} from "../../../../../api/http-drug-details";

const mapStateToProps = (state) => {
  return {
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
    id_lob: state.maintenance?.selectedRow?.id_lob,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
    postRemovePGCDrug: (a) => dispatch(postRemovePGCDrug(a)),
    postReplacePGCDrug: (a) => dispatch(postReplacePGCDrug(a)),
  };
}

interface applyPayload {
  is_covered: boolean;
  selected_drug_ids: any[];
  is_select_all: boolean;
  not_covered: any;
  covered: any;
}

const DEFAULT_APPLY_PAYLOAD: applyPayload = {
  is_covered: true,
  selected_drug_ids: [],
  is_select_all: false,
  not_covered: {},
  covered: {},
};

class MassMaintenancePGC extends React.Component<any, any> {
  state = {
    gridColumns: getColumns(),
    isSearchOpen: false,
    drugGridData: {},
    tabs: [
      {
        id: 1,
        text: "Replace",
        value: "replace",
        disabled: false,
      },
      {
        id: 2,
        text: "Append",
        value: "append",
        disabled: true,
      },
      {
        id: 3,
        text: "Remove",
        value: "remove",
        disabled: false,
      },
    ],
    activeTabIndex: 0,
    selectedPGC: "",
    showActions: false,
  };

  applyPayload: applyPayload = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    not_covered: { drug_ids: [] },
    covered: {},
  };

  updateDrugGridData = (gridData) => {
    this.state.drugGridData = gridData;
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  addNew = () => {};

  onClickTab = (selectedTabIndex: number) =>
    this.setState({ ...onClickTab(this.state.tabs, selectedTabIndex) });

  renderTabContent = () => {
    const activeTabIndex = this.state.activeTabIndex;
    const formularyList = this.props.maintenanceFormularies.list;

    switch (activeTabIndex) {
      case 0:
        return (
          <>
            {formularyList.map((drug) => (
              <MMPGCReplace key={drug.id_formulary} drug={drug} />
            ))}
          </>
        );
      case 2:
        return (
          <>
            {formularyList.map((drug) => (
              <MMPGCRemove key={drug.id_formulary} drug={drug} />
            ))}
          </>
        );
    }
  };

  settingFormApplyHandler = () => this.setState({ showActions: true });

  onRadioChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      selectedPGC: event.target.value,
      showActions: false,
    });
  };

  handleSave = () => {
    console.log("-----Inside Save-------");
    console.log("The Drug Grid Data = ", this.state);

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = APPLY_PGC_DRUG;
      apiDetails["messageBody"] = {};

      this.props.maintenanceFormularies.list.map((drug) => {
        if (checkIfTABApplicableByCode(drug, "PGC")) {
          let formularyId = drug.id_formulary;
          this.applyPayload = DEFAULT_APPLY_PAYLOAD;

          apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

          const SELECT_ALL = this.state.drugGridData["isSelectAll"];

          const ACTION_TYPE =
            ACTIVE_TAB_INDEX === 0 ? TYPE_REPLACE : TYPE_REMOVE;

          const ACTION_PATH =
            formularyId + "/" + this.state.selectedPGC + "/" + ACTION_TYPE;

          this.applyPayload.selected_drug_ids = SELECTED_DRUGS;
          this.applyPayload.is_select_all = SELECT_ALL;

          apiDetails["pathParams"] = ACTION_PATH;
          apiDetails["messageBody"] = this.applyPayload;

          console.log(`The Api Details = `, apiDetails);

          // Replace Drug method call
          if (ACTIVE_TAB_INDEX === 0) {
            this.props.postReplacePGCDrug(apiDetails).then((json) => {
              if (
                json.payload &&
                json.payload.code &&
                json.payload.code === "200"
              ) {
                console.log(`----${ACTION_TYPE} API Success----`);
              } else {
                console.log(`----${ACTION_TYPE} API Failed----`);
              }
            });
          } else if (ACTIVE_TAB_INDEX === 2) {
            this.props.postRemovePGCDrug(apiDetails).then((json) => {
              if (
                json.payload &&
                json.payload.code &&
                json.payload.code === "200"
              ) {
                console.log(`----${ACTION_TYPE} API Success----`);
              } else {
                console.log(`----${ACTION_TYPE} API Failed----`);
              }
            });
          }
        }
      });
    }
  };

  render() {
    const { gridColumns, isSearchOpen, showActions, selectedPGC } = this.state;

    return (
      <div className="mm-tier-root">
        <MMDDSelectedFormulariesGrid
          gridColumns={gridColumns}
          maintenanceFormularies={this.props.maintenanceFormularies}
          addNew={this.addNew}
        />

        <div className="bordered settings-form">
          <label> What File Type is this Gap Coverage For? </label>
          <div className="marketing-material radio-group no-transform">
            <RadioButton
              label="Formulary/OTC"
              checked={selectedPGC === "FAOTC"}
              value="FAOTC"
              onClick={this.onRadioChangeHandler}
              name="FAOTC"
            />
            <RadioButton
              label="Excluded"
              checked={selectedPGC === "ExD"}
              value="ExD"
              onClick={this.onRadioChangeHandler}
              name="ExD"
            />
          </div>
          <Box display="flex" justifyContent="flex-end">
            <Button
              label="Apply"
              onClick={this.settingFormApplyHandler}
              disabled={!this.state.selectedPGC}
            />
          </Box>
        </div>

        {showActions && (
          <>
            <DrugGrid
              getDrugs={this.props.postMaintenaceDrugPA}
              columns={getMMDrugDetailsColumns()}
              updateDrugGridData={this.updateDrugGridData}
            />
            <div className="bordered mm-configure details-top">
              {isSearchOpen ? (
                <AdvancedSearch
                  category="Grievances"
                  openPopup={isSearchOpen}
                  onClose={this.advanceSearchClosekHandler}
                />
              ) : null}
            </div>

            <div className="bordered mm-configure-pa-auth details-top">
              <div className="header">OTHER</div>
              <div className="modify-panel">
                <div className="icon">
                  <span>P</span>
                </div>
                <div className="switch-box">
                  <CustomizedSwitches
                    leftTitle="Modify"
                    rightTitle="view all"
                  />
                </div>
                <div className="mini-tabs">
                  <FrxMiniTabs
                    tabList={this.state.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onClickTab={this.onClickTab}
                  />
                </div>
              </div>

              <div className="inner-container mm-configure-pa-auth-grid p-20">
                <div className="pa-tab-content">{this.renderTabContent()}</div>

                <div className="button-container-root">
                  <span className="white-bg-btn">
                    <Button label="Save" onClick={this.handleSave} />
                  </span>
                  <Button
                    label="Save &amp; Continue"
                    onClick={this.handleSave}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenancePGC);

export const MMPGCReplace = (props) => {
  const { drug } = props;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "PGC") ? (
          <p>
            Drugs selected will be flagged as Yes for this File
            Type/Supplemental Benefit.
          </p>
        ) : (
          <p>Not applicable for this formulary</p>
        )}
      </div>
    </>
  );
};

export const MMPGCRemove = (props) => {
  const { drug } = props;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "PGC") ? (
          <p>
            Drugs selected will have flag removed for this File
            Type/Supplemental Benefit.
          </p>
        ) : (
          <p>Not applicable for this formulary</p>
        )}
      </div>
    </>
  );
};
