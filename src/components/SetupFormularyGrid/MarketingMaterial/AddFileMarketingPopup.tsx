import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import Box from '@material-ui/core/Box';
import Button from "../../shared/Frx-components/button/Button";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import { addFileMarketingColumns } from "../../../utils/grid/columns";
import { AddFileMarketingMockData } from "../../../mocks/AddFileMarketingMock";
import "./MarketingMaterial.scss";



export default class AddFileMarketingPopup extends React.Component<any, any> {
  render() {
    return (
        <div className="bordered">
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="TIER"
            enableSettings
            columns={addFileMarketingColumns()}
            scroll={{ x: 2000, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={AddFileMarketingMockData()}
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
            }}
          />
        </div>
    );
  }
}
