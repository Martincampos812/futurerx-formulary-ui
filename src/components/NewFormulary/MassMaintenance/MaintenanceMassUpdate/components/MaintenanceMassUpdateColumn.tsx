import React from "react";
import {Column} from "../../../../../models/grid.model";
import {Tooltip} from "antd";
//  "../../../../../models/grid.model";
import {dateFilters, textFilters} from "../../../../../utils/grid/filters";
// "../../../../../utils/grid/filters";
import FrxStatusField from "../../../../shared/FrxStatusField/FrxStatusField";
import FrxLob from "../../../../shared/FrxGrid/FrxLobField/FrxLob";
export const getMaintenacneMassUpdateColumns:
(
  data?,
  hiddenColumns?
) => Column<any>[] = (data, hiddenColumns) => {
  return [
    {
      id: 1,
      position: 1,
      sorter: {},
      textCase: "upper",
      pixelWidth: 120,
      key: "createdOn",
      displayTitle: "created On",
      isFilterable: true,   
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 2,
      position: 2,
      sorter: {},
      textCase: "upper",
      pixelWidth: 120,
      key: "createdBy",
      displayTitle: "Created By",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 3,
      position: 3,
      sorter: {},
      textCase: "upper",
      pixelWidth: 120,
      key: "lob",
      displayTitle: "lob",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
      // customContent: (props) => (
      //   <FrxStatusField
      //     text={props.data.lob}
      //     type={"pill"}
      //     // fill={"pill"}
      //     variant={props.data.lob == "medicare" ? 4 : 1}
      //   />
      // ),
      customContent:(props) => (
        <>
        <FrxLob
        lob={props.data.lob}
        />
        </>
      ),
      //   render: (lob) => <span style={{color: "red"}}>{lob}</span>,
    },
    {
      position: 4,
      sorter: {},
      textCase: "upper",
      pixelWidth: 163,
      key: "formularyName",
      displayTitle: "formulary name",
      customContent: (props) => (
        <div
        //   className="input-link"
        //   onClick={() => data.onFormularyNameClick(props.data.key)}
         >
           <Tooltip overlayClassName="tooltip-formulary_name" color="#fff" placement="rightTop" title={props.data.formularyName.split(',').map((item, id) =>  <div key={id + 1} className="formulary-name">{id + 1}&nbsp;-&nbsp;{item.trim()}</div>) }>
            {props.data.formularyName ? props.data.formularyName.length > 18 ? props.data.formularyName.slice(0, 18) + "..." : props.data.formularyName : null}
          </Tooltip>
        </div>
      ),
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden:
        hiddenColumns && hiddenColumns.indexOf("formulary_name") !== -1
          ? true
          : false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 5,
      position: 5,
      sorter: {},
      textCase: "upper",
      pixelWidth: 120,
      key: "formularyId",
      displayTitle: "formulary Id(s)",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 6,
      position: 6,
      sorter: {},
      textCase: "upper",
      pixelWidth: 120,
      key: "status",
      displayTitle: "status",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
  ];
};
