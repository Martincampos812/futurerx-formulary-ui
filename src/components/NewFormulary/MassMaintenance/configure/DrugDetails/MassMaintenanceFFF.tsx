import React from "react";
import { connect } from "react-redux";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import DrugGrid from "../DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { postMaintenaceDrugPA } from "../../../../../redux/slices/formulary/pa/paActionCreation";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../../shared/Frx-components/button/Button";
import MMFFFRemove from "./MMFFFRemove";
import MMFFFReplace from "./MMFFFReplace";
import {
  APPLY_FFF_DRUG,
  KEY_ENTITY_ID,
  TYPE_REMOVE,
  TYPE_REPLACE,
} from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import {
  postRemoveFFFDrug,
  postReplaceFFFDrug,
} from "../../../../../redux/slices/formulary/drugDetails/fff/fffActionCreation";
import { onClickTab } from "./MMUtils";

const mapStateToProps = (state) => {
  return {
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
    id_lob: state.maintenance?.selectedRow?.id_lob,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
    postRemoveFFFDrug: (a) => dispatch(postRemoveFFFDrug(a)),
    postReplaceFFFDrug: (a) => dispatch(postReplaceFFFDrug(a)),
  };
}

const initialReplacePayload: replacePayload = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
  free_first_fill: "",
};

const initialRemovePayload: removePayload = {
  is_covered: true,
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
};

interface replacePayload {
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  selected_criteria_ids: any[];
  filter: any[];
  search_key: any;
  free_first_fill: any;
}

interface removePayload {
  is_covered: boolean;
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  selected_criteria_ids: any[];
  filter: any[];
  search_key: any;
}

class MassMaintenanceFFF extends React.Component<any, any> {
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
  };

  addNew = () => {};

  replacePayload: replacePayload = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    free_first_fill: "",
  };

  removePayload: removePayload = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
  };

  updateDrugGridData = (gridData) => {
    this.state.drugGridData = gridData;
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  handleSave = () => {
    console.log("-----Inside Save-------");
    console.log("The Drug Grid Data = ", this.state);

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = APPLY_FFF_DRUG;
      apiDetails["messageBody"] = {};

      this.props.maintenanceFormularies.list.map((drug) => {
        this.replacePayload = initialReplacePayload;
        this.removePayload = initialRemovePayload;
        let formularyId = drug.id_formulary;
        apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

        const SELECT_ALL = this.state.drugGridData["isSelectAll"];

        const ACTION_TYPE = ACTIVE_TAB_INDEX === 0 ? TYPE_REPLACE : TYPE_REMOVE;

        const ACTION_PATH =
          formularyId + "/" + getLobCode(this.props.id_lob) + "/" + ACTION_TYPE;

        if (ACTIVE_TAB_INDEX === 0) {
          this.replacePayload.selected_drug_ids = SELECTED_DRUGS;
          this.replacePayload.is_select_all = SELECT_ALL;

          apiDetails["pathParams"] = ACTION_PATH;
          apiDetails["messageBody"] = this.replacePayload;
        } else if (ACTIVE_TAB_INDEX === 2) {
          this.removePayload.selected_drug_ids = SELECTED_DRUGS;
          this.removePayload.is_select_all = SELECT_ALL;

          apiDetails["pathParams"] = ACTION_PATH;
          apiDetails["messageBody"] = this.removePayload;
        }

        console.log(`The Api Details = `, apiDetails);

        // Replace Drug method call
        if (ACTIVE_TAB_INDEX === 0) {
          this.props.postReplaceFFFDrug(apiDetails).then((json) => {
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
          this.props.postRemoveFFFDrug(apiDetails).then((json) => {
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
      });
    }
  };

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
              <MMFFFReplace key={drug.id_formulary} drug={drug} />
            ))}
          </>
        );
      case 2:
        return (
          <>
            {formularyList.map((drug) => (
              <MMFFFRemove key={drug.id_formulary} drug={drug} />
            ))}
          </>
        );
    }
  };

  render() {
    const { gridColumns, isSearchOpen } = this.state;

    return (
      <div className="mm-tier-root">
        <MMDDSelectedFormulariesGrid
          gridColumns={gridColumns}
          maintenanceFormularies={this.props.maintenanceFormularies}
          addNew={this.addNew}
        />

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
              <CustomizedSwitches leftTitle="Modify" rightTitle="view all" />
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
              <Button label="Save &amp; Continue" onClick={this.handleSave} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenanceFFF);

export const checkIfFFFApplicable = (drug: any) => {
  let breadCrumbInfo: any[] = drug?.bread_crumb_info;
  let ddObj = breadCrumbInfo.find((e) => e.code_value === "DRGDT")?.children;
  let ddObjOther;
  if (ddObj) {
    ddObjOther = ddObj.find((e) => e.code_value === "FFF");
  }

  return ddObj && ddObjOther;
};
