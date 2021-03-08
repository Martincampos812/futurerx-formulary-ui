import React from "react";
import { connect } from "react-redux";

import FrxDrugGridContainer from "../../../../shared/FrxGrid/FrxDrugGridContainer";

import { stData, stDataTableTwo } from "../../../../../mocks/DrugGridMock";
import "../../../../ClaimsGrid/ClaimsGrid.scss";
import "./STRemove.scss";
import * as constants from "../../../../../api/http-commons";
import getLobCode from "../../../Utils/LobUtils";
//import AdvancedSearch from "./search/AdvancedSearch";
import showMessage from "../../../Utils/Toast";
import Button from "../../../../shared/Frx-components/button/Button";
import { Row, Col } from "antd";
import { Table } from "antd";
import Grid from "@material-ui/core/Grid";
import DialogPopup from "../../../../shared/FrxDialogPopup/FrxDialogPopup";
import UmCriteria from "../UmCriteria";

import {
  postCriteriaListST,
  postApplyFormularyDrugST,
  postFormularyDrugST,
  getStSummary,
} from "../../../../../redux/slices/formulary/stepTherapy/stepTherapyActionCreation";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";

function mapDispatchToProps(dispatch) {
  return {
    postCriteriaListST: (a) => dispatch(postCriteriaListST(a)),
    postApplyFormularyDrugST: (a) => dispatch(postApplyFormularyDrugST(a)),
    postFormularyDrugST: (a) => dispatch(postFormularyDrugST(a)),
    getStSummary: (a) => dispatch(getStSummary(a)),
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    id_formulary_maintenance: state.maintenance?.selectedRow?.id_maintenance_formulary,
    id_lob :state.maintenance?.selectedRow?.id_lob,
  };
};

class DrugGrid extends React.Component<any, any> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
    filteredDataForTwo: [] as any[],
    stGroupDescriptions: [],
    isSearchOpen: false,
    fileValues: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedCriteria: Array(),
    selectedDrugs: Array(),
    tierGridContainer: false,
    index: 0,
    limit: 10,
    filter: Array(),
    dataCount: 0,
    quickFilter: Array(),
    sort_by: Array(),
    hiddenColumns: Array(),
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    searchNames: Array(),
    filterPlaceholder: "Search",
    searchValue: "",
    searchData: Array(),
    fixedSelectedRows: [] as number[],
    selectedRowKeys: [] as number[],
    isSelectAll: false,
    showUmCriteria:false,
    clickedDrugId:null,
  };

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.state.selectedCriteria = [];
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedCriteria = selectedRowKeys.map((tierId) => tierId);
    }
    this.props.updateGDHandler(this.state.selectedCriteria );
  };

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  };
  componentWillReceiveProps(nextProps) {
    //this.initialize(nextProps);
    if (nextProps.advancedSearchBody && nextProps.populateGrid) {
      let payload = {
        advancedSearchBody: nextProps.advancedSearchBody,
        populateGrid: false,
        closeDialog: nextProps.closeDialog,
        listItemStatus: nextProps.listItemStatus,
      };
      if (nextProps.closeDialog) {
        this.state.isSearchOpen = false;
        payload["closeDialog"] = false;
      }
      this.props.setAdvancedSearch(payload);
    }
  }

  componentDidMount() {
    //fetch data from API
    debugger;
    const data = stData();
    const data2 = stDataTableTwo();
    this.setState({ data, filteredData: data });
    this.setState({ data2, filteredDataForTwo: data2 });

    let apiDetails = {};

    apiDetails["pathParams"] =
      this.props?.formularyId +
      "/" +
      getLobCode(this.props?.id_lob) +
      "/";
    apiDetails["keyVals"] = [
      { key: constants.KEY_ENTITY_ID, value: this.props?.formularyId },
    ];
    apiDetails["messageBody"] = {};

    const drugGridDate = this.props
      .postCriteriaListST(apiDetails)
      .then((json) => {
        let data: any = [];
        if (json?.payload && json?.payload?.result?.length > 0) {
          json.payload.result.map((obj) => {
            data.push({
              key: obj.id_st_group_description,
              st_group_description_name: obj.st_group_description_name,
            });
          });
        }
        this.setState({
          stGroupDescriptions: data,
        });
      });
  }

  openTierGridContainer = () => {
    this.state.drugData = [];
    this.state.drugGridData = [];
    this.state.selectedRowKeys = [];

  };

  onApplyFilterHandler = filters => {

    //this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map((fetchedProps) => {
        if (filters[fetchedProps]) {
          this.state.filter = this.state.filter.filter(element => element['prop'] !== fetchedProps);
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
          this.state.filter.push({
            prop: fetchedProps,
            operator: fetchedOperator,
            values: fetchedValues,
          });
        }
      });
    } else {
      this.state.filter = Array();
    }

  };




  
  render() {
    const columns = [
      {
        title: "ST GROUP DESCRIPTION",
        dataIndex: "st_group_description_name",
        key: "st_group_description_name",
      },
    ];
    const searchProps = {
      lobCode: this.props.lobCode,
      // pageType: pageTypes.TYPE_TIER
    };
    return (
      <>
        <div className="bordered ns-border">
          <div className="header">Drug Grid</div>
          <Grid item xs={5}>
            <div className="tier-grid-remove-container">
              <Table
                columns={columns}
                dataSource={this.state.stGroupDescriptions}
                pagination={false}
                rowSelection={{
                  columnWidth: 20,
                  fixed: true,
                  type: "checkbox",
                  onChange: this.onSelectedRowKeysChange,
                }}
              />
            </div>
          </Grid>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugGrid);
