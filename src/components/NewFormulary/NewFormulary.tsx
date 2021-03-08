import React from "react";
import { connect } from "react-redux";

import { TabInfo } from "../../models/tab.model";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import Medicare from "./Medicare/Medicare";
import DrugDetails from "./DrugDetails/FormularyDetails";
import DrugDetailsContext from "./FormularyDetailsContext";
import MassMaintenanceContext from "./FormularyDetailsContext";
import MassMaintenance from "./MassMaintenance/MassMaintenance";
import FormularyDashboardStats from "./../FormularyDashboardStats/FormularyDashboardStats";
import { getFormularyDetails } from "../../mocks/formulary/formularyDetails";
import { fetchFormularies } from "../.././redux/slices/formulary/dashboard/dashboardSlice";
import _ from "lodash";
import FormularyMessaging from "./DrugDetails/components/FormularyDetailsTop/FormularyMessaging";
//import { setLocationHome } from "../../../../.././redux/slices/formulary/application/applicationSlice";
import { exportReport } from "../../redux/slices/formulary/hpms/hpmsService";
import { postStandardReports } from "../../redux/slices/formulary/hpms/hpmsActionCreation";
import { saveAs } from "file-saver";
import showMessage from "./Utils/Toast";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import Button from "../shared/Frx-components/button/Button";

import {
  setFormulary,
  setLocation,
  setLocationHome,
  clearApplication,
  setModeLob,
} from "../.././redux/slices/formulary/application/applicationSlice";

import {
  fetchSelectedFormulary,
  clearSetup,
  cloneFormulary,
} from "../.././redux/slices/formulary/setup/setupSlice";
import {
  fetchDesignOptions,
  clearSetupOptions,
  fetchSupplementalOptions,
} from "../.././redux/slices/formulary/setup/setupOptionsSlice";

import { fetchFormularyHeader } from "../.././redux/slices/formulary/header/headerSlice";
import { gridSettingsSlice } from "../.././redux/slices/formulary/gridHandler/gridSettingsSlice";
import { addNewFormulary } from "../.././redux/slices/formulary/application/applicationSlice";
import "./NewFormulary.scss";
import Medicaid from "./Medicaid/Medicaid";
import FrxGridSorterIcon from "../shared/FrxGrid/components/FrxGridSorterIcon/FrxGridSorterIcon";
import ClonePopup from "./DrugDetails/components/FormularySetUp/components/ClonePopup/ClonePopup";
import ArchivePopup from "./DrugDetails/components/FormularySetUp/components/archive/ArchivePopup";
import { createFormularyUsingClone } from "../../redux/slices/formulary/setup/setupService";
import WorkFlowDialog from "../workflow/WorkFlow-Dialog";
import { Route } from "react-router-dom";

// const tabs = [
//   { id: 1, text: "MEDICARE" },
//   { id: 2, text: "MEDICAID" },
//   { id: 3, text: "COMMERCIAL" },
//   { id: 4, text: "EXCHANGE" },
// ];
const tabs = [
  { id: 1, text: "COMMERCIAL" },
  { id: 2, text: "MEDICARE" },
  { id: 3, text: "MEDICAID" },
  { id: 4, text: "EXCHANGE" },
];

interface State {
  tabs: Array<TabInfo>;
  activeTabIndex: number;
  showTabs: boolean;
  showMassMaintenance: boolean;
  showDrugDetails: boolean;
  lob_type: string;
}

const mapStateToProps = (state) => {
  //console.log("***** DB");
  //console.log(state);
  return {
    formulary_count: state?.dashboard?.formulary_count,
    formulary_list: state?.dashboard?.formulary_list,
    location_home: state?.application?.location_home,
    current_lob: state.application.current_lob,
    applicationKey: state.application,
    versions: state.application?.versions,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchFormularies: (a) => dispatch(fetchFormularies(a)),
    setFormulary: (arg) => dispatch(setFormulary(arg)),
    fetchFormularyHeader: (arg) => dispatch(fetchFormularyHeader(arg)),
    setHiddenColumn: (hiddenColumns) =>
      dispatch(gridSettingsSlice.actions.setHiddenColum(hiddenColumns)),
    clearHiddenColumns: () =>
      dispatch(gridSettingsSlice.actions.clearHiddenColumns(true)),
    addNewFormulary: (arg) => dispatch(addNewFormulary(arg)),
    setLocation: (arg) => dispatch(setLocation(arg)),
    fetchSelectedFormulary: (a) => dispatch(fetchSelectedFormulary(a)),
    fetchDesignOptions: (a) => dispatch(fetchDesignOptions(a)),
    fetchSupplementalOptions: (a) => dispatch(fetchSupplementalOptions(a)),
    setLocationHome: (a) => dispatch(setLocationHome(a)),
    clearApplication: (a) => dispatch(clearApplication(a)),
    clearSetup: (a) => dispatch(clearSetup(a)),
    clearSetupOptions: (a) => dispatch(clearSetupOptions(a)),
    setModeLob: (a) => dispatch(setModeLob(a)),
    cloneFormulary: (a) => dispatch(cloneFormulary(a)),
    postStandardReports: (a) => dispatch(postStandardReports(a)),
  };
}

