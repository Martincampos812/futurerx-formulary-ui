import React from 'react';
import { Column } from "../../../../models/grid.model";
import { dateFilters, textFilters } from "../../../../utils/grid/filters";

export const getAllGrievancesColumn: () => Column<any>[] = () => {
    return [
      {
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 172,
        key: "gid",
        displayTitle: "Grievance ID",
        isFilterable: true,
        dataType: "string",
        filters: textFilters,
        hidden: false,
        sortDirections: []
      },
      {
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 150,
        key: "date",
        isFilterable: true,
        showToolTip: false,
        displayTitle: "DATE",
        dataType: "date",
        filters: dateFilters,
        hidden: false,
        sortDirections: [],
      },
      {
        position: 3,
        sorter: {},
        textCase: "upper",
        isFilterable: true,
        pixelWidth: 171,
        key: "status",
        displayTitle: "STATUS",
        dataType: "string",
        filters: dateFilters,
        hidden: false,
        sortDirections: [],
        customContent: (text:any) => {
            const statusVal = text.data.status;
            const statusClass = statusVal === 'Open' ? 'status-tag open' : 
                statusVal === 'Closed' ? 'status-tag close' : 
                statusVal === 'Withdrawn' ? 'status-tag withdrawn' : null;
            return React.createElement('em',{className: statusClass},statusVal)
        }
      },
      {
        position: 4,
        textCase: "upper",
        pixelWidth: 326,
        sorter: {},
        isFilterable: true,
        key: "description",
        displayTitle: "GRIEVANCE DESCRIPTION",
        filters: textFilters,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
    ];
  };