import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Table } from "antd";
import Box from "@material-ui/core/Box";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import { getColumns } from "../../../../../mocks/formulary-grid/FormularySimpleGridMock";
import MMDDSelectedFormulariesGrid from "./MMDDSelectedFormulariesGrid";
import DrugGrid from "../DrugGrid";
import AdvancedSearch from "../../../DrugDetails/components/FormularyConfigure/components/search/AdvancedSearch";
import { getMMDrugDetailsColumns } from "../../../DrugDetails/components/FormularyConfigure/DrugGridColumn";
import { postMaintenaceDrugPA } from "../../../../../redux/slices/formulary/pa/paActionCreation";
import FrxMiniTabs from "../../../../shared/FrxMiniTabs/FrxMiniTabs";
import CustomizedSwitches from "../../../DrugDetails/components/FormularyConfigure/components/CustomizedSwitches";
import Button from "../../../../shared/Frx-components/button/Button";
import {
  APPLY_OTHER_DRUGS,
  APPLY_SO_DRUG,
  GET_DRUG_SUMMARY_OTHER,
  GET_DRUG_SUMMARY_SO,
  GET_OTHER_CRITERIA_LIST,
  KEY_ENTITY_ID,
  TYPE_APPEND,
  TYPE_REMOVE,
  TYPE_REPLACE,
} from "../../../../../api/http-drug-details";
import getLobCode from "../../../Utils/LobUtils";
import { onClickTab } from "./MMUtils";
import {
  getDrugDetailsSOSummary,
  getSOCriteriaList,
  postRemoveSODrug,
  postReplaceSODrug,
} from "../../../../../redux/slices/formulary/drugDetails/so/soActionCreation";
import {
  getDrugDetailsOTHERSummary,
  getOTHERCriteriaList,
  postRemoveOtherDrug,
  postReplaceOtherDrug,
} from "../../../../../redux/slices/formulary/drugDetails/other/otherActionCreation";

const mapStateToProps = (state) => {
  return {
    maintenanceFormularies: state.maintenance.maintenanceFormularies,
    id_lob: state.maintenance?.selectedRow?.id_lob,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsSOSummary: (a) => dispatch(getDrugDetailsSOSummary(a)),
    postMaintenaceDrugPA: (a) => dispatch(postMaintenaceDrugPA(a)),
    getSOCriteriaList: (a) => dispatch(getSOCriteriaList(a)),
    postRemoveSODrug: (a) => dispatch(postRemoveSODrug(a)),
    postReplaceSODrug: (a) => dispatch(postReplaceSODrug(a)),
    getDrugDetailsOTHERSummary: (a) => dispatch(getDrugDetailsOTHERSummary(a)),
    getOTHERCriteriaList: (a) => dispatch(getOTHERCriteriaList(a)),
    postRemoveOtherDrug: (a) => dispatch(postRemoveOtherDrug(a)),
    postReplaceOtherDrug: (a) => dispatch(postReplaceOtherDrug(a)),
  };
}

interface rpSOSavePayload {
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  id_supplemental_benefit: string;
  breadcrumb_code_value: string;
  selected_criteria_ids: any[];
  filter: any[];
  search_key: string;
}

interface rmSOSavePayload {
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  selected_criteria_ids: any[];
  filter: any[];
  search_key: string;
}

interface rpCOMMSavePayload {
  is_covered: boolean;
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  id_edit: any;
  breadcrumb_code_value: any;
  filter: any[];
  search_key: any;
}

interface rmCOMMSavePayload {
  is_covered: boolean;
  selected_drug_ids: any[];
  is_select_all: boolean;
  covered: any;
  not_covered: any;
  selected_criteria_ids: any[];
  filter: any[];
  search_key: any;
}

const defrpSOSavePayload: rpSOSavePayload = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  id_supplemental_benefit: "",
  breadcrumb_code_value: "",
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
};

const defrmSOSavePayload: rmSOSavePayload = {
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
};

