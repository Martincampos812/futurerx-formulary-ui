import React from "react";
import { Select } from "antd";
import Button from "../../shared/Frx-components/button/Button";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import { Column } from "../../../models/grid.model";
import FrxGridDragHandle from "../../shared/FrxGrid/components/FrxGridDragHandle/FrxGridDragHandle";
import { Box } from "@material-ui/core";

interface PrioritizeAlternativesState {
  isFetchingData: boolean;
  data: any[];
  filteredData: any[];
}

interface PrioritizeAlternativesProps {
  loading: boolean;
  data: any[];
  addAlternative: number | undefined;
  alternativesToAddArr: any[];
  pageSize: number;
  addAlternativeHandler: () => void;
  handleGridPriorityOrder: (data: any[]) => void;
  onApplyPriorityGridAction: (onlyFetchFormulariesList: boolean) => void;
  handleSearch: (value: string) => void;
  handleChange: (value: any) => void;
  onAlternativeDeleteAction: (item: any, key: string) => void;
}
interface SimpleSearchState {
  searchText: string;
}
interface SimpleSearchProps {
  onSearch: (searchObject: SimpleSearchState) => void;
}

/**
 * @class PrioritizeAlternatives
 * UI - DT
 * API - SJS
 * @author Deepak_T, SantoshJS
 */
class PrioritizeAlternatives extends React.Component<
  PrioritizeAlternativesProps,
  PrioritizeAlternativesState
> {
  state = {
    searchText: "",
    data: [],
    filteredData: [],
    isFetchingData: false,
  };

  deleteItemHandler = (index) => {
    console.log(`delete item number ${index}`);
  };

  /**
   * search handler helper
   * NOTE: doesn't seem to be doing helpful
   */
  onSearch = (text: string) => {
    this.handleSearch({ searchText: text });
  };

  /**
   *
   * NOTE: just filtering the mock data array used to populate grid
   * front end search
   * Will move to api once api integration is done
   */
  handleSearch = (searchObject: any) => {
    this.setState({ isFetchingData: true });
    if (searchObject) {
      const newData = this.state.data.filter((item: any) =>
        Object.keys(item)
          .map((_item: any) =>
            item[_item]
              .toString()
              .toLocaleLowerCase()
              .includes(searchObject.searchText)
          )
          .includes(true)
      );
      this.setState({ isFetchingData: false, filteredData: newData });
    } else {
      this.setState({ isFetchingData: false });
    }
  };

  render() {
    const that = this;
    const dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const data = [...that.state.data];
        const item = data.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
        that.setState({ data });
      },
      nodeSelector: "li",
      handleSelector: "a",
    };
    const columns = getPrioritizeAlternativColumns();

    const { Option } = Select;
    return (
      <div className="prio-sec">
        <div className="border br-5 prio-apply">
          <div className="header space-between">
            Prioritize Alternatives for selection above
            <div className="search-wrapper">
              <Select
                showSearch={true}
                // loading={this.props.showLoadOnAlternativesSearch}
                value={this.props.addAlternative}
                showArrow={false}
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={this.props.handleSearch}
                onChange={this.props.handleChange}
                notFoundContent={"No Data"}
                placeholder="Search Alternative"
                className="simple-search__input simple-search__input--text"
              >
                {this.props.alternativesToAddArr.map((data) => (
                  <Option key={data.key} value={data.alternative_rxcui}>
                    {data.label_name}
                  </Option>
                ))}
              </Select>
              <Button
                className="Button add-btn"
                label="Add"
                onClick={this.props.addAlternativeHandler}
              />
            </div>
          </div>
          <div className="p-20 prio-apply-grid">
            <p className="static-text">
              Add or remove additional alternatives. Drag and drop to set
              priority order.
            </p>
            <p className="static-text">
              All alternatives below will be applied as final alternatives for
              drugs selected when the alternative drug is covered on each
              formulary.
            </p>
            <div className="border">
              <div className="prio-grid prio-data">
                <FrxDrugGridContainer
                  enableSearch
                  onSearch={this.handleSearch}
                  fixedColumnKeys={["dragger", "priority"]}
                  isDataLoaded={false}
                  enableRowDrag
                  onColumnCellClick={this.props.onAlternativeDeleteAction}
                  pagintionPosition="topRight"
                  gridName={"PRIORITIZATION GRID"}
                  hideResults
                  hideItemsPerPage
                  hidePageJumper
                  hideClearFilter
                  hideMultiSort
                  hidePagination
                  isFetchingData={this.props.loading}
                  columns={columns}
                  getSortedData={this.props.handleGridPriorityOrder}
                  pageSize={this.props.pageSize}
                  scroll={{
                    x: 471,
                    y: 377,
                  }}
                  data={this.props.data}
                />
              </div>
            </div>
            <Box
              display="flex"
              justifyContent="flex-end"
              className="prio-apply-grid-btn"
            >
              <Button
                className="Button mr-0 mt-10"
                label="Apply"
                onClick={() => this.props.onApplyPriorityGridAction(false)}
              />
            </Box>
          </div>
        </div>
      </div>
    );
  }
}

export default PrioritizeAlternatives;

//columns used for grid
const getPrioritizeAlternativColumns: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      className: "drag-visible",
      pixelWidth: 75,
      isFilterable: false,
      key: "dragger",
      fixed: "left",
      displayTitle: "",
      customContent: (props) => <FrxGridDragHandle {...props} />,
      hidden: false,
    },
    {
      position: 2,

      pixelWidth: 150,
      isFilterable: false,
      key: "priority",
      fixed: "left",
      displayTitle: "ALTERNATIVE PRIORITY",

      hidden: false,
    },
    {
      position: 3,

      pixelWidth: 120,
      key: "alternative_rxcui",
      displayTitle: "RXCUI",
      isFilterable: false,
      dataType: "number",

      hidden: false,
    },
    {
      position: 4,

      pixelWidth: 200,
      key: "label_name",
      isFilterable: false,
      showToolTip: false,
      displayTitle: "LABEL NAMES",
      dataType: "string",

      hidden: false,
    },
    {
      position: 5,

      isFilterable: false,
      pixelWidth: 75,
      key: "delete",
      displayTitle: "DELETE",
      customContent: (props) => {
        return (
          <svg
            style={{ cursor: "pointer" }}
            width="9"
            height="13"
            viewBox="0 0 9 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 10.875C0.75 11.5625 1.3125 12.125 2 12.125H7C7.6875 12.125 8.25 11.5625 8.25 10.875V3.375H0.75V10.875ZM8.875 1.5H6.6875L6.0625 0.875H2.9375L2.3125 1.5H0.125V2.75H8.875V1.5Z"
              fill="#AAAAAA"
            />
          </svg>
        );
      },

      hidden: false,

      showToolTip: false,
    },
  ];
};
