import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Table } from "antd";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import DrugGrid from "../DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { checkIfTABApplicableByCode, onClickTab } from "./MMUtils";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../../shared/Frx-components/button/Button";
import { postMaintenaceDrugPA } from "../../../../../redux/slices/formulary/pa/paActionCreation";
import {
  getLISCriteriaList,
  postRemoveLISDrug,
  postReplaceLISDrug,
} from "../../../../../redux/slices/formulary/drugDetails/lis/lisActionCreation";
import getLobCode from "../../../Utils/LobUtils";
import {
  APPLY_LIS_DRUG,
  GET_LIS_CRITERIA_LIST,
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
    postRemoveLISDrug: (a) => dispatch(postRemoveLISDrug(a)),
    postReplaceLISDrug: (a) => dispatch(postReplaceLISDrug(a)),
    getLISCriteriaList: (a) => dispatch(getLISCriteriaList(a)),
  };
}

interface replacePayload {
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  lis_cost_sharing_amount: number;
  breadcrumb_code_value: any;
  selected_criteria_ids: any[];
  filter: any[];
  search_key: any;
}

const INIT_REPLACE_PAYLOAD: replacePayload = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  lis_cost_sharing_amount: 0,
  breadcrumb_code_value: "LIS",
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
};

class MassMaintenanceLIS extends React.Component<any, any> {
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
    lisCriteriaList: [] as any[],
    lisAmounts: [] as any[],
  };

  replacePayload: replacePayload = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    lis_cost_sharing_amount: 0,
    breadcrumb_code_value: "LIS",
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
  };

  addNew = () => {};

  updateDrugGridData = (gridData) => {
    this.state.drugGridData = gridData;
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  getLISCriteriaList = () => {
    let lisCriteriaList: any[] = [];
    this.props.maintenanceFormularies.list.map((drug) => {
      const formularyId = drug.id_formulary;

      let apiDetails = {};
      apiDetails["apiPart"] = GET_LIS_CRITERIA_LIST;
      apiDetails["pathParams"] =
        formularyId + "/" + getLobCode(this.props.id_lob);
      apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

      this.props.getLISCriteriaList(apiDetails).then((json) => {
        let tmpData =
          json.payload && json.payload.result ? json.payload.result : [];
        let settingsRows = tmpData.map((ele) => {
          let curRow = {
            key: ele["lis_cost_sharing_amount"],
            lis_cost_sharing_amount: ele["lis_cost_sharing_amount"],
          };
          return curRow;
        });

        let lisRemoveObj = {
          formularyId,
          settings: settingsRows,
        };
        lisCriteriaList.push(lisRemoveObj);
      });
    });

    this.setState({
      lisCriteriaList,
    });
  };

  inputChangeHandler = (e, formularyId) => {
    if (e.target.name === `lisAmount${formularyId}`) {
      let lisAmountsTmp = this.state.lisAmounts.filter(
        (e) => e.formularyId !== formularyId
      );

      let lisTmpObj = {
        formularyId,
        amount: +e.target.value,
      };

      lisAmountsTmp.push(lisTmpObj);
      this.setState({ lisAmounts: lisAmountsTmp });
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
              <MMPGCReplace
                key={drug.id_formulary}
                drug={drug}
                activeTabIndex={activeTabIndex}
                inputChangeHandler={this.inputChangeHandler}
              />
            ))}
          </>
        );
      case 2:
        this.getLISCriteriaList();
        return (
          <>
            {formularyList.map((drug) => (
              <MMPGCRemove
                key={drug.id_formulary}
                drug={drug}
                activeTabIndex={activeTabIndex}
              />
            ))}
          </>
        );
    }
  };

  handleSave = () => {
    console.log("The State of Tab = ", this.state);

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = APPLY_LIS_DRUG;
      apiDetails["keyVals"] = [
        { key: KEY_ENTITY_ID, value: this.props?.formulary_id },
      ];
      apiDetails["messageBody"] = {};

      this.props.maintenanceFormularies.list.map((drug) => {
        if (checkIfTABApplicableByCode(drug, "LIS")) {
          this.replacePayload = INIT_REPLACE_PAYLOAD;

          let formularyId = drug.id_formulary;
          apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

          const SELECT_ALL = this.state.drugGridData["isSelectAll"];

          const ACTION_TYPE =
            ACTIVE_TAB_INDEX === 0 ? TYPE_REPLACE : TYPE_REMOVE;

          const ACTION_PATH =
            formularyId +
            "/" +
            getLobCode(this.props.id_lob) +
            "/" +
            ACTION_TYPE;

          this.replacePayload.selected_drug_ids = SELECTED_DRUGS;
          this.replacePayload.is_select_all = SELECT_ALL;

          apiDetails["pathParams"] = ACTION_PATH;

          if (ACTIVE_TAB_INDEX === 0) {
            const lisCostSharingAmount = this.state.lisAmounts.find(
              (e) => e.formularyId === formularyId
            )?.amount;
            this.replacePayload.lis_cost_sharing_amount = lisCostSharingAmount;
            apiDetails["messageBody"] = this.replacePayload;
            console.log("-----Save API Requst = ", apiDetails);

            // Replace Drug method call
            // this.props.postReplaceLISDrug(apiDetails).then((json) => {
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
          } else if (ACTIVE_TAB_INDEX === 2) {
            // this.rmSavePayload.lis_cost_sharing_amount = this.state.selectedCriteria[0];
            // apiDetails["messageBody"] = this.rmSavePayload;
            // // Remove Drug method call
            // this.props.postRemoveLISDrug(apiDetails).then((json) => {
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

        <div className="drug-grid">
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

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenanceLIS);

export const MMPGCReplace = (props) => {
  const { drug, inputChangeHandler } = props;
  const formularyId = drug.id_formulary;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={formularyId}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "LIS") ? (
          <Grid container>
            <Grid item xs={6}>
              <div className="group">
                <label>
                  Lis Cost-Sharing Reduction Beyond Statutory Amount
                </label>
                <input
                  type="number"
                  name={`lisAmount${formularyId}`}
                  onChange={(e) => inputChangeHandler(e, formularyId)}
                />
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

export const MMPGCRemove = (props) => {
  const { drug, lisRemoveColumn, lisCriteriaList, rowSelection } = props;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "LIS") ? (
          <Grid item xs={5}>
            <div className="tier-grid-remove-container other-removed-sec">
              <Table
                columns={lisRemoveColumn}
                dataSource={lisCriteriaList}
                pagination={false}
                rowSelection={rowSelection}
              />
            </div>
          </Grid>
        ) : (
          <p>Not applicable for this formulary</p>
        )}
      </div>
    </>
  );
};
