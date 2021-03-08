import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Table } from "antd";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import {
  getSSMCriteriaList,
  postRemoveSSMDrug,
  postReplaceSSMDrug,
} from "../../../../../redux/slices/formulary/drugDetails/ssm/ssmActionCreation";
import { postMaintenaceDrugPA } from "../../../../../redux/slices/formulary/pa/paActionCreation";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import { checkIfTABApplicableByCode, onClickTab } from "./MMUtils";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../../shared/Frx-components/button/Button";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import DrugGrid from "../DrugGrid";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import {
  APPLY_SSM_DRUG,
  GET_SSM_CRITERIA_LIST,
  KEY_ENTITY_ID,
  TYPE_APPEND,
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
    getSSMCriteriaList: (a) => dispatch(getSSMCriteriaList(a)),
    postRemoveSSMDrug: (a) => dispatch(postRemoveSSMDrug(a)),
    postReplaceSSMDrug: (a) => dispatch(postReplaceSSMDrug(a)),
  };
}

interface initialFormData {
  formularyId: string;
  ssm_contract_id: any;
  ssm_pbp_id: any;
  ssm_copay: number;
}

const initialFormData: initialFormData = {
  formularyId: "",
  ssm_contract_id: "",
  ssm_pbp_id: "",
  ssm_copay: 0,
};

const DEF_RP_SAVE_PAYLOAD = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  ssm_contract_id: "",
  ssm_pbp_id: "",
  ssm_copay: 0,
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
  senior_savings_model: {},
};

const DEF_RM_SAVE_PAYLOAD = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  ssm_contract_id: "",
  ssm_pbp_id: "",
  ssm_copay: 0,
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
  senior_savings_model: {},
};