const DEF_RP_COMM_SAVE_PAYLOAD: rpCOMMSavePayload = {
  is_covered: true,
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  id_edit: null,
  breadcrumb_code_value: null,
  filter: [],
  search_key: "",
};

const DEF_RM_COMM_SAVE_PAYLOAD: rmCOMMSavePayload = {
  is_covered: true,
  selected_drug_ids: [],
  is_select_all: false,
  covered: {},
  not_covered: {},
  selected_criteria_ids: [],
  filter: [],
  search_key: "",
};

class MassMaintenanceOther extends React.Component<any, any> {
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
    selectedCriteria: [] as any[],
    showActions: false,
    udfs: [] as any[],
    otherData: [] as any[],
    otherColumns: [
      {
        title: "User Defined Field",
        dataIndex: "udf",
        key: "udf",
      },
    ],
    otherCOMMData: [] as any[],
    selectedCOMMCriteria: [] as any[],
    otherCOMMColumns: [] as any[],
    otherCOMMDropDownSelections: [] as any[],
  };

  rpSOSavePayload: rpSOSavePayload = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    id_supplemental_benefit: "",
    breadcrumb_code_value: "",
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
  };

  rmSOSavePayload: rmSOSavePayload = {
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    selected_criteria_ids: [],
    filter: [],
    search_key: "",
  };

  rpCOMMSavePayload: rpCOMMSavePayload = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
    id_edit: null,
    breadcrumb_code_value: null,
    filter: [],
    search_key: "",
  };

  rmCOMMSavePayload: rmCOMMSavePayload = {
    is_covered: true,
    selected_drug_ids: [],
    is_select_all: false,
    covered: {},
    not_covered: {},
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

  onSelectedRowKeysChange = (selectedRowKeys, formularyId) => {
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;
    const OTHER_DATA: any[] = this.state.otherData.find(
      (e) => e.formularyId === formularyId
    )?.list;

    if (
      selectedRowKeys &&
      selectedRowKeys.length > 0 &&
      OTHER_DATA &&
      OTHER_DATA.length > 0
    ) {
      if (ACTIVE_TAB_INDEX === 0 || ACTIVE_TAB_INDEX === 1) {
        let codeValue = "";
        let idEdit = "";

        for (let i = 0; i < OTHER_DATA.length; i++) {
          if (OTHER_DATA[i].key === selectedRowKeys[0]) {
            codeValue = OTHER_DATA[i].code_value;
            idEdit = OTHER_DATA[i].key;
          }
        }

        this.rpSOSavePayload.breadcrumb_code_value = codeValue;
        this.rpSOSavePayload.id_supplemental_benefit = idEdit;
        this.rmSOSavePayload.selected_criteria_ids = [];
      } else if (ACTIVE_TAB_INDEX === 2) {
        let criteriaIds: any[] = [];
        for (let i = 0; i < OTHER_DATA.length; i++) {
          if (OTHER_DATA[i].key === selectedRowKeys[i]) {
            criteriaIds.push(OTHER_DATA[i].code_value);
          }
        }

        this.rmSOSavePayload.selected_criteria_ids = criteriaIds;
        this.rpSOSavePayload.breadcrumb_code_value = "";
        this.rpSOSavePayload.id_supplemental_benefit = "";
      }

      let selectedCriteria = [...this.state.selectedCriteria];
      selectedCriteria = selectedCriteria.filter(
        (e) => e.formularyId !== formularyId
      );

      let selectedCriteriaObject = {
        formularyId,
        list: selectedRowKeys.map((otId) => otId),
      };

      selectedCriteria.push(selectedCriteriaObject);
      this.setState({ selectedCriteria });
    }
  };

  handleSave = () => {
    console.log("-----Inside Save-------");
    console.log("The Drug Grid Data = ", this.state);

    const LOB_ID = this.props.id_lob;

    const SELECTED_DRUGS = this.state.drugGridData["selectedDrugs"];
    const ACTIVE_TAB_INDEX = this.state.activeTabIndex;

    if (LOB_ID !== 4) {
      if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
        let apiDetails = {};
        apiDetails["apiPart"] = APPLY_SO_DRUG;

        let ACTION_TYPE;
        if (ACTIVE_TAB_INDEX === 0) {
          ACTION_TYPE = TYPE_REPLACE;
        } else if (ACTIVE_TAB_INDEX === 1) {
          ACTION_TYPE = TYPE_APPEND;
        } else if (ACTIVE_TAB_INDEX === 2) {
          ACTION_TYPE = TYPE_REMOVE;
        }

        const LOB_TYPE = getLobCode(this.props.id_lob);

        this.props.maintenanceFormularies.list.map((drug) => {
          if (checkIfApplicable(drug)) {
            this.rpSOSavePayload = defrpSOSavePayload;
            this.rmSOSavePayload = defrmSOSavePayload;

            const FORMULARY_ID = drug.id_formulary;

            apiDetails["keyVals"] = [
              { key: KEY_ENTITY_ID, value: FORMULARY_ID },
            ];
            apiDetails["messageBody"] = {};

            const ACTION_PATH =
              FORMULARY_ID + "/" + LOB_TYPE + "/" + ACTION_TYPE;

            const SELECT_ALL = this.state.drugGridData["isSelectAll"];

            apiDetails["pathParams"] = ACTION_PATH;

            this.rpSOSavePayload.selected_drug_ids = SELECTED_DRUGS;
            this.rpSOSavePayload.is_select_all = SELECT_ALL;
            this.rmSOSavePayload.selected_drug_ids = SELECTED_DRUGS;
            this.rmSOSavePayload.is_select_all = SELECT_ALL;

            if (ACTIVE_TAB_INDEX === 0 || ACTIVE_TAB_INDEX === 1) {
              apiDetails["messageBody"] = this.rpSOSavePayload;

              // Replace Drug method call
              this.props.postReplaceSODrug(apiDetails).then((json) => {
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
              apiDetails["messageBody"] = this.rmSOSavePayload;

              // Remove Drug method call
              this.props.postRemoveSODrug(apiDetails).then((json) => {
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
    } else {
      if (SELECTED_DRUGS && SELECTED_DRUGS.length > 0) {
        let apiDetails = {};
        apiDetails["apiPart"] = APPLY_OTHER_DRUGS;

        let ACTION_TYPE;
        if (ACTIVE_TAB_INDEX === 0) {
          ACTION_TYPE = TYPE_REPLACE;
        } else if (ACTIVE_TAB_INDEX === 1) {
          ACTION_TYPE = TYPE_APPEND;
        } else if (ACTIVE_TAB_INDEX === 2) {
          ACTION_TYPE = TYPE_REMOVE;
        }

        const LOB_TYPE = getLobCode(this.props.id_lob);

        this.props.maintenanceFormularies.list.map((drug) => {
          if (checkIfApplicable(drug)) {
            this.rpCOMMSavePayload = DEF_RP_COMM_SAVE_PAYLOAD;
            this.rmCOMMSavePayload = DEF_RM_COMM_SAVE_PAYLOAD;

            const FORMULARY_ID = drug.id_formulary;

            apiDetails["keyVals"] = [
              { key: KEY_ENTITY_ID, value: FORMULARY_ID },
            ];
            apiDetails["messageBody"] = {};

            const ACTION_PATH =
              FORMULARY_ID + "/" + LOB_TYPE + "/" + ACTION_TYPE;

            const SELECT_ALL = this.state.drugGridData["isSelectAll"];

            apiDetails["pathParams"] = ACTION_PATH;

            if (ACTIVE_TAB_INDEX === 0 || ACTIVE_TAB_INDEX === 1) {
              this.rpCOMMSavePayload.selected_drug_ids = SELECTED_DRUGS;
              this.rpCOMMSavePayload.is_select_all = SELECT_ALL;
              let selectedCriteria = this.state.selectedCOMMCriteria;
              selectedCriteria = selectedCriteria.find(
                (e) => e.formularyId === FORMULARY_ID
              )?.list;
              this.rpCOMMSavePayload.breadcrumb_code_value =
                selectedCriteria[0].code_value;
              this.rpCOMMSavePayload.id_edit = selectedCriteria[0].key;

              apiDetails["messageBody"] = this.rpCOMMSavePayload;

              if (selectedCriteria && selectedCriteria.length > 0) {
                // Replace Drug method call
                this.props.postReplaceOtherDrug(apiDetails).then((json) => {
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
              this.rmCOMMSavePayload.selected_drug_ids = SELECTED_DRUGS;
              this.rmCOMMSavePayload.is_select_all = SELECT_ALL;
              apiDetails["messageBody"] = this.rmCOMMSavePayload;

              // Remove Drug method call
              this.props.postRemoveOtherDrug(apiDetails).then((json) => {
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
    }
  };

  getOTHERCriteriaList = (formularyId) => {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_OTHER_CRITERIA_LIST;
    apiDetails["pathParams"] = formularyId;
    apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

    this.props.getOTHERCriteriaList(apiDetails).then((json) => {
      let tmpData =
        json.payload && json.payload.result ? json.payload.result : [];

      let settingsRows = tmpData.map((ele) => {
        let curRow = {
          key: ele["id_edit"],
          udf: ele["edit_name"],
          code_value: ele["code_value"],
        };
        return curRow;
      });

      let otherCOMMDATA = [...this.state.otherCOMMData];
      otherCOMMDATA = otherCOMMDATA.filter(
        (e) => e.formularyId !== formularyId
      );

      let otherCOMMDATAObj = {
        formularyId,
        list: settingsRows,
      };

      otherCOMMDATA.push(otherCOMMDATAObj);

      this.setState({
        otherCOMMData: otherCOMMDATA,
      });
    });
  };

  onClickTab = (selectedTabIndex: number) => {
    const { tabs, activeTabIndex } = onClickTab(
      this.state.tabs,
      selectedTabIndex
    );

    if (activeTabIndex === 2) {
      const formularyList = this.props.maintenanceFormularies.list;
      formularyList.forEach((element) => {
        const formularyId = element.id_formulary;
        if (this.props.id_lob === 4) {
          this.getOTHERCriteriaList(formularyId);
        }
      });
    } else {
      if (this.props.id_lob === 4) {
        this.getOTHERSummary();
      } else {
        this.getSOSummary();
      }
    }

    this.setState({ tabs, activeTabIndex });
  };

  onUDFSChangeHandler = (selectedDropdown: any, formularyId: string) => {
    let selectedCriteriaList: any = this.state.otherData.find(
      (a) => a.formularyId === formularyId
    )?.list;

    let selDrpdwn: any = selectedCriteriaList.filter(
      (a) => a.udf === selectedDropdown
    );

    this.rpSOSavePayload.breadcrumb_code_value = selDrpdwn[0].code_value;
    this.rpSOSavePayload.id_supplemental_benefit = selDrpdwn[0].key;
    this.rmSOSavePayload.selected_criteria_ids = [];

    let selectedCriteria = [...this.state.selectedCriteria];
    selectedCriteria = selectedCriteria.filter(
      (e) => e.formularyId !== formularyId
    );

    let selectedCriteriaObject = {
      formularyId,
      list: selDrpdwn,
    };

    selectedCriteria.push(selectedCriteriaObject);

    this.setState({ selectedCriteria });
  };

  onCOMMDropdownChange = (e, formularyId) => {
    let selDrpdwnList: any[] = this.state.otherCOMMData.find(
      (a) => a.formularyId === formularyId
    )?.list;

    if (selDrpdwnList && selDrpdwnList.length > 0) {
      let selDrpdwn: any[] = selDrpdwnList.filter((a) => a.udf === e);

      this.rpCOMMSavePayload.breadcrumb_code_value = selDrpdwn[0].code_value;
      this.rpCOMMSavePayload.id_edit = selDrpdwn[0].key;
      this.rmCOMMSavePayload.selected_criteria_ids = [];

      let selDrpDwnCOMMList = [...this.state.otherCOMMData];
      selDrpDwnCOMMList = selDrpDwnCOMMList.filter(
        (e) => e.formularyId !== formularyId
      );

      let selDrpDwnCOMMListObj = {
        formularyId,
        list: selDrpdwn,
      };

      selDrpDwnCOMMList.push(selDrpDwnCOMMListObj);

      this.setState({ selectedCOMMCriteria: selDrpDwnCOMMList });
    }
  };

  onSelectedCOMMRowKeysChange = (selectedRowKeys, formularyId) => {
    const activeTabIndex = this.state.activeTabIndex;

    if (selectedRowKeys && selectedRowKeys.length > 0) {
      if (activeTabIndex === 0 || activeTabIndex === 1) {
        let codeValue = "";
        let idEdit = "";

        let otherCOMMDATA = this.state.otherCOMMData.find(
          (e) => e.formularyId === formularyId
        )?.list;

        if (otherCOMMDATA && otherCOMMDATA.length > 0) {
          for (let i = 0; i < otherCOMMDATA.length; i++) {
            if (otherCOMMDATA[i].key === selectedRowKeys[0]) {
              codeValue = otherCOMMDATA[i].code_value;
              idEdit = otherCOMMDATA[i].key;
            }
          }

          this.rpCOMMSavePayload.breadcrumb_code_value = codeValue;
          this.rpCOMMSavePayload.id_edit = idEdit;
          this.rmCOMMSavePayload.selected_criteria_ids = [];
        }
      } else if (activeTabIndex === 2) {
        let criteriaIds: any[] = [];

        let otherCOMMDATA = this.state.otherCOMMData.find(
          (e) => e.formularyId === formularyId
        )?.list;

        if (otherCOMMDATA && otherCOMMDATA.length > 0) {
          for (let i = 0; i < otherCOMMDATA.length; i++) {
            if (otherCOMMDATA[i].key === selectedRowKeys[i]) {
              criteriaIds.push(otherCOMMDATA[i].code_value);
            }
          }

          this.rmCOMMSavePayload.selected_criteria_ids = criteriaIds;
          this.rpCOMMSavePayload.breadcrumb_code_value = "";
          this.rpCOMMSavePayload.id_edit = "";
        }
      }

      let selectedCOMMCriteriaList = [...this.state.selectedCOMMCriteria];
      selectedCOMMCriteriaList = selectedCOMMCriteriaList.filter(
        (e) => e.formularyId !== formularyId
      );

      let selDrpDwnCOMMListObj = {
        formularyId,
        list: selectedRowKeys.map((otId) => otId),
      };

      selectedCOMMCriteriaList.push(selDrpDwnCOMMListObj);

      this.setState({
        selectedCOMMCriteria: selectedCOMMCriteriaList,
      });
    }
  };

  renderTabContent = () => {
    const {
      activeTabIndex,
      udfs,
      otherColumns,
      otherCOMMColumns,
      otherData,
      otherCOMMData,
      selectedCriteria,
      selectedCOMMCriteria,
    } = this.state;
    const formularyList = this.props.maintenanceFormularies.list;
    const LOB_ID = this.props.id_lob;

    switch (activeTabIndex) {
      case 0:
        if (LOB_ID === 4) {
          return (
            <>
              {formularyList.map((drug) => (
                <MMOtherCOMMReplace
                  key={drug.id_formulary}
                  drug={drug}
                  drpdwnoptions={otherCOMMData}
                  onDropdownChange={(e) =>
                    this.onCOMMDropdownChange(e, drug.id_formulary)
                  }
                />
              ))}
            </>
          );
        } else {
          return (
            <>
              {formularyList.map((drug) => (
                <MMOtherReplace
                  key={drug.id_formulary}
                  drug={drug}
                  onUDFSChangeHandler={(e) =>
                    this.onUDFSChangeHandler(e, drug.id_formulary)
                  }
                  udfs={udfs}
                />
              ))}
            </>
          );
        }
      case 2:
        if (LOB_ID === 4) {
          return (
            <>
              {formularyList.map((drug) => (
                <MMOtherCOMMRemove
                  key={drug.id_formulary}
                  drug={drug}
                  otherColumns={otherCOMMColumns}
                  otherData={otherCOMMData}
                  selectedCriteria={selectedCOMMCriteria}
                  onSelectedRowKeysChange={(selectedRowKeys) =>
                    this.onSelectedCOMMRowKeysChange(
                      selectedRowKeys,
                      drug.id_formulary
                    )
                  }
                />
              ))}
            </>
          );
        } else {
          return (
            <>
              {formularyList.map((drug) => (
                <MMOtherRemove
                  key={drug.id_formulary}
                  drug={drug}
                  otherColumns={otherColumns}
                  otherData={otherData}
                  selectedCriteria={selectedCriteria}
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
    }
  };

  getSOSummary = () => {
    this.props.maintenanceFormularies.list.forEach((drug) => {
      let formularyId = drug.id_formulary;
      let apiDetails = {};
      apiDetails["apiPart"] = GET_DRUG_SUMMARY_SO;
      apiDetails["pathParams"] = formularyId;
      apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

      this.props.getDrugDetailsSOSummary(apiDetails).then((json) => {
        let tmpData =
          json.payload && json.payload.result ? json.payload.result : [];

        let drpDwnList = tmpData.map((e) => e.supplemental_benefit_name);

        let otherData = [...this.state.otherData];
        otherData = otherData.filter((e) => e.formularyId !== formularyId);

        let otherDataList = tmpData.map((ele) => {
          let curRow = {
            key: ele["id_supplemental_benefit"],
            udf: ele["supplemental_benefit_name"],
            code_value: ele["code_value"],
          };
          return curRow;
        });

        let otherDataObject = {
          formularyId,
          list: otherDataList,
        };

        otherData.push(otherDataObject);

        let udfs = [...this.state.udfs];
        udfs = udfs.filter((e) => e.formularyId !== formularyId);

        let udfsObject = {
          formularyId,
          list: drpDwnList,
        };

        udfs.push(udfsObject);

        this.setState({
          udfs,
          otherData,
        });
      });
    });
  };

  // Commercial Summary
  getOTHERSummary = () => {
    this.props.maintenanceFormularies.list.forEach((drug) => {
      let formularyId = drug.id_formulary;
      let apiDetails = {};
      apiDetails["apiPart"] = GET_DRUG_SUMMARY_OTHER;
      apiDetails["pathParams"] = formularyId;
      apiDetails["keyVals"] = [{ key: KEY_ENTITY_ID, value: formularyId }];

      this.props.getDrugDetailsOTHERSummary(apiDetails).then((json) => {
        let tmpData =
          json.payload && json.payload.result ? json.payload.result : [];

        let otherCOMMData = [...this.state.otherCOMMData];
        otherCOMMData = otherCOMMData.filter(
          (e) => e.formularyId !== formularyId
        );

        let settingsRows = tmpData.map((ele) => {
          let curRow = {
            key: ele["id_edit"],
            udf: ele["edit_name"],
            code_value: ele["code_value"],
          };
          return curRow;
        });

        let otherCOMMDataObject = {
          formularyId,
          list: settingsRows,
        };

        otherCOMMData.push(otherCOMMDataObject);

        let otherCOMMCOL = [...this.state.otherCOMMColumns];
        otherCOMMCOL = otherCOMMCOL.filter(
          (e) => e.formularyId !== formularyId
        );

        let otherCOMMCOLObject = {
          formularyId,
          column: [
            {
              title: "User Defined Field",
              dataIndex: "udf",
              key: "udf",
            },
          ],
        };

        otherCOMMCOL.push(otherCOMMCOLObject);

        this.setState({ otherCOMMData, otherCOMMColumns: otherCOMMCOL });
      });
    });
  };

  settingFormApplyHandler = () => {
    let showActions = this.state.drugGridData.selectedDrugs?.length > 0;
    if (this.props.id_lob === 4) {
      this.getOTHERSummary();
    } else {
      this.getSOSummary();
    }
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
)(MassMaintenanceOther);

export const MMOtherReplace = (props) => {
  const { drug, onUDFSChangeHandler, udfs } = props;
  const formularyId = drug.id_formulary;

  let dropDown: any;
  if (udfs && udfs.length > 0) {
    let udfsList = udfs.find((e) => e.formularyId === formularyId)?.list;
    dropDown = (
      <DropDown
        placeholder=""
        options={udfsList}
        onChange={onUDFSChangeHandler}
      />
    );
  }

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={formularyId}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfApplicable(drug) ? (
          <Grid container key={formularyId} spacing={8}>
            <Grid item xs={4}>
              <div className="group">
                <label>
                  User Defined Field <span className="astrict">*</span>
                </label>
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

export const MMOtherRemove = (props) => {
  const {
    drug,
    otherColumns,
    otherData,
    selectedCriteria,
    onSelectedRowKeysChange,
  } = props;

  let rowSelection = {
    selectedRowKeys: selectedCriteria,
    onChange: onSelectedRowKeysChange,
  };

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfApplicable(drug) ? (
          <Grid item xs={5}>
            <div className="tier-grid-remove-container other-removed-sec">
              <Table
                columns={otherColumns}
                dataSource={otherData}
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

export const MMOtherCOMMReplace = (props) => {
  const { drug, drpdwnoptions, onDropdownChange } = props;
  const formularyId = drug.id_formulary;

  let drpdwnoptionsList = drpdwnoptions.find(
    (e) => e.formularyId === formularyId
  )?.list;
  drpdwnoptionsList =
    drpdwnoptionsList && drpdwnoptionsList.length > 0 ? drpdwnoptionsList : [];

  drpdwnoptionsList = drpdwnoptionsList.map((e) => e.udf);

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={formularyId}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfApplicable(drug) ? (
          <Grid item xs={5}>
            <div className="group other-label">
              <label>
                USER DEFINED FIELD <span className="astrict">*</span>
              </label>
              <DropDown
                className="formulary-type-dropdown"
                placeholder="Select"
                options={drpdwnoptionsList}
                onChange={onDropdownChange}
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

export const MMOtherCOMMRemove = (props) => {
  const {
    drug,
    otherColumns,
    otherData,
    selectedCriteria,
    onSelectedRowKeysChange,
  } = props;

  const formularyId = drug.id_formulary;

  let rowSelection = {
    selectedRowKeys: selectedCriteria,
    onChange: onSelectedRowKeysChange,
  };

  let otherCOMMColumns = otherColumns.find((e) => e.formularyId === formularyId)
    ?.column;

  otherCOMMColumns =
    otherCOMMColumns && otherCOMMColumns.length > 0 ? otherCOMMColumns : [];

  let otherCOMMData = otherData && otherData.length > 0 ? otherData : [];
  otherCOMMData = otherCOMMData.find((e) => e.formularyId === formularyId)
    ?.list;

  otherCOMMData =
    otherCOMMData && otherCOMMData.length > 0 ? otherCOMMData : [];

  return (
    <>
      <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
        <div>
          <span className="font-style">{drug.formulary_name}</span>
        </div>
        {checkIfApplicable(drug) ? (
          <Grid item xs={5}>
            <div className="tier-grid-remove-container other-removed-sec">
              <Table
                columns={otherCOMMColumns}
                dataSource={otherCOMMData}
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

export const checkIfApplicable = (drug: any) => {
  let breadCrumbInfo: any[] = drug?.bread_crumb_info;
  let ddObj = breadCrumbInfo.find((e) => e.code_value === "DRGDT")?.children;
  let ddObjOther;
  if (ddObj) {
    ddObjOther = ddObj.find((e) => e.hover_display === "Other");
  }

  return ddObj && ddObjOther;
};
