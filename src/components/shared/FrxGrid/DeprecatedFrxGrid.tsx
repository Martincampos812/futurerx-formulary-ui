/**
 * Component for reusble grid in frx project
 * @author Deepak_T
 * @version 1.0.0
 *
 * NOTE: Work in progress
 */

//ant design imports
import Modal from "@material-ui/core/Modal/Modal";
import { Table } from "antd";
import * as _ from "lodash";
import moment from "moment";
//react imports
import * as React from "react";
import { Component } from "react";
//library imports
import ReactDragListView from "react-drag-listview/lib/index.js";
import { Resizable } from "react-resizable";
//data models imports
import { Column, Grid, GridMenu } from "../../../models/grid.model";
// import { Column } from "./ColumnModel";
import FrxGridCell from "./components/FrxGridCell/FrxGridCell";
import FrxGridDateFilter from "./components/FrxGridDateFilter/FrxGridDateFilter";
import FrxGridFilterDropDown from "./components/FrxGridFilterDropDown/FrxGridFilterDropdown";
import FrxGridFilterIcon from "./components/FrxGridFilterIcon/FrxGridFilterIcon";
import FrxGridHeaderCell from "./components/FrxGridHeaderCell/FrxGridHeaderCell";
import FrxGridPagination from "./components/FrxGridPagination/FrxGridPagination";
import FrxGridSettingsCell from "./components/FrxGridSettingsCell/FrxGridSettingsCell";
import FrxGridSettingsDrawer from "./components/FrxGridSettingsDrawer/FrxGridSettingsDrawer";
import FrxGridSettingsHeaderCell from "./components/FrxGridSettingsHeaderCell/FrxGridSettingsHeaderCell";
//style imports
import "./FrxGrid.scss";
import FrxGridIntellisenseFilter from "./components/FrxGridIntellisenseFilter/FrxGridIntellisenseFilter";
import {
  tooltipMock1,
  tooltipMock2,
  tooltipMock3,
} from "../../../mocks/GridDrugLabelTooltip";
import { JsxElement } from "typescript";
import FrxGridRowSelectionCell from "./components/FrxGridRowSelectionCell/FrxGridRowSelectionCell";
import FrxGridCheckboxHeaderCell from "./components/FrxGridCheckboxHeaderCell/FrxGridCheckboxHeaderCell";
import FrxGridCheckboxGroupCell from "./components/FrxGridCheckboxGroup/FrxGridCheckboxGroup";
import {
  RecordVoiceOverRounded,
  TransferWithinAStationSharp,
} from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { filter } from "lodash";
// import FrxGridIntellisenseFilterDual from "./components/FrxGridIntellisenseFilter/FrxGridIntellisenseFilterDual";

/**
 * @component getResizableTitle
 * to get the column headers which cn be resized
 * @param props has width , onResize handler
 */
