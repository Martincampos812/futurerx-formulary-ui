import React from "react";
import { connect } from "react-redux";
import { Checkbox } from "antd";
import Box from "@material-ui/core/Box";
import { Menu, Dropdown } from "antd";
import { Table } from "antd";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import DrugGrid from "../DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { postMaintenaceDrugPA } from "../../../../../redux/slices/formulary/pa/paActionCreation";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../../shared/Frx-components/button/Button";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import {
  APPLY_PR_DRUGS,
  GET_PR_DRUG_REMOVE_TAB,
  GET_PR_SETTINGS_LIST,
  KEY_ENTITY_ID,
  TYPE_APPEND,
  TYPE_REMOVE,
  TYPE_REPLACE,
} from "../../../../../api/http-drug-details";
import {
  getDrugDetailsRemoveTab,
  getPRSettings,
  postRemovePRDrug,
  postReplacePRDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import { checkIfTABApplicableByCode, onClickTab } from "./MMUtils";
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
    getPRSettings: (a) => dispatch(getPRSettings(a)),
    postRemovePRDrug: (a) => dispatch(postRemovePRDrug(a)),
    postReplacePRDrug: (a) => dispatch(postReplacePRDrug(a)),
    getDrugDetailsRemoveTab: (a) => dispatch(getDrugDetailsRemoveTab(a)),
  };
}

interface rmSavePayload {
  is_covered: boolean;
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  selected_criteria_ids: any[];
  filter: any[];
  search_key: string;
}

interface rpSavePayload {
  is_covered: boolean;
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  patient_residences: any[];
  breadcrumb_code_value: string;
  filter: any[];
  search_key: string;
}

const DEFAULT_RM_SAVE_PAYLOAD: rmSavePayload = {
  is_covered: true,
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
};

const DEFAULT_RP_SAVE_PAYLOAD: rpSavePayload = {
  is_covered: true,
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  patient_residences: [],
  breadcrumb_code_value: "PATRS",
  filter: [],
  search_key: "",
};

class MassMaintenancePR extends React.Component<any, any> {
  state = {
    gridColumns: getColumns(),
    isSearchOpen: false,
    drugGridData: {} as any,
    showActions: false,
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
    isSelectAll: [] as any[],
    prSettings: [] as any[],
    prSettingsStatus: [] as any[],
    removeTabsData: [] as any[],
    prRemoveSettingsStatus: [] as any[],
    prCheckedList: [] as any[],
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
  };

