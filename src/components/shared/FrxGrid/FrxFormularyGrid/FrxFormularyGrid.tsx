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
import { Column, Grid, GridMenu } from "../../../../models/grid.model";
import FrxGridCell from "../components/FrxGridCell/FrxGridCell";
import FrxGridDateFilter from "../components/FrxGridDateFilter/FrxGridDateFilter";
import FrxGridFilterDropDown from "../components/FrxGridFilterDropDown/FrxGridFilterDropdown";
import FrxGridFilterIcon from "../components/FrxGridFilterIcon/FrxGridFilterIcon";
import FrxGridHeaderCell from "../components/FrxGridHeaderCell/FrxGridHeaderCell";
import FrxGridPagination from "../components/FrxGridPagination/FrxGridPagination";
import FrxGridSettingsCell from "../components/FrxGridSettingsCell/FrxGridSettingsCell";
import FrxGridSettingsDrawer from "../components/FrxGridSettingsDrawer/FrxGridSettingsDrawer";
import FrxGridSettingsHeaderCell from "../components/FrxGridSettingsHeaderCell/FrxGridSettingsHeaderCell";
//style imports
import "./FrxFormularyGrid.scss";
import FrxGridIntellisenseFilter from "../components/FrxGridIntellisenseFilter/FrxGridIntellisenseFilter";
import {
  tooltipMock1,
  tooltipMock2,
  tooltipMock3,
} from "../../../../mocks/GridDrugLabelTooltip";

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
}
interface FrxGridState<T> {
  filteredInfo: null;
  filterTable: T[];
  sortedTable: T[];

  isMultiSort: boolean;
  sortedInfo: any;
	multiSortedInfo:any[],
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
  openDialogOnClickingCell: {
    isOpen: boolean;
    component?: (props) => JSX.Element;
    dataRow: any;
  };
}

class FrxFormularyGrid extends Component<FrxGridProps<any>, FrxGridState<any>> {
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

  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
  }

  componentDidMount() {
    this.initializeColumns();
  }

  /**
   * @function initializeColumns
   * to initialize grid with columns
   * @author Deepak_T
   */
  initializeColumns = () => {
    const { enableSettings } = this.props;
    let { columns } = this.props;
    const settingsWidth = this.props.settingsWidth
      ? this.props.settingsWidth
      : this.props.gridName === "CLAIMS"
      ? CLAIMS_GRID_SETTINGS_WIDTH
      : SETTINGS_WIDTH;
    let modifiedSettingsEnabledColumns: Column<any>[] = [];
    if (enableSettings) {
      const settingsEnabledColumns = columns.map((c: Column<any>) => {
        c.position += 1;
        return c;
      });

      modifiedSettingsEnabledColumns = [
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
    }

    let requiredColumns: Column<any>[] = [];
    if (enableSettings)
      requiredColumns = _.cloneDeep(modifiedSettingsEnabledColumns);
    else requiredColumns = _.cloneDeep(columns);

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
          // const settingsWidth =
          //   this.props.gridName === "CLAIMS"
          //     ? CLAIMS_GRID_SETTINGS_WIDTH
          //     : SETTINGS_WIDTH;
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
        } else {
          const key = c.key;
          const width =
            c.pixelWidth && totalColumnWidthSetByContainer > 0
              ? REST_OF_COLUMNS_WIDTH *
                (c.pixelWidth / totalColumnWidthSetByContainer)
              : columnWidth;

          // c["width"] = width > columnWidth ? width : columnWidth;
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
    console.log(" wrpped modal", WrappedComponent);
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
        const isElemPresent = function (arr: Array<any>, elem) {
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
                type: this.getColumnDataType(cKey),
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
          for (let i = 0; i < this.multiSortArray.length; i++) {
            // const cKey = this.multiSortArray[i];

            // this.handleMultisortColumnClick(cKey);
            this.multisortColumns();
            // this.updateMultisortOrder();
          }
        } else {
          const cKey = sorter.columnKey;
          const order = sorter.order;

          const elemIdx = isElemPresent(this.multiSortArray, cKey);
          if (elemIdx === -1) {
            this.multiSortArray.push(cKey);
            this.columnsToMultisort.push({
              columnKey: cKey,
              order: order,
              type: this.getColumnDataType(cKey),
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

  /**
   * @function unpinColumn
   * to unpin a column
   *
   * NOTE: no implementation as not in screens shared
   */
  unpinColumn = (column: Column<any>) => {
    console.log("unpin column");
  };

  /**
   * @function pinColumnToLeft
   * to pin a column
   *
   * NOTE: no implementation as not in screens shared
   */
  pinColumnToLeft = (column: Column<any>) => {
    console.log("pin column");
  };

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
   * NOTE: Sumanth
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
      selectedValues = [...suggestedValues[key]];
    }

    if (value && selectedValues.length > 0)
      return selectedValues.indexOf(record[key]) > -1;
    else return true;
  };

  /**
   * @function filterByText
   * to filter the text columns by intellisense
   * @param inputText the text entered by user
   * @param key the column key
   * @author Deepak_T
   *
   */
  onGetSuggestionsForColumnIntellisenseFilter = (
    inputText: string,
    key: string
  ) => {
    const data = this.props.data.map((d: any) => d[key]);
    let filteredData = data.filter((d: any) => {
      return (
        d &&
        inputText !== "" &&
        d.toLowerCase().indexOf(inputText.toLowerCase()) > -1
      );
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
          // onMouseDown: e => {
          //   this.beginDrag = true;

          //   // if (this.beginDrag) e.stopPropagation();
          // },
          // onMouseUp: e => {
          //   e.preventDefault();
          //   this.beginDrag = false;
          // }
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
              {/* {this.props.expandable && this.props.expandable.isExpandable ? (
                <Table
                  //   size="small"
                  className="frx-grid__grid-block__table-block"
                  rowClassName={(record, index) =>
                    index % 2 === 0
                      ? "table-row-white"
                      : "table-row-lightskyblue"
                  }
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
              ) : ( */}
              <Table
                //   size="small"
                className="frx-grid__grid-block__table-block"
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-white" : "table-row-lightskyblue"
                }
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
              {/* )} */}
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

export default FrxFormularyGrid;
