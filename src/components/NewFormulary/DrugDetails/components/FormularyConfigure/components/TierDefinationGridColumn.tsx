
import { Column } from "../../../../../../models/grid.model";
import { textFilters } from "../../../../../../utils/grid/filters";

export const tierDefinationColumns: () => Column<any>[] = () => {
    return [
      {
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 100,
        key: "tier_name",
        displayTitle: "Tier Name",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
      {
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 122,
        key: "tier_label",
        displayTitle: "Tier Description",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
      {
        position: 3,
        sorter: {},
        textCase: "upper",
        pixelWidth: 137,
        key: "current_count",
        displayTitle: "Current Count",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
      {
        position: 4,
        sorter: {},
        textCase: "upper",
        pixelWidth: 163,
        key: "added_count",
        displayTitle: "added",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
  
      {
        position: 5,
        sorter: {},
        textCase: "upper",
        pixelWidth: 100,
        key: "removed_count",
        displayTitle: "Removed",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
      {
        position: 6,
        sorter: {},
        textCase: "upper",
        pixelWidth: 109,
        key: "is_validated",
        displayTitle: "Validation",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      }
    ];
  };