// REFERENCE ::
// listPayload = {
//   index: 0,
//   limit: 10,
//   filter: [],
//   id_lob: 4,
//   search_by: null,
//   search_key: "",
//   search_value: [],
//   sort_by: ['contract_year','lob_name','formulary_name','status'],
//   sort_order: ['asc','asc','asc','asc'],
// }
const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
  id_lob: 4,
  search_by: null,
  search_key: "",
  search_value: [],
  sort_by: ["id_formulary", "status"],
  sort_order: ["desc", "asc"],
  is_archived: 0,
};

const formularyGridActionMenu = [
  {
    id: 1,
    key: 1,
    title: "Marketing Material",
  },
  {
    id: 2,
    key: 2,
    title: "Alternatives",
  },
  {
    id: 3,
    key: 3,
    title: "Decision Tree",
  },
  {
    id: 4,
    key: 4,
    title: "Archive",
  },
  {
    id: 5,
    key: 5,
    title: "Export",
  },
  {
    id: 6,
    key: 6,
    title: "Clone",
  },
];

class Formulary extends React.Component<any, any> {
  state = {
    activeTabIndex: 0,
    tabs: tabs,
    showTabs: true,
    showMassMaintenance: false,
    showDrugDetails: false,
    pageSize: 10,
    lob_type: "",
    actionMenu: formularyGridActionMenu,
    isAnyPopupOpen: false,
    isClonePopupOpen: false,
    isArchivePopupOpen: false,
    isWorkflowPopupOpen: false,
    dialogTitle: "",
    exportFileData: [] as any[],
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    id_lob: 4,
    search_by: null,
    search_key: "",
    search_value: [],
    sort_by: ["id_formulary", "status"],
    sort_order: ["desc", "asc"],
    is_archived: 0,
  };

  componentDidMount() {
    this.props.fetchFormularies(this.listPayload);
    this.setSelectedLOB();
  }

