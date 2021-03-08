import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Table } from "antd";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../../shared/Frx-components/button/Button";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import DrugGrid from "../DrugGrid";
import { checkIfTABApplicableByCode, onClickTab } from "./MMUtils";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import getLobCode from "../../../Utils/LobUtils";
import {
  getVBIDContracts,
  getVBIDCriteriaList,
  getVBIDpbps,
  postRemoveVBIDDrug,
  postReplaceVBIDDrug,
} from "../../../../../redux/slices/formulary/drugDetails/vbid/vbidActionCreation";
import { postMaintenaceDrugPA } from "../../../../../redux/slices/formulary/pa/paActionCreation";
import {
  APPLY_VBID_DRUG,
  GET_VBID_ASSOCIATED_PBPS,
  GET_VBID_CONTRACTS,
  GET_VBID_CRITERIA_LIST,
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
    getVBIDCriteriaList: (a) => dispatch(getVBIDCriteriaList(a)),
    postRemoveVBIDDrug: (a) => dispatch(postRemoveVBIDDrug(a)),
    postReplaceVBIDDrug: (a) => dispatch(postReplaceVBIDDrug(a)),
    getVBIDContracts: (a) => dispatch(getVBIDContracts(a)),
    getVBIDpbps: (a) => dispatch(getVBIDpbps(a)),
  };
}

interface rpSavePayload {
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  vbid_contract_id: any;
  vbid_pbp_id: any;
  selected_criteria_ids: any[];
  filter: any[];
  search_key: any;
  vbid: any;
}

interface rmSavePayload {
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  selected_criteria_ids: any[];
  filter: any[];
  search_key: any;
  vbid: any;
}

const DEF_RP_SAVE_PAYLOAD: rpSavePayload = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  vbid_contract_id: "",
  vbid_pbp_id: "",
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
  vbid: {},
};

const DEF_RM_SAVE_PAYLOAD: rmSavePayload = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
  vbid: {},
};

class MassMaintenanceVBID extends React.Component<any, any> {
  state = {
    gridColumns: getColumns(),
    isSearchOpen: false,
    drugGridData: {} as any,
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
    contractIds: [],
    pbIds: [],
    packageValues: [],
    selectedPbIds: [] as any[],
    selectedContractIds: [] as any[],
    showActions: false,
    vbidRemoveColumn: [
      {
        title: "contract id",
        dataIndex: "vbid_contract_id",
        key: "vbid_contract_id",
      },
      { title: "pbp id", dataIndex: "vbid_pbp_id", key: "vbid_pbp_id" },
    ],
    vbidRemoveData: [] as any[],
    selectedCriteria: [] as any[],
  };