  rmSavePayload: rmSavePayload = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
  };

  rpSavePayload: rpSavePayload = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    patient_residences: [],
    breadcrumb_code_value: "PATRS",
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

  handleSave = () => {
    console.log("-----Inside Save-------");
    console.log("The Drug Grid Data = ", this.state);

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = APPLY_PR_DRUGS;
      apiDetails["messageBody"] = {};

      this.props.maintenanceFormularies.list.map((drug) => {
        if (checkIfTABApplicableByCode(drug, "PATRS")) {
          this.rpSavePayload = DEFAULT_RP_SAVE_PAYLOAD;
          this.rmSavePayload = DEFAULT_RM_SAVE_PAYLOAD;

          const FOMRULARY_ID = drug.id_formulary;
          apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: FOMRULARY_ID }];

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
            FOMRULARY_ID +
            "/" +
            getLobCode(this.props.id_lob) +
            "/" +
            ACTION_TYPE;

          apiDetails["pathParams"] = ACTION_PATH;

          this.rpSavePayload.selected_drug_ids = SELECTED_DRUGS;
          this.rpSavePayload.is_select_all = SELECT_ALL;
          this.rmSavePayload.selected_drug_ids = SELECTED_DRUGS;
          this.rmSavePayload.is_select_all = SELECT_ALL;

          if (ACTIVE_TAB_INDEX === 0 || ACTIVE_TAB_INDEX === 1) {
            let patientResidences = this.state.prSettings.find(
              (e) => e.formularyId === FOMRULARY_ID
            )?.settings;

            let checkedPRRows = [];
            if (patientResidences && patientResidences.length > 0) {
              checkedPRRows = patientResidences
                .filter((f) => f.isChecked)
                .map((e) => {
                  if (e.isChecked && e.isChecked !== undefined) {
                    return e.id_patient_residence_type;
                  }
                });
            }

            let prSettingsStatus = this.state.prSettingsStatus.find(
              (e) => e.formularyId === FOMRULARY_ID
            );

            if (checkedPRRows && checkedPRRows.length > 0 && prSettingsStatus) {
              this.rpSavePayload.is_covered = prSettingsStatus.covered;
              this.rpSavePayload.patient_residences = checkedPRRows;
              apiDetails["messageBody"] = this.rpSavePayload;

              // // Replace and Append Drug method call
              this.props.postReplacePRDrug(apiDetails).then((json) => {
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
            let prCheckedList: any[] = [];
            if (this.state.prCheckedList.length > 0) {
              prCheckedList = this.state.prCheckedList.find(
                (e) => e?.formularyId === FOMRULARY_ID
              )?.selectedRows;
            }

            let prRemoveSettingsStatus: any[] = [
              ...this.state.prRemoveSettingsStatus,
            ];
            let prRmSettingsStats = prRemoveSettingsStatus.find(
              (e) => e.formularyId === FOMRULARY_ID
            );

            if (prCheckedList.length > 0 && prRmSettingsStats) {
              this.rmSavePayload.is_covered = prRmSettingsStats.covered;
              this.rmSavePayload.selected_criteria_ids = prCheckedList;
              apiDetails["messageBody"] = this.rmSavePayload;

              // Remove Drug method call
              this.props.postRemovePRDrug(apiDetails).then((json) => {
                console.log("The Remove PR Drug Response = ", json);
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
        }
      });
    }
  };

  handleStatus = (key: string, formularyId: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let prSettingsStatusList: any[] = [...this.state.prSettingsStatus];

    prSettingsStatusList = prSettingsStatusList.filter(
      (e) => e.formularyId !== formularyId
    );

    let prSettingsStatusObj = {
      formularyId,
      type: key,
      covered: isCovered,
    };

    prSettingsStatusList.push(prSettingsStatusObj);

    this.setState({ prSettingsStatus: prSettingsStatusList });
  };

  serviceSettingsChecked = (e, formularyId: string) => {
    let prSettings: any[] = [...this.state.prSettings];

    let prSettingsList = prSettings.find((e) => e.formularyId === formularyId)
      ?.settings;

    if (prSettingsList && prSettingsList.length > 0) {
      prSettingsList.forEach((s: any) => {
        if (s.id_patient_residence_type === e.target.id) {
          s.isChecked = e.target.checked;
        }
      });
    }

    let prSettingsObj = {
      formularyId,
      settings: prSettingsList ? prSettingsList : [],
    };

    prSettings = prSettings.filter((e) => e.formularyId !== formularyId);
    prSettings.push(prSettingsObj);

    this.setState({ prSettings });
  };

  handleSelectAll = (formularyId: string) => {
    let prSettings = this.state.prSettings;

    let prSettingsList = prSettings.find((e) => e.formularyId === formularyId)
      ?.settings;

    let isSelectAll = this.state.isSelectAll.find(
      (e) => e.formularyId === formularyId
    );

    let selected = isSelectAll.selected;

    prSettingsList.forEach((s: any) => {
      s.isChecked = !selected;
    });

    prSettings = prSettings.filter((e) => e.formularyId !== formularyId);

    let prSettingsObj = {
      formularyId,
      settings: prSettingsList ? prSettingsList : [],
    };

    prSettings.push(prSettingsObj);

    let isSelectAllList = this.state.isSelectAll.filter(
      (e) => e.formularyId !== formularyId
    );

    let isSelectAllObj = {
      formularyId,
      selected: !selected,
    };

    isSelectAllList.push(isSelectAllObj);

    this.setState({
      prSettings,
      isSelectAll: isSelectAllList,
    });
  };

  getPRRemoveSettings = (isCovered, formularyId: string) => {
    let removeTabsData = [...this.state.removeTabsData];

    removeTabsData = removeTabsData.filter(
      (e) => e.formularyId !== formularyId
    );

    this.listPayload["is_covered"] = isCovered;
    let apiDetails = {};
    apiDetails["apiPart"] = GET_PR_DRUG_REMOVE_TAB;
    apiDetails["pathParams"] = formularyId;
    apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];
    apiDetails["messageBody"] = this.listPayload;

    this.props.getDrugDetailsRemoveTab(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_patient_residence_type"],
          ele["patient_residence_type_code"],
          ele["patient_residence_type_name"],
          ele["is_covered"],
        ];
        return curRow;
      });

      let removeTabsDataObj = {
        formularyId,
        rows,
      };

      removeTabsData.push(removeTabsDataObj);

      this.setState({ removeTabsData });
    });
  };

  handleChangeEvent = (key: string, formularyId: string) => {
    let prRemoveSettingsStatus = [...this.state.prRemoveSettingsStatus];
    prRemoveSettingsStatus = prRemoveSettingsStatus.filter(
      (e) => e.formularyId !== formularyId
    );

    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let prRemoveSettingsStatusObj = {
      formularyId,
      type: key,
      covered: isCovered,
    };

    prRemoveSettingsStatus.push(prRemoveSettingsStatusObj);

    this.setState({ prRemoveSettingsStatus });
    this.getPRRemoveSettings(isCovered, formularyId);
  };

  handleRemoveChecked = (selectedRows, formularyId) => {
    let prCheckedList = [...this.state.prCheckedList];
    prCheckedList = prCheckedList.filter((e) => e !== formularyId);

    let prRemoveCheckedListObj = {
      formularyId,
      selectedRows,
    };

    prCheckedList.push(prRemoveCheckedListObj);

    this.setState({ prCheckedList });
  };

  renderTabContent = () => {
    const {
      activeTabIndex,
      prSettings,
      prSettingsStatus,
      isSelectAll,
    } = this.state;
    const formularyList = this.props.maintenanceFormularies.list;

    switch (activeTabIndex) {
      case 0:
        return (
          <>
            {formularyList.map((drug) => (
              <MMPRReplace
                key={drug.id_formulary}
                drug={drug}
                prSettingsServies={{ prSettings, prSettingsStatus }}
                handleStatus={(key) =>
                  this.handleStatus(key, drug.id_formulary)
                }
                serviceSettingsChecked={(e) =>
                  this.serviceSettingsChecked(e, drug.id_formulary)
                }
                selectAllHandler={{
                  isSelectAll: isSelectAll,
                  handleSelectAll: () =>
                    this.handleSelectAll(drug.id_formulary),
                }}
              />
            ))}
          </>
        );
      case 2:
        return (
          <>
            {formularyList.map((drug) => (
              <MMPRRemove
                key={drug.id_formulary}
                drug={drug}
                data={this.state.removeTabsData}
                handleChangeEvent={(key) =>
                  this.handleChangeEvent(key, drug.id_formulary)
                }
                handleRemoveChecked={(selectedRows) =>
                  this.handleRemoveChecked(selectedRows, drug.id_formulary)
                }
              />
            ))}
          </>
        );
    }
  };

  settingFormApplyHandler = () => {
    let showActions = this.state.drugGridData.selectedDrugs?.length > 0;
    this.setState({ showActions: showActions ? true : false });
  };

  getPRSettings = () => {
    const formularyList = this.props.maintenanceFormularies.list;
    formularyList.forEach((element) => {
      let apiDetails = {};
      apiDetails["apiPart"] = GET_PR_SETTINGS_LIST;

      this.props.getPRSettings(apiDetails).then((json) => {
        const prSettings =
          json.payload && json.payload.data ? json.payload.data : [];

        let prSettingsList: any[] = [...this.state.prSettings];

        let prSettingsStatusList: any[] = [...this.state.prSettingsStatus];
        const formularyId = element.id_formulary;

        let tempPrSettings = [...prSettings];

        tempPrSettings.forEach((s) => {
          s[
            "id_patient_residence_type"
          ] = `${s["id_patient_residence_type"]}${formularyId}`;
          s["isChecked"] = false;
        });

        let prSettingsObj = {
          formularyId,
          settings: tempPrSettings,
        };
        prSettingsList.push(prSettingsObj);

        prSettingsStatusList = prSettingsStatusList.filter(
          (e) => e.formularyId !== formularyId
        );

        let prSettingsStatusObj = {
          formularyId,
          type: "covered",
          covered: true,
        };

        prSettingsStatusList.push(prSettingsStatusObj);

        tempPrSettings = [];

        let isSelectAll = [...this.state.isSelectAll];

        let selectAllObj = {
          formularyId,
          selected: false,
        };

        isSelectAll.push(selectAllObj);

        this.setState({
          prSettings: prSettingsList,
          prSettingsStatus: prSettingsStatusList,
          isSelectAll,
        });
      });
    });
  };

  componentDidMount() {
    this.getPRSettings();
  }

  onClickTab = (selectedTabIndex: number) => {
    const { tabs, activeTabIndex } = onClickTab(
      this.state.tabs,
      selectedTabIndex
    );

    if (activeTabIndex === 2) {
      const formularyList = this.props.maintenanceFormularies.list;
      formularyList.forEach((element) => {
        const formularyId = element.id_formulary;
        this.getPRRemoveSettings(true, formularyId);
      });
    }

    this.setState({ tabs, activeTabIndex });
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
            <div className="header">PRIOR AUTHORIZATION</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenancePR);

