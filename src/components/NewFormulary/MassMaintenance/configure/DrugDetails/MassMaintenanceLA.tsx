import React from "react";
import { connect } from "react-redux";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../../shared/Frx-components/button/Button";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import DrugGrid from "../DrugGrid";
import { onClickTab } from "./MMUtils";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { postMaintenaceDrugPA } from "../../../../../redux/slices/formulary/pa/paActionCreation";
import {
  postRemoveLADrug,
  postReplaceLADrug,
} from "../../../../../redux/slices/formulary/drugDetails/drugDetailLA/drugDetailLAActionCreation";
import {
  APPLY_LA_DRUG,
  KEY_ENTITY_ID,
  TYPE_REMOVE,
  TYPE_REPLACE,
} from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";

const mapStateToProps = (state) => {
  return {
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
    id_lob: state.maintenance?.selectedRow?.id_lob,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
    postReplaceLADrug: (a) => dispatch(postReplaceLADrug(a)),
    postRemoveLADrug: (a) => dispatch(postRemoveLADrug(a)),
  };
}

interface applyPayload {
  is_covered: boolean;
  selected_drug_ids: any[];
  is_select_all: boolean;
  not_covered: any;
  covered: any;
  selected_criteria_ids: any[];
}

const DEFAULT_APPLY_PAYLOAD: applyPayload = {
  is_covered: true,
  selected_drug_ids: [],
  is_select_all: false,
  not_covered: {},
  covered: {},
  selected_criteria_ids: [],
};

class MassMaintenanceLA extends React.Component<any, any> {
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

  applyPayload: applyPayload = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    not_covered: {},
    covered: {},
    selected_criteria_ids: [],
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
              <MMLAReplace key={drug.id_formulary} drug={drug} />
            ))}
          </>
        );
      case 2:
        return (
          <>
            {formularyList.map((drug) => (
              <MMLARemove key={drug.id_formulary} drug={drug} />
            ))}
          </>
        );
    }
  };

  handleSave = () => {
    console.log("-----Inside Save-------");
    console.log("The Drug Grid Data = ", this.state);

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = APPLY_LA_DRUG;
      apiDetails["messageBody"] = {};

      this.props.maintenanceFormularies.list.map((drug) => {
        this.applyPayload = DEFAULT_APPLY_PAYLOAD;

        let formularyId = drug.id_formulary;
        apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

        const SELECT_ALL = this.state.drugGridData["isSelectAll"];

        const ACTION_TYPE = ACTIVE_TAB_INDEX === 0 ? TYPE_REPLACE : TYPE_REMOVE;

        const ACTION_PATH =
          formularyId + "/" + getLobCode(this.props.id_lob) + "/" + ACTION_TYPE;

        this.applyPayload.selected_drug_ids = SELECTED_DRUGS;
        this.applyPayload.is_select_all = SELECT_ALL;

        apiDetails["pathParams"] = ACTION_PATH;
        apiDetails["messageBody"] = this.applyPayload;

        console.log(`The Api Details = `, apiDetails);

        // Replace Drug method call
        if (ACTIVE_TAB_INDEX === 0) {
          this.props.postReplaceLADrug(apiDetails).then((json) => {
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
          this.props.postRemoveLADrug(apiDetails).then((json) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenanceLA);

export const MMLAReplace = (props) => {
  const { drug } = props;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfLAApplicable(drug) ? (
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

export const MMLARemove = (props) => {
  const { drug } = props;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfLAApplicable(drug) ? (
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

const checkIfLAApplicable = (drug: any) => {
  let breadCrumbInfo: any[] = drug?.bread_crumb_info;
  let ddObj = breadCrumbInfo.find((e) => e.code_value === "DRGDT")?.children;
  let ddObjOther;
  if (ddObj) {
    ddObjOther = ddObj.find((e) => e.code_value === "LA");
  }

  return ddObj && ddObjOther;
};
