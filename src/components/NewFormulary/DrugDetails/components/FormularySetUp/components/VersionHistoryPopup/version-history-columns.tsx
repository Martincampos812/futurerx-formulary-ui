import {
  numberFilters,
  textFilters,
  dateFilters
} from "../../../../../../../utils/grid/filters";
import { Column } from "../../../../../../../models/grid.model";
import { VersionHistoryData } from "./version-hisory.model";

export const versionHistoryColumns: () => Column<VersionHistoryData>[] = () => [
  {
    position: 1,
    sorter: {},
    textCase: "sentence",
    pixelWidth: 100,
    key: "contract_year",
    displayTitle: "Service Year",
    isFilterable: true,
    dataType: "number",
    fixed: "left",
    // className: "entry-component",
    // toolTip: (props) => <FrxGridToolTip {...props} />,
    // showToolTip: true,
    filters: numberFilters,
    hidden: false,
    sortDirections: ["ascend", "descend"]
  },
  {
    position: 2,
    sorter: {},
    textCase: "sentence",
    isFilterable: true,
    pixelWidth: 160,
    key: "lob_name",
    displayTitle: "LOB",
    dataType: "string",
    filters: textFilters,
    hidden: false,
    sortDirections: ["ascend", "descend"]
  },
  {
    position: 3,
    sorter: {},
    textCase: "sentence",
    isFilterable: true,
    pixelWidth: 170,
    key: "formulary_name",
    displayTitle: "Formulary Name",
    dataType: "string",

    filters: textFilters,

    hidden: false,
    sortDirections: ["ascend", "descend"]
  },
  {
    position: 4,
    textCase: "sentence",
    sorter: {},
    className: "entry-component",
    isFilterable: true,
    pixelWidth: 100,
    key: "version_number",
    displayTitle: "Version",
    dataType: "number",
    filters: numberFilters,
    hidden: false,
    sortDirections: ["ascend", "descend"]
  },
  {
    position: 5,
    sorter: {},
    textCase: "sentence",
    isFilterable: true,
    pixelWidth: 150,
    key: "insert_datetime",
    displayTitle: "Last Updated Date",
    dataType: "date",
    filters: dateFilters,
    hidden: false,
    sortDirections: ["ascend", "descend"]
  },
  {
    position: 6,
    sorter: {},
    textCase: "sentence",
    isFilterable: true,
    pixelWidth: 100,
    key: "status",
    displayTitle: "Status",
    dataType: "string",
    filters: textFilters,
    hidden: false,
    sortDirections: ["ascend", "descend"]
  }
];