  applySortHandler = (key, order) => {
    console.log("key and order ", key, order);
    const listPayload = { ...this.listPayload };
    listPayload.sort_by = [key];
    const sortorder = order && order === "ascend" ? "asc" : "desc";
    listPayload.sort_order = [sortorder];
    this.listPayload = listPayload;
    this.props.fetchFormularies(this.listPayload);
  };
  uniqByKeepLast = (data) => {
    const result = Array.from(new Set(data.map((s) => s.columnKey))).map(
      (column) => {
        const getOrder =
          data.find((s) => s.columnKey === column).order === "ascend"
            ? "asc"
            : "desc";
        return {
          columnKey: column,
          order: getOrder,
        };
      }
    );
    return result;
  };
  applyMultiSortHandler = (sorter) => {
    console.log("multi sorted columns ", sorter);
    const listPayload = { ...this.listPayload };
    const updatedSorter = this.uniqByKeepLast(sorter);
    const sort_by = updatedSorter.map((e) => e.columnKey);
    const sort_order = updatedSorter.map((e) => e.order);
    listPayload.sort_by = sort_by;
    listPayload.sort_order = sort_order;
    this.listPayload = listPayload;
    this.props.fetchFormularies(this.listPayload);
    //remove duplicates from sorter
    //api integration
  };

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;
    this.props.history.push("/");
    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex }, () => {
      this.updateGrid(this.state.activeTabIndex);
      this.setSelectedLOB();
    });
  };
  updateGrid = (currentTabIndex) => {
    // let lob_id = 1;
    // if(currentTabIndex === 2){
    //   lob_id = 4;
    // }
    let lob_id = 4;
    if (currentTabIndex === 1) {
      lob_id = 1;
    } else if (currentTabIndex === 2) {
      lob_id = 2;
    } else if (currentTabIndex === 3) {
      lob_id = 3;
    }
    this.props.setModeLob(lob_id);
    this.listPayload = { ...defaultListPayload };
    this.listPayload.id_lob = lob_id;
    this.props.fetchFormularies(this.listPayload);
  };

  setSelectedLOB = () => {
    this.setState({
      lob_type: this.state.tabs
        .find((p) => p.id == this.state.activeTabIndex + 1)
        ?.text.toLowerCase(),
    });
  };
  addNewFormulary = (id: any) => {
    console.log("***** ADD NEW");
    this.props.addNewFormulary();
    this.setState({
      showTabs: !this.state.showTabs,
      showDrugDetails: !this.state.showDrugDetails,
    });
  };

  drugDetailsClickHandler = (id: any) => {
    console.log("***** Name  : " + id);
    let selectedRow: any = null;
    if (id !== undefined) {
      selectedRow = this.props.formulary_list[id - 1];
      this.props.clearHiddenColumns();
      this.setState({
        showTabs: !this.state.showTabs,
        showDrugDetails: !this.state.showDrugDetails,
      });
      console.log(" Setup Complete : " + selectedRow.is_setup_complete);
      if (selectedRow && selectedRow.is_setup_complete) {
        console.log(" Nav to Configure ");
        this.props.fetchSelectedFormulary(selectedRow?.id_formulary);
        this.props.fetchDesignOptions({
          type: selectedRow?.id_formulary_type,
          id: selectedRow?.id_formulary,
        });
        this.props.fetchSupplementalOptions({
          type: selectedRow?.id_formulary_type,
          id: selectedRow?.id_formulary,
        });

        this.props.setLocation(1);
      } else {
        this.props.setFormulary(selectedRow);
        this.props.setLocation(0);
        console.log(" Nav to Setup ");
      }
    }
  };

  formularyGridTriDotClick = (id_formulary: any, item: any) => {
    let formulary;
    this.props.formulary_list.some((form) => {
      if (parseInt(id_formulary) === form["id_formulary"]) {
        formulary = form;
        return true;
      }
      return null;
    });
    if (formulary && formulary.id_formulary > 0) {
      // this.props.setFormulary(formulary);
      this.props.fetchSelectedFormulary(formulary?.id_formulary);
      if (item && item.key === 1) {
        this.props.history.push(`/formulary/marketing`);
      } else if (item && item.key === 4) {
        console.log(" >> ARCHIVE");
        this.setState({
          isAnyPopupOpen: true,
          isArchivePopupOpen: true,
          dialogTitle: "Archive",
        });
        return;
      } else if (item && item.key === 6) {
        console.log(" >> CLONE");
        this.setState({
          isAnyPopupOpen: true,
          isClonePopupOpen: true,
          dialogTitle: "CLONE",
        });
        return;
      } else if (item && item.key === 5) {
        const flID = formulary.id_formulary;
        const baseID = formulary.id_base_formulary;
        const lobID = formulary.id_lob;
        this.onExportHandler(flID, baseID, lobID);
        return;
      }
    }
  };
  onExportHandler = (flID, baseID, lobID) => {
    let apiDetails = {};
    apiDetails["apiPart"] = "api/1/standard-reports";
    apiDetails["pathParams"] = "/" + flID;
    apiDetails["keyVals"] = [
      { key: "index", value: 0 },
      { key: "limit", value: 10 },
    ];

    apiDetails["messageBody"] = {
      filter: [],
      search_key: "",
      sort_by: ["template_group_name"],
      sort_order: ["asc"],
      template_type: 1,
      formulary_id: flID,
      base_formulary_id: baseID,
    };
    this.props.postStandardReports(apiDetails).then((json) => {
      const data = json.payload.data;
      const file_Data = data.filter(
        (e) => e.standard_reporting_name === "FRX Standard Full Formulary File"
      );
      const fileId =
        file_Data.length > 0 ? file_Data[0].id_standard_reporting : undefined;
      this.setState(
        {
          exportFileData: file_Data,
        },
        () => {
          if (fileId !== undefined) {
            this.handleExport(fileId, flID, baseID, lobID);
          }
        }
      );
    });
  };
  handleExport = async (key: any, flID, baseID, lobID) => {
    let apiDetails_1 = {
      apiPart: "api/1/formulary-export",
      pathParams: `/${flID}/${lobID}/false`,
    };

    let isError = false;
    try {
      const response = await exportReport(apiDetails_1);
      console.log(response.headers);
      let content_type = response.headers["content-type"];
      let data = response.data;
      if (response.data) {
        let tmp_file = this.state.exportFileData.filter(
          (obj) => obj.id_standard_reporting == key
        );
        let fileName =
          tmp_file[0].standard_reporting_name.replace(" ", "_") + "_Export";
        if (content_type && content_type == "xlsx") {
          const file = new Blob([data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveAs(file, fileName + ".xlsx");
        } else {
          const file = new Blob([data], { type: "text/csv" });
          saveAs(file, fileName + ".csv");
        }
        this.setState({
          isRequestFinished: true,
        });
      } else {
        showMessage("Error while exporting", "error");
        this.setState({
          isRequestFinished: true,
        });
        isError = true;
      }
    } catch (err) {
      console.log(err);
      showMessage("Error while exporting", "error");
      this.setState({
        isRequestFinished: true,
      });
      isError = true;
    }
  };
  massMaintenanceCLickHandler = () => {
    // this.props.history.push(`/formulary/maintenance`);
    this.props.history.push(`/formulary/maintenance`);
    console.log("historyMM", this.props);
    // this.setState({
    //   showTabs: !this.state.showTabs,
    //   showMassMaintenance: !this.state.showMassMaintenance,
    // }, () => {
    // 	this.props.history.push("/maintenance")
    // });
  };

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    //console.log(hiddenColumn,visibleColumn);
    this.props.setHiddenColumn(hiddenColumn);
  };

  onApplyQuickSearchFilterHandler = (formularyName) => {
    const newFilters = [
      {
        prop: "formulary_name",
        operator: "is_like",
        values: [formularyName],
      },
    ];
    this.listPayload.filter = newFilters;
    this.props.fetchFormularies(this.listPayload);
  };

  onApplyFilterHandler = (filters) => {
    const fetchObjectKeys = Object.keys(filters);
    if (fetchObjectKeys && fetchObjectKeys.length > 0) {
      const fetchedProps = Object.keys(filters)[0];
      const fetchedOperator =
        filters[fetchedProps][0].condition === "is like"
          ? "is_like"
          : filters[fetchedProps][0].condition === "is not"
          ? "is_not"
          : filters[fetchedProps][0].condition === "is not like"
          ? "is_not_like"
          : filters[fetchedProps][0].condition === "does not exist"
          ? "does_not_exist"
          : filters[fetchedProps][0].condition;
      const fetchedValues =
        filters[fetchedProps][0].value !== ""
          ? [filters[fetchedProps][0].value.toString()]
          : [];
      const newFilters = [
        {
          prop: fetchedProps,
          operator: fetchedOperator,
          values: fetchedValues,
        },
      ];
      this.listPayload.filter = newFilters;
      this.props.fetchFormularies(this.listPayload);
    } else {
      this.listPayload.filter = [];
      this.props.fetchFormularies(this.listPayload);
    }
  };
  onPageSize = (pageSize) => {
    let id_lob = this.listPayload.id_lob;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.limit = pageSize;
    this.listPayload.id_lob = id_lob;
    this.props.fetchFormularies(this.listPayload);
  };
  formularyListSearch = (categoryObj, subCat) => {
    let id_lob = this.listPayload.id_lob;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.id_lob = this.props.current_lob;
    this.listPayload.search_by = categoryObj;
    this.listPayload.search_value = subCat != "" ? subCat : [];
    this.props.fetchFormularies(this.listPayload);
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
    this.props.fetchFormularies(this.listPayload);
  };

  onClearFilterHandler = () => {
    // console.log("Clear Filter");
    let id_lob = this.listPayload.id_lob;
    this.listPayload = { ...defaultListPayload };
    this.listPayload.id_lob = id_lob;
    this.props.fetchFormularies(this.listPayload);
  };

  componentDidUpdate(prevProps) {
    // console.log(this.props.location_home + " / " + prevProps.location_home);
    if (this.state.activeTabIndex === 0) {
      this.props.setModeLob(4);
    }
    if (
      this.props.location_home !== prevProps.location_home &&
      this.props.location_home > 0
    ) {
      this.setState({
        showTabs: !this.state.showTabs,
        showDrugDetails: !this.state.showDrugDetails,
      });
      this.props.setLocationHome(0);
      this.props.clearApplication();
      this.props.clearSetup();
      this.props.clearSetupOptions();
      this.onClearFilterHandler();
    }
  }

  onClosePopup = () => {
    this.setState({
      isAnyPopupOpen: false,
      isClonePopupOpen: false,
      isArchivePopupOpen: false,
      dialogTitle: "",
    });
  };

  onActionFromPopup = (action: string) => {
    console.log("Action from popup: ", action);
    this.onClosePopup();
  };
  onCancel = () => {
    this.onClosePopup();
  };

  initFormularyClone = (cloneName, effectiveDate) => {
    console.log("Start Clone:" + cloneName + " Date:" + effectiveDate);
    this.onClosePopup();
    const request = {
      id_base_formulary: this.props.applicationKey.formulary?.id_base_formulary,
      payload: {
        formulary_info: {
          formulary_name: cloneName,
          effective_date: effectiveDate,
          id_lob: this.props.current_lob,
        },
      },
    };
    this.props.cloneFormulary(request);
  };

  archiveComplete = () => {
    this.props.fetchFormularies(this.listPayload);
  };

  openWF = () => {
    this.setState({
      isAnyPopupOpen: true,
      isWorkflowPopupOpen: true,
      dialogTitle:
        "Formulary Name: " +
        this.props.applicationKey?.formulary?.formulary_info?.formulary_name,
    });
  };

  render() {
    return (
      <div className="newformulary-container">
        <FormularyMessaging activeTabIndex={this.props.location} />
        {this.state.isAnyPopupOpen ? (
          <DialogPopup
            positiveActionText="save"
            negativeActionText="cancel"
            title={this.state.dialogTitle}
            handleClose={this.onClosePopup}
            handleAction={this.onActionFromPopup}
            open={this.state.isAnyPopupOpen}
            showActions={false}
            showCloseIcon={false}
            className="formularydetailstop-root__grid-dialog-popup"
          >
            {this.state.isClonePopupOpen && (
              <ClonePopup
                currentFormulary={this.props.applicationKey?.formulary}
                onFormularyCloneInfo={this.initFormularyClone}
                onCancel={this.onCancel}
              />
            )}
            {this.state.isArchivePopupOpen && (
              <ArchivePopup
                currentFormulary={this.props.applicationKey?.formulary}
                versionList={this.props.versions}
                onCancel={this.onCancel}
                archiveComplete={this.archiveComplete}
              />
            )}
            {this.state.isWorkflowPopupOpen && <WorkFlowDialog />}
          </DialogPopup>
        ) : null}
        {this.state.showTabs ? (
          <Route
            exact
            path={["/", "/formulary", "/formulary/mass-maintenance", "/formulary/alternatives"]}
            render={(props) => (
              <>
                <FormularyDashboardStats />
                <div className="formulary-root-divider"></div>
                <FrxTabs
                  tabList={this.state.tabs}
                  activeTabIndex={this.state.activeTabIndex}
                  onClickTab={this.onClickTab}
                />
                <div className="formulary-tabs-info">
                  {/* {this.renderActiveTabContent()} */}
                  <Medicare
                    formularyGridActionMenu={this.state.actionMenu}
                    // formularyGridTriDotClick={this.formularyGridTriDotClick}
                    formularyGridTriDotClick={(item, data) => {
                      this.formularyGridTriDotClick(data["id_formulary"], item);
                    }}
                    drugDetailClick={this.drugDetailsClickHandler}
                    // invokeformularyActions={this.handleFormularyActions}
                    onMassMaintenanceCLick={this.massMaintenanceCLickHandler}
                    onPageSize={this.onPageSize}
                    pageSize={this.listPayload.limit}
                    selectedCurrentPage={
                      this.listPayload.index / this.listPayload.limit + 1
                    }
                    applySortHandler={this.applySortHandler}
                    applyMultiSortHandler={this.applyMultiSortHandler}
                    onPageChangeHandler={this.onGridPageChangeHandler}
                    onClearFilterHandler={this.onClearFilterHandler}
                    applyFilter={this.onApplyFilterHandler}
                    applyQuickSearch={this.onApplyQuickSearchFilterHandler}
                    getColumnSettings={this.onSettingsIconHandler}
                    addNewFormulary={this.addNewFormulary}
                    formularyListSearch={this.formularyListSearch}
                    lob_type={this.state.lob_type}
                    history={this.props.history}
                    location={this.props.location}
                    match={this.props.match}
                  />
                </div>
              </>
            )}
          />
        ) : this.state.showDrugDetails ? (
          <DrugDetailsContext.Provider
            value={{
              showDetailHandler: () => this.drugDetailsClickHandler,
              selectedLOBType: this.state.lob_type,
            }}
          >
            <DrugDetails
              data={getFormularyDetails()}
              {...this.props}
              openWF={this.openWF}
            />
          </DrugDetailsContext.Provider>
        ) : (
          this.state.showMassMaintenance && (
            <MassMaintenanceContext.Provider
              value={{
                showDetailHandler: () => this.massMaintenanceCLickHandler,
                selectedLOBType: this.state.lob_type,
              }}
            >
              <MassMaintenance data={getFormularyDetails()} {...this.props} />
            </MassMaintenanceContext.Provider>
          )
        )}

        {/* <Button label="WF" onClick={() => this.openWF()} /> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Formulary);

// CHG 2/15 00:14