class MassMaintenanceSSM extends React.Component<any, any> {
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
    showActions: false,
    ssmRemoveData: [] as any[],
    ssmRemoveColumn: [
      { title: "copay", dataIndex: "copay", key: "copay" },
      {
        title: "contract id",
        dataIndex: "ssm_contract_id",
        key: "ssm_contract_id",
      },
      { title: "pbp id", dataIndex: "ssm_pbp_id", key: "ssm_pbp_id" },
    ],
    selectedCriteria: [] as any[],
  };

  formData: initialFormData = {
    formularyId: "",
    ssm_contract_id: "",
    ssm_pbp_id: "",
    ssm_copay: 0,
  };

  rpSavePayload: any = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    ssm_contract_id: "",
    ssm_pbp_id: "",
    ssm_copay: 0,
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    senior_savings_model: {},
  };

  rmSavePayload: any = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    ssm_contract_id: "",
    ssm_pbp_id: "",
    ssm_copay: 0,
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
    senior_savings_model: {},
  };

  saveFormData: initialFormData[] = [];

  updateDrugGridData = (gridData) => {
    console.log("THe Grid Data = ", gridData);
    this.setState({ drugGridData: gridData });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };

  addNew = () => {};

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

  onClickTab = (selectedTabIndex: number) => {
    const { tabs, activeTabIndex } = onClickTab(
      this.state.tabs,
      selectedTabIndex
    );

    this.saveFormData = [];

    if (activeTabIndex === 2) {
      const formularyList = this.props.maintenanceFormularies.list;
      formularyList.forEach((element) => {
        this.getSSMCriteriaList(element.id_formulary);
      });
    }

    this.setState({ tabs, activeTabIndex });
  };

  getSSMCriteriaList = (formularyId) => {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_SSM_CRITERIA_LIST;
    apiDetails["pathParams"] =
      formularyId + "/" + getLobCode(this.props.id_lob);
    apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];
    apiDetails["messageBody"] = {};

    this.props.getSSMCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];
      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          key: ele["id_ssm_criteria"],
          copay: ele["id_ssm_criteria"],
          ssm_contract_id: ele["ssm_contract_id"],
          ssm_pbp_id: ele["ssm_pbp_id"],
        };
        return curRow;
      });

      let ssmRemoveData = [...this.state.ssmRemoveData].filter(
        (e) => e.formularyId !== formularyId
      );

      let ssmRemoveDataObj = {
        formularyId,
        data: settingsRows,
      };

      ssmRemoveData.push(ssmRemoveDataObj);

      this.setState({
        ssmRemoveData,
      });
    });
  };

  renderTabContent = () => {
    const { activeTabIndex } = this.state;
    const formularyList = this.props.maintenanceFormularies.list;

    switch (activeTabIndex) {
      case 0:
        return (
          <>
            {formularyList.map((drug) => (
              <MMSSMReplace
                key={drug.id_formulary}
                drug={drug}
                inputChangeHandler={(e) =>
                  this.inputChangeHandler(e, drug.id_formulary)
                }
              />
            ))}
          </>
        );
      case 2:
        return (
          <>
            {formularyList.map((drug) => (
              <MMSSMRemove
                key={drug.id_formulary}
                drug={drug}
                ssmRemoveColumn={this.state.ssmRemoveColumn}
                ssmRemoveData={this.state.ssmRemoveData}
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

  inputChangeHandler = (e, formularyId) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let saveFormObject = this.saveFormData.find(
      (e) => e.formularyId === formularyId
    );

    if (saveFormObject) {
      saveFormObject[inputName] =
        inputName === "ssm_copay" ? +inputValue : inputValue;
    } else {
      let tmpSvFormObj: initialFormData = {
        formularyId,
        ssm_contract_id: inputName === "ssm_contract_id" ? inputValue : "",
        ssm_copay: inputName === "ssm_copay" ? +inputValue : 0,
        ssm_pbp_id: inputName === "ssm_pbp_id" ? inputValue : "",
      };
      this.saveFormData.push(tmpSvFormObj);
    }
  };

  handleSave = () => {
    console.log("-----The state of the app = ", this.state);

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = APPLY_SSM_DRUG;

      this.props.maintenanceFormularies.list.map((drug) => {
        if (checkIfTABApplicableByCode(drug, "SSM")) {
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
            let formObject = this.saveFormData.find(
              (e) => e.formularyId === FORMULARY_ID
            );

            if (
              formObject?.ssm_contract_id &&
              formObject?.ssm_pbp_id &&
              formObject?.ssm_copay
            ) {
              this.rpSavePayload.senior_savings_model = formObject;
              this.rpSavePayload.ssm_contract_id = formObject.ssm_contract_id;
              this.rpSavePayload.ssm_pbp_id = formObject.ssm_pbp_id;
              this.rpSavePayload.ssm_copay = +formObject.ssm_copay;
              apiDetails["messageBody"] = this.rpSavePayload;

              // Replace and Append Drug method call
              this.props.postReplaceSSMDrug(apiDetails).then((json) => {
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
            let selectedCriteria = this.state.selectedCriteria;
            let selectedFCriteria = selectedCriteria
              ? selectedCriteria.find((e) => e.formularyId === FORMULARY_ID)
                  ?.criteriaList
              : [];

            if (selectedFCriteria && selectedFCriteria.length > 0) {
              this.rmSavePayload.selected_criteria_ids = selectedFCriteria;
              apiDetails["messageBody"] = this.rmSavePayload;

              // Remove Drug method call
              this.props.postRemoveSSMDrug(apiDetails).then((json) => {
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
          console.log("---THE SSM API DETAILS = ", apiDetails);
        }
      });
    }
  };

  settingFormApplyHandler = () => {
    let showActions = this.state.drugGridData.selectedDrugs?.length > 0;
    this.setState({ showActions });
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

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenanceSSM);

export const MMSSMReplace = (props) => {
  const { drug, inputChangeHandler } = props;
  const formularyId = drug.id_formulary;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={formularyId}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "SSM") ? (
          <Grid container key={formularyId}>
            <Grid item xs={6}>
              <div className="group">
                <label>
                  Contract Id <span className="astrict">*</span>
                </label>
                <input
                  type="text"
                  name="ssm_contract_id"
                  onChange={inputChangeHandler}
                />
              </div>

              <div className="group">
                <label>
                  PBP Id <span className="astrict">*</span>
                </label>
                <input
                  type="text"
                  name="ssm_pbp_id"
                  onChange={inputChangeHandler}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="group">
                <label>
                  copay <span className="astrict">*</span>
                </label>
                <input
                  type="number"
                  name="ssm_copay"
                  onChange={inputChangeHandler}
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

export const MMSSMRemove = (props) => {
  const {
    drug,
    ssmRemoveColumn,
    ssmRemoveData,
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

  let pssmRemoveData = ssmRemoveData
    ? ssmRemoveData.find((e) => e.formularyId === drug.id_formulary)?.data
    : [];

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "SSM") ? (
          <Grid item xs={5}>
            <div className="tier-grid-remove-container other-removed-sec">
              <Table
                columns={ssmRemoveColumn}
                dataSource={pssmRemoveData}
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