const ResizableTitle = (props) => {
  const { onResize, onResizeStop, onResizeStart, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      onResizeStop={onResizeStop}
      onResizeStart={onResizeStart}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const SETTINGS_WIDTH = 58;
const CLAIMS_GRID_SETTINGS_WIDTH = 28;
const DEFAULT_GRID_WIDTH = 1284;

interface FrxGridProps<T> extends Grid<T> {
  handleCheck?: any;
  customCheckbox?: boolean;
  customSettingIcon?: string;
  customRowSelectionChange?: any;
  checkBoxWidth?: number;
}
interface FrxGridState<T> {
  filteredInfo: null;
  filterTable: T[];
  sortedTable: T[];

  isMultiSort: boolean;
	sortedInfo: any;
	multiSortedInfo:any[]

  columns: Column<T>[];
  visibleColumns: Column<T>[];
  hiddenColumns: Column<T>[];
  pageSize: number;

  filterDropdownVisible: boolean;
  showGridSettingsModal: boolean;
  showSecondaryColumns: boolean;
  placement: string;
  expandedKeys: number[];
  currentPage: number;
  settingsAnchor: HTMLElement | null;
  settingsMenuItems: GridMenu[];
  goToPageValue: number;
  suggestions: { [key: string]: string[] };
  rowSelectionArr: any[];
  openDialogOnClickingCell: {
    isOpen: boolean;
    component?: (props) => JSX.Element;
    dataRow: any;
  };
}

class FrxGrid extends Component<FrxGridProps<any>, FrxGridState<any>> {
  state: FrxGridState<any> = {
    filteredInfo: null,
    filterTable: [],
    sortedTable: [],
    isMultiSort: false,
		sortedInfo: null,
		multiSortedInfo:[],
    suggestions: {},
    columns: [],
    visibleColumns: [],
    hiddenColumns: [],
    pageSize: 10,

    filterDropdownVisible: false,
    showGridSettingsModal: false,
    showSecondaryColumns: false,
    placement: "left",
    expandedKeys: [],
    currentPage: 1,

    goToPageValue: 1,
    settingsAnchor: null,
    settingsMenuItems: [],
    rowSelectionArr: [],
    openDialogOnClickingCell: {
      isOpen: false,
      component: undefined,
      dataRow: null,
    },
  };

  //instance variables
  columnsToMultisort: Array<{
    columnKey: string;
    order: string;
    type: string;
  }> = [];
  multiSortArray: any[] = [];
  gridRef: React.RefObject<HTMLDivElement>;
  pinnedCount: number;
  initialPinnedCount: number;
  pinnedIndexMap: Map<string, number>;
  isSettingsEnabled = false;

  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.isSettingsEnabled = this.props.enableSettings ? true : false;
    this.pinnedCount =
      this.props.fixedColumnKeys && this.isSettingsEnabled
        ? this.props.fixedColumnKeys.length + 1
        : this.props.fixedColumnKeys && !this.isSettingsEnabled
        ? this.props.fixedColumnKeys.length
        : 0; // Accounts for the fixed columns and settings key
    this.initialPinnedCount = this.pinnedCount;
    this.pinnedIndexMap = new Map<string, number>();
  }

  componentDidMount() {
    this.initializeColumns();
    if (this.props.customCheckbox) {
      this.initializeData();
    }
  }

  /**
   * @function initializeData
   * to initialize grid with columns
   * @author Santosh_JS
   */
  initializeData = () => {
    const { data } = this.props;

    data.map((d) => {
      d["checked"] = false;
      d["headChecked"] = false;
    });
  };

  /**
   * @function initializeColumns
   * to initialize grid with columns
   * @author Deepak_T
   */
  initializeColumns = () => {
    const { enableSettings, customCheckbox } = this.props;
    let { columns } = this.props;
    const settingsWidth = this.props.settingsWidth
      ? this.props.settingsWidth
      : this.props.gridName === "CLAIMS"
      ? CLAIMS_GRID_SETTINGS_WIDTH
      : SETTINGS_WIDTH;

    let modifiedColumns: Column<any>[] = [];
    let requiredColumns: Column<any>[] = [];
    if (enableSettings === true && customCheckbox === false) {
      // let modifiedSettingsEnabledColumns: Column<any>[] = [];

      const settingsEnabledColumns = columns.map((c: Column<any>) => {
        c.position += 1;
        return c;
      });

      modifiedColumns = [
        {
          position: 1,
          key: "settings",
          displayTitle: " ",
          hidden: false,
          fixed: "left",
          width: settingsWidth,

          render: (record) => <></>,
        },

        ...settingsEnabledColumns,
      ];

      requiredColumns = _.cloneDeep(modifiedColumns);
    } else if (enableSettings === false && customCheckbox === true) {
      // let modifiedCheckboxEnabledColumns: Column<any>[] = [];

      const checkboxEnabledColumns = columns.map((c: Column<any>) => {
        c.position += 1;
        return c;
      });

      modifiedColumns = [
        {
          position: 1,
          key: "checkbox",
          displayTitle: " ",
          hidden: false,
          fixed: "left",
          width: 40,

          render: (record) => <></>,
        },

        ...checkboxEnabledColumns,
      ];
      requiredColumns = _.cloneDeep(modifiedColumns);
    } else if (enableSettings && customCheckbox) {
      // let modifiedSettingsAndCheckboxEnabledColumns: Column<any>[] = [];

      const settingsAndcheckboxEnabledColumns = columns.map(
        (c: Column<any>) => {
          c.position += 2;
          return c;
        }
      );

      modifiedColumns = [
        {
          position: 1,
          key: "settings",
          displayTitle: " ",
          hidden: false,
          fixed: "left",
          width: settingsWidth,

          render: (record) => <></>,
        },
        {
          position: 2,
          key: "checkbox",
          displayTitle: " ",
          hidden: false,
          fixed: "left",
          width: 8,

          render: (record) => <></>,
        },

        ...settingsAndcheckboxEnabledColumns,
      ];
      requiredColumns = _.cloneDeep(modifiedColumns);
    } else {
      modifiedColumns = [...columns];
      requiredColumns = _.cloneDeep(modifiedColumns);
    }

    // if (enableSettings) requiredColumns = _.cloneDeep(modifiedColumns);
    // if (customCheckbox)
    //   requiredColumns = _.cloneDeep(modifiedCheckboxEnabledColumns);
    // else requiredColumns = _.cloneDeep(columns);

    const visibleColumns = requiredColumns.filter((c) => !c.hidden);
    const hiddenColumns = requiredColumns.filter((c) => c.hidden);

    const gridWidth =
      this.gridRef && this.gridRef.current
        ? this.gridRef.current.clientWidth
        : DEFAULT_GRID_WIDTH;
    console.log("width of grid ", gridWidth);

    const suggestionsForEachColumn = requiredColumns.reduce(
      (acc, c: Column<any>) => {
        return Object.assign(acc, { [c.key]: [] });
      },
      {}
    );

    this.setState({
      columns: requiredColumns,
      suggestions: suggestionsForEachColumn,
      visibleColumns,
      hiddenColumns,
    });
  };

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.columns && this.props.columns) {
      if (previousProps.columns.length !== this.props.columns.length) {
        this.initializeColumns();
        if (this.props.customCheckbox) {
          this.initializeData();
        }
      }
    }
  }

  /**
   * swap columns if drag is enabled
   */
  dragProps = {
    onDragEnd: (fromIndex, toIndex) => {
      if (!this.props.enableColumnDrag) return;

      if (this.props.expandable && this.props.expandable.isExpandable) {
        if (fromIndex <= 1 || toIndex <= 1) return;
        fromIndex--;
        toIndex--;
      }

      if (fromIndex <= 0 || toIndex <= 0) return;
      const columns = [...this.state.columns];
      if (columns[fromIndex]["fixed"] || columns[toIndex]["fixed"]) return;
      if (
        this.props.fixedColumnKeys.includes(columns[fromIndex]["key"]) ||
        this.props.fixedColumnKeys.includes(columns[toIndex]["key"])
      )
        return;

      let swappedCols = this.swapArrayLocs(columns, fromIndex, toIndex);

      swappedCols = this.sortColumnsByPosition(swappedCols);

      this.setState({
        columns: [...swappedCols],
      });
    },
    nodeSelector: "th",
    handleSelector: ".frx-grid-header-cell--dragHandler",
    ignoreSelector: "react-resizable-handle",
  };

  /**
   * @function swapArrayLocs
   * to swap columns
   *
   * @param arr array on which swap is done eg: columns
   * @param fromIndex index from which item is moved
   * @param toIndex index to which item is moved
   *
   * @author Deepak_T
   */
  swapArrayLocs = (arr, fromIndex, toIndex) => {
    console.log("swpping ", fromIndex, toIndex);
    if (fromIndex < 0 || toIndex < 0) return;

    let fromPosition = arr[fromIndex]["position"];
    let toPosition = arr[toIndex]["position"];
    console.log("positions ", fromPosition, toPosition);
    arr[fromIndex]["position"] = toPosition;
    arr[toIndex]["position"] = fromPosition;
    let temp = arr[fromIndex];

    arr[fromIndex] = arr[toIndex];

    arr[toIndex] = temp;

    return arr;
  };

  /**
   * @function computeDynamicWidthOfColumn
   * to compute the total pixel width set for columns by container if any
   * @author Deepak_T
   */
  computeDynamicWidthOfColumn = () => {
    const columns = [...this.state.columns];

    let totalWidth = columns.reduce((prev, currentColumn: Column<any>) => {
      let pixelWidth =
        currentColumn && currentColumn.key !== "settings"
          ? currentColumn.pixelWidth
          : 0;

      return prev + pixelWidth!;
    }, 0);

    return totalWidth;
  };

  /**
   * @function handleAllCheckboxSelection
   * to update all the rows checked and header checked
   * @author Santosh_JS
   */
  handleAllCheckboxSelection = (e) => {
    let updatedRowRecords: any[] = [];
    if (e.target.checked) {
      updatedRowRecords = this.props.data.map((d) => {
        d.checked = e.target.checked;
        d.headChecked = e.target.checked;
        return d;
      });
      this.setState(
        {
          rowSelectionArr: updatedRowRecords,
        },
        () => {
          this.props.customRowSelectionChange(this.state.rowSelectionArr);
        }
      );
    } else {
      this.props.data.forEach((d) => {
        d.checked = e.target.checked;
        d.headChecked = e.target.checked;
        return d;
      });
      this.setState(
        {
          // rowSelectionArr: updatedRowRecords,
          rowSelectionArr: [],
        },
        () => {
          this.props.customRowSelectionChange(this.state.rowSelectionArr);
        }
      );
    }
  };

  /**
   * @function handleCheckboxRowSelection
   * to update the checked & unchecked record
   * @author Santosh_JS
   */
  handleCheckboxRowSelection = (event, record) => {
    let newArray = [...this.state.rowSelectionArr];
    const filteredArr = newArray;
    if (event.target.checked) {
      record["checked"] = event.target.checked;
      newArray.push(record);
    } else {
      record["checked"] = event.target.checked;
      // this.handleAllCheckboxSelection(event);
      if (record.headChecked) {
        this.props.data.forEach((d) => (d.headChecked = false));
      }
      newArray = filteredArr.filter((r) => r.id !== record.id);
      newArray.forEach((r) => {
        record.headChecked = false;
      });
    }
    this.setState({ rowSelectionArr: newArray }, () => {
      this.props.customRowSelectionChange(this.state.rowSelectionArr);
    });
  };

  /**
   * @function generateColumns
   * to generate column title and render jsx elements
   * @author Deepak_T
   */
  generateColumns: () => Column<any>[] = () => {
    const numberOfVisibleColumns = this.state.columns.filter(
      (c: Column<any>) => !c.hidden
    ).length;
    const gridWidth =
      this.gridRef && this.gridRef.current
        ? this.gridRef.current.clientWidth
        : DEFAULT_GRID_WIDTH;

    const totalColumnWidthSetByContainer = this.computeDynamicWidthOfColumn();
    // const settingsWidth =
    //   this.props.gridName === "CLAIMS"
    //     ? CLAIMS_GRID_SETTINGS_WIDTH
    //     : SETTINGS_WIDTH;
    const settingsWidth = this.props.settingsWidth
      ? this.props.settingsWidth
      : this.props.gridName === "CLAIMS"
      ? CLAIMS_GRID_SETTINGS_WIDTH
      : SETTINGS_WIDTH;
    let REST_OF_COLUMNS_WIDTH = this.props.enableSettings
      ? gridWidth - settingsWidth
      : gridWidth;

    //TODO: to accomodate the expander icon column.
    // if(this.props && this.props.expandable && this.props.expandable.isExpandable){
    // 	REST_OF_COLUMNS_WIDTH -= SETTINGS_WIDTH;
    // }

    const columnWidth = Math.floor(
      Math.round(REST_OF_COLUMNS_WIDTH / numberOfVisibleColumns)
    );

    const columns = this.state.columns
      .filter((c: Column<any>) => !c.hidden)
      .map((c: Column<any>, index: number) => {
        if (c.key === "settings") {
          const settingsWidth = this.props.settingsWidth
            ? this.props.settingsWidth
            : this.props.gridName === "CLAIMS"
            ? CLAIMS_GRID_SETTINGS_WIDTH
            : SETTINGS_WIDTH;
          c["width"] = settingsWidth;
          c["render"] = (record: any) => {
            const { showSettingsMenu } = this.props;
            if (showSettingsMenu) {
              const isExpanded = this.state.expandedKeys.includes(record.key);
              const settingsComponentEnabled = this.props.onSettingsClick
                ? true
                : false;
              const setingsComponent = settingsComponentEnabled
                ? this.props.onSettingsClick
                : undefined;

              return (
                <>
                  <FrxGridSettingsCell
                    expanded={isExpanded}
                    settingsMenuItems={this.state.settingsMenuItems}
                    onSettingsTriDotClick={this.onSettingsTriDotClick}
                    handleMenuClick={this.settingsTriDotMenuClick}
                    handleCheck={this.props.handleCheck}
                    rowSelectionChange={this.rowSelectionChange}
                    isRowSelectorCheckbox={this.props.isRowSelectorCheckbox}
                    handleSettingsComponentMenuClose={
                      settingsComponentEnabled
                        ? this.handleSettingsComponentMenuClose
                        : undefined
                    }
                    setingsComponent={
                      settingsComponentEnabled ? setingsComponent : undefined
                    }
                    customSettingIcon={this.props.customSettingIcon}
                    isRowSelectionEnabled={this.props.isRowSelectionEnabled}
                    settingsAnchor={
                      settingsComponentEnabled
                        ? this.state.settingsAnchor
                        : null
                    }
                    onSettingsCellClick={this.onSettingsCellClick}
                    dataRow={record}
                  />
                </>
              );
            } else {
              return <></>;
            }
          };
          c["title"] = () => {
            return (
              <FrxGridSettingsHeaderCell
                openSettingsModal={this.openSettingsModal}
              />
            );
          };
        } else if (c.key === "checkbox") {
          c["width"] = this.props.checkBoxWidth ? this.props.checkBoxWidth : 60;
          c["render"] = (record: any) => {
            return (
              <>
                <FrxGridCheckboxGroupCell
                  onSelectMulitple={this.handleCheckboxRowSelection}
                  isHeaderCell={false}
                  currentRowRecord={record}
                />
              </>
            );
          };
          c["title"] = () => {
            return (
              <FrxGridCheckboxGroupCell
                isHeaderCell={true}
                onSelectAll={this.handleAllCheckboxSelection}
                allRecordsLength={this.props.data.length}
                selectedRowArrLength={this.state.rowSelectionArr.length}
              />
            );
          };
        } else {
          const key = c.key;
          const width =
            c.pixelWidth && totalColumnWidthSetByContainer > 0
              ? REST_OF_COLUMNS_WIDTH *
                (c.pixelWidth / totalColumnWidthSetByContainer)
              : columnWidth;
          c["width"] = width;
          if (c.isFilterable) {
            c["filterIcon"] = (filtered) => {
              return (
                <>
                  <FrxGridFilterIcon {...filtered} />
                </>
              );
            };

            c["filterDropdown"] = (props) => {
              if (c.dataType !== "date" && !c.enableIntellisense) {
                return <FrxGridFilterDropDown {...props} />;
              } else if (c.dataType === "date" && !c.enableIntellisense) {
                return <FrxGridDateFilter {...props} />;
              } else if (c.dataType === "string" && c.enableIntellisense) {
                return (
                  <FrxGridIntellisenseFilter
                    {...props}
                    columnKey={c.key}
                    suggestions={this.state.suggestions}
                    onGetSuggestions={
                      this.onGetSuggestionsForColumnIntellisenseFilter
                    }
                    // isMultiFilterOn={c.isMultiFilterOn}
                  />
                );
              }
            };
          }

          c["render"] = (record: any) => {
            if (c.cellWrapper) {
              const customToolTip = c.toolTip
                ? this.withDataToolTip(c.toolTip, record)
                : undefined;
              const customContent = c.customContent
                ? this.withDataContent(c.customContent, record)
                : undefined;
              return (
                <c.cellWrapper>
                  <FrxGridCell
                    customToolTip={customToolTip}
                    customContent={customContent}
                    onCellClick={this.onCellClick}
                    dataType={c.dataType}
                    componentToOpenOnClickingCell={
                      c.componentToOpenOnClickingCell
                    }
                    showToolTip={c.showToolTip}
                    dataKey={key}
                    formatter={c.formatter}
                    dataRow={record}
                    className={c.className}
                  />
                </c.cellWrapper>
              );
            } else {
              const customToolTip = c.toolTip
                ? this.withDataToolTip(c.toolTip, record)
                : undefined;
              const customContent = c.customContent
                ? this.withDataContent(c.customContent, record)
                : undefined;
              return (
                <FrxGridCell
                  customToolTip={customToolTip}
                  customContent={customContent}
                  onCellClick={this.onCellClick}
                  dataType={c.dataType}
                  componentToOpenOnClickingCell={
                    c.componentToOpenOnClickingCell
                  }
                  showToolTip={c.showToolTip}
                  dataKey={key}
                  formatter={c.formatter}
                  dataRow={record}
                  className={c.className}
                />
              );
            }
          };

          c["title"] = () => {
            return (
              <>
                 <FrxGridHeaderCell
                  isPinningEnabled={this.props.isPinningEnabled ? true : false}
                  textCase={c.textCase}
                  column={c}
                  multiSortedArray={
                    this.multiSortArray ? this.multiSortArray : []
                  }
                  multiSortedInfo={this.state.multiSortedInfo}
                  singleSortedInfo={this.state.sortedInfo}
                  multiSortOrder={this.getMultisortOrderByColKey(c.key)}
                  unpinColumn={this.unpinColumn}
                  pinColumnToLeft={this.pinColumnToLeft}
                />
              </>
            );
          };
        }
        return c;
      });

    // console.log("set columns ", columns);

    return columns;
  };

  /**
   * @function onCellClick
   * call back when clicking on cell
   * @param dataRow the row of data on which clicked cell is present
   * @param the row key identifier
   * @author Deepak_T
   */
  onCellClick = (
    dataRow: any,
    dataKey: string,
    componentToOpenOnClickingCell?: (props) => JSX.Element
  ) => {
    if (this.props.onColumnCellClick)
      this.props.onColumnCellClick(dataRow, dataKey);
    if (!componentToOpenOnClickingCell) return;
    this.setState((prevState: FrxGridState<any>) => {
      return {
        ...prevState,
        openDialogOnClickingCell: {
          isOpen: !prevState.openDialogOnClickingCell.isOpen,
          component: componentToOpenOnClickingCell,
          dataRow: dataRow,
        },
      };
    });
  };

  /**
   * @function withDataToolTip
   * wrapper component for passing data to dynamic tooltip components
   * @param data the row data
   * @author Deepak_T
   */
  withDataToolTip = (WrappedComponent: any, data: any) => {
    if (!WrappedComponent) return;

    return (
      <WrappedComponent
        tooltipMock1={tooltipMock1}
        tooltipMock2={tooltipMock2}
        tooltipMock3={tooltipMock3}
        data={data}
      />
    );
  };

  /**
   * @function withDataContent
   * wrapper component for passing data to dynamic cell content
   * @param data the row data
   * @author Deepak_T
   */
  withDataContent = (WrappedComponent: any, data: any) => {
    if (!WrappedComponent) return;

    return <WrappedComponent data={data} />;
  };

  /**
   * @function withData
   * wrapper component for passing data to dynamic components
   * @param data the row data
   * @author Deepak_T
   */
  withData = (WrappedComponent: any, data: any) => {
    // console.log(" wrpped modal", WrappedComponent);
    return (props) => {
      return (
        <WrappedComponent
          data={data}
          onClose={this.handleDynamicPopupClose}
          isOpen={!this.state.openDialogOnClickingCell.isOpen}
        />
      );
    };
  };

  /**
   * @function handleDynamicPopupClose
   * to close dynamic popup opened
   * @author Deepak_T
   */
  handleDynamicPopupClose = () => {
    this.setState((prevState: FrxGridState<any>) => {
      return {
        ...prevState,
        openDialogOnClickingCell: {
          ...prevState.openDialogOnClickingCell,
          isOpen: false,
        },
      };
    });
  };

  /**
   * @function sortColumnsByPosition
   * to sort questions by order
   * @author Deepak_T
   */
  sortColumnsByPosition = (columns: any[]) => {
    columns.sort((c1: any, c2: any) => {
      if (c1.position > c2.position) return 1;
      else if (c1.position < c2.position) return -1;
      else return 0;
    });

    return columns;
  };
  /**
   * @function getGridData
   * to get the data required as per the pagination and filters/sorters applied
   * @author Deepak_T
   */
  getGridData = () => {
    const data =
      this.state.sortedInfo && !this.state.filteredInfo
        ? [...this.state.sortedTable]
        : this.state.filteredInfo && !this.state.sortedInfo
        ? this.state.filterTable
        : this.state.filteredInfo && this.state.sortedInfo
        ? this.state.sortedTable
        : [...this.props.data];

    const from = (this.state.currentPage - 1) * +this.state.pageSize + 1;
    const to =
      (this.state.currentPage - 1) * +this.state.pageSize +
      +this.state.pageSize;

    let toData = to < data.length ? to : data.length;

    return data.slice(from - 1, toData);
  };

  /**
   * @function onTableStateChange
   * the on change event handler of ant table
   * @param pagination the pagination inof
   * @param filters the filter info
   * @param sorter the sorter info
   * @param extra the info to figure out action
   * @author Deepak_T
   */
  onTableStateChange = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    console.log("params", pagination, filters, sorter, extra);

    let isFilterApplied = false;
    for (let key in filters) {
      if (filters[key]) isFilterApplied = true;
    }

    let isSorterApplied = false;
    if (sorter["order"] && sorter["columnKey"]) isSorterApplied = true;

    if (filters || sorter) {
      this.setState(
        {
          filteredInfo: isFilterApplied ? filters : null,
          sortedInfo: isSorterApplied ? sorter : null,
        },
        () => {
          this.updateFilters();
        }
      );
    }

    if (filters && extra.action === "filter") {
      this.getDataOnFilter(filters);
    }

    //ADD NOT MULTISORT CHECK
    if (sorter && extra.action === "sort" && !this.state.isMultiSort) {
      this.sortData(sorter);
    }

    if (extra.action === "paginate") {
      this.setState({
        currentPage: pagination.current,
        goToPageValue: pagination.current,
        pageSize: pagination.pageSize,
      });
    }

    /**
     * MULTI SORT BEGINS HERE
     */

    //IF BLOCK FOR MULTI SORT
		if (this.state.isMultiSort) {
      if (extra.action === "sort") {
        const isElemPresent = function(arr: Array<any>, elem) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === elem) {
              return i;
            }
          }
          return -1;
        };

        const mergeArrays = (
          multiArray: Array<any>,
          sorterArray: Array<any>,
          columnsAndOrder: Array<{
            columnKey: string;
            order: string;
            type: string;
          }>
        ) => {
          for (let sIdx = 0; sIdx < sorterArray.length; sIdx++) {
            const cKey = sorterArray[sIdx].columnKey;
            const order = sorterArray[sIdx].order;

            const elemIdx = isElemPresent(
              multiArray,
              sorterArray[sIdx].columnKey
            );

            if (elemIdx === -1) {
              multiArray.push(cKey);
              columnsAndOrder.push({
                columnKey: cKey,
                order: order,
                type: this.getColumnDataType(cKey)
              });
            } else {
              // Update order of the element
              columnsAndOrder[elemIdx].order = order;
            }
          }
          return multiArray;
        };
        // Is sorter an array?
        const isArray: boolean = Array.isArray(sorter);

        if (isArray) {
          // this.multiSortArray = []; // all sorted columns will be in the sorter array.
          this.multiSortArray = mergeArrays(
            this.multiSortArray,
            sorter,
            this.columnsToMultisort
          );

          //==== EXTRA CODE =====

          for (let sIdx = 0; sIdx < sorter.length; sIdx++) {
            sorter[sIdx]["multiple"] = this.getMultisortOrderByColKey(
              sorter[sIdx].columnKey
            );
          }

          console.log("assigning multi sorter ", sorter);
          const existingMultiSortedInfo = _.cloneDeep(
            this.state.multiSortedInfo
          );
          const index = existingMultiSortedInfo.findIndex(item => {
            return item.columnKey === sorter.columnKey;
          });
          if (index === -1) {
            this.setState({
              multiSortedInfo: [...this.state.multiSortedInfo, sorter]
            });
          } else {
            const order = existingMultiSortedInfo[index].order;
            if (order === "ascend") {
              existingMultiSortedInfo[index].order = "descend";
            } else if (order === "descend") {
              existingMultiSortedInfo[index].order = "ascend";
            }
            if (!order) {
              existingMultiSortedInfo[index].order = sorter.order;
            }

            this.setState({ multiSortedInfo: existingMultiSortedInfo });
          }

          //==== END OF  EXTRA CODE =====

          for (let i = 0; i < this.multiSortArray.length; i++) {
            // const cKey = this.multiSortArray[i];

            // this.handleMultisortColumnClick(cKey);
            this.multisortColumns();
            // this.updateMultisortOrder();
          }
        } else {
          //====  EXTRA CODE =====

          const existingMultiSortedInfo = _.cloneDeep(
            this.state.multiSortedInfo
          );
          const index = existingMultiSortedInfo.findIndex(item => {
            return item.columnKey === sorter.columnKey;
          });

          if (index === -1) {
            this.setState({
              multiSortedInfo: [...this.state.multiSortedInfo, sorter]
            });
          } else {
            const order = existingMultiSortedInfo[index].order;
            if (order === "ascend") {
              existingMultiSortedInfo[index].order = "descend";
            } else if (order === "descend") {
              existingMultiSortedInfo[index].order = "ascend";
            }
            if (!order) {
              existingMultiSortedInfo[index].order = sorter.order;
            }

            this.setState({ multiSortedInfo: existingMultiSortedInfo });
          }

          //==== END OF  EXTRA CODE =====
          const cKey = sorter.columnKey;
          const order = sorter.order;

          const elemIdx = isElemPresent(this.multiSortArray, cKey);
          if (elemIdx === -1) {
            this.multiSortArray.push(cKey);
            this.columnsToMultisort.push({
              columnKey: cKey,
              order: order,
              type: this.getColumnDataType(cKey)
            });
            this.multisortColumns();
            // this.updateMultisortOrder();
          } else {
            // Update order of the element
            this.columnsToMultisort[elemIdx].order = order;
            this.multisortColumns();
            // this.updateMultisortOrder();
          }
        }
      }
    }
  };

  /**
   * @function openSettingsModal
   * click handler of settings icon click
   * @author Deepak_T
   *
   */
  openSettingsModal = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    this.setState({ showGridSettingsModal: !this.state.showGridSettingsModal });
  };

  /**
   * @function onSettingsCellClick
   * click handler for ellipses in settings column
   * @param expanded if the icon is in expanded state or not
   * @param data the data row
   * @author Deepak_T
   *
   */
  onSettingsCellClick = (
    expanded: boolean,
    data: any,
    eventTarget: EventTarget & HTMLButtonElement
  ) => {
    const settingsAnchor = eventTarget;
    const settingsMenuItems = data.items ? data.items : [];
    const keys = this.state.expandedKeys;

    const expandedKeys = expanded
      ? keys.concat(data.key)
      : keys.filter((k) => k !== data.key);
    this.setState({ expandedKeys, settingsAnchor, settingsMenuItems });
  };

  /**
   * @function onSettingsTriDotClick
   * event handler for clicking on the tri dots in settings column
   * @param data corresponding data row
   * @author Deepak_T
   */
  onSettingsTriDotClick = (data: any) => {
    if (this.props.settingsTriDotClick) this.props.settingsTriDotClick(data);
  };

  /**
   * @function settingsTriDotMenuClick
   * click handler for menu item in grid menu
   * @param menuItem item in the menu which was clicked
   * @author Deepak_T
   */
  settingsTriDotMenuClick = (menuItem: GridMenu) => {
    console.log(menuItem);
    if (this.props.settingsTriDotMenuClick)
      this.props.settingsTriDotMenuClick(menuItem);
  };

  /**
   * @function rowSelectionChange
   * change handler for row selection checkbox
   * @param dataRow data row
   * @author Deepak_T
   */
  rowSelectionChange = (dataRow: any) => {
    const isCheckBox = this.props.isRowSelectorCheckbox;
    console.log(dataRow);
    if (this.props.rowSelectionChange)
      this.props.rowSelectionChange(dataRow, isCheckBox);
  };

  /**
   * @function handleSettingsComponentMenuClose
   * to close the menu component opened from settings ellipses
   * @author Deepak_T
   */
  handleSettingsComponentMenuClose = () => {
    this.setState({ settingsAnchor: null });
  };

  /*
  ==================================================================================================
   BEGINNING OF COLUMN PINNING RELATED METHODS
  ==================================================================================================
  */

  /*
  ==================================================================================================
   BEGINNING OF COLUMN PINNING RELATED METHODS
  ==================================================================================================
  */

  /**
   * @function unpinColumn
   * to unpin a column
   *
   * NOTE: no implementation as not in screens shared
   */
  unpinColumn = (column: Column<any>) => {
    if (column.key === "name") {
      console.log("Cannot unpin name");
      return;
    }
    // if (this.state.showSecondaryColumns) return;
    let isColumnUnpinned = false;
    let idxOfCol = -1;
    const columns = this.state.columns.map((c: any, idx: number) => {
      if (c.displayTitle === column.displayTitle && c.fixed === "left") {
        if (column.key !== "name" && column.key !== "settings") {
          c["fixed"] = undefined;
          this.pinnedCount--;
          isColumnUnpinned = true;
          idxOfCol = idx;
        }
      }
      return c;
    });
    // Remove entry from map.
    if (isColumnUnpinned) {
      let oldIndex = this.pinnedIndexMap.get(column.displayTitle);
      this.pinnedIndexMap.delete(column.displayTitle);
      if (oldIndex !== undefined) {
        console.log(
          "old index of " + column.displayTitle + ": " + oldIndex.toString()
        );
        console.log("current index: " + idxOfCol);
        // move back to old position.
        if (oldIndex <= columns.length - 1) {
          if (this.pinnedCount > oldIndex) {
            oldIndex = this.pinnedCount!;
          }
          columns.splice(oldIndex, 0, columns.splice(idxOfCol, 1)[0]);
        }
      }
    }
    this.setState({ columns: columns }, () => {
      this.updatePinIcon();
    });
  };

  /**
   * @function pinColumnToLeft
   * to pin a column
   *
   * NOTE: no implementation as not in screens shared
   */
  pinColumnToLeft = (column: Column<any>) => {
    console.log("column: " + column.displayTitle);
    // if (this.state.showSecondaryColumns) return;
    let isColumnToMove = false;
    let idxOfCol = -1;
    // let indexToInsertPinned = 1000; // some high num
    const columns = this.state.columns.map((c: any, idx: number) => {
      if (c.displayTitle === column.displayTitle && !c.fixed) {
        isColumnToMove = true;
        idxOfCol = idx;
        c["fixed"] = "left";
        this.pinnedCount++;
      }

      return c;
    });
    console.log("pincount: " + this.pinnedCount);
    console.log("actual index: " + idxOfCol);
    if (this.pinnedCount <= 1) {
      console.log("Something wrong: Pinned count is: " + this.pinnedCount);
      this.pinnedCount = 1; // Hack. But protects the Name column from moving.
    }

    // Move column at index to this.pinnedCount-1
    if (isColumnToMove) {
      columns.splice(this.pinnedCount - 1, 0, columns.splice(idxOfCol, 1)[0]);
      console.log(
        "moved column to index: " + (this.pinnedCount - 1).toString()
      );
      // Insert index into map
      this.pinnedIndexMap.set(column.displayTitle, idxOfCol);
    }
    this.setState({ columns: columns }, () => {
      this.updatePinIcon();
    });
  };

  updatePinIcon = () => {
    const columns = this.state.columns.map((c, index) => {
      if (c.key === "settings") {
        c["render"] = (record) => this.renderActionMenu(record);
      }
      c["title"] = () => {
        return (
          <>
            {c.key === "settings" ? (
              <span className="action-settingicon">
                <svg
                  onClick={(e) => this.openSettingsModal(e)}
                  width="16"
                  height="16"
                  viewBox="0 0 24 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2057 7.15888L18.8982 7.69517C18.7857 7.89394 18.5456 7.97644 18.3319 7.89769C17.8893 7.73267 17.4843 7.49641 17.128 7.20013C16.9555 7.05762 16.9105 6.80635 17.023 6.61133L17.3305 6.07504C17.0718 5.77501 16.8692 5.42623 16.7342 5.04745H16.1154C15.8904 5.04745 15.6954 4.88619 15.6579 4.66117C15.5829 4.21113 15.5791 3.73859 15.6579 3.26981C15.6954 3.04479 15.8904 2.87977 16.1154 2.87977H16.7342C16.8692 2.50099 17.0718 2.15221 17.3305 1.85219L17.023 1.31589C16.9105 1.12088 16.9518 0.869607 17.128 0.727096C17.4843 0.430821 17.8931 0.194552 18.3319 0.0295381C18.5456 -0.0492184 18.7857 0.0332884 18.8982 0.232055L19.2057 0.768349C19.5995 0.697093 20.0008 0.697093 20.3945 0.768349L20.7021 0.232055C20.8146 0.0332884 21.0546 -0.0492184 21.2684 0.0295381C21.7109 0.194552 22.1159 0.430821 22.4722 0.727096C22.6447 0.869607 22.6897 1.12088 22.5772 1.31589L22.2697 1.85219C22.5285 2.15221 22.731 2.50099 22.866 2.87977H23.4848C23.7098 2.87977 23.9048 3.04104 23.9423 3.26606C24.0173 3.71609 24.0211 4.18863 23.9423 4.65742C23.9048 4.88244 23.7098 5.04745 23.4848 5.04745H22.866C22.731 5.42623 22.5285 5.77501 22.2697 6.07504L22.5772 6.61133C22.6897 6.80635 22.6485 7.05762 22.4722 7.20013C22.1159 7.49641 21.7071 7.73267 21.2684 7.89769C21.0546 7.97644 20.8146 7.89394 20.7021 7.69517L20.3945 7.15888C20.0045 7.23013 19.5995 7.23013 19.2057 7.15888ZM18.8119 4.95369C20.2558 6.06379 21.9022 4.4174 20.7921 2.97353C19.3482 1.85969 17.7018 3.50983 18.8119 4.95369ZM14.4878 10.7254L15.7517 11.3555C16.1304 11.573 16.2954 12.0343 16.1454 12.4468C15.8117 13.3544 15.1554 14.187 14.5478 14.9145C14.2703 15.2483 13.7902 15.3308 13.4115 15.1133L12.3201 14.4832C11.7201 14.997 11.0225 15.4058 10.2612 15.6721V16.9322C10.2612 17.3672 9.94992 17.7423 9.52239 17.8173C8.59981 17.9748 7.63223 17.9823 6.6759 17.8173C6.24462 17.7423 5.92584 17.371 5.92584 16.9322V15.6721C5.16453 15.4021 4.46697 14.997 3.86692 14.4832L2.77558 15.1095C2.40055 15.3271 1.91676 15.2445 1.63924 14.9108C1.03169 14.1832 0.390384 13.3506 0.0566068 12.4468C-0.0934056 12.038 0.071608 11.5767 0.450389 11.3555L1.69924 10.7254C1.55298 9.94161 1.55298 9.13529 1.69924 8.34772L0.450389 7.71392C0.071608 7.49641 -0.0971559 7.03512 0.0566068 6.62633C0.390384 5.71876 1.03169 4.88619 1.63924 4.15863C1.91676 3.82485 2.3968 3.74234 2.77558 3.95986L3.86692 4.58991C4.46697 4.07612 5.16453 3.66734 5.92584 3.40107V2.13721C5.92584 1.70593 6.23337 1.3309 6.6609 1.25589C7.58348 1.09838 8.55481 1.09088 9.51114 1.25214C9.94242 1.32715 10.2612 1.69843 10.2612 2.13721V3.39732C11.0225 3.66734 11.7201 4.07237 12.3201 4.58616L13.4115 3.95611C13.7865 3.73859 14.2703 3.8211 14.5478 4.15488C15.1554 4.88244 15.7929 5.71501 16.1267 6.62258C16.2767 7.03137 16.1304 7.49265 15.7517 7.71392L14.4878 8.34398C14.6341 9.13154 14.6341 9.93786 14.4878 10.7254ZM10.0774 11.5167C12.2976 8.629 9.00109 5.33248 6.11336 7.55266C3.89317 10.4404 7.1897 13.7369 10.0774 11.5167ZM19.2057 18.3686L18.8982 18.9048C18.7857 19.1036 18.5456 19.1861 18.3319 19.1074C17.8893 18.9424 17.4843 18.7061 17.128 18.4098C16.9555 18.2673 16.9105 18.016 17.023 17.821L17.3305 17.2847C17.0718 16.9847 16.8692 16.6359 16.7342 16.2571H16.1154C15.8904 16.2571 15.6954 16.0959 15.6579 15.8708C15.5829 15.4208 15.5791 14.9483 15.6579 14.4795C15.6954 14.2545 15.8904 14.0894 16.1154 14.0894H16.7342C16.8692 13.7107 17.0718 13.3619 17.3305 13.0619L17.023 12.5256C16.9105 12.3306 16.9518 12.0793 17.128 11.9368C17.4843 11.6405 17.8931 11.4042 18.3319 11.2392C18.5456 11.1605 18.7857 11.243 18.8982 11.4417L19.2057 11.978C19.5995 11.9068 20.0008 11.9068 20.3945 11.978L20.7021 11.4417C20.8146 11.243 21.0546 11.1605 21.2684 11.2392C21.7109 11.4042 22.1159 11.6405 22.4722 11.9368C22.6447 12.0793 22.6897 12.3306 22.5772 12.5256L22.2697 13.0619C22.5285 13.3619 22.731 13.7107 22.866 14.0894H23.4848C23.7098 14.0894 23.9048 14.2507 23.9423 14.4757C24.0173 14.9258 24.0211 15.3983 23.9423 15.8671C23.9048 16.0921 23.7098 16.2571 23.4848 16.2571H22.866C22.731 16.6359 22.5285 16.9847 22.2697 17.2847L22.5772 17.821C22.6897 18.016 22.6485 18.2673 22.4722 18.4098C22.1159 18.7061 21.7071 18.9424 21.2684 19.1074C21.0546 19.1861 20.8146 19.1036 20.7021 18.9048L20.3945 18.3686C20.0045 18.4398 19.5995 18.4398 19.2057 18.3686ZM18.8119 16.1596C20.2558 17.2697 21.9022 15.6233 20.7921 14.1795C19.3482 13.0694 17.7018 14.7158 18.8119 16.1596Z"
                    fill="#fff"
                  />
                </svg>
              </span>
            ) : (
              <>
                <span
                  style={{
                    marginLeft:
                      c.key === "detail"
                        ? "0px"
                        : // : c.key === "name"
                          // ? "-30px"
                          "-10px",
                    marginRight: "0px",
                    position: "relative",
                    bottom: c.key === "name" ? "" : "-1px",
                    // top: 1,
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                >
                  {c.fixed ? (
                    <FontAwesomeIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        this.unpinColumn(c);
                      }}
                      icon={faThumbtack}
                      className="unpin-icon"
                    />
                  ) : (
                    // <PushpinFilled onClick={() => this.unpinColumn(c, index)} />
                    <FontAwesomeIcon
                      style={{
                        color: "#4b93e5",
                        position: "relative",
                        top: 0,
                        marginRight: "5px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        this.pinColumnToLeft(c);
                      }}
                      icon={faThumbtack}
                    />
                    // <PushpinOutlined
                    //   onClick={() => this.pinColumnToLeft(c, index)}
                    // />
                  )}
                </span>
                <span
                  style={{
                    marginBottom: c.key === "name" ? "10px" : "",
                    position: "relative",
                    bottom: c.key === "name" ? "" : "-1px",
                  }}
                  className="header-labels common-label-text-fields-f12"
                >
                  {c.displayTitle}
                </span>
              </>
            )}
          </>
        );
      };
      return c;
    });

    this.setState({ columns: columns });
  };

  renderExpandedEllipses = (record) => {
    return (
      <>
        <svg
          className="vertical-ellipsis"
          width="22"
          height="6"
          viewBox="0 0 22 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="19.1552" cy="2.58853" r="2.58853" fill="#FFFFFF" />
          <circle cx="10.8717" cy="2.58853" r="2.58853" fill="#FFFFFF" />
          <circle cx="2.58853" cy="2.58853" r="2.58853" fill="#FFFFFF" />
        </svg>
        <p className="expand-action-icons d-flex expanded-cell-icons">
          <span className="action-editicon">
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6493 2.43854L14.2593 5.08111C14.3692 5.19244 14.3692 5.37408 14.2593 5.48541L7.93981 11.8838L5.25463 12.1856C4.89583 12.2266 4.59201 11.919 4.63252 11.5557L4.93056 8.83697L11.25 2.43854C11.36 2.32721 11.5394 2.32721 11.6493 2.43854ZM16.3368 1.76764L14.9248 0.337951C14.485 -0.107361 13.7703 -0.107361 13.3275 0.337951L12.3032 1.37506C12.1933 1.48639 12.1933 1.66803 12.3032 1.77936L14.9132 4.42193C15.0231 4.53326 15.2025 4.53326 15.3125 4.42193L16.3368 3.38482C16.7766 2.93658 16.7766 2.21295 16.3368 1.76764ZM11.1111 10.1436V13.126H1.85185V3.75103H8.50116C8.59375 3.75103 8.68056 3.71295 8.74711 3.6485L9.90451 2.47662C10.1244 2.25397 9.96817 1.87604 9.65856 1.87604H1.38889C0.622106 1.87604 0 2.50592 0 3.28228V13.5948C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5948V8.97173C12.963 8.65826 12.5897 8.50298 12.3698 8.72271L11.2124 9.89458C11.1487 9.96197 11.1111 10.0499 11.1111 10.1436Z"
                fill="#ffffff"
              />
            </svg>
          </span>
        </p>
      </>
    );
  };

  renderActionMenu = (record: any) => {
    const isExpanded = this.state.expandedKeys.includes(record.key);
    return (
      <div
        id="action-menu"
        className={`expand-cell ${isExpanded ? "expanded-ellipses" : ""}`}
        // style={{ border: "1px solid yellow", display:'flex' }}
        onMouseOver={(e) => {
          e.stopPropagation();

          if (!isExpanded) this.onExpand(true, record);
          // else this.onExpand(false, record);
          else return false;
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();

          if (isExpanded) this.onExpand(false, record);
          else return false;
        }}
      >
        {isExpanded
          ? this.renderExpandedEllipses(record)
          : this.renderEllipses(record)}
      </div>
    );
  };

  renderEllipses = (record) => {
    return (
      <svg
        className="ellipsi-img"
        width="22"
        height="6"
        viewBox="0 0 22 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="19.1552" cy="2.58853" r="2.58853" fill="#A5A5A5" />
        <circle cx="10.8717" cy="2.58853" r="2.58853" fill="#C1C2C4" />
        <circle cx="2.58853" cy="2.58853" r="2.58853" fill="#E1E1E1" />
      </svg>
    );
  };
  // /**
  //  * @function unpinColumn
  //  * to unpin a column
  //  *
  //  * NOTE: no implementation as not in screens shared
  //  */
  // unpinColumn = (column: Column<any>) => {
  //   console.log("unpin column");
  // };

  // /**
  //  * @function pinColumnToLeft
  //  * to pin a column
  //  *
  //  * NOTE: no implementation as not in screens shared
  //  */
  // pinColumnToLeft = (column: Column<any>) => {
  //   console.log("pin column");
  // };

  /*
  ==================================================================================================
   END OF COLUMN PINNING RELATED METHODS
  ==================================================================================================
  */

  /*
  ==================================================================================================
   BEGINNING OF PAGINATION RELATED METHODS
  ==================================================================================================
  */

  /**
   * @function getShowTotal
   * to retrieve the string to display as total results
   * @author Deepak_T
   */
  getShowTotal: () => string = () => {
    const from = (this.state.currentPage - 1) * this.state.pageSize + 1;
    const to =
      (this.state.currentPage - 1) * +this.state.pageSize +
      +this.state.pageSize;

    const data =
      this.state.sortedInfo && !this.state.filteredInfo
        ? [...this.state.sortedTable]
        : this.state.filteredInfo && !this.state.sortedInfo
        ? this.state.filterTable
        : this.state.filteredInfo && this.state.sortedInfo
        ? this.state.sortedTable
        : [...this.props.data];

    const toData = to < data.length ? to : data.length;
    const length =
      this.state.filterTable && this.state.filterTable.length > 0
        ? this.state.filterTable.length
        : this.props.data.length;

    return `${from} to ${toData} of ${length}`;
  };

  /**
   * @function getTotalPages
   * to retrieve the total pages in current state of grid
   * @author Deepak_T
   */
  getTotalPages: () => number = () => {
    const totalRows =
      this.state.filterTable && this.state.filterTable.length > 0
        ? this.state.filterTable.length
        : this.props.data.length;

    const currentPageSize = this.state.pageSize;
    return Math.ceil(totalRows / currentPageSize);
  };

  /**
   * @function getLastPage
   * to retrieve the last page in current state of grid
   * @author Deepak_T
   */
  getLastPage: () => number = () => {
    const data =
      this.state.sortedInfo && !this.state.filteredInfo
        ? [...this.state.sortedTable]
        : this.state.filteredInfo && !this.state.sortedInfo
        ? this.state.filterTable
        : this.state.filteredInfo && this.state.sortedInfo
        ? this.state.sortedTable
        : [...this.props.data];
    return Math.ceil(data.length / this.state.pageSize);
  };

  /**
   * @function onToggleMultiSort
   * to toggle the multi sort on and off and update sort order
   *
   * TODO: implementaton is pending
   * NOTE:
   */
  onToggleMultiSort = () => {
    this.multiSortArray = [];
    this.columnsToMultisort = [];
    this.setState({ isMultiSort: !this.state.isMultiSort }, () => {
      // this.updateMultisortOrder();
    });
  };

  /**
   * @function onClearAll
   * to clear all filters and sorters applied to reset the state of grid	 *
   * @author Deepak_T
   */
  onClearAll: () => void = () => {
    this.setState(
      {
        filteredInfo: null,
        sortedInfo: null,
        filterTable: [],
        sortedTable: [],
      },
      () => {
        this.updateFilters();
      }
    );
  };

  /**
   * @function updateFilters
   * to update the filteredValue and the sort order after filter/sorter is appied
   * @author Deepak_T
   *
   * TODO: Test the implementation
   */
  updateFilters = () => {
    const columns = this.state.columns.map((c) => {
      const key = c.key;
      c["filteredValue"] = this.state.filteredInfo
        ? this.state.filteredInfo![key]
        : null;
      c["sortOrder"] = this.state.sortedInfo
        ? this.state.sortedInfo!["columnKey"] === key &&
          this.state.sortedInfo!["order"]
          ? this.state.sortedInfo!["order"]
          : null
        : null;
      return c;
    });

    this.setState({ columns: columns });
  };

  /**
   * @function onGoToPageValueChange
   * the on change event fired when the input value of go to page box is changed
   * @param e the DOM change event
   * @author Deepak_T
   */
  onGoToPageValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.value) {
      if (!/^[1-9][0-9]*$/.test(e.target.value)) {
        return;
      }
    }
    if (
      (e && e.target && e.target.value) ||
      (e && e.target && e.target.value === "")
    ) {
      this.setState({ goToPageValue: +e.target.value });
    }
  };

  /**
   * @function onPageChange
   * the change event when page is changed
   * @param pageNumber the page number selected
   * @author Deepak _T
   */
  onPageChange: (p: number) => void = (pageNumber: number) => {
    this.setState({ currentPage: pageNumber, goToPageValue: pageNumber });
  };

  /**
   * @function onPageSizeChange
   * the event triggered when you change items per page
   * @param value the size selected
   * @author Deepak _T
   */
  onPageSizeChange: (v: number) => void = (value: number) => {
    this.setState({ pageSize: value, currentPage: 1, goToPageValue: 1 });
  };

  /**
   * @function onGoToSpecificPage
   * to go to a specific page number
   * @author Deepak _T
   */
  onGoToSpecificPage: () => void = () => {
    if (!this.state.goToPageValue) return;
    this.setState({
      goToPageValue: +this.state.goToPageValue,
      currentPage: +this.state.goToPageValue,
    });
  };

  /**
   * @function onGotToFirstPage
   * to go to the first page
   * @author Deepak _T
   */
  onGotToFirstPage: () => void = () => {
    this.setState({ currentPage: 1, goToPageValue: 1 });
  };

  /**
   * @function onGotToLastPage
   * to go to last page of the grid
   * @author Deepak_T
   */
  onGotToLastPage: () => void = () => {
    const data =
      this.state.sortedInfo && !this.state.filteredInfo
        ? [...this.state.sortedTable]
        : this.state.filteredInfo && !this.state.sortedInfo
        ? this.state.filterTable
        : this.state.filteredInfo && this.state.sortedInfo
        ? this.state.sortedTable
        : [...this.props.data];

    const lastPage = Math.ceil(data.length / this.state.pageSize);

    this.setState({ currentPage: lastPage, goToPageValue: lastPage });
  };

  /*
  ==================================================================================================
   END OF PAGINATION RELATED METHODS
  ==================================================================================================
  */

  /*
  ==================================================================================================
   BEGINNING OF FILTERING RELATED METHODS
  ==================================================================================================
  */

  /**
   * @function filterBySuggestions
   * to filter the columns where intellisense is enabled
   * @param value the text entered by user
   * @param selectedSuggestions suggestions selected by user
   * @param key column key
   * @param record the data row
   * @author Deepak_T
   *
   */
  // filterBySuggestions = (
  //   value: string,
  //   selectedSuggestions: string[],
  //   suggestedValues: string[],
  //   key: string,
  //   record: any
  // ) => {
  //   let selectedValues = Object.keys(selectedSuggestions).filter(
  //     (k: string) => k !== "selectAll" && selectedSuggestions[k]
  //   );

  //   console.log(value, selectedSuggestions, suggestedValues);
  //   if (selectedSuggestions["selectAll"]) {
  //     selectedValues = [...suggestedValues[key]];
  //   }

  //   if (value && selectedValues.length > 0)
  //     return selectedValues.indexOf(record[key]) > -1;
  //   else return true;
  // };
  filterBySuggestions = (
    value: string,
    selectedSuggestions: string[],
    suggestedValues: string[],
    key: string,
    record: any
  ) => {
    let selectedValues = Object.keys(selectedSuggestions).filter(
      (k: string) => k !== "selectAll" && selectedSuggestions[k]
    );

    if (selectedSuggestions["selectAll"]) {
      if (record[key] && typeof record[key] === "number") {
        if (record[key])
          selectedValues = suggestedValues[key].map((values) =>
            values.toString()
          );
      } else {
        if (record[key])
          selectedValues = suggestedValues[key].map((values) =>
            values.toLowerCase()
          );
      }
    }

    if (value && selectedValues.length > 0) {
      let found = false;
      if (record[key] && typeof record[key] === "string") {
        if (record[key])
          found = selectedValues.indexOf(record[key].toLowerCase()) > -1;
      } else {
        if (record[key])
          found = selectedValues.indexOf(record[key].toString()) > -1;
      }
      return found;
    } else return true;
  };

  /**
   * @function filterByText
   * to filter the text columns by intellisense
   * @param inputText the text entered by user
   * @param key the column key
   * @author Deepak_T
   *
   */
  // onGetSuggestionsForColumnIntellisenseFilter = (
  //   inputText: string,
  //   key: string
  // ) => {
  //   const data = this.props.data.map((d: any) => d[key]);
  //   let filteredData = data.filter((d: any) => {
  //     return (
  //       d &&
  //       inputText !== "" &&
  //       d.toLowerCase().indexOf(inputText.toLowerCase()) > -1
  //     );
  //   });

  //   filteredData = filteredData.filter(
  //     (item: string, index: number, input: string[]) =>
  //       input.indexOf(item) == index
  //   );

  //   let suggestions = { ...this.state.suggestions };
  //   suggestions[key] = filteredData;

  //   this.setState({ suggestions: { ...suggestions } });
  // };
  onGetSuggestionsForColumnIntellisenseFilter = (
    inputText: string,
    key: string
  ) => {
    const data = this.props.data.map((d: any) => d[key]);
    let filteredData = data.filter((d: any) => {
      if (typeof d !== "number") {
        return (
          d &&
          inputText !== "" &&
          d.toLowerCase().indexOf(inputText.toLowerCase()) > -1
        );
      } else {
        return (
          d &&
          inputText !== "" &&
          d
            .toString()
            // .toLowerCase()
            .indexOf(
              inputText.toString()
              // .toLowerCase()
            ) > -1
        );
      }
    });
    filteredData = filteredData.filter(
      (item: string, index: number, input: string[]) =>
        input.indexOf(item) == index
    );

    let suggestions = { ...this.state.suggestions };
    suggestions[key] = filteredData;

    this.setState({ suggestions: { ...suggestions } });
  };
  /**
   * @function filterByText
   * to filter the text columns by condition
   * @param condition the filter condition chosen eg: is | is not | is like | is not like | exists | does not exist
   * @param value the value types in the filter dropdown input box
   * @param key the column key
   * @param record the data row
   * @author Deepak_T
   *
   * TODO: declare a type for record
   */
  filterByText = (
    condition: string,
    value: string,
    key: string,
    record: any
  ) => {
    switch (condition) {
      case "is":
        return record[key].toLowerCase() === value.toLowerCase();
      case "is not":
        return record[key].toLowerCase() !== value.toLowerCase();
      case "is like":
        return record[key].toLowerCase().includes(value.toLowerCase());
      case "is not like":
        return !record[key].toLowerCase().includes(value.toLowerCase());
      case "exists":
        return record[key];
      case "does not exist":
        return !record[key];
      default:
        console.log("didn't match any case");
    }
  };

  /**
   * @function filterByNumber
   * to filter the text columns by condition
   * @param condition the filter condition chosen eg: == | != | < | > | >=
   * @param value the value types in the filter dropdown input box
   * @param key the column key
   * @param record the data row
   * @author Deepak_T
   *
   * TODO: declare a type for record . handle complex object records
   */
  filterByNumber = (
    condition: string,
    value: string,
    key: string,
    record: any
  ) => {
    switch (condition) {
      case "==":
        return record[key] === parseInt(value);
      case "!=":
        return record[key] !== parseInt(value);
      case "<=":
        return record[key] <= parseInt(value);
      case "<":
        return record[key] < parseInt(value);
      case ">":
        return record[key] > parseInt(value);
      case ">=":
        return record[key] <= parseInt(value);
      default:
        console.log("didn't match any case");
    }
  };

  /**
   * @function filterByDate
   * to filter the text columns by condition
   * @param condition the filter condition chosen eg: == | != | < | > | >=
   * @param optionValue the filter condition chosen eg: is | is not | greater than | less than | greater than or equal to | less than or equal to | equal to | not equal to
   * @param key the column key
   * @param record the data row
   * @param flag the flag which determines if it is a range or single date
   * @param startDate the date selected in case of single date
   * @param endDate the range of date array in case of range eg: for "between"
   * @author Deepak_T
   *
   * TODO: declare a type for record . handle complex object records
   */
  filterByDate = (
    condition: string,
    optionValue: string,
    key: string,
    record: any,
    flag: boolean,
    startDate: moment.MomentInput,
    endDate: moment.MomentInput[]
  ) => {
    switch (optionValue) {
      case "is":
        if (!flag) {
          return moment(record[key]).isSame(startDate, "day");
        }
        break;
      case "is not":
        if (!flag) {
          return !moment(record[key]).isSame(startDate, "day");
        }
        break;
      case "greater than":
        if (!flag) {
          return moment(record[key]).isAfter(startDate, "day");
        }
        break;
      case "less than":
        if (!flag) {
          return moment(record[key]).isBefore(startDate, "day");
        }
        break;
      case "between":
        if (flag && endDate && endDate.length > 1) {
          return moment(record[key]).isBetween(endDate[0], endDate[1], "day");
        }
        break;
      case "greater than or equal to":
        if (!flag) {
          return moment(record[key]).isSameOrAfter(startDate, "day");
        }
        break;
      case "less than or equal to":
        if (!flag) {
          return moment(record[key]).isSameOrBefore(startDate, "day");
        }
        break;
      case "equal to":
        if (!flag) {
          return moment(record[key]).isSame(startDate, "day");
        }
        break;
      case "not equal to":
        if (!flag) {
          return !moment(record[key]).isSame(startDate, "day");
        }
        break;
      default:
        console.log("didn't match any case");
    }
  };

  /**
   * @function getDataOnFilter
   * to construct the filterColumns object to determine columns and filters
   * @param filters the filters object from ant
   * @author Deepak_T
   *
   * TODO: define type for filters
   */
  getDataOnFilter = (filters) => {
    const filteredColumns = Object.keys(filters).reduce((acc, k) => {
      if (filters[k] && filters[k].length > 0) {
        return Object.assign(acc, { [k]: filters[k] });
      } else return acc;
    }, {});

    this.filterColumns(filteredColumns);
  };

  /**
   * @function filterColumns
   * to filter the columns based on data type
   * @param filteredColumns
   * @author Deepak_T
   * TODO: define type for filteredColumns . Handle complex object
   */
  filterColumns = (filteredColumns) => {
    const data = [...this.props.data];

    const filterKeys = Object.keys(filteredColumns);
    const textKeys: (string | undefined)[] = this.state.columns
      .filter(
        (c: Column<any>) => c.dataType === "string" && !c.enableIntellisense
      )
      .map((c: Column<any>) => c.key);

    const numberKeys: (string | undefined)[] = this.state.columns
      .filter((c: Column<any>) => c.dataType === "number")
      .map((c: Column<any>) => c.key);

    const dateKeys: (string | undefined)[] = this.state.columns
      .filter((c: Column<any>) => c.dataType === "date")
      .map((c: Column<any>) => c.key);

    const intellisenseKeys: (string | undefined)[] = this.state.columns
      .filter(
        (c: Column<any>) => c.dataType === "string" && c.enableIntellisense
      )
      .map((c: Column<any>) => c.key);

    if (filterKeys && filterKeys.length === 0) {
      this.setState({ filterTable: [] });
    } else {
      let filteredData = [...data];
      filterKeys.forEach((k) => {
        filteredData = filteredData.filter((d) => {
          if (textKeys.includes(k)) {
            return this.filterByText(
              filteredColumns[k][0].condition,
              filteredColumns[k][0].value,
              k,
              d
            );
          } else if (numberKeys.includes(k)) {
            return this.filterByNumber(
              filteredColumns[k][0].condition,
              filteredColumns[k][0].value,
              k,
              d
            );
          } else if (dateKeys.includes(k)) {
            return this.filterByDate(
              filteredColumns[k][0].selected[0],
              filteredColumns[k][0].optionValue,
              k,
              d,
              filteredColumns[k][0].flag,
              filteredColumns[k][0].startDate,
              filteredColumns[k][0].endDate
            );
          } else if (intellisenseKeys.includes(k)) {
            return this.filterBySuggestions(
              filteredColumns[k][0].value,
              filteredColumns[k][0].selectedSuggestions,
              filteredColumns[k][0].suggestions,
              k,
              d
            );
          } else return true;
        });
      });

      this.setState({
        filterTable: filteredData,
        sortedTable: [],
        sortedInfo: null,
        currentPage: 1,
        goToPageValue: 1,
      });
    }
  };

  /*
  ==================================================================================================
   END OF FILTERING RELATED METHODS
  ==================================================================================================
  */

  /*
  ==================================================================================================
   BEGINNING OF SORTING RELATED METHODS
  ==================================================================================================
  */

  /**
   * @function filterByDate
   * to filter the text columns by condition
   * @param property the property of the data object
   * @param order the sorting order  ascend | descend
   * @param type the data type  text | number | date
   * @author Deepak_T
   *
   * TODO:  handle complex object records
   */
  dynamicsort = (property: string, order: string, type: string) => {
    var sort_order = 1;
    if (order === "descend") {
      sort_order = -1;
    }
    if (type === "text") {
      return function (a, b) {
        // a should come before b in the sorted order
        if (a[property].toLowerCase() < b[property].toLowerCase()) {
          return -1 * sort_order;
          // a should come after b in the sorted order
        } else if (a[property].toLowerCase() > b[property].toLowerCase()) {
          return 1 * sort_order;
          // a and b are the same
        } else {
          return 0 * sort_order;
        }
      };
    } else if (type === "date") {
      return function (a, b) {
        // a should come before b in the sorted order

        let d1 = moment(a[property]);
        let d2 = moment(b[property]);

        if (d1.isBefore(d2, "day")) {
          return -1 * sort_order;
          // a should come after b in the sorted order
        } else if (d1.isAfter(d2, "day")) {
          return 1 * sort_order;
          // a and b are the same
        } else {
          return 0 * sort_order;
        }
      };
    } else if (type === "numerical") {
      return function (a, b) {
        // a should come before b in the sorted order
        if (a[property] - b[property] < 0) {
          return -1 * sort_order;
          // a should come after b in the sorted order
        } else if (a[property] - b[property] > 0) {
          return 1 * sort_order;
          // a and b are the same
        } else {
          return 0 * sort_order;
        }
      };
    }
  };

  /**
   * @function getColumnDataType
   * to get type of dta in the column
   * @author Deepak_T
   */
  getColumnDataType = (columnKey) => {
    const textKeys: (string | undefined)[] = this.state.columns
      .filter(
        (c: Column<any>) => c.dataType === "string" && !c.enableIntellisense
      )
      .map((c: Column<any>) => c.key);

    const numberKeys: (string | undefined)[] = this.state.columns
      .filter((c: Column<any>) => c.dataType === "number")
      .map((c: Column<any>) => c.key);

    const dateKeys: (string | undefined)[] = this.state.columns
      .filter((c: Column<any>) => c.dataType === "date")
      .map((c: Column<any>) => c.key);

    const intellisenseKeys: (string | undefined)[] = this.state.columns
      .filter(
        (c: Column<any>) => c.dataType === "string" && c.enableIntellisense
      )
      .map((c: Column<any>) => c.key);

    if (textKeys.includes(columnKey)) {
      return "text";
    }
    if (numberKeys.includes(columnKey)) {
      return "numerical";
    }
    if (dateKeys.includes(columnKey)) {
      return "date";
    }
    if (intellisenseKeys.includes(columnKey)) {
      return "text";
    }
    return "text";
  };

  /**
   * @function multisortColumns
   * to sort multiple columns
   */
  multisortColumns = () => {
    const data =
      this.state.sortedInfo && !this.state.filteredInfo
        ? [...this.state.sortedTable]
        : this.state.filteredInfo && !this.state.sortedInfo
        ? this.state.filterTable
        : this.state.filteredInfo && this.state.sortedInfo
        ? this.state.sortedTable
        : [...this.props.data];

    let sortedData; // = _.cloneDeep(data);

    // for (let i = 0; i < this.columnsToMultisort.length; i++) {
    //   const c = this.columnsToMultisort[i];
    // }

    sortedData = data.slice().sort(this.compareMulti);

    this.setState({
      sortedTable: sortedData,
      currentPage: 1,
      goToPageValue: 1,
    });
  };

  /**
   * @function updateMultisortOrder
   * to render order of priority of multisort in column header
   * @author Deepak_T
   */
  updateMultisortOrder = (c: Column<any>) => {
    const multisortOrder = this.getMultisortOrderByColKey(c.key);
    return (
      <span className="frx-grid__multisort-order">
        {multisortOrder > 0 ? (
          <span>{"  " + multisortOrder.toString()}</span>
        ) : null}
      </span>
    );
  };

  /**
   * @function getMultisortOrderByColKey
   * to get the priority in multi sort
   */
  getMultisortOrderByColKey = (colKey) => {
    for (let i = 0; i < this.multiSortArray.length; i++) {
      const ckey = this.multiSortArray[i];
      if (ckey === colKey) {
        return i + 1;
      }
    }
    return -1;
  };

  /**
   * @function compareMulti
   * comparator for multi sorting columns
   */
  compareMulti = (a, b): number => {
    for (let coldIdx = 0; coldIdx < this.columnsToMultisort.length; coldIdx++) {
      const cKey = this.columnsToMultisort[coldIdx]["columnKey"];
      const order = this.columnsToMultisort[coldIdx]["order"];
      const type = this.columnsToMultisort[coldIdx]["type"];

      let sort_order = order === "ascend" ? 1 : -1;
      if (type === "text") {
        if (a[cKey].toLowerCase() < b[cKey].toLowerCase()) {
          return -1 * sort_order;
        } else if (a[cKey].toLowerCase() > b[cKey].toLowerCase()) {
          return 1 * sort_order;
        } else {
          // Have to use next column for comparison.
          continue;
        }
      } else if (type === "date") {
        let d1 = moment(a[cKey]);
        let d2 = moment(b[cKey]);
        if (d1.isBefore(d2, "day")) {
          return -1 * sort_order;
          // a should come after b in the sorted order
        } else if (d1.isAfter(d2, "day")) {
          return 1 * sort_order;
          // a and b are the same
        } else {
          // Have to use next column for comparison.
          continue;
        }
      } else if (type === "numerical") {
        if (a[cKey] < b[cKey]) {
          return -1 * sort_order;
        } else if (a[cKey] > b[cKey]) {
          return 1 * sort_order;
        } else {
          continue;
        }
      }
    }
    return 0;
  };

  /**
   * @function sortData
   * to construct the sorted columns and invoke sorting of columns
   * @param sorters the sorter object from ant
   * @author Deepak_T
   *
   * TODO: define type of sorter
   */
  sortData = (sorters: any) => {
    const sortedColumns: any = Object.keys(sorters).reduce((acc, k) => {
      if (sorters[k] && sorters[k].length > 0) {
        return Object.assign(acc, { [k]: sorters[k] });
      } else return acc;
    }, {});

    if (!this.isEmpty(sortedColumns)) {
      this.sortColumns(sortedColumns);
    } else {
      const data =
        this.state.sortedInfo && !this.state.filteredInfo
          ? [...this.state.sortedTable]
          : this.state.filteredInfo && !this.state.sortedInfo
          ? this.state.filterTable
          : this.state.filteredInfo && this.state.sortedInfo
          ? this.state.sortedTable
          : [...this.props.data];

      let sortedData = _.cloneDeep(data);
      this.setState({
        sortedTable: sortedData,
        currentPage: 1,
        goToPageValue: 1,
      });
    }
  };

  /**
   * @function isEmpty
   * to check if the sorter object is empty or doesnt have the sort order
   * @param map the object
   * @author Deepak_T
   */
  isEmpty = (map: { order?: string; columnKey: string }) => {
    if (map.hasOwnProperty("order") && map.hasOwnProperty("columnKey")) {
      if (map["order"] && map["columnKey"]) return false;
      else return true;
    }
    return true;
  };

  /**
   * @function sortColumns
   * to sort columns dynamically and set data to filtertable
   * @param sorteColumns the object construced from sorter of ant to determine order and which column is being sorted
   * @author Deepak_T
   * TODO: Make sorted data independent of Filter table . So clearing filters wont clear sorting
   */
  sortColumns = (sortedColumns: { order: string; columnKey: string }) => {
    const { order, columnKey } = sortedColumns;
    const data = this.state.filteredInfo
      ? [...this.state.filterTable]
      : [...this.props.data];

    const textKeys: (string | undefined)[] = this.state.columns
      .filter(
        (c: Column<any>) => c.dataType === "string" && !c.enableIntellisense
      )
      .map((c: Column<any>) => c.key);

    const numberKeys: (string | undefined)[] = this.state.columns
      .filter((c: Column<any>) => c.dataType === "number")
      .map((c: Column<any>) => c.key);

    const dateKeys: (string | undefined)[] = this.state.columns
      .filter((c: Column<any>) => c.dataType === "date")
      .map((c: Column<any>) => c.key);

    const intellisenseKeys: (string | undefined)[] = this.state.columns
      .filter(
        (c: Column<any>) => c.dataType === "string" && c.enableIntellisense
      )
      .map((c: Column<any>) => c.key);
    let sortedData = _.cloneDeep(data);

    if (textKeys.includes(columnKey) || intellisenseKeys.includes(columnKey)) {
      sortedData = data
        .slice()
        .sort(this.dynamicsort(columnKey, order, "text"));
    } else if (numberKeys.includes(columnKey)) {
      sortedData = data
        .slice()
        .sort(this.dynamicsort(columnKey, order, "numerical"));
    } else if (dateKeys.includes(columnKey)) {
      sortedData = data
        .slice()
        .sort(this.dynamicsort(columnKey, order, "date"));
    }

    this.setState({
      sortedTable: sortedData,
      currentPage: 1,
      goToPageValue: 1,
    });
  };

  /*
  ==================================================================================================
   END OF SORTING RELATED METHODS
  ==================================================================================================
  */

  /*
  ==================================================================================================
   BEGGINING OF GRID SETTINGS RELATED METHODS
  ==================================================================================================
  */

  /**
   * @function onShowColumn
   * to move  column to displayed/selected list from the hidden/available columns list in settings drawer
   * @author Deepak_T
   */
  onShowColumn = (column: Column<any>) => {
    const hiddenColumns = this.state.hiddenColumns.filter(
      (c) => c.key !== column.key
    );
    const visibleColumns = [
      ...this.state.visibleColumns,
      { ...column, hidden: false },
    ];
    this.setState({ hiddenColumns, visibleColumns });
  };

  /**
   * @function onHideColumn
   * to move  column to hidden/available list from the selected columns list in settings drawer
   * @author Deepak_T
   */
  onHideColumn = (column: Column<any>) => {
    const visibleColumns = this.state.visibleColumns.filter(
      (c) => c.key !== column.key
    );
    const hiddenColumns = [
      ...this.state.hiddenColumns,
      { ...column, hidden: true },
    ];
    this.setState({ hiddenColumns, visibleColumns });
  };

  /**
   * @function onCancelSettings
   * to cancel grid settings nd do not apply any changes made
   * @author Deepak_T
   */
  onCancelSettings = () => {
    this.setState({
      showGridSettingsModal: false,
      visibleColumns: this.state.columns.filter((c) => !c.hidden),
      hiddenColumns: this.state.columns.filter((c) => c.hidden),
    });
  };

  /**
   * @function onApplySettings
   * to apply selected grid settings on click of apply
   * @author Deepak_T
   */
  onApplySettings = () => {
    const cols = [...this.state.visibleColumns, ...this.state.hiddenColumns];
    const columns = [...this.sortColumnsByPosition(cols)];
    this.setState({
      columns,
      visibleColumns: columns.filter((c) => !c.hidden),
      hiddenColumns: columns.filter((c) => c.hidden),
      showGridSettingsModal: false,
    });
  };

  /**
   * @function onCloseSettings
   * to close settings drawer on cick of close
   * @author Deepak_T
   */
  onCloseSettings = () => {
    this.setState({
      visibleColumns: this.state.columns.filter((c) => !c.hidden),
      hiddenColumns: this.state.columns.filter((c) => c.hidden),
      showGridSettingsModal: !this.state.showGridSettingsModal,
    });
  };

  /*
  ==================================================================================================
   END OF GRID SETTINGS RELATED METHODS
  ==================================================================================================
  */

  /*
  ==================================================================================================
   BEGINNING OF GRID EXPANSION RELATED METHODS
  ==================================================================================================
  */

  /**
   * @function onExpand
   * to keep track of expanded rows
   * @author Deepak_T
   */
  onExpand = (expanded, record) => {
    const keys = this.state.expandedKeys;
    const expandedKeys = expanded
      ? keys.concat(record.key)
      : keys.filter((k) => k !== record.key);
    this.setState({ expandedKeys });
  };

  /**
   * @function renderExpanderIcon
   * to render the expand icon
   * @author Deepak_T
   */
  renderExpanderIcon = (props) => {
    console.log("props ", this.props.expandable, this.props.gridName);
    const closeIcon =
      this.props.expandable && this.props.expandable.isExpandable
        ? this.props.expandable.expandCloseIcon
        : null;
    const openIcon =
      this.props.expandable && this.props.expandable.isExpandable
        ? this.props.expandable.expandOpenIcon
        : null;

    if (props.expanded)
      return (
        <span
          className="frx-grid__grid-block__table-block__expand-icon frx-grid__grid-block__table-block__expand-icon--close"
          style={{ cursor: "pointer" }}
          onClick={() => props.onExpand(props.record, true)}
        >
          {closeIcon ? closeIcon : "x"}
        </span>
      );
    else
      return (
        <span
          className="frx-grid__grid-block__table-block__expand-icon frx-grid__grid-block__table-block__expand-icon--open"
          style={{ cursor: "pointer" }}
          onClick={() => props.onExpand(props.record, false)}
        >
          {openIcon ? openIcon : "+"}
        </span>
      );
  };

  /**
   * @function withDataExpandedRow
   * wrapper component for passing data to expanded row
   * @param data the row data
   * @author Deepak_T
   */
  withDataExpandedRow = (WrappedComponent: any, data: any) => {
    if (!WrappedComponent) return;

    return <WrappedComponent data={data} />;
  };

  /**
   * @function renderExpandedRowContent
   * to render the expanded row content
   * @author Deepak_T
   */
  renderExpandedRowContent = (record: any) => {
    const expandedRowComponent =
      this.props.expandable && this.props.expandable.isExpandable
        ? this.props.expandable.expandedRowRender
        : null;
    return (
      <>
        {expandedRowComponent ? (
          this.withDataExpandedRow(expandedRowComponent, record)
        ) : (
          <></>
        )}
      </>
    );
  };

  /*
  ==================================================================================================
   END OF GRID EXPANSION RELATED METHODS
  ==================================================================================================
  */

  /*
  ==================================================================================================
   BEGINNING OF GRID COLUMN RESIZING RELATED METHODS
  ==================================================================================================
  */

  /**
   * @function handleResize
   * to handle resiing of columnsby adjusting pixelWidth
   * @param index index of column being resized
   */
  handleResize = (index) => (e, { size }) => {
    e.stopPropagation();
    console.log("index of resize ", index, this.beginDrag, size);
    if (!this.beginDrag) return;
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      let delta = 0;
      let col: Column<any> = nextColumns[index];
      if (col && col.width) {
        delta = size.width - col.width;
      }

      let isDeltaTooLarge = false;
      if (col && col.width) isDeltaTooLarge = Math.abs(delta) > 25;

      let pixelWidth =
        col.pixelWidth &&
        !isDeltaTooLarge &&
        ((delta < 0 && col.pixelWidth + delta > 50) ||
          (delta > 0 && col.pixelWidth < 300))
          ? col.pixelWidth + delta
          : col.pixelWidth;
      // let width = col.width && !isDeltaTooLarge ? size.width : col.width;
      nextColumns[index] = {
        ...nextColumns[index],
        // width: width,
        pixelWidth: pixelWidth,
      };
      return { columns: nextColumns };
    });
  };

  handleResizeStop = () => {
    console.log("Stop resize ");
    this.beginDrag = false;
  };

  handleResizeStart = () => {
    console.log("Start resize ");
    this.beginDrag = true;
  };
  // to pass to table as resizable column
  components = {
    header: {
      cell: ResizableTitle,
    },
  };

  beginDrag = false;

  /*
  ==================================================================================================
   END OF GRID COLUMN RESIZING RELATED METHODS
  ==================================================================================================
  */

  render() {
    const gridColumns = this.generateColumns();
    let columns = gridColumns;
    if (this.props.enableResizingOfColumns) {
      columns = gridColumns.map((col, index) => ({
        ...col,

        onHeaderCell: (column) => ({
          width: column.width,
          onResize: this.handleResize(index),
          onResizeStop: this.handleResizeStop,
          onResizeStart: this.handleResizeStart,
        }),
      }));
    }
    const {
      hideClearFilter,
      hideItemsPerPage,
      hideMultiSort,
      hidePageJumper,
      hideResults,
    } = this.props;

    const ModalInnerComponent = this.withData(
      this.state.openDialogOnClickingCell.component,
      this.state.openDialogOnClickingCell.dataRow
    );

    return (
      <>
        {this.state.openDialogOnClickingCell.isOpen ? (
          <Modal
            open={this.state.openDialogOnClickingCell.isOpen}
            onClose={() =>
              this.setState({
                openDialogOnClickingCell: {
                  isOpen: false,
                  component: undefined,
                  dataRow: null,
                },
              })
            }
            className="clone-modal"
          >
            <>
              <ModalInnerComponent
                isOpen={!this.state.openDialogOnClickingCell.isOpen}
              />
            </>
          </Modal>
        ) : null}
        <div ref={this.gridRef} className="frx-grid">
          {/* DRAWER  */}
          {this.props.enableSettings && (
            <FrxGridSettingsDrawer
              title="Settings"
              drawerPlacement="left"
              isSettingsDrawerOpen={this.state.showGridSettingsModal}
              fixedColumns={
                this.props.enableSettings
                  ? ["settings", ...this.props.fixedColumnKeys]
                  : this.props.fixedColumnKeys
              }
              hiddenColumns={this.state.hiddenColumns}
              visibleColumns={this.state.visibleColumns}
              onShowColumn={this.onShowColumn}
              onHideColumn={this.onHideColumn}
              onApplySettings={this.onApplySettings}
              onCancelSettings={this.onCancelSettings}
              onClose={this.onCloseSettings}
            />
          )}
          {/* END OF DRAWER  */}

          {/* ---------------- CTA Button container----------*/}
          <div className="frx-grid__meta-block">
            <h3 className="frx-grid__meta-block__heading">
              {/* NAME OF GRID */}
            </h3>
            {/* BUTTON */}
          </div>

          <div className="frx-grid__grid-block">
            {/* PAGINATION */}

            {!this.props.hidePagination &&
            this.props.pagintionPosition === "topRight" ? (
              <FrxGridPagination
                hideClearFilter={hideClearFilter}
                hideItemsPerPage={hideItemsPerPage}
                hideMultiSort={hideMultiSort}
                hidePageJumper={hidePageJumper}
                hideResults={hideResults}
                filterTable={this.state.filterTable}
                position={this.props.pagintionPosition}
                data={this.props.data}
                isMultiSort={this.state.isMultiSort}
                sortedInfo={this.state.sortedInfo}
                filteredInfo={this.state.filteredInfo}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                showTotal={this.getShowTotal()}
                pages={this.getTotalPages()}
                lastPage={this.getLastPage()}
                goToPageValue={this.state.goToPageValue}
                onToggleMultiSort={this.onToggleMultiSort}
                onClearAll={this.onClearAll}
                onGoToPageValueChange={this.onGoToPageValueChange}
                onPageChange={this.onPageChange}
                onPageSizeChange={this.onPageSizeChange}
                onGoToSpecificPage={this.onGoToSpecificPage}
                onGotToFirstPage={this.onGotToFirstPage}
                onGotToLastPage={this.onGotToLastPage}
              />
            ) : null}
            {/* -----------------End Pagination--------------------*/}

            {/* ----------------- Table body--------------------*/}

            <ReactDragListView.DragColumn {...this.dragProps}>
              {this.props.expandable && this.props.expandable.isExpandable ? (
                <Table
                  className="frx-grid__grid-block__table-block"
                  rowClassName={(record, index) => {
                    if (index % 2 === 0 && record.checked) {
                      return "table-row-white  highlight-checked-record";
                    } else if (index % 2 !== 0 && record.checked) {
                      return "table-row-lightskyblue  highlight-checked-record";
                    } else {
                      return index % 2 === 0
                        ? "table-row-white"
                        : "table-row-lightskyblue";
                    }
                  }}
                  showSorterTooltip={false}
                  columns={columns}
                  components={this.components}
                  dataSource={this.getGridData()}
                  onChange={this.onTableStateChange}
                  loading={this.props.loading}
                  // isExpandable={
                  //   this.props.expandable && this.props.expandable.isExpandable
                  //     ? true
                  //     : false
                  // }
                  bordered={this.props.bordered}
                  pagination={false}
                  summary={this.props.summary ? this.props.summary : undefined}
                  expandIcon={
                    this.props.expandable && this.props.expandable.isExpandable
                      ? (props) => this.renderExpanderIcon(props)
                      : undefined
                  }
                  expandIconColumnIndex={
                    this.props.expandable && this.props.expandable.isExpandable
                      ? this.props.expandable.expandIconColumnIndex
                      : undefined
                  }
                  onExpand={
                    this.props.expandable && this.props.expandable.isExpandable
                      ? this.onExpand
                      : undefined
                  }
                  expandedRowKeys={
                    this.props.expandable && this.props.expandable.isExpandable
                      ? this.state.expandedKeys
                      : undefined
                  }
                  expandedRowClassName={
                    this.props.expandable &&
                    this.props.expandable.expandedRowClassName
                      ? this.props.expandable.expandedRowClassName
                      : undefined
                  }
                  expandedRowRender={(record) => (
                    <>
                      {this.props.expandable &&
                      this.props.expandable.isExpandable
                        ? this.renderExpandedRowContent(record)
                        : undefined}
                    </>
                  )}
                  scroll={{
                    y: this.props.scroll ? this.props.scroll.y : 420,
                    x: this.props.scroll ? this.props.scroll.x : 400,
                  }}
                />
              ) : (
                <Table
                  className="frx-grid__grid-block__table-block"
                  rowClassName={(record, index) => {
                    if (index % 2 === 0 && record.checked) {
                      return "table-row-white highlight-checked-record";
                    } else if (index % 2 !== 0 && record.checked) {
                      return "table-row-lightskyblue highlight-checked-record";
                    } else {
                      return index % 2 === 0
                        ? "table-row-white"
                        : "table-row-lightskyblue";
                    }
                  }}
                  showSorterTooltip={false}
                  columns={columns}
                  components={this.components}
                  dataSource={this.getGridData()}
                  onChange={this.onTableStateChange}
                  loading={this.props.loading}
                  // isExpandable={
                  //   this.props.expandable && this.props.expandable.isExpandable
                  //     ? true
                  //     : false
                  // }
                  bordered={this.props.bordered}
                  pagination={false}
                  summary={this.props.summary ? this.props.summary : undefined}
                  scroll={{
                    y: this.props.scroll ? this.props.scroll.y : 420,
                    x: this.props.scroll ? this.props.scroll.x : 400,
                  }}
                />
              )}
            </ReactDragListView.DragColumn>
            {/* -----------------End Table body--------------------*/}

            {!this.props.hidePagination &&
            this.props.pagintionPosition === "bottomRight" ? (
              <FrxGridPagination
                hideClearFilter={hideClearFilter}
                hideItemsPerPage={hideItemsPerPage}
                hideMultiSort={hideMultiSort}
                hidePageJumper={hidePageJumper}
                hideResults={hideResults}
                filterTable={this.state.filterTable}
                position={this.props.pagintionPosition}
                data={this.props.data}
                isMultiSort={this.state.isMultiSort}
                sortedInfo={this.state.sortedInfo}
                filteredInfo={this.state.filteredInfo}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                showTotal={this.getShowTotal()}
                pages={this.getTotalPages()}
                lastPage={this.getLastPage()}
                goToPageValue={this.state.goToPageValue}
                onToggleMultiSort={this.onToggleMultiSort}
                onClearAll={this.onClearAll}
                onGoToPageValueChange={this.onGoToPageValueChange}
                onPageChange={this.onPageChange}
                onPageSizeChange={this.onPageSizeChange}
                onGoToSpecificPage={this.onGoToSpecificPage}
                onGotToFirstPage={this.onGotToFirstPage}
                onGotToLastPage={this.onGotToLastPage}
              />
            ) : null}
            {/* -----------------End Pagination--------------------*/}

            {/* -----------------Grid bar--------------------*/}
            {/*  GRID BAR */}

            {/* -----------------Grid bar--------------------*/}
          </div>
        </div>
      </>
    );
  }
}

export default FrxGrid;