export const MMPRReplace = (props) => {
  const {
    serviceSettingsChecked,
    prSettingsServies,
    drug,
    selectAllHandler,
    handleStatus,
  } = props;

  const formularyId = drug.id_formulary;

  let prSettings = prSettingsServies.prSettings;

  prSettings = prSettings.find((e) => e.formularyId === formularyId)?.settings;

  let prSettingsStatus = prSettingsServies.prSettingsStatus.find(
    (e) => e.formularyId === formularyId
  );

  let isSelectAll = selectAllHandler.isSelectAll;
  isSelectAll = isSelectAll.find((e) => e.formularyId === formularyId)
    ?.selected;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "PATRS") ? (
          <div className="pr-limit-settings bordered mb-10 white-bg">
            <PanelHeader
              title="patient residence settings"
              tooltip="patient residence settings"
            />

            {prSettingsStatus && (
              <div className="inner-container">
                <StatusContentFormPanel
                  title="Patient Residence"
                  type={prSettingsStatus.type}
                  handleStatus={handleStatus}
                  showDelete={false}
                >
                  <div className="input-field-group">
                    <div className="input-field-group__header">
                      <div className="input-field-group__label">
                        Select services:
                      </div>
                      <div
                        className="input-field-group__select-all-action"
                        onClick={selectAllHandler.handleSelectAll}
                      >
                        {isSelectAll ? "Unselect all" : "Select all"}
                      </div>
                    </div>

                    <div className="input-field-group__radio-field-group">
                      {prSettings &&
                        prSettings.length > 0 &&
                        prSettings.map((s) => (
                          <div
                            className="input-field-group__radio-field"
                            key={s.id_patient_residence_type}
                          >
                            <Checkbox
                              id={s.id_patient_residence_type}
                              name={s.id_patient_residence_type}
                              onChange={serviceSettingsChecked}
                              checked={s.isChecked}
                            ></Checkbox>
                            <label
                              htmlFor={s.id_patient_residence_type}
                              className="checkbox-label"
                            >
                              {`${s.patient_residence_type_code} -
                      ${s.patient_residence_type_name}`}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                </StatusContentFormPanel>
              </div>
            )}
          </div>
        ) : (
          <p>Not applicable for this formulary</p>
        )}
      </div>
    </>
  );
};