  rpSavePayload: rpSavePayload = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    vbid_contract_id: "",
    vbid_pbp_id: "",
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    vbid: {},
  };

  rmSavePayload: rmSavePayload = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    vbid: {},
  };

  updateDrugGridData = (gridData) => {
    console.log("THe Grid Data = ", gridData);
    this.setState({ drugGridData: gridData });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  packageChangeHandler = (e, formularyId) => {
    let packageValuesObj = { formularyId, value: e?.target?.value };
    let packageValues: any[] = [...this.state.packageValues];
    packageValues = packageValues.filter((e) => e.formularyId !== formularyId);
    packageValues.push(packageValuesObj);
    this.setState({ packageValues });
  };

  onContractChangeHandler = (e, formularyId) => {
    let selectedContractIdsObj = { formularyId, value: e };
    let selectedContractIds: any[] = [...this.state.selectedContractIds];
    selectedContractIds = selectedContractIds.filter(
      (e) => e.formularyId !== formularyId
    );
    selectedContractIds.push(selectedContractIdsObj);

    this.setState({ selectedContractIds });
    this.getVBIDpbps(e, formularyId);
  };

  getVBIDContracts = (formularyId) => {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_VBID_CONTRACTS;
    apiDetails["pathParams"] = formularyId;
    apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

    this.props.getVBIDContracts(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.data ? json.payload.data : [];

      let rows = tmpData.map((ele) => ele["associated_contract"]);

      let contractIdObj = {
        formularyId,
        contractIds: rows,
      };

      let contractIds: any[] = [...this.state.contractIds];
      contractIds = contractIds.filter((e) => e.formularyId !== formularyId);
      contractIds.push(contractIdObj);

      this.setState({
        contractIds,
      });
    });
  };

  getVBIDpbps = (selectedContractId, formularyId) => {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_VBID_ASSOCIATED_PBPS;
    apiDetails["pathParams"] = formularyId + "/" + selectedContractId;
    apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

    this.props.getVBIDpbps(apiDetails).then((json) => {
      let tmpData = json.payload && json.payload.data ? json.payload.data : [];

      let rows = tmpData.map((ele) => ele["associated_pbp"]);

      let pbidObj = {
        formularyId,
        rows,
      };

      let pbidList: any[] = [...this.state.pbIds];
      pbidList = pbidList.filter((e) => e.formularyId !== formularyId);
      pbidList.push(pbidObj);

      this.setState({
        pbIds: pbidList,
      });
    });
  };

  onPBIDChangeHandler = (e, formularyId) => {
    let selectedPbIdObj = { formularyId, selectedPbId: e };
    let selectedPbIds: any[] = [...this.state.selectedPbIds];
    selectedPbIds = selectedPbIds.filter((e) => e.formularyId !== formularyId);
    selectedPbIds.push(selectedPbIdObj);

    this.setState({ selectedPbIds });
  };

  addNew = () => {};

  onClickTab = (selectedTabIndex: number) => {
    const { tabs, activeTabIndex } = onClickTab(
      this.state.tabs,
      selectedTabIndex
    );

    if (activeTabIndex === 2) {
      const formularyList = this.props.maintenanceFormularies.list;
      formularyList.forEach((element) => {
        this.getVBIDCriteriaList(element.id_formulary);
      });
    }

    this.clearInputs();

    this.setState({ tabs, activeTabIndex });
  };

  clearInputs = () => {
    this.setState({
      selectedContractIds: [],
      selectedPbIds: [],
      packageValues: [],
    });
  };

  onSelectedRowKeysChange = (selectedRowKeys, formularyId) => {
    let selectedCriteria = this.state.selectedCriteria.filter(
      (e) => e.formularyId !== formularyId
    );

    let criteriaList = selectedRowKeys.map((otId) => otId);

    let tmpSelectedRowKeys = {
      formularyId,
      criteriaList,
    };

    selectedCriteria.push(tmpSelectedRowKeys);

    this.setState({ selectedCriteria });
  };

  renderTabContent = () => {
    const { activeTabIndex, contractIds, pbIds } = this.state;
    const formularyList = this.props.maintenanceFormularies.list;

    switch (activeTabIndex) {
      case 0:
        return (
          <>
            {formularyList.map((drug) => (
              <MMVBIDReplace
                key={drug.id_formulary}
                drug={drug}
                activeTabIndex={activeTabIndex}
                packageChangeHandler={(e) =>
                  this.packageChangeHandler(e, drug.id_formulary)
                }
                onContractChangeHandler={(e) =>
                  this.onContractChangeHandler(e, drug.id_formulary)
                }
                contractIds={contractIds}
                pbIds={pbIds}
                onPBIDChangeHandler={(e) =>
                  this.onPBIDChangeHandler(e, drug.id_formulary)
                }
              />
            ))}
          </>
        );
      case 2:
        return (
          <>
            {formularyList.map((drug) => (
              <MMVBIDRemove
                key={drug.id_formulary}
                drug={drug}
                vbidRemoveColumn={this.state.vbidRemoveColumn}
                vbidRemoveData={this.state.vbidRemoveData}
                selectedCriteria={this.state.selectedCriteria}
                onSelectedRowKeysChange={(selectedRowKeys) =>
                  this.onSelectedRowKeysChange(
                    selectedRowKeys,
                    drug.id_formulary
                  )
                }
              />
            ))}
          </>
        );
    }
  };

  getVBIDCriteriaList = (formularyId) => {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_VBID_CRITERIA_LIST;
    apiDetails["pathParams"] =
      formularyId + "/" + getLobCode(this.props.id_lob);
    apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];
    apiDetails["messageBody"] = {};

    this.props.getVBIDCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          key: ele["id_formulary_vbid_criteria"],
          vbid_contract_id: ele["vbid_contract_id"],
          vbid_pbp_id: ele["vbid_pbp_id"],
        };
        return curRow;
      });

      let vbidRemoveData = [...this.state.vbidRemoveData].filter(
        (e) => e.formularyId !== formularyId
      );

      let vbidRemoveDataObj = {
        formularyId,
        data: settingsRows,
      };

      vbidRemoveData.push(vbidRemoveDataObj);

      this.setState({
        vbidRemoveData,
      });
    });
  };

  handleSave = () => {
    console.log("The state of the tab = ", this.state);

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = APPLY_VBID_DRUG;
      apiDetails["messageBody"] = {};

      this.props.maintenanceFormularies.list.map((drug) => {
        if (checkIfTABApplicableByCode(drug, "VBID")) {
          this.rpSavePayload = DEF_RP_SAVE_PAYLOAD;
          this.rmSavePayload = DEF_RM_SAVE_PAYLOAD;
          const FORMULARY_ID = drug.id_formulary;
          apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: FORMULARY_ID }];

          let ACTION_TYPE;
          if (ACTIVE_TAB_INDEX === 0) {
            ACTION_TYPE = TYPE_REPLACE;
          } else if (ACTIVE_TAB_INDEX === 1) {
            ACTION_TYPE = TYPE_APPEND;
          } else if (ACTIVE_TAB_INDEX === 2) {
            ACTION_TYPE = TYPE_REMOVE;
          }

          const ACTION_PATH =
            FORMULARY_ID +
            "/" +
            getLobCode(this.props.id_lob) +
            "/" +
            ACTION_TYPE;

          const SELECT_ALL = this.state.drugGridData["isSelectAll"];

          apiDetails["pathParams"] = ACTION_PATH;

          this.rpSavePayload.selected_drug_ids = SELECTED_DRUGS;
          this.rpSavePayload.is_select_all = SELECT_ALL;
          this.rmSavePayload.selected_drug_ids = SELECTED_DRUGS;
          this.rmSavePayload.is_select_all = SELECT_ALL;

          if (ACTIVE_TAB_INDEX === 0 || ACTIVE_TAB_INDEX === 1) {
            let selectedContractIdObj: any = this.state.selectedContractIds.find(
              (e) => e.formularyId === FORMULARY_ID
            );

            let selectedPbIdObject: any = this.state.selectedPbIds.find(
              (e) => e.formularyId === FORMULARY_ID
            );

            let selectedContractId = selectedContractIdObj?.value;
            let selectedPbId = selectedPbIdObject?.selectedPbId;

            this.rpSavePayload.vbid_contract_id = selectedContractId;
            this.rpSavePayload.vbid_pbp_id = "" + selectedPbId;
            this.rpSavePayload.vbid["vbid_contract_id"] = selectedContractId;
            this.rpSavePayload.vbid["vbid_pbp_id"] =
              ACTIVE_TAB_INDEX === 0 ? +selectedPbId : [+selectedPbId];
            apiDetails["messageBody"] = this.rpSavePayload;

            // Replace and Append Drug method call
            this.props.postReplaceVBIDDrug(apiDetails).then((json) => {
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
            let selectedCriteria = this.state.selectedCriteria;
            let selectedFCriteria = selectedCriteria
              ? selectedCriteria.find((e) => e.formularyId === FORMULARY_ID)
                  ?.criteriaList
              : [];

            if (selectedFCriteria && selectedFCriteria.length > 0) {
              this.rmSavePayload.selected_criteria_ids = selectedFCriteria;
              apiDetails["messageBody"] = this.rmSavePayload;

              // Remove Drug method call
              this.props.postRemoveVBIDDrug(apiDetails).then((json) => {
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

          console.log("The API Details = ", apiDetails);
        }
      });
    }
  };

  settingFormApplyHandler = () => {
    let showActions = this.state.drugGridData.selectedDrugs?.length > 0;
    if (showActions) {
      const formularyList = this.props.maintenanceFormularies.list;
      formularyList.map((drug) => this.getVBIDContracts(drug.id_formulary));
      this.setState({ showActions });
    }
  };

  render() {
    const { gridColumns, isSearchOpen, showActions } = this.state;

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

        <div className="bordered settings-form">
          <Box display="flex" justifyContent="flex-end">
            <Button label="Apply" onClick={this.settingFormApplyHandler} />
          </Box>
        </div>

        {showActions && (
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
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MassMaintenanceVBID);

export const MMVBIDReplace = (props) => {
  const {
    drug,
    activeTabIndex,
    packageChangeHandler,
    onContractChangeHandler,
    onPBIDChangeHandler,
  } = props;

  const contractIds = props.contractIds.find(
    (e) => e.formularyId === drug.id_formulary
  )?.contractIds;

  const pbIds = props.pbIds.find((e) => e.formularyId === drug.id_formulary)
    ?.rows;
  const pbIdslist = pbIds && pbIds.length > 0 ? pbIds : [];

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "VBID") ? (
          <Grid container key={activeTabIndex}>
            <Grid item xs={6}>
              <div className="group">
                <label>
                  Contract Id <span className="astrict">*</span>
                </label>
                {contractIds && (
                  <DropDown
                    placeholder=""
                    options={contractIds}
                    onChange={onContractChangeHandler}
                  />
                )}
              </div>
              <div className="group">
                <label>
                  PBP Id <span className="astrict">*</span>
                </label>
                {pbIdslist && (
                  <DropDown
                    placeholder=""
                    options={pbIdslist}
                    onChange={onPBIDChangeHandler}
                  />
                )}
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="group">
                <label>
                  package <span className="astrict">*</span>
                </label>
                <input
                  type="text"
                  name="package"
                  onChange={packageChangeHandler}
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

export const MMVBIDRemove = (props) => {
  const {
    drug,
    vbidRemoveColumn,
    vbidRemoveData,
    selectedCriteria,
    onSelectedRowKeysChange,
  } = props;

  let criteria = selectedCriteria
    ? selectedCriteria.find((e) => e.formularyId === drug.id_formulary)
        ?.criteriaList
    : [];

  let rowSelection = {
    selectedRowKeys: criteria,
    onChange: onSelectedRowKeysChange,
  };

  let pvbidRemoveData = vbidRemoveData
    ? vbidRemoveData.find((e) => e.formularyId === drug.id_formulary)?.data
    : [];

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "VBID") ? (
          <Grid item xs={5}>
            <div className="tier-grid-remove-container other-removed-sec">
              <Table
                columns={vbidRemoveColumn}
                dataSource={pvbidRemoveData}
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
