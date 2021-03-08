import React from "react";
import { connect } from "react-redux";
import { TabInfo } from "../../../../models/tab.model";
import Button from "../../../shared/Frx-components/button/Button";
import FrxDrugGridContainer from "../../../shared/FrxGrid/FrxDrugGridContainer";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import AdditionalCriteriaContainer from "../../NewAdvanceSearch/AdditionalCriteriaContainer/AdditionalCriteriaContainer";
import AdvanceSearchContainer from "../../NewAdvanceSearch/AdvanceSearchContainer";
import * as constants from "../../../../api/http-commons";

import getLobCode  from "./../../../NewFormulary/Utils/LobUtils";
import {
  postFormularyDrugUmCriterias,
  postUmCriteriasDrugs,
} from "../../../../redux/slices/formulary/umCriteria/actionCreation";
import { setAdditionalCriteria } from "../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import { UmCrtieriasColumns,UmCrtieriasPaColumns, UmCrtieriasQlColumns, UmCrtieriasStColumns } from "../../../../utils/grid/columns";

class UmCriteria extends React.Component<any, any> {
  state = {
    activeTabIndex: 0,
    tabs: [
      { id: 1, text: "PA", disabled: false },
      {
        id: 2,
        text: "ST",
        disabled: false
      },
      { id: 3, text: "QL", disabled: false},
    ],
    selectedDrugs: Array(),
    drugData: Array(),
    drugGridData: Array(),
    selectedRowKeys: [] as number[],
    fixedSelectedRows: [] as number[],
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
    isSelectAll: false,
    umCriterias:{},
    drugButtonLabel:"View PA Drugs",
    drugColumns: UmCrtieriasColumns({}),
  }

  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });

    switch (activeTabIndex) {
      case 0:
        this.callpostFormularyDrugUmCriterias('PA');
        break;
      case 1:
          this.callpostFormularyDrugUmCriterias('ST');
          break;
      case 2:
            this.callpostFormularyDrugUmCriterias('QL');
            break;
      default:
        break;
    }
    this.setState({ tabs, activeTabIndex });
  };

  componentWillReceiveProps(nextProps){

    if (Object.keys(nextProps.umCriterias).length > 0 ){
      let data = nextProps.umCriterias;
      let tmpActiveTab=0;
      let tmpButtonLabel="";
      switch (data.um_edit_type) {
        case "pa":
          tmpActiveTab=0;
          tmpButtonLabel= "View PA Drugs";
          break;
        case "st":
            tmpActiveTab=1;
            tmpButtonLabel= "View ST Drugs";
            break;
        case "ql":
          tmpActiveTab=2;
          tmpButtonLabel= "View QL Drugs";
          break;
        default:
          tmpActiveTab=0;
          tmpButtonLabel= "View PA Drugs";
          break;
      }
      this.setState({tabs:  [
        { id: 1, text: "PA", disabled: !data.is_pa_criteria_exists },
        { id: 2, text: "ST", disabled: !data.is_st_criteria_exists },
        { id: 3, text: "QL", disabled: !data.is_qa_criteria_exists },
      ],
      activeTabIndex:tmpActiveTab,
      umCriterias: data.um_criterias,
      drugButtonLabel: tmpButtonLabel,
    });
      let payload: any = {};
      payload.additionalCriteriaBody = data["um_criterias"];
      this.props.setAdditionalCriteria(payload);
    }

    if (Object.keys(nextProps.drugs).length > 0 ){
      this.loadGridData(nextProps.drugs);
    }
  }

  componentDidMount() {
    this.callpostFormularyDrugUmCriterias();
  }

  callpostFormularyDrugUmCriterias =(type:any= null)=>{
    let drugId = this.props.selectedDrugId;
    let apiDetails={};
    if (type==null){
      apiDetails["pathParams"] = "/" + getLobCode(this.props?.formulary_lob_id) + "/" +this.props.selectedDrugId ;
    }else{
      apiDetails["pathParams"] = "/" + getLobCode(this.props?.formulary_lob_id) + "/" +this.props.selectedDrugId +"/" +type ;
    }
    

    this.props.postFormularyDrugUmCriterias(apiDetails);
  }

  onSelectAllRows = (isSelected: boolean) => {
    const selectedRowKeys: number[] = [];
    const data = this.state.drugGridData.map((d: any) => {
      if (!d["isDisabled"]) {
        d["isChecked"] = isSelected;
        if (isSelected) selectedRowKeys.push(d["key"]);
      }

      // else d["isSelected"] = false;
      return d;
    });
    const selectedRows: number[] = selectedRowKeys.filter(
      (k) => this.state.fixedSelectedRows.indexOf(k) < 0
    );
    this.onSelectedTableRowChanged(selectedRows);
    this.setState({ drugGridData: data, isSelectAll: isSelected });
  };
  // additional criteria toggle

  onApplyFilterHandler = (filters) => {
    console.log("filtering from be:" + JSON.stringify(filters));
    //this.state.filter = Array();
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys && fetchedKeys.length > 0) {
      fetchedKeys.map((fetchedProps) => {
        if (filters[fetchedProps]) {
          this.state.filter = this.state.filter.filter(
            (element) => element["prop"] !== fetchedProps
          );
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
    console.log("Filters:" + JSON.stringify(this.state.filter));
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onApplySortHandler = (key, order, sortedInfo) => {
    console.log("sort details ", key, order);
    this.state.sort_by = Array();
    if (order) {
      let sortOrder = order === "ascend" ? "asc" : "desc";
      this.state.sort_by = this.state.sort_by.filter(
        (keyPair) => keyPair["key"] !== key
      );
      this.state.sort_by.push({ key: key, value: sortOrder });
    }

    this.setState({
      gridSingleSortInfo: sortedInfo,
      isGridSingleSorted: true,
      isGridMultiSorted: false,
      gridMultiSortedInfo: [],
    });
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log("Multisort info:" + JSON.stringify(sorter));

    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null,
    })

    if (sorter && sorter.length > 0) {
      let uniqueKeys = Array();
      let filteredSorter = Array();
      sorter.map((sortInfo) => {
        if (uniqueKeys.includes(sortInfo["columnKey"])) {
        } else {
          filteredSorter.push(sortInfo);
          uniqueKeys.push(sortInfo["columnKey"]);
        }
      });
      filteredSorter.map((sortInfo) => {
        let sortOrder = sortInfo["order"] === "ascend" ? "asc" : "desc";
        this.state.sort_by = this.state.sort_by.filter(
          (keyPair) => keyPair["key"] !== sortInfo["columnKey"]
        );
        this.state.sort_by.push({
          key: sortInfo["columnKey"],
          value: sortOrder,
        });
      });
    }

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  rowSelectionChangeFromCell = (
    key: string,
    selectedRow: any,
    isSelected: boolean
  ) => {
    console.log("data row ", selectedRow, isSelected);
    if (!selectedRow["isDisabled"]) {
      if (isSelected) {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = true;
            d["rowStyle"] = "table-row--green-font";
          }
          // else d["isChecked"] = false;
          return d;
        });
        const selectedRowKeys = [
          ...this.state.selectedRowKeys,
          selectedRow.key,
        ];
        console.log("selected row keys ", selectedRowKeys);
        const selectedRows: number[] = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );
        this.onSelectedTableRowChanged(selectedRowKeys);

        this.setState({ drugGridData: data });
      } else {
        const data = this.state.drugGridData.map((d: any) => {
          if (d.key === selectedRow.key) {
            d["isChecked"] = false;
            if (d["rowStyle"]) delete d["rowStyle"];
          }
          // else d["isChecked"] = false;
          return d;
        });

        const selectedRowKeys: number[] = this.state.selectedRowKeys.filter(
          (k) => k !== selectedRow.key
        );
        const selectedRows = selectedRowKeys.filter(
          (k) => this.state.fixedSelectedRows.indexOf(k) < 0
        );

        this.onSelectedTableRowChanged(selectedRows);
        this.setState({
          drugGridData: data,
        });
      }
    }
  };

  onSelectedTableRowChanged = (selectedRowKeys) => {
    console.log("selected row ", selectedRowKeys);

    this.state.selectedDrugs = [];
    this.setState({
      selectedRowKeys: [...selectedRowKeys],
    });
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      this.state.selectedDrugs = selectedRowKeys.map((tierId) => {
        return this.state.drugData[tierId - 1]["md5_id"];
      });
    }
  };
  onPageSize = (pageSize) => {
    console.log("Page size load");
    this.state.limit = pageSize;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    console.log("Page change load");
    this.state.index = (pageNumber - 1) * this.state.limit;
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };
  onClearFilterHandler = () => {
    this.state.filter = Array();
    if (this.props.advancedSearchBody) {
      this.populateGridData(this.props.advancedSearchBody);
    } else {
      this.populateGridData();
    }
  };

  populateGridData = (searchBody = null, switchState = false, type:any= null) => {
    console.log("Populate grid data is called");
    let apiDetails = {};

    // let tmpGroup :any = this.state.paGroupDescriptions.filter(obj  => obj.id_mcr_base_pa_group_description === this.state.selectedGroupDescription);

    apiDetails["keyVals"] = [
      { key: constants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: constants.KEY_INDEX, value: this.state.index },
      { key: constants.KEY_LIMIT, value: this.state.limit },
    ];
    apiDetails["messageBody"] = {};
    if (searchBody) {
      apiDetails["messageBody"] = Object.assign(
        apiDetails["messageBody"],
        searchBody
      );
    }

    let allFilters = Array();
    let filterProps = Array();
    this.state.filter.map((filterInfo) => {
      allFilters.push(filterInfo);
      filterProps.push(filterInfo["prop"]);
    });

    this.state.quickFilter.map((filterInfo) => {
      if (!filterProps.includes(filterInfo["prop"]))
        allFilters.push(filterInfo);
    });

    apiDetails["messageBody"]["filter"] = allFilters;
    // if (this.state.sort_by && this.state.sort_by.length ==0){
    //   this.state.sort_by.push({ key: 'drug_label_name', value: 'asc' });
    // }

    if (this.state.sort_by && this.state.sort_by.length > 0) {
      let keys = Array();
      let values = Array();

      this.state.sort_by.map((keyPair) => {
        keys.push(keyPair["key"]);
        values.push(keyPair["value"]);
      });

      apiDetails["messageBody"]["sort_by"] = keys;
      apiDetails["messageBody"]["sort_order"] = values;
    }
    let tmp_fileType: any = "";

    if (!(this.props.configureSwitch || switchState)) {
      
    } else {
      tmp_fileType= getLobCode(this.props.formulary_lob_id)
    }

    
    apiDetails["pathParams"] =
    "/" + this.props.formulary_id +
    "/" + getLobCode(this.props?.formulary_lob_id) +
    "/" + this.props.selectedDrugId ;

    if (type){
      switch (this.state.activeTabIndex) {
        case 0:
          apiDetails["pathParams"] +="/PA";
          this.setState({ drugColumns : UmCrtieriasPaColumns({}) });
          break;
        case 1:
          apiDetails["pathParams"] +="/ST";
          this.setState({ drugColumns : UmCrtieriasStColumns({}) });
          break;
        case 2:
          apiDetails["pathParams"] +="/QL";
          this.setState({ drugColumns : UmCrtieriasQlColumns({}) });
          break;
        default:
          break;
      }
    }else{
      this.setState({ drugColumns : UmCrtieriasColumns({}) });
    }

    this.props.postUmCriteriasDrugs(apiDetails);

      

    this.setState({ tierGridContainer: true });
  };

  loadGridData(json: any) {
    {
      if (true) {
        this.setState({ tierGridContainer: true });
        let tmpData = json.result;
        var data: any[] = [];
        let count = 1;

        let selected;

        let thisRef = this;
        var gridData = tmpData.map(function (el) {
          var element = Object.assign({}, el);
          data.push(element);
          let gridItem = {};
          gridItem["id"] = count;
          gridItem["key"] = count;


          if (selected &&
            selected["pa_group_description_name"] ===
              element.pa_group_description
          ) {
            //console.log("element value tier ", selectedGroup, element.pa_group_description);
            gridItem["isChecked"] = true;
            gridItem["isDisabled"] = true;
            // decide on class names based on data properties conditionally
            // the required styles are added under each classNames in FrxGrid.scss (towards the end)
            //table-row--red-font (for red) table-row--green-font (for green) table-row--blue-font for default (for blue)
            gridItem["rowStyle"] = "table-row--blue-font";
          }

          if (thisRef.props.configureSwitch) {
            gridItem["isDisabled"] = true;
            gridItem["rowStyle"] = "table-row--disabled-font";
          }
          gridItem["tier"] = element.tier_value;
          gridItem["is_um_criteria"] = element.is_um_criteria;
          gridItem["pa_rx_otc"] = element.pa_rx_otc;
          gridItem["pa_brand_generic"] = element.pa_brand_generic;
          gridItem["pa_group_description"] = element.pa_group_description;
          gridItem["st_group_description"] = element.st_group_description;
          gridItem["drug_descriptor_identifier"] = element.drug_descriptor_identifier;
          gridItem["generic_product_identifier"] = element.generic_product_identifier;

          gridItem["pa_type"] = element.pa_type;
          gridItem["st_type"] = element.st_type;
          gridItem["st_value"] = element.st_value;
          gridItem["ql_type"] = element.ql_type;
          gridItem["ql_quantity"] = element.ql_quantity;
          gridItem["ql_period_of_time"] = element.ql_period_of_time;

          gridItem["file_type"] = element.file_type
            ? "" + element.file_type
            : "";
          gridItem["data_source"] = element.data_source
            ? "" + element.data_source
            : "";
          gridItem["drug_label_name"] = element.drug_label_name
            ? "" + element.drug_label_name
            : "";
          gridItem["ndc"] = "";
          gridItem["rxcui"] = element.rxcui ? "" + element.rxcui : "";
          gridItem[
            "generic_product_identifier"
          ] = element.generic_product_identifier
            ? "" + element.generic_product_identifier
            : "";
          gridItem["trademark_code"] = element.trademark_code
            ? "" + element.trademark_code
            : "";
          gridItem["database_category"] = element.database_category
            ? "" + element.database_category
            : "";
          count++;
          return gridItem;
        });
        this.setState({
          drugData: data,
          drugGridData: gridData,
          dataCount: json.count,
        });
      } else {
        this.setState({
          drugData: Array(),
          drugGridData: Array(),
          dataCount: 0,
        });
      }
    }
  }
  render() {
    return (
      <>
        <div className="mini-tabs">
                                <FrxMiniTabs
                                  tabList={this.state.tabs}
                                  activeTabIndex={this.state.activeTabIndex}
                                  onClickTab={this.onClickTab}
                                  disabled={this.props.configureSwitch}
                                />
        </div>
        <div>
        <Button
                    label="View Drugs"
                    className="Button"
                    onClick={(event) => {this.populateGridData()}}
                    disabled={false}
                  />
        <Button
                    label={this.state.drugButtonLabel}
                    className="Button"
                    onClick={(event) => {this.populateGridData(null,false,true)}}
                    disabled={false}
                  />

        </div>
        <AdditionalCriteriaContainer
              criteriaList={this.state.umCriterias}
              handleChildDataSave={() => { }}
              isReadOnly={true}
            />
        
        <div className="tier-grid-container">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="DRUG GRID"
                  enableSettings
                  columns={this.state.drugColumns}
                  scroll={{ x: 2000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={this.state.drugGridData}
                  rowSelectionChangeFromCell={this.rowSelectionChangeFromCell}
                  onSelectAllRows={this.onSelectAllRows}
                  customSettingIcon={"FILL-DOT"}
                  settingsWidth={30}
                  pageSize={this.state.limit}
                  selectedCurrentPage={this.state.index / this.state.limit + 1}
                  totalRowsCount={this.state.dataCount}
                  getPerPageItemSize={this.onPageSize}
                  onGridPageChangeHandler={this.onGridPageChangeHandler}
                  clearFilterHandler={this.onClearFilterHandler}
                  applyFilter={this.onApplyFilterHandler}
                  applySort={this.onApplySortHandler}
                  isSingleSorted={this.state.isGridSingleSorted}
                  sortedInfo={this.state.gridSingleSortInfo}
                  applyMultiSort={this.applyMultiSortHandler}
                  isMultiSorted={this.state.isGridMultiSorted}
                  multiSortedInfo={this.state.gridMultiSortedInfo}
                  onMultiSortToggle={this.onMultiSortToggle}
                // rowSelection={{
                //   columnWidth: 50,
                //   fixed: true,
                //   type: "checkbox",
                //   onChange: this.onSelectedTableRowChanged,
                // }}
                />
              </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    descriptions: state.paReducer.descriptions,
    client_id: state.application.clientId,
    current_formulary: state.application.formulary,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id, //comme- 4, medicare-1 , medicate-2, exchnage -3
    formulary_type_id: state?.application?.formulary_type_id, //6

    // additional criteria
    additionalCriteria: state.additionalCriteria,
    drugs: state?.umCriteriaReducer.drugs,
    umCriterias: state?.umCriteriaReducer.umCriterias,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postFormularyDrugUmCriterias: (a) => dispatch(postFormularyDrugUmCriterias(a)),
    postUmCriteriasDrugs: (a) => dispatch(postUmCriteriasDrugs(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UmCriteria);