export class MMPRRemove extends React.Component<any, any> {
  state = {
    selectedRowKeys: [],
    dataToRemove: [],
    selType: "",
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  getSelectedVal = (e) => {
    this.setState({ selType: e.key });
    this.props.handleChangeEvent(e.key);
  };

  static getDerivedStateFromProps(props, state) {
    const data: any = [];
    const formularyId = props.drug.id_formulary;
    let prData = props.data.find((e) => e.formularyId === formularyId)?.rows;

    if (prData) {
      for (let i = 0; i < prData.length; i++) {
        data.push({
          key: prData[i][0],
          name: prData[i][2],
        });
      }
    }

    return { dataToRemove: data };
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        this.props.handleRemoveChecked(selectedRows);
      },
    };

    const menu = (
      <Menu>
        <Menu.Item key="covered" onClick={(e) => this.getSelectedVal(e)}>
          {"Covered"}
        </Menu.Item>
        <Menu.Item key="not-covered" onClick={(e) => this.getSelectedVal(e)}>
          {"Not Covered"}
        </Menu.Item>
      </Menu>
    );

    const renderStatusDropdown = () => {
      switch (this.state.selType) {
        case "covered":
          return (
            <>
              <CorrectIcon />
              {<span>covered</span>}
              <DropdownArrowIcon />
            </>
          );
        case "not-covered":
          return (
            <>
              <InCorrectIcon />
              {<span>not covered</span>}
              <DropdownArrowIcon />
            </>
          );
        default:
          return (
            <>
              <CorrectIcon />
              {<span>covered</span>}
              <DropdownArrowIcon />
            </>
          );
      }
    };
    const { drug } = this.props;
    const { selType, dataToRemove } = this.state;

