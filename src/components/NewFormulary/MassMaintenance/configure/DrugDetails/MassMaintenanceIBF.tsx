import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
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
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import {
  getIBFCuids,
  postRemoveIBFDrug,
  postReplaceIBFDrug,
} from "../../../../../redux/slices/formulary/drugDetails/ibf/ibfActionCreation";
import {
  APPLY_IBF_DRUG,
  GET_IBF_CUIS,
  KEY_ENTITY_ID,
  TYPE_APPEND,
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
    getIBFCuids: (a) => dispatch(getIBFCuids(a)),
    postReplaceIBFDrug: (a) => dispatch(postReplaceIBFDrug(a)),
    postRemoveIBFDrug: (a) => dispatch(postRemoveIBFDrug(a)),
  };
}

const DEF_RP_SAVE_PAYLOAD: any = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  id_me_shcui: "",
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
  me_shcui: "",
};

const DEF_RM_SAVE_PAYLOAD: any = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
  me_shcui: "",
};

class MassMaintenanceIBF extends React.Component<any, any> {
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
    cuids: [] as any[],
    selectedCuids: [] as any[],
  };

  rpSavePayload: any = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    id_me_shcui: "",
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    me_shcui: "",
  };

  rmSavePayload: any = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    me_shcui: "test1",
  };

  updateDrugGridData = (gridData) => {
    this.state.drugGridData = gridData;
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  addNew = () => {};

  getIBFCuids = () => {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_IBF_CUIS;

    this.props.getIBFCuids(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.data ? json.payload.data : [];

      let cuidsList: any[] = [];
      this.props.maintenanceFormularies.list.map((e) => {
        let cuidObj = {
          formularyId: e.id_formulary,
          cuids: tmpData,
        };
        cuidsList.push(cuidObj);
      });

      this.setState({ cuids: cuidsList });
    });
  };

  componentDidMount() {
    this.getIBFCuids();
  }

  onClickTab = (selectedTabIndex: number) =>
    this.setState({ ...onClickTab(this.state.tabs, selectedTabIndex) });

  onCUIDChangeHandler = (e: any, formularyId) => {
    const cuidList = this.state.cuids.find(
      (el) => el.formularyId === formularyId
    )?.cuids;

    const cuidValue = cuidList.find((el) => el.value === e);

    let selectedCuids = this.state.selectedCuids.filter(
      (e) => e.formularyId !== formularyId
    );

    let selCuidObj = {
      formularyId,
      cuid: cuidValue,
    };
    selectedCuids.push(selCuidObj);

    this.setState({ selectedCuids });
  };

  renderTabContent = () => {
    const { activeTabIndex, cuids } = this.state;
    const formularyList = this.props.maintenanceFormularies.list;

    switch (activeTabIndex) {
      case 0:
        return (
          <>
            {formularyList.map((drug) => (
              <MMIBFReplace
                key={drug.id_formulary}
                cuids={cuids}
                onCUIDChangeHandler={(e) =>
                  this.onCUIDChangeHandler(e, drug.id_formulary)
                }
                drug={drug}
              />
            ))}
          </>
        );
      case 2:
        return (
          <>
            {formularyList.map((drug) => (
              <MMIBFRemove key={drug.id_formulary} drug={drug} />
            ))}
          </>
        );
    }
  };

  handleSave = () => {
    console.log("The Saved State = ", this.state);

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = APPLY_IBF_DRUG;
      apiDetails["messageBody"] = {};

      this.props.maintenanceFormularies.list.map((drug) => {
        if (checkIfTABApplicableByCode(drug, "IBF")) {
          this.rpSavePayload = DEF_RP_SAVE_PAYLOAD;
          this.rmSavePayload = DEF_RM_SAVE_PAYLOAD;
          let formularyId = drug.id_formulary;

          apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

          let ACTION_TYPE;
          if (ACTIVE_TAB_INDEX === 0) {
            ACTION_TYPE = TYPE_REPLACE;
          } else if (ACTIVE_TAB_INDEX === 1) {
            ACTION_TYPE = TYPE_APPEND;
          } else if (ACTIVE_TAB_INDEX === 2) {
            ACTION_TYPE = TYPE_REMOVE;
          }

          const SELECT_ALL = this.state.drugGridData["isSelectAll"];

          const ACTION_PATH =
            formularyId +
            "/" +
            getLobCode(this.props.id_lob) +
            "/" +
            ACTION_TYPE;

          apiDetails["pathParams"] = ACTION_PATH;

          if (ACTIVE_TAB_INDEX === 0 || ACTIVE_TAB_INDEX === 1) {
            const cuidList = this.state.selectedCuids.find(
              (el) => el.formularyId === formularyId
            )?.cuid;

            this.rpSavePayload.selected_drug_ids = SELECTED_DRUGS;
            this.rpSavePayload.id_me_shcui = cuidList?.id_me_shcui;
            this.rpSavePayload.me_shcui = cuidList?.me_shcui;
            this.rpSavePayload.is_select_all = SELECT_ALL;
            apiDetails["messageBody"] = this.rpSavePayload;

            // Replace Drug method call
            if (cuidList?.id_me_shcui && cuidList?.me_shcui) {
              this.props.postReplaceIBFDrug(apiDetails).then((json) => {
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
          } else if (ACTIVE_TAB_INDEX === 2) {
            this.rmSavePayload.selected_drug_ids = SELECTED_DRUGS;
            // this.rmSavePayload.selected_criteria_ids = this.state.selectedCriteria;
            this.rmSavePayload.is_select_all = SELECT_ALL;
            apiDetails["messageBody"] = this.rmSavePayload;

            // Remove Drug method call
            // this.props.postRemoveIBFDrug(apiDetails).then((json) => {
            //   if (
            //     json.payload &&
            //     json.payload.code &&
            //     json.payload.code === "200"
            //   ) {
            //     console.log(`----${ACTION_TYPE} API Success----`);
            //   } else {
            //     console.log(`----${ACTION_TYPE} API Failed----`);
            //   }
            // });
          }

          console.log("The API Details =================== ", apiDetails);
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

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenanceIBF);

export const MMIBFReplace = (props) => {
  const { drug, cuids, onCUIDChangeHandler } = props;
  let cuid = cuids.find((e) => e.formularyId === drug.id_formulary)?.cuids;

  let dropDown: any;
  if (cuid && cuid.length > 0) {
    dropDown = (
      <DropDown
        key={drug.id_formulary}
        placeholder="Cuids"
        options={cuid.map((e) => e.value)}
        onChange={onCUIDChangeHandler}
      />
    );
  }

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">
            {drug.formulary_name} - {drug.id_formulary}
          </span>
        </div>
        {checkIfTABApplicableByCode(drug, "IBF") ? (
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <div className="group">
                <label>MeSH CUI</label>
                {dropDown}
              </div>
            </Grid>
          </Grid>
        ) : (
          <p>Not applicable for this formulary</p>
        )}
      </div>
    </>
  );
};

export const MMIBFRemove = (props) => {
  const { drug } = props;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "IBF") ? (
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
