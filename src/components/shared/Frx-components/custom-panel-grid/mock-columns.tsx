import React from "react";
import { Column } from "../../../../models/grid.model";
import FrxImageCell from "./FrxImageCell/FrxImageCell";

export const cutomPanelGridMockColumns: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "tier_name",
      displayTitle: "TIER NAME",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 3,
      sorter: {},
      textCase: "upper",
      pixelWidth: 150,
      key: "tier_label",
      displayTitle: "TIER DESCRIPTION",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 4,
      sorter: {},
      textCase: "upper",
      pixelWidth: 137,
      key: "current_count",
      displayTitle: "CURRENT COUNT",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 5,
      sorter: {},
      textCase: "upper",
      pixelWidth: 163,
      key: "added_count",
      displayTitle: "ADDED",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },

    {
      position: 6,
      sorter: {},
      textCase: "upper",
      pixelWidth: 150,
      key: "removed_count",
      displayTitle: "REMOVED",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 7,
      sorter: {},
      textCase: "upper",
      pixelWidth: 109,
      key: "image",
      displayTitle: "VALIDATION",
      cellWrapper: (props: any) => {
        console.log("Image props:",props);
        return <FrxImageCell
        data={props.data ? props.data : ""}
        // img={require("./../../mocks/sample.svg")}
        img={props?.children?.props?.dataRow?.image}
      />
      },
      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    }
  ];
};