    return (
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "PATRS") ? (
          <div className="tab-prremove pr-limit-settings bordered mb-10">
            <PanelHeader
              title="patient residence criteria"
              tooltip="patient residence criteria"
            />
            <div className="inner-container">
              <div className="tier-grid-remove-container">
                <Dropdown
                  overlay={menu}
                  placement="bottomCenter"
                  trigger={["click"]}
                  className="cover-drp"
                >
                  <div className="status-content-form-panel__type-dropdown">
                    {renderStatusDropdown()}
                  </div>
                </Dropdown>

                <Table
                  key={selType}
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataToRemove}
                  pagination={false}
                  className={
                    selType === "not-covered" ? "not-covered" : "covered"
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <p>Not applicable for this formulary</p>
        )}
      </div>
    );
  }
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
];

const CorrectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
  >
    <path
      d="M6.50009 0.619141C3.25244 0.619141 0.619141 3.25244 0.619141 6.50009C0.619141 9.74774 3.25244 12.381 6.50009 12.381C9.74774 12.381 12.381 9.74774 12.381 6.50009C12.381 3.25244 9.74774 0.619141 6.50009 0.619141ZM9.04019 4.57959L6.27562 8.41272C6.23698 8.46665 6.18604 8.51059 6.12703 8.54091C6.06802 8.57122 6.00263 8.58703 5.93628 8.58703C5.86994 8.58703 5.80455 8.57122 5.74554 8.54091C5.68652 8.51059 5.63559 8.46665 5.59695 8.41272L3.95999 6.14435C3.91011 6.07477 3.95999 5.97763 4.04532 5.97763H4.66098C4.79488 5.97763 4.92221 6.04196 5.00098 6.15222L5.93563 7.44918L7.99921 4.58747C8.07797 4.47852 8.20399 4.41288 8.3392 4.41288H8.95487C9.04019 4.41288 9.09008 4.51002 9.04019 4.57959Z"
      fill="#80C483"
    />
  </svg>
);

const DropdownArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="3"
    viewBox="0 0 6 3"
    fill="none"
  >
    <path
      d="M0.403717 0H5.59628C5.9555 0 6.13512 0.382449 5.88084 0.606582L3.28556 2.89594C3.12815 3.03469 2.87185 3.03469 2.71444 2.89594L0.119165 0.606582C-0.135116 0.382449 0.0444952 0 0.403717 0Z"
      fill="#707683"
    />
  </svg>
);

const InCorrectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M6 0C2.69163 0 0 2.69163 0 6C0 9.30837 2.69163 12 6 12C9.30837 12 12 9.30837 12 6C12 2.69163 9.30837 0 6 0ZM8.1724 7.5199C8.21707 7.56234 8.25278 7.61328 8.27744 7.66973C8.30211 7.72618 8.31522 7.787 8.31601 7.8486C8.3168 7.9102 8.30525 7.97133 8.28204 8.0284C8.25883 8.08546 8.22443 8.13731 8.18087 8.18087C8.13731 8.22443 8.08546 8.25883 8.0284 8.28204C7.97133 8.30525 7.9102 8.3168 7.8486 8.31601C7.787 8.31522 7.72618 8.30211 7.66973 8.27744C7.61328 8.25278 7.56234 8.21707 7.5199 8.1724L6 6.65279L4.4801 8.1724C4.39284 8.25531 4.27664 8.30084 4.15629 8.2993C4.03594 8.29776 3.92095 8.24926 3.83584 8.16416C3.75074 8.07905 3.70224 7.96406 3.7007 7.84371C3.69916 7.72336 3.74469 7.60716 3.8276 7.5199L5.34721 6L3.8276 4.4801C3.74469 4.39284 3.69916 4.27664 3.7007 4.15629C3.70224 4.03594 3.75074 3.92095 3.83584 3.83584C3.92095 3.75074 4.03594 3.70224 4.15629 3.7007C4.27664 3.69916 4.39284 3.74469 4.4801 3.8276L6 5.34721L7.5199 3.8276C7.60716 3.74469 7.72336 3.69916 7.84371 3.7007C7.96406 3.70224 8.07905 3.75074 8.16416 3.83584C8.24926 3.92095 8.29776 4.03594 8.2993 4.15629C8.30084 4.27664 8.25531 4.39284 8.1724 4.4801L6.65279 6L8.1724 7.5199Z"
      fill="#E76262"
    />
  </svg>
);
