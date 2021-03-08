import React from "react";
import { connect } from "react-redux";
import { Checkbox } from "antd";
import Box from "@material-ui/core/Box";
import { Menu, Dropdown } from "antd";
import { Table } from "antd";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import DrugGrid from "../DrugGrid";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../../shared/Frx-components/button/Button";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { postMaintenaceDrugPA } from "../../../../../redux/slices/formulary/pa/paActionCreation";
import { checkIfTABApplicableByCode, onClickTab } from "./MMUtils";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import {
  APPLY_POS_DRUGS,
  GET_DRUG_SETTING_POS,
  GET_POS_CRITERIA_LIST,
  KEY_ENTITY_ID,
  TYPE_APPEND,
  TYPE_REMOVE,
  TYPE_REPLACE,
} from "../../../../../api/http-drug-details";
import {
  getDrugDetailsPOSSettings,
  postPOSCriteriaList,
  postRemovePOSDrug,
  postReplacePOSDrug,
} from "../../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
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
    getDrugDetailsPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
    postPOSCriteriaList: (a) => dispatch(postPOSCriteriaList(a)),
    postRemovePOSDrug: (a) => dispatch(postRemovePOSDrug(a)),
    postReplacePOSDrug: (a) => dispatch(postReplacePOSDrug(a)),
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
  place_of_services: any[];
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
  place_of_services: [],
  breadcrumb_code_value: "POS",
  filter: [],
  search_key: "",
};

