import React, { Component } from "react";
import PureAccordion from "../../../../../../shared/Frx-components/accordion/PureAccordion";
import "./CompareTable.scss";
import InnerGrid from "./InnerGrid";
import Button from "../../../../../../shared/Frx-components/button/Button";
import FrxLoader from "../../../../../../shared/FrxLoader/FrxLoader";
import DialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { getCompareNonMcrFormularyViewAllGridColumns } from "../../../../../../../mocks/formulary-grid/FormularyGridColumn";
import {
  getMainComparison,
  getViewAllDrugs,
  getViewAllDrugsReject,
  postDrugRejection,
} from "../../../../../../../redux/slices/formulary/compareView/compareViewService";
import * as commonConstants from "../../../../../../../api/http-commons";
import * as compareConstants from "../../../../../../../api/http-compare-view";
import { connect } from "react-redux";
import showMessage from "../../../../../Utils/Toast";
import getLobCode from "../../../../../Utils/LobUtils";
import { textFilters } from "../../../../../../../utils/grid/filters";

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    clientId: state?.application?.clientId,
  };
};

const TYPE_SINGLE = 0;
const TYPE_IN_BASE_NOT_REF = 1;
const TYPE_IN_REF_NOT_BASE = 2;

const defaultListPayload = {
  index: 0,
  limit: 10,
  filter: [],
  sort_by: [],
  sort_order: []
};

class CompareTable extends Component<any, any> {
  state = {
    showCheckbox: false,
    toggleAllAccordion: true,
    showViewAll: false,
    showViewAllNonMatch: false,
    columns: Array(),
    data: Array(),
    gridData: Array(),
    scroll: {
      x: 8000,
      y: 500,
    },
    formularyTypesGridData: Array(),
    baseFormularyId: "",
    reformularyId: "",
    viewAllType: TYPE_SINGLE,
    dataCount: 0,
    isRowSelectionEnabled: false,
    hiddenColumns: Array(),
    rejectedKeys: Array(),
    rejectedDrugIds: Array(),
    isRequestFinished: false,
    gridSingleSortInfo: null,
    isGridSingleSorted: false,
    gridMultiSortedInfo: [],
    isGridMultiSorted: false,
    sort_by: Array(),
    isFiltered: false,
    filteredInfo: null,
  };

  listPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    sort_by: [],
    sort_order: []
  };

  onSettingsIconHandler = (hiddenColumn, visibleColumn) => {
    if (hiddenColumn && hiddenColumn.length > 0) {
      let hiddenColumnKeys = hiddenColumn.map((column) => column["key"]);
      this.setState({
        hiddenColumns: hiddenColumnKeys,
      });
    }
  };
  onApplyFilterHandler = (filters, filteredInfo) => {
    const fetchedKeys = Object.keys(filters);
    if (fetchedKeys.length > 0) {
      fetchedKeys.map(fetchedProps => {
        if (filters[fetchedProps]) {
          this.listPayload.filter = this.listPayload.filter.filter(element => element['prop'] !== fetchedProps);
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
          this.listPayload.filter.push({
            prop: fetchedProps,
            operator: fetchedOperator,
            values: fetchedValues
          });
        }
      });
      this.setState({
        isFiltered: true,
        filteredInfo: filteredInfo
      }, () => {
        this.populateViewAllData(
          this.listPayload,
          this.state.baseFormularyId,
          this.state.reformularyId,
          this.state.viewAllType
        );
      });
    }else{
      this.listPayload.filter = Array();
      this.setState({
        isFiltered: false,
        filteredInfo: filteredInfo
      }, () => {
        this.populateViewAllData(
          this.listPayload,
          this.state.baseFormularyId,
          this.state.reformularyId,
          this.state.viewAllType
        );
      });
    }
    console.log("Filters:" + JSON.stringify(this.listPayload.filter));
    /*this.setState({
      isRequestFinished: false
    });*/
  };
  onPageSize = (pageSize) => {
    if (this.state.viewAllType === TYPE_SINGLE) {
      this.listPayload = { ...defaultListPayload };
      this.listPayload.limit = pageSize;
      /*this.setState({
        isRequestFinished: false
      });*/
      this.populateViewAllData(
        this.listPayload,
        this.state.baseFormularyId,
        this.state.reformularyId,
        this.state.viewAllType
      );
    }
  };
  onGridPageChangeHandler = (pageNumber: any) => {
    if (this.state.viewAllType === TYPE_SINGLE) {
      this.listPayload.index = (pageNumber - 1) * this.listPayload.limit;
      /*this.setState({
        isRequestFinished: false
      });*/
      this.populateViewAllData(
        this.listPayload,
        this.state.baseFormularyId,
        this.state.reformularyId,
        this.state.viewAllType
      );
    }
  };
  onClearFilterHandler = () => {
    if (this.state.viewAllType === TYPE_SINGLE) {
      this.listPayload = { ...defaultListPayload };
      this.listPayload.filter = Array();
      /*this.setState({
        isRequestFinished: false
      });*/
      this.setState({
        isFiltered: false,
        filteredInfo: null
      }, () => {
        this.populateViewAllData(
          this.listPayload,
          this.state.baseFormularyId,
          this.state.reformularyId,
          this.state.viewAllType
        );
      });
    }
  };
  applyMultiSortHandler = (sorter, multiSortedInfo) => {
    console.log('Multisort info:' + JSON.stringify(sorter));
    this.setState({
      isGridMultiSorted: true,
      isGridSingleSorted: false,
      gridMultiSortedInfo: multiSortedInfo,
      gridSingleSortInfo: null,
    })

    if (sorter && sorter.length > 0) {
      let uniqueKeys = Array();
      let filteredSorter = Array();
      sorter.map(sortInfo => {
        if (uniqueKeys.includes(sortInfo['columnKey'])) {

        } else {
          filteredSorter.push(sortInfo);
          uniqueKeys.push(sortInfo['columnKey']);
        }
      });
      filteredSorter.map(sortInfo => {
        let sortOrder = sortInfo['order'] === 'ascend' ? 'asc' : 'desc';
        this.state.sort_by = this.state.sort_by.filter(keyPair => keyPair['key'] !== sortInfo['columnKey']);
        this.state.sort_by.push({ key: sortInfo['columnKey'], value: sortOrder });
      })

      let keys = Array();
      let values = Array();

      this.state.sort_by.map(keyPair => {
        keys.push(keyPair['key']);
        values.push(keyPair['value']);
      });

      this.listPayload.sort_by = keys;
      this.listPayload.sort_order = values;
    }

    /*this.setState({
      isRequestFinished: false
    });*/
    this.populateViewAllData(
      this.listPayload,
      this.state.baseFormularyId,
      this.state.reformularyId,
      this.state.viewAllType
    );
  };

  onMultiSortToggle = (isMultiSortOn: boolean) => {
    console.log("is Multi sort on ", isMultiSortOn);
    this.state.sort_by = Array();
    this.listPayload.sort_by = Array();
    this.listPayload.sort_order = Array();
    this.state.gridSingleSortInfo = null;
    this.state.gridMultiSortedInfo = [];
    this.state.isGridMultiSorted = isMultiSortOn;
    this.state.isGridSingleSorted = false;

    /*this.setState({
      isRequestFinished: false
    });*/
    this.populateViewAllData(
      this.listPayload,
      this.state.baseFormularyId,
      this.state.reformularyId,
      this.state.viewAllType
    );
  };

  /**
   * the selected sorter details will be availbale here to mak api call
   * @param key the column key
   * @param order the sorting order : 'ascend' | 'descend'
   */
  onApplySortHandler = (key, order, sortedInfo) => {
    console.log("sort details ", key, order);
    this.state.sort_by = Array();
    this.listPayload.sort_by = Array();
    this.listPayload.sort_order = Array();
    if (order) {
      let sortOrder = order === 'ascend' ? 'asc' : 'desc';
      this.state.sort_by = this.state.sort_by.filter(keyPair => keyPair['key'] !== key);
      this.state.sort_by.push({ key: key, value: sortOrder });
    }
    this.setState({
      gridSingleSortInfo: sortedInfo,
      isGridSingleSorted: true,
      isGridMultiSorted: false,
      gridMultiSortedInfo: []
    });

    let keys = Array();
    let values = Array();

    this.state.sort_by.map(keyPair => {
      keys.push(keyPair['key']);
      values.push(keyPair['value']);
    });

    this.listPayload.sort_by = keys;
    this.listPayload.sort_order = values;

    /*this.setState({
      isRequestFinished: false
    });*/
    this.populateViewAllData(
      this.listPayload,
      this.state.baseFormularyId,
      this.state.reformularyId,
      this.state.viewAllType
    );
  };

  rowSelectionChange = (data: any, event) => {
    console.log("Main Table: Drug selected:" + JSON.stringify(data));
    if (event.target.checked) {
      let filtered = this.state.data.filter(
        (drugItem) =>
          drugItem["formulary_drug_id"] === data["formulary_drug_id"]
      );
      if (filtered.length > 0) {
        let drugId = filtered[0]["md5_id"];
        if (!this.state.rejectedDrugIds.includes(drugId)) {
          this.state.rejectedDrugIds.push(drugId);
        }
      }
    } else {
      let filtered = this.state.data.filter(
        (drugItem) =>
          drugItem["formulary_drug_id"] === data["formulary_drug_id"]
      );
      if (filtered.length > 0) {
        let drugId = filtered[0]["md5_id"];
        if (!this.state.rejectedDrugIds.includes(drugId)) {
          this.state.rejectedDrugIds = this.state.rejectedDrugIds.filter(
            (item) => item !== drugId
          );
        }
      }
    }
  };

  onDialogAction = (type) => {
    console.log(
      "Reject clicked:" +
      type +
      " " +
      JSON.stringify(this.state.rejectedDrugIds)
    );
    if (type === "positive" && this.state.rejectedDrugIds.length > 0) {
      console.log(
        "Rejected drugs:" + JSON.stringify(this.state.rejectedDrugIds)
      );
      let apiBody = {
        user_id: 1,
        attributes: Array(),
      };
      this.state.rejectedDrugIds.map((attributeData) => {
        let newTemplate = {
          attribute_field_name: "",
          drug_key: "",
          attribute_current_value: "",
          is_single_update: false,
          file_type: getLobCode(this.props.formulary_lob_id),
          multi_update_type:
            this.state.viewAllType === TYPE_IN_BASE_NOT_REF ? "delete" : "copy",
        };
        newTemplate.drug_key = attributeData;
        apiBody.attributes.push(newTemplate);
      });
      this.onRejectClicked(apiBody);
      this.toggleShowViewAll(null, null, TYPE_SINGLE, true);
    }
  };

  toggleShowViewAll = (
    baseFormularyId = null,
    reformularyId = null,
    type = TYPE_SINGLE,
    isClose = false,
    checkBoxEnabled = false
  ) => {
    if (isClose) {
      this.listPayload = {
        index: 0,
        limit: 10,
        filter: [],
        sort_by: [],
        sort_order: []
      };
      this.setState({
        showViewAll: !this.state.showViewAll,
        columns: Array(),
        data: Array(),
        gridData: Array(),
        dataCount: 0,
        isRowSelectionEnabled: false,
        viewAllType: TYPE_SINGLE,
        baseFormularyId: "",
        reformularyId: "",
        hiddenColumns: Array(),
        rejectedKeys: Array(),
        rejectedDrugIds: Array(),
        gridSingleSortInfo: null,
        gridMultiSortedInfo: [],
        isGridMultiSorted: false,
        isGridSingleSorted: false,
        isFiltered: false,
        filteredInfo: null
      });
    } else {
      this.state.showViewAll = !this.state.showViewAll;
      this.state.isRowSelectionEnabled = checkBoxEnabled;
      this.listPayload = { ...defaultListPayload };
      this.setState({
        isRequestFinished: false
      });
      this.populateViewAllData(
        this.listPayload,
        baseFormularyId,
        reformularyId,
        type
      );
    }
  };

  getBackgroundColor = (type) => {
    switch (type) {
      case "Tier":
        return "rgba(31, 187, 196, 0.4)";

      case "Category/Class":
        return "rgba(10, 123, 225, 0.4)";

      case "Prior Authorization (PA)":
        return "#FFF5F0";

      case "Step Therpay (ST)":
        return "rgba(244, 175, 100, 0.4)";

      case "Quantity Limits (QL)":
        return "rgba(213, 255, 215, 0.5)";

      case "Drug Details":
        return "rgba(224, 237, 81, 0.4)";

      case "User Defined":
        return "#ECF5FA";
    }
  };

  getGridColumns = (type, subType: any = null) => {
    let columns = [
      {
        id: 1,
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "label",
        displayTitle: "Label Name",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 2,
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "fileType",
        displayTitle: "File Type",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 3,
        position: 3,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "dataSource",
        displayTitle: "Data Source",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 4,
        position: 4,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "gpi",
        displayTitle: "GPI",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },
    ];

    let lastSectionColumns = [...columns];
    switch (type) {
      case "Tier":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "tier",
              displayTitle: "Tier",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Category/Class":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "category",
            displayTitle: "Category",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "class",
            displayTitle: "Class",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];
        return columns;

      case "PA Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Prior Authorization (PA)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paType",
              displayTitle: "PA Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paGroupDescription",
              displayTitle: "PA Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Step Therpay (ST)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stType",
              displayTitle: "ST Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stGroupDescription",
              displayTitle: "ST Group Description",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stValue",
              displayTitle: "ST Value",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "ST Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Quantity Limits (QL)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlType",
              displayTitle: "QL Type",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlDays",
              displayTitle: "QL Days",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlPeriodofTime",
              displayTitle: "QL Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlQuantity",
              displayTitle: "QL Quantity",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 9,
              position: 9,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fillsAllowed",
              displayTitle: "Fills Allowed",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 10,
              position: 10,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fullLimitPeriod",
              displayTitle: "Full Limit Period of Time",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "Drug Details":
        switch (subType) {
          case "Age Limits":
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCovered",
                  displayTitle: "Minimum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCovered",
                  displayTitle: "Maximum Age [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 7,
                  position: 7,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredCond",
                  displayTitle: "Minimum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 8,
                  position: 8,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredCond",
                  displayTitle: "Maximum Condition [Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 9,
                  position: 9,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCovered",
                  displayTitle: "Minimum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 10,
                  position: 10,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCovered",
                  displayTitle: "Maximum Age [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 11,
                  position: 11,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredCond",
                  displayTitle: "Minimum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 12,
                  position: 12,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredCond",
                  displayTitle: "Maximum Condition [Not Covered]",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;

          default:
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "covered",
                  displayTitle: "Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "notCovered",
                  displayTitle: "Not Covered",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];
            return columns;
        }

      case "User Defined":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "userDefined",
              displayTitle: "User Defined",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;
    }
    return Array();
  };

  getGridColumnsNonMatch = (type, subType: any = null) => {
    let columns = [
      {
        id: 1,
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "label",
        displayTitle: "Label Name",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 2,
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "fileType",
        displayTitle: "File Type",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 3,
        position: 3,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "dataSource",
        displayTitle: "Data Source",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },

      {
        id: 4,
        position: 4,
        sorter: {},
        textCase: "upper",
        pixelWidth: 600,
        key: "gpi",
        displayTitle: "GPI",
        dataType: "string",
        isFilterable: true,
        filters: textFilters,
        hidden: false,
        sortDirections: ["ascend", "descend"],
      },
    ];

    let lastSectionColumns = [...columns];
    switch (type) {
      case "Tier":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "tier",
              displayTitle: "Tier Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "tierRef",
              displayTitle: "Tier Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Category/Class":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "category",
            displayTitle: "Category Base",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "class",
            displayTitle: "Class Base",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 3,
            position: 3,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "categoryRef",
            displayTitle: "Category Ref",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 4,
            position: 4,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "classRef",
            displayTitle: "Class Ref",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "PA Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description Base",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescriptionRef",
            displayTitle: "Group Description Ref",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Prior Authorization (PA)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paType",
              displayTitle: "PA Type Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paGroupDescription",
              displayTitle: "PA Group Description Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paTypeRef",
              displayTitle: "PA Type Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "paGroupDescriptionRef",
              displayTitle: "PA Group Description Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Step Therpay (ST)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stType",
              displayTitle: "ST Type Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stGroupDescription",
              displayTitle: "ST Group Description Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stValue",
              displayTitle: "ST Value Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stTypeRef",
              displayTitle: "ST Type Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 9,
              position: 9,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stGroupDescriptionRef",
              displayTitle: "ST Group Description Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 10,
              position: 10,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "stValueRef",
              displayTitle: "ST Value Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];
        return columns;

      case "ST Group Descriptions":
        columns = [
          {
            id: 1,
            position: 1,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescription",
            displayTitle: "Group Description Base",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
          {
            id: 2,
            position: 2,
            sorter: {},
            textCase: "upper",
            pixelWidth: 600,
            key: "groupDescriptionRef",
            displayTitle: "Group Description Ref",
            dataType: "string",
            isFilterable: true,
            filters: textFilters,
            hidden: false,
            sortDirections: ["ascend", "descend"],
          },
        ];

        return columns;

      case "Quantity Limits (QL)":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlType",
              displayTitle: "QL Type Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlDays",
              displayTitle: "QL Days Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 7,
              position: 7,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlPeriodofTime",
              displayTitle: "QL Period of Time Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 8,
              position: 8,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlQuantity",
              displayTitle: "QL Quantity Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 9,
              position: 9,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fillsAllowed",
              displayTitle: "Fills Allowed Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 10,
              position: 10,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fullLimitPeriod",
              displayTitle: "Full Limit Period of Time Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 11,
              position: 11,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlTypeRef",
              displayTitle: "QL Type Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 12,
              position: 12,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlDaysRef",
              displayTitle: "QL Days Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 13,
              position: 13,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlPeriodofTimeRef",
              displayTitle: "QL Period of Time Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 14,
              position: 14,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "qlQuantityRef",
              displayTitle: "QL Quantity Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 15,
              position: 15,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fillsAllowedRef",
              displayTitle: "Fills Allowed Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 16,
              position: 16,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "fullLimitPeriodRef",
              displayTitle: "Full Limit Period of Time Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;

      case "Drug Details":
        switch (subType) {
          case "Age Limits":
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCovered",
                  displayTitle: "Minimum Age [Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCovered",
                  displayTitle: "Maximum Age [Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 7,
                  position: 7,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredCond",
                  displayTitle: "Minimum Condition [Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 8,
                  position: 8,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredCond",
                  displayTitle: "Maximum Condition [Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 9,
                  position: 9,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCovered",
                  displayTitle: "Minimum Age [Not Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 10,
                  position: 10,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCovered",
                  displayTitle: "Maximum Age [Not Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 11,
                  position: 11,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredCond",
                  displayTitle: "Minimum Condition [Not Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 12,
                  position: 12,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredCond",
                  displayTitle: "Maximum Condition [Not Covered] Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 13,
                  position: 13,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredRef",
                  displayTitle: "Minimum Age [Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 14,
                  position: 14,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredRef",
                  displayTitle: "Maximum Age [Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 15,
                  position: 15,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minCoveredCondRef",
                  displayTitle: "Minimum Condition [Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 16,
                  position: 16,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxCoveredCondRef",
                  displayTitle: "Maximum Condition [Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 17,
                  position: 17,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredRef",
                  displayTitle: "Minimum Age [Not Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 18,
                  position: 18,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredRef",
                  displayTitle: "Maximum Age [Not Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 19,
                  position: 19,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "minNotCoveredCondRef",
                  displayTitle: "Minimum Condition [Not Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 20,
                  position: 20,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "maxNotCoveredCondRef",
                  displayTitle: "Maximum Condition [Not Covered] Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];

            return columns;

          default:
            columns = [
              ...columns,
              ...[
                {
                  id: 5,
                  position: 5,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "covered",
                  displayTitle: "Covered Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 6,
                  position: 6,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "notCovered",
                  displayTitle: "Not Covered Base",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 7,
                  position: 7,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "coveredRef",
                  displayTitle: "Covered Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
                {
                  id: 8,
                  position: 8,
                  sorter: {},
                  textCase: "upper",
                  pixelWidth: 600,
                  key: "notCoveredRef",
                  displayTitle: "Not Covered Ref",
                  dataType: "string",
                  isFilterable: true,
                  filters: textFilters,
                  hidden: false,
                  sortDirections: ["ascend", "descend"],
                },
              ],
            ];

            return columns;
        }

      case "User Defined":
        columns = [
          ...columns,
          ...[
            {
              id: 5,
              position: 5,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "userDefined",
              displayTitle: "User Defined Base",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
            {
              id: 6,
              position: 6,
              sorter: {},
              textCase: "upper",
              pixelWidth: 600,
              key: "userDefinedRef",
              displayTitle: "User Defined Ref",
              dataType: "string",
              isFilterable: true,
              filters: textFilters,
              hidden: false,
              sortDirections: ["ascend", "descend"],
            },
          ],
        ];

        return columns;
    }
    return Array();
  };

  areAllNull = (type) => {
    switch (type) {
      case "Category/Class":
        return true;

      case "Drug Details":
        return true;

      case "User Defined":
        return true;

      default:
        return false;
    }
  };

  areOnlyLastThreeNull = (type) => {
    switch (type) {
      case "Tier":
        return true;

      case "Prior Authorization (PA)":
        return true;

      case "Step Therpay (ST)":
        return true;

      case "Quantity Limits (QL)":
        return true;

      default:
        return false;
    }
  };

  populateComparisionData = async () => {
    if (this.props.formulary_lob_id && this.props.formulary_lob_id === 4) {
      let formularyTypesGridData = Array();
      let apiDetails = {};
      apiDetails["apiPart"] = compareConstants.COMMERCIAL_COMPARE_ALL;
      apiDetails["pathParams"] =
        this.props.baseformulary["id_formulary"] +
        "/" +
        this.props.referenceformulary["id_formulary"];

      try {
        const data = await getMainComparison(apiDetails);
        if (data && data.length > 0) {
          let idCount = 1;
          data.map((value) => {
            let header = {
              id: idCount,
              title: value["attribute_type"],
              titleBG: this.getBackgroundColor(value["attribute_type"]),
              attribute_type: value["attribute_type"],
              file_type: value["file_type"],
              gridColumns: [
                "Tier",
                "Prior Authorization (PA)",
                "Step Therpay (ST)",
                "Quantity Limits (QL)",
              ].includes(value["attribute_type"])
                ? this.getGridColumns(value["attribute_type"])
                : Array(),
              headDrugsCount: {
                baseFormulary: null,
                referenceFormulary: null,
                baseOnly: null,
                referenceOnly: null,
                nonMatch: null,
              },
              formularies: Array(),
            };
            if (!this.areAllNull(value["attribute_type"])) {
              if (this.areOnlyLastThreeNull(value["attribute_type"])) {
                header.headDrugsCount.baseFormulary =
                  value["total_base_drugs_count"];
                header.headDrugsCount.referenceFormulary =
                  value["total_reference_drugs_count"];
                header.headDrugsCount.baseOnly =
                  value["total_drugs_in_base_not_in_reference"];
                header.headDrugsCount.referenceOnly =
                  value["total_drugs_in_reference_not_in_base"];
                header.headDrugsCount.nonMatch =
                  value["total_matching_formulary_drugs_count"];
              } else {
                header.headDrugsCount.baseFormulary =
                  value["total_base_drugs_count"];
                header.headDrugsCount.referenceFormulary =
                  value["total_reference_drugs_count"];
              }
            }
            let valueId = 1;
            if (value["values"] && value["values"].length > 0) {
              value["values"].map((subValue) => {
                let gridColumns: any[] = Array();
                let gridColumnsNonMatch: any[] = Array();
                if (
                  subValue["attribute_name"] === "PA Group Descriptions" ||
                  subValue["attribute_name"] === "ST Group Descriptions"
                ) {
                  gridColumns = this.getGridColumns(subValue["attribute_name"]);
                  gridColumnsNonMatch = this.getGridColumnsNonMatch(
                    subValue["attribute_name"]
                  );
                } else if (value["attribute_type"] === "Drug Details") {
                  gridColumns = this.getGridColumns(
                    value["attribute_type"],
                    subValue["attribute_name"]
                  );
                  gridColumnsNonMatch = this.getGridColumnsNonMatch(
                    value["attribute_type"],
                    subValue["attribute_name"]
                  );
                } else {
                  gridColumns = this.getGridColumns(value["attribute_type"]);
                  gridColumnsNonMatch = this.getGridColumnsNonMatch(
                    value["attribute_type"]
                  );
                }
                let subItem = {
                  name: subValue["attribute_name"],
                  baseFormulary: subValue["base_formulary_drugs_count"],
                  referenceFormulary:
                    subValue["reference_formulary_drugs_count"],
                  baseOnly: subValue["drugs_in_base_not_in_reference"],
                  referenceOnly: subValue["drugs_in_reference_not_in_base"],
                  nonMatch: subValue["matching_formulary_drugs_count"],
                  attribute_type: value["attribute_type"],
                  file_type: value["file_type"],
                  attribute_field_data_type:
                    subValue["attribute_field_data_type"],
                  attribute_field_name: subValue["attribute_field_name"],
                  attribute_field_value: subValue["attribute_field_value"],
                  attribute_name: subValue["attribute_name"],
                  source: subValue["source"],
                  gridColumns: gridColumns,
                  gridColumnsNonMatch: gridColumnsNonMatch,
                };
                header.formularies.push(subItem);
                valueId++;
              });
            }
            formularyTypesGridData.push(header);
            idCount++;
          });
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            columns: Array(),
            data: Array(),
            gridData: Array(),
            isRequestFinished: true
          });
        } else {
          showMessage("Compare data is empty", "error");
          this.setState({
            formularyTypesGridData: formularyTypesGridData,
            columns: Array(),
            data: Array(),
            gridData: Array(),
            isRequestFinished: true
          });
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while fetching data", "error");
        this.setState({
          formularyTypesGridData: formularyTypesGridData,
          columns: Array(),
          data: Array(),
          gridData: Array(),
          isRequestFinished: true
        });
      }
    } else {
      this.setState({
        formularyTypesGridData: formularyTypesGridData,
        columns: Array(),
        data: Array(),
        gridData: Array(),
        isRequestFinished: true
      });
    }
  };

  populateViewAllData = async (
    payload,
    baseFormularyId: any,
    reformularyId: any = null,
    type = TYPE_SINGLE
  ) => {
    if (this.props.formulary_lob_id && this.props.formulary_lob_id === 4) {
      let lobCode = getLobCode(this.props.formulary_lob_id);
      let gridData = Array();
      let mainData = Array();
      let columns = getCompareNonMcrFormularyViewAllGridColumns();
      let apiDetails = {};
      if (type === TYPE_SINGLE) {
        apiDetails["apiPart"] = compareConstants.COMMERCIAL_FORMULARY_ALL_DRUGS;
      } else {
        apiDetails["apiPart"] =
          type === TYPE_IN_BASE_NOT_REF
            ? compareConstants.COMMERCIAL_FORMULARY_IN_BASE_NOT_REF
            : compareConstants.COMMERCIAL_FORMULARY_IN_REF_NOT_BASE;
      }
      if (type === TYPE_SINGLE) {
        apiDetails["pathParams"] = baseFormularyId + "/" + lobCode;
      } else {
        apiDetails["pathParams"] = baseFormularyId + "/" + reformularyId;
      }

      if (type === TYPE_SINGLE) {
        apiDetails["keyVals"] = [];
        apiDetails["keyVals"].push({
          key: commonConstants.KEY_LIMIT,
          value: payload["limit"],
        });
        apiDetails["keyVals"].push({
          key: commonConstants.KEY_INDEX,
          value: payload["index"],
        });

        apiDetails["messageBody"] = {};
        apiDetails["messageBody"]["attribute_field_data_type"] = "";
        apiDetails["messageBody"]["attribute_field_name"] = "";
        apiDetails["messageBody"]["attribute_field_value"] = "";
        apiDetails["messageBody"]["attribute_name"] = "";
        apiDetails["messageBody"]["file_type"] = "";
        apiDetails["messageBody"]["filter"] = payload["filter"];
        apiDetails["messageBody"]["sort_by"] = payload["sort_by"];
        apiDetails["messageBody"]["sort_order"] = payload["sort_order"];
      }

      apiDetails["type"] = type;

      try {
        let data: any = null;

        if (type === TYPE_SINGLE) {
          data = await getViewAllDrugs(apiDetails);
        } else {
          data = await getViewAllDrugsReject(apiDetails);
        }
        if (data && data.list && data.list.length > 0) {
          data.list.map((value, index) => {
            let dataValue = Object.assign({}, value);
            mainData.push(dataValue);

            let gridItem = {};
            gridItem["id"] = index + 1;
            gridItem["key"] = index + 1;

            columns.map((columnData) => {
              if (Object.keys(dataValue).includes(columnData["key"])) {
                gridItem[columnData["key"]] =
                  dataValue[columnData["key"]] === null
                    ? ""
                    : dataValue[columnData["key"]];
              }
            });
            gridItem["md5"] = dataValue["md5_id"];
            gridData.push(gridItem);
          });
          this.setState({
            columns: columns,
            data: mainData,
            gridData: gridData,
            viewAllType: type,
            baseFormularyId: baseFormularyId,
            reformularyId: reformularyId,
            dataCount: data["count"],
            isRequestFinished: true
          });
        } else {
          showMessage("Compare data is empty", "error");
          this.setState({
            columns: Array(),
            data: Array(),
            gridData: Array(),
            viewAllType: type,
            baseFormularyId: baseFormularyId,
            reformularyId: reformularyId,
            dataCount: 0,
            isRequestFinished: true
          });
        }
      } catch (err) {
        console.log(err);
        showMessage("Error while fetching data", "error");
        this.setState({
          columns: Array(),
          data: Array(),
          gridData: Array(),
          viewAllType: type,
          baseFormularyId: baseFormularyId,
          reformularyId: reformularyId,
          dataCount: 0,
          isRequestFinished: true
        });
      }
    } else {
      this.setState({
        columns: Array(),
        data: Array(),
        gridData: Array(),
        viewAllType: type,
        baseFormularyId: baseFormularyId,
        reformularyId: reformularyId,
        dataCount: 0,
        isRequestFinished: true
      });
    }
  };

  componentDidMount() {
    if (
      this.props.baseformulary &&
      this.props.referenceformulary &&
      this.props.baseformulary["id_formulary"] &&
      this.props.referenceformulary["id_formulary"]
    ) {
      this.setState({
        isRequestFinished: false,
      });
      this.populateComparisionData();
    }
  }

  onRejectClicked = async (apiBody) => {
    let apiDetails = {};
    apiDetails["apiPart"] = compareConstants.COMMERCIAL_DRUG_REJECTION;
    apiDetails["pathParams"] =
      this.props.baseformulary["id_formulary"] +
      "/" +
      this.props.referenceformulary["id_formulary"];
    apiDetails["messageBody"] = apiBody;

    let response = await postDrugRejection(apiDetails);
    if (response) {
      if (response.code && response.code === "200") {
        showMessage("Drugs Rejection Successful", "success");
        this.setState({
          isRequestFinished: false,
        });
        this.populateComparisionData();
      } else {
        if (response.message) {
          showMessage(response.message, "error");
        } else {
          showMessage("Drugs Rejection Failure", "error");
        }
      }
    }
  };

  render() {
    let gridColumns = [...this.state.columns];
    if (this.state.columns.length > 0 && this.state.hiddenColumns.length > 0)
      gridColumns = this.state.columns.filter(
        (column) => !this.state.hiddenColumns.includes(column["key"])
      );
    const {
      showCheckbox,
      toggleAllAccordion,
      showViewAll,
      showViewAllNonMatch,
      scroll,
      data,
      columns,
      formularyTypesGridData,
    } = this.state;
    if (!this.state.isRequestFinished) {
      return <FrxLoader />;
    }
    return (
      <>
        <div className="bordered-grid">
          <div className="__root_compare-grid-container">
            <div className="__root_compare-grid-container-parent-el">
              {/* Top Header Grid*/}
              <div className="border-bottom accordion-section-wrapper-first-col">
                <div className="header-first-child-container">
                  <div
                    className="header-first-child-container-child"
                    onClick={() =>
                      this.setState({
                        showCheckbox: !this.state.showCheckbox,
                      })
                    }
                  >
                    {showCheckbox ? (
                      <svg 
                        style={{
                          margin: "2px 3px 0 0",
                        }}
                        width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.49995 9.37506C5.72221 9.37506 4.28315 7.99905 4.15073 6.2553L1.69214 4.35522C1.36893 4.76069 1.07151 5.18936 0.831512 5.65811C0.777897 5.76416 0.749962 5.88134 0.749962 6.00018C0.749962 6.11902 0.777897 6.23619 0.831512 6.34225C2.10253 8.82217 4.61878 10.5001 7.49995 10.5001C8.13065 10.5001 8.73909 10.4063 9.3255 10.2549L8.10932 9.31389C7.90847 9.35269 7.70451 9.37316 7.49995 9.37506ZM14.8551 10.7368L12.2641 8.73428C13.0512 8.07098 13.6985 7.25779 14.1684 6.34201C14.222 6.23596 14.2499 6.11878 14.2499 5.99994C14.2499 5.8811 14.222 5.76393 14.1684 5.65787C12.8974 3.17795 10.3811 1.50006 7.49995 1.50006C6.29327 1.50152 5.10619 1.8053 4.04714 2.38366L1.06542 0.0790459C1.02654 0.0487898 0.982073 0.0264921 0.93457 0.0134268C0.887067 0.000361472 0.837454 -0.00321528 0.788568 0.00290091C0.739682 0.00901711 0.692481 0.0247064 0.649661 0.0490721C0.606841 0.0734379 0.569241 0.106003 0.539012 0.144905L0.0789337 0.737171C0.0179021 0.815683 -0.00944578 0.915221 0.00290487 1.01389C0.0152555 1.11257 0.0662933 1.2023 0.144793 1.26334L13.9345 11.9211C13.9734 11.9513 14.0178 11.9736 14.0653 11.9867C14.1128 11.9998 14.1624 12.0033 14.2113 11.9972C14.2602 11.9911 14.3074 11.9754 14.3502 11.951C14.3931 11.9267 14.4307 11.8941 14.4609 11.8552L14.9212 11.263C14.9822 11.1844 15.0095 11.0849 14.9971 10.9862C14.9847 10.8875 14.9336 10.7978 14.8551 10.7368ZM10.5492 7.40865L9.62807 6.69662C9.70564 6.47244 9.74679 6.23727 9.74995 6.00006C9.75452 5.65278 9.67758 5.30926 9.52532 4.99711C9.37305 4.68496 9.14969 4.41286 8.87319 4.20269C8.59669 3.99252 8.27475 3.85012 7.93323 3.78694C7.59171 3.72375 7.24014 3.74155 6.90675 3.83889C7.04808 4.0304 7.12453 4.26205 7.12495 4.50006C7.12145 4.57926 7.10935 4.65785 7.08886 4.73444L5.36362 3.40108C5.96291 2.90027 6.71895 2.62564 7.49995 2.62506C7.94323 2.62481 8.38221 2.71194 8.7918 2.88147C9.20138 3.05099 9.57354 3.29958 9.88698 3.61303C10.2004 3.92647 10.449 4.29863 10.6185 4.70821C10.7881 5.1178 10.8752 5.55678 10.8749 6.00006C10.8749 6.50701 10.751 6.97951 10.5492 7.40889V7.40865Z" fill="#707683"/>
                      </svg>
                    ) : (
                      <svg 
                        style={{
                          margin: "2px 3px 0 0",
                        }}
                        width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.3002 4.18633C11.1351 1.91307 8.82856 0.375 6.18749 0.375C3.54641 0.375 1.23921 1.91414 0.0747539 4.18654C0.0256066 4.28376 0 4.39117 0 4.50011C0 4.60904 0.0256066 4.71645 0.0747539 4.81367C1.23985 7.08693 3.54641 8.625 6.18749 8.625C8.82856 8.625 11.1358 7.08586 12.3002 4.81346C12.3494 4.71624 12.375 4.60883 12.375 4.49989C12.375 4.39096 12.3494 4.28355 12.3002 4.18633ZM6.18749 7.59375C5.5756 7.59375 4.97746 7.4123 4.46869 7.07236C3.95993 6.73241 3.56339 6.24924 3.32924 5.68393C3.09508 5.11862 3.03381 4.49657 3.15318 3.89644C3.27256 3.29631 3.56721 2.74506 3.99988 2.31239C4.43254 1.87972 4.9838 1.58507 5.58393 1.4657C6.18406 1.34632 6.80611 1.40759 7.37141 1.64175C7.93672 1.87591 8.4199 2.27244 8.75985 2.7812C9.09979 3.28997 9.28124 3.88811 9.28124 4.5C9.28144 4.90633 9.20155 5.30872 9.04614 5.68416C8.89074 6.0596 8.66286 6.40073 8.37554 6.68805C8.08822 6.97537 7.74709 7.20325 7.37165 7.35865C6.99621 7.51406 6.59382 7.59395 6.18749 7.59375ZM6.18749 2.4375C6.00339 2.44007 5.82049 2.46746 5.64372 2.51893C5.78943 2.71694 5.85935 2.96062 5.84081 3.20577C5.82226 3.45092 5.71648 3.6813 5.54263 3.85515C5.36879 4.02899 5.13841 4.13477 4.89326 4.15332C4.64811 4.17186 4.40443 4.10194 4.20641 3.95623C4.09366 4.37165 4.11401 4.81197 4.26461 5.21522C4.41521 5.61846 4.68848 5.96433 5.04594 6.20413C5.4034 6.44394 5.82707 6.56561 6.2573 6.55202C6.68754 6.53842 7.10268 6.39026 7.4443 6.12837C7.78591 5.86648 8.0368 5.50405 8.16165 5.09211C8.2865 4.68016 8.27902 4.23943 8.14027 3.83196C8.00151 3.42449 7.73847 3.07078 7.38817 2.82063C7.03787 2.57048 6.61794 2.43649 6.18749 2.4375Z" fill="#707683"/>
                        </svg>
                      )}
                    <p>{showCheckbox ? "Hide" : "Show"} Checkboxes</p>
                  </div>
                  <div
                    className="header-first-child-container-child"
                    onClick={(event) => {
                      // event.stopPropagation();
                      this.setState({
                        toggleAllAccordion: !toggleAllAccordion,
                      });
                    }}
                  >
                    <p>{!toggleAllAccordion ? "Expand All" : "Collapse All"}</p>
                  </div>
                </div>
              </div>
              <div className="border-bottom font-style bg-grey">
                <span>BASE FORMULARY</span>
              </div>
              <div className="border-bottom font-style bg-green">
                <span>reference FORMULARY</span>
              </div>
              <div className="border-bottom font-style">
                <span>BASE ONLY</span>
              </div>
              <div className="border-bottom font-style">
                <span>reference only</span>
              </div>
              <div className="border-bottom font-style no-border">
                <span>non-match base & reference</span>
              </div>
            </div>
            {/* First Accordion Grid */}
            {/* <div className="tier-header"> */}
            {formularyTypesGridData.map((accordionHeader) => (
              <div key={accordionHeader.id}>
                <PureAccordion
                  tableType={"COMPARE"}
                  title={accordionHeader.title}
                  titleBG={accordionHeader.titleBG}
                  showCheckbox={showCheckbox}
                  baseformulary={this.props.baseformulary}
                  referenceformulary={this.props.referenceformulary}
                  gridColumns={accordionHeader.gridColumns}
                  fileType={accordionHeader.file_type}
                  formularyLobId={this.props.formulary_lob_id}
                  sectionSelected={this.props.sectionSelected}
                  headerData={accordionHeader.headDrugsCount}
                  toggleAllAccordion={toggleAllAccordion}
                  content={() => {
                    return (
                      <InnerGrid
                        tableType={"COMPARE"}
                        clientId={this.props.clientId}
                        dataArr={accordionHeader.formularies}
                        formularyType={accordionHeader.title}
                        baseformulary={this.props.baseformulary}
                        referenceformulary={this.props.referenceformulary}
                        formularyLobId={this.props.formulary_lob_id}
                        onRejectClicked={this.onRejectClicked}
                      />
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <div className="__root_compare-grid-footer-container">
            <div className="border-none"></div>
            <div className="border-cells-t-l view-all-btn">
              <Button
                label={"View All"}
                onClick={() => {
                  this.toggleShowViewAll(
                    this.props.baseformulary["id_formulary"],
                    null,
                    TYPE_SINGLE,
                    false,
                    false
                  );
                }}
              />
            </div>
            <div className="border-cells-t-l view-all-btn">
              <Button
                label={"View All"}
                onClick={() => {
                  this.toggleShowViewAll(
                    this.props.referenceformulary["id_formulary"],
                    null,
                    TYPE_SINGLE,
                    false,
                    false
                  );
                }}
              />
            </div>
            <div className="border-cells-t-l view-all-btn">
              <Button
                label={"View All"}
                onClick={() => {
                  this.toggleShowViewAll(
                    this.props.baseformulary["id_formulary"],
                    this.props.referenceformulary["id_formulary"],
                    TYPE_IN_BASE_NOT_REF,
                    false,
                    true
                  );
                }}
              />
            </div>
            <div className="border-cells-t-l view-all-btn">
              <Button
                label={"View All"}
                onClick={() => {
                  this.toggleShowViewAll(
                    this.props.baseformulary["id_formulary"],
                    this.props.referenceformulary["id_formulary"],
                    TYPE_IN_REF_NOT_BASE,
                    false,
                    true
                  );
                }}
              />
            </div>
          </div>
        </div>
        {showViewAll ? (
          <DialogPopup
            showCloseIcon={this.state.isRowSelectionEnabled}
            positiveActionText="Reject"
            negativeActionText=""
            title="view all"
            handleClose={() => {
              this.toggleShowViewAll(null, null, TYPE_SINGLE, true);
            }}
            handleAction={(type) => {
              this.onDialogAction(type);
            }}
            showActions={this.state.isRowSelectionEnabled}
            height="80%"
            width="80%"
            open={showViewAll}
            className="dialog-popup clone-dialog-popup"
          >
            <FrxGridContainer
              enableSearch={false}
              enableColumnDrag
              onSearch={() => { }}
              fixedColumnKeys={[]}
              pagintionPosition="topRight"
              gridName=""
              isFetchingData={false}
              columns={gridColumns}
              scroll={scroll}
              enableResizingOfColumns={false}
              data={data}
              // pinning columns
              isPinningEnabled={true}
              // setting gear 1st column
              enableSettings={true}
              // checkbox 2nd column
              customSettingIcon={
                this.state.isRowSelectionEnabled ? null : "NONE"
              }
              isRowSelectionEnabled={this.state.isRowSelectionEnabled}
              // settingsWidth
              settingsWidth={15}
              isRowSelectorCheckbox
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
              getColumnSettings={this.onSettingsIconHandler}
              pageSize={this.listPayload.limit}
              selectedCurrentPage={
                this.listPayload.index / this.listPayload.limit + 1
              }
              totalRowsCount={this.state.dataCount}
              rowSelectionChange={this.rowSelectionChange}
              isFiltered={this.state.isFiltered}
              filteredInfo={this.state.filteredInfo}
              isDataLoaded={this.state.isRowSelectionEnabled}
            />
          </DialogPopup>
        ) : null}
      </>
    );
  }
}

const temporaryObj1 = {
  baseFormulary: 11,
  referenceFormulary: 25,
  baseOnly: null,
  referenceOnly: null,
  nonMatch: null,
};

const temporaryObj2 = {
  baseFormulary: 11,
  referenceFormulary: null,
  baseOnly: 10,
  referenceOnly: null,
  nonMatch: 50,
};

const temporaryObj3 = {
  baseFormulary: 11,
  referenceFormulary: null,
  baseOnly: 22,
  referenceOnly: 45,
  nonMatch: 20,
};

const temporaryObj4 = {
  baseFormulary: null,
  referenceFormulary: null,
  baseOnly: null,
  referenceOnly: null,
  nonMatch: null,
};

export const formularyTypesGridData = [
  {
    id: 1,
    title: "TIER",
    titleBG: "rgba(31, 187, 196, 0.4)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "Tier 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "Tier 2",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "Tier 3",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "Tier 4",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 2,
    title: "CATEGORY/VIEW",
    titleBG: "rgba(10, 123, 225, 0.4)",
    headDrugsCount: temporaryObj4,
    formularies: [
      {
        name: "TX category",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "TX Class",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
    ],
  },
  {
    id: 3,
    title: "PRIOR AUTHORIZATION (PA)",
    titleBG: "#FFF5F0",
    headDrugsCount: temporaryObj3,
    formularies: [
      {
        name: "pa type 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "pa type 2",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "pa type 3",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "pa group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 4,
    title: "STEP THERAPY (ST)",
    titleBG: "rgba(244, 175, 100, 0.4)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "st type 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "st type 2",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "st group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "step value 1",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "step value 2",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "step value 3",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 5,
    title: "QUANTITY LIMITS (QT)",
    titleBG: "rgba(213, 255, 215, 0.5)",
    headDrugsCount: temporaryObj3,
    formularies: [
      {
        name: "ql type 1",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "ql type 2",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 6,
    title: "ADDITIONAL DEMONSTRATION DURGS (ADD)",
    titleBG: "rgba(248, 144, 144, 0.4)",
    headDrugsCount: temporaryObj2,
    formularies: [
      {
        name: "mmp ql",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "mmp capped benefits",
        baseFormulary: 11,
        referenceFormulary: 9,
        baseOnly: 22,
        referenceOnly: 45,
        nonMatch: 20,
      },
      {
        name: "mmp pa",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "mmp pa group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "mmp st",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
      {
        name: "mmp st group descriptions",
        baseFormulary: 11,
        referenceFormulary: 25,
        baseOnly: 0,
        referenceOnly: 4,
        nonMatch: 8,
      },
    ],
  },
  {
    id: 7,
    title: "DRUG DETAILS",
    titleBG: "rgba(224, 237, 81, 0.4)",
    headDrugsCount: temporaryObj4,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 8,
    title: "OVER-THE-COUNTER",
    titleBG: "rgba(104, 73, 153, 0.2)",
    headDrugsCount: temporaryObj3,
    formularies: [
      {
        name: "otc general um program (not st)",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "otc formal st",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
      {
        name: "otc group descriptions",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 9,
    title: "EXCLUDED DRUGS",
    titleBG: "rgba(128, 196, 131, 0.4)",
    headDrugsCount: temporaryObj2,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 10,
    title: "VALUE-BASED INSURANCE DESIGN (VBID)",
    titleBG: "rgba(112, 118, 131, 0.3)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 11,
    title: "LIS COST-SHARING REDUCTION",
    titleBG: "rgba(146, 178, 235, 0.4)",
    headDrugsCount: temporaryObj1,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
  {
    id: 12,
    title: "USER DEFINED",
    titleBG: "#ECF5FA",
    headDrugsCount: temporaryObj4,
    formularies: [
      {
        name: "** null **",
        baseFormulary: 11,
        referenceFormulary: 4,
        baseOnly: 10,
        referenceOnly: 9,
        nonMatch: 50,
      },
    ],
  },
];

export default connect(mapStateToProps, mapDispatchToProps)(CompareTable);