class MassMaintenancePOS extends React.Component<any, any> {
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
    posSettings: [] as any[],
    posSettingsStatus: [] as any[],
    removeTabsData: [] as any[],
    posRemoveSettingsStatus: [] as any[],
    posCheckedList: [] as any[],
  };

  posCriteriaPayload: any = {
    is_advance_search: false,
    filter: [],
    search_key: "",
    is_covered: true,
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
    place_of_services: [],
    breadcrumb_code_value: "POS",
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

  settingFormApplyHandler = () => {
    let showActions = this.state.drugGridData.selectedDrugs?.length > 0;
    this.setState({ showActions: showActions ? true : false });
  };

  getPOSSettings = () => {
    const formularyList = this.props.maintenanceFormularies.list;
    formularyList.forEach((element) => {
      let apiDetails = {};
      apiDetails["apiPart"] = GET_DRUG_SETTING_POS;
      this.props.getDrugDetailsPOSSettings(apiDetails).then((json) => {
        const posSettings =
          json.payload && json.payload.data ? json.payload.data : [];

        let posSettingsList: any[] = [...this.state.posSettings];

        let posSettingsStatusList: any[] = [...this.state.posSettingsStatus];
        const formularyId = element.id_formulary;

        let tempPosSettings = [...posSettings]; //id_place_of_service_type

        tempPosSettings.forEach((s) => {
          s[
            "id_place_of_service_type"
          ] = `${s["id_place_of_service_type"]}${formularyId}`;
          s["isChecked"] = false;
        });

        let posSettingsObj = {
          formularyId,
          settings: tempPosSettings,
        };
        posSettingsList.push(posSettingsObj);

        posSettingsStatusList = posSettingsStatusList.filter(
          (e) => e.formularyId !== formularyId
        );

        let posSettingsStatusObj = {
          formularyId,
          type: "covered",
          covered: true,
        };

        posSettingsStatusList.push(posSettingsStatusObj);

        tempPosSettings = [];

        let isSelectAll = [...this.state.isSelectAll];

        let selectAllObj = {
          formularyId,
          selected: false,
        };

        isSelectAll.push(selectAllObj);

        this.setState({
          posSettings: posSettingsList,
          posSettingsStatus: posSettingsStatusList,
          isSelectAll,
        });
      });
    });
  };

  componentDidMount() {
    this.getPOSSettings();
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
        this.getPOSCriteriaList(true, formularyId);
      });
    }

    this.setState({ tabs, activeTabIndex });
  };

  handleSelectAll = (formularyId: string) => {
    let posSettings = this.state.posSettings;

    let posSettingsList = posSettings.find((e) => e.formularyId === formularyId)
      ?.settings;

    let isSelectAll = this.state.isSelectAll.find(
      (e) => e.formularyId === formularyId
    );

    let selected = isSelectAll.selected;

    posSettingsList.forEach((s: any) => {
      s.isChecked = !selected;
    });

    posSettings = posSettings.filter((e) => e.formularyId !== formularyId);

    let posSettingsObj = {
      formularyId,
      settings: posSettingsList ? posSettingsList : [],
    };

    posSettings.push(posSettingsObj);

    let isSelectAllList = this.state.isSelectAll.filter(
      (e) => e.formularyId !== formularyId
    );

    let isSelectAllObj = {
      formularyId,
      selected: !selected,
    };

    isSelectAllList.push(isSelectAllObj);

    this.setState({
      posSettings,
      isSelectAll: isSelectAllList,
    });
  };

  handleStatus = (key: string, formularyId: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let posSettingsStatusList: any[] = [...this.state.posSettingsStatus];

    posSettingsStatusList = posSettingsStatusList.filter(
      (e) => e.formularyId !== formularyId
    );

    let posSettingsStatusObj = {
      formularyId,
      type: key,
      covered: isCovered,
    };

    posSettingsStatusList.push(posSettingsStatusObj);

    this.setState({ posSettingsStatus: posSettingsStatusList });
  };

  serviceSettingsChecked = (e, formularyId: string) => {
    let posSettings: any[] = [...this.state.posSettings];

    let posSettingsList = posSettings.find((e) => e.formularyId === formularyId)
      ?.settings;

    if (posSettingsList && posSettingsList.length > 0) {
      posSettingsList.forEach((s: any) => {
        if (s.id_place_of_service_type === e.target.id) {
          s.isChecked = e.target.checked;
        }
      });
    }

    let posSettingsObj = {
      formularyId,
      settings: posSettingsList ? posSettingsList : [],
    };

    posSettings = posSettings.filter((e) => e.formularyId !== formularyId);
    posSettings.push(posSettingsObj);

    this.setState({ posSettings });
  };

  handleChangeEvent = (key: string, formularyId: string) => {
    let posRemoveSettingsStatus = [...this.state.posRemoveSettingsStatus];
    posRemoveSettingsStatus = posRemoveSettingsStatus.filter(
      (e) => e.formularyId !== formularyId
    );

    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posRemoveSettingsStatusObj = {
      formularyId,
      type: key,
      covered: isCovered,
    };

    posRemoveSettingsStatus.push(posRemoveSettingsStatusObj);

    this.setState({ posRemoveSettingsStatus });
    this.getPOSCriteriaList(isCovered, formularyId);
  };

  handleRemoveChecked = (selectedRows, formularyId: string) => {
    let posCheckedList = [...this.state.posCheckedList];
    posCheckedList = posCheckedList.filter((e) => e !== formularyId);

    let posRemoveCheckedListObj = {
      formularyId,
      selectedRows,
    };

    posCheckedList.push(posRemoveCheckedListObj);

    this.setState({ posCheckedList });
  };

  getPOSCriteriaList = (isCovered, formularyId: string) => {
    let removeTabsData = [...this.state.removeTabsData];

    removeTabsData = removeTabsData.filter(
      (e) => e.formularyId !== formularyId
    );

    let apiDetails = {};
    apiDetails["apiPart"] = GET_POS_CRITERIA_LIST;
    apiDetails["pathParams"] = formularyId;
    apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];
    this.posCriteriaPayload.is_covered = isCovered;
    apiDetails["messageBody"] = this.posCriteriaPayload;

    this.props.postPOSCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["id_place_of_service_type"],
          ele["place_of_service_type_name"],
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

  renderTabContent = () => {
    const {
      activeTabIndex,
      posSettings,
      posSettingsStatus,
      isSelectAll,
      removeTabsData,
    } = this.state;
    const formularyList = this.props.maintenanceFormularies.list;

    switch (activeTabIndex) {
      case 0:
        return (
          <>
            {formularyList.map((drug) => (
              <MMPOSReplace
                key={drug.id_formulary}
                drug={drug}
                selectAllHandler={{
                  isSelectAll: isSelectAll,
                  handleSelectAll: () =>
                    this.handleSelectAll(drug.id_formulary),
                }}
                handleStatus={(key) =>
                  this.handleStatus(key, drug.id_formulary)
                }
                serviceSettingsChecked={(e) =>
                  this.serviceSettingsChecked(e, drug.id_formulary)
                }
                posSettingsServies={{ posSettings, posSettingsStatus }}
              />
            ))}
          </>
        );
      case 2:
        return (
          <>
            {formularyList.map((drug) => (
              <MMPOSRemove
                key={drug.id_formulary}
                drug={drug}
                data={removeTabsData}
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

  handleSave = () => {
    console.log("-----Inside Save-------");
    console.log("The Drug Grid Data = ", this.state);

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
      let apiDetails = {};
      apiDetails["apiPart"] = APPLY_POS_DRUGS;
      apiDetails["messageBody"] = {};

      this.props.maintenanceFormularies.list.map((drug) => {
        if (checkIfTABApplicableByCode(drug, "POS")) {
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
            // Replace & Append Drug method call
            let placeOfServices = this.state.posSettings.find(
              (e) => e.formularyId === FOMRULARY_ID
            )?.settings;

            let checkedPOSRows = [];
            if (placeOfServices && placeOfServices.length > 0) {
              checkedPOSRows = placeOfServices
                .filter((f) => f.isChecked)
                .map((e) => {
                  if (e.isChecked && e.isChecked !== undefined) {
                    return e.id_place_of_service_type;
                  }
                });
            }

            let posSettingsStatus = this.state.posSettingsStatus.find(
              (e) => e.formularyId === FOMRULARY_ID
            );

            if (
              checkedPOSRows &&
              checkedPOSRows.length > 0 &&
              posSettingsStatus
            ) {
              this.rpSavePayload.place_of_services = checkedPOSRows;
              this.rpSavePayload.is_covered = posSettingsStatus.covered;
              apiDetails["messageBody"] = this.rpSavePayload;

              this.props.postReplacePOSDrug(apiDetails).then((json) => {
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
            let posCheckedList: any[] = [];
            if (this.state.posCheckedList.length > 0) {
              posCheckedList = this.state.posCheckedList.find(
                (e) => e?.formularyId === FOMRULARY_ID
              )?.selectedRows;
            }

            let posRemoveSettingsStatus: any[] = [
              ...this.state.posRemoveSettingsStatus,
            ];
            let posRmSettingsStats = posRemoveSettingsStatus.find(
              (e) => e.formularyId === FOMRULARY_ID
            );

            if (posCheckedList.length > 0 && posRmSettingsStats) {
              this.rmSavePayload.is_covered = posRmSettingsStats.covered;
              this.rmSavePayload.selected_criteria_ids = posCheckedList;
              apiDetails["messageBody"] = this.rmSavePayload;
              // Remove Drug method call
              this.props.postRemovePOSDrug(apiDetails).then((json) => {
                console.log("The Remove PT Drug Response = ", json);
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

export default connect(mapStateToProps, mapDispatchToProps)(MassMaintenancePOS);

export const MMPOSReplace = (props) => {
  const {
    drug,
    selectAllHandler,
    handleStatus,
    serviceSettingsChecked,
    posSettingsServies,
  } = props;

  const formularyId = drug.id_formulary;

  let posSettings = posSettingsServies.posSettings;

  posSettings = posSettings.find((e) => e.formularyId === formularyId)
    ?.settings;

  let posSettingsStatus = posSettingsServies.posSettingsStatus.find(
    (e) => e.formularyId === formularyId
  );

  let isSelectAll = selectAllHandler.isSelectAll;
  isSelectAll = isSelectAll.find((e) => e.formularyId === formularyId)
    ?.selected;

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={formularyId}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfTABApplicableByCode(drug, "POS") ? (
          <div className="pos-limit-settings bordered mb-10 white-bg">
            <PanelHeader
              title="place of service settings"
              tooltip="place of service settings"
            />

            {posSettingsStatus && (
              <div className="inner-container">
                <StatusContentFormPanel
                  title="Place of Service"
                  type={posSettingsStatus.type}
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
                      {posSettings &&
                        posSettings.length > 0 &&
                        posSettings.map((s) => (
                          <div
                            className="input-field-group__radio-field"
                            key={s.id_place_of_service_type}
                          >
                            <Checkbox
                              id={s.id_place_of_service_type}
                              name={s.id_place_of_service_type}
                              onChange={serviceSettingsChecked}
                              checked={s.isChecked}
                            ></Checkbox>
                            <label
                              htmlFor={s.id_place_of_service_type}
                              className="checkbox-label"
                            >
                              {`${s.place_of_service_type_code} -
                      ${s.place_of_service_type_name}`}
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

export class MMPOSRemove extends React.Component<any, any> {
  state = {
    selectedRowKeys: [],
    dataToRemove: [],
    selType: "",
  };

  static getDerivedStateFromProps(props, state) {
    const data: any = [];
    const formularyId = props.drug.id_formulary;
    let posData = props.data.find((e) => e.formularyId === formularyId)?.rows;

    if (posData) {
      for (let i = 0; i < posData.length; i++) {
        data.push({
          key: posData[i][0],
          name: posData[i][1],
        });
      }
    }
    return { dataToRemove: data };
  }

  getSelectedVal = (e) => {
    this.setState({ selType: e.key });
    this.props.handleChangeEvent(e.key);
  };

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
        {checkIfTABApplicableByCode(drug, "POS") ? (
          <div className="tab-prremove pr-limit-settings bordered mb-10">
            <PanelHeader
              title="place of service criteria"
              tooltip="place of service criteria"
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
