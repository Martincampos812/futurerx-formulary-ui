import React from "react";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import { claimsGridColumnsForPaid } from "../../../utils/grid/columns";
import { getClaimsGridData } from "../../../mocks/grid/claims-mock";

export default function Medicaid() {
  // if (props.grid === 1)
  //   return (
  //     <FrxGridContainer
  //       enableSearch={false}
  //       enableColumnDrag
  //       onSearch={() => {}}
  //       fixedColumnKeys={[""]}
  //       pagintionPosition="topRight"
  //       gridName=""
  //       isFetchingData={false}
  //       columns={claimsGridColumnsForPaid()}
  //       scroll={{ x: 3800, y: 377 }}
  //       enableResizingOfColumns
  //       data={getClaimsGridData()}
  //       // pinning columns
  //       isPinningEnabled={true}
  //       // setting gear 1st column
  //       enableSettings={true}
  //       // checkbox 2nd column
  //       isCustomCheckboxEnabled={true}
  //       // event reference for checkbox (mandotory if checkbox is true)
  //       handleCustomRowSelectionChange={(r) => {
  //         console.log(r);
  //       }}
  //       // settingsWidth
  //       settingsWidth={20}
  //       // checkBoxWidth
  //       checkBoxWidth={20}
  //     />
  //   );
  // else
  // return (
  //   <FrxDrugGridContainer
  //     enableSearch={false}
  //     enableColumnDrag
  //     onSearch={() => {}}
  //     fixedColumnKeys={[""]}
  //     pagintionPosition="topRight"
  //     gridName=""
  //     isFetchingData={false}
  //     columns={claimsGridColumnsForPaid()}
  //     scroll={{ x: 3800, y: 377 }}
  //     enableResizingOfColumns
  //     data={getClaimsGridData()}
  //     // pinning columns
  //     isPinningEnabled={true}
  //     // setting gear 1st column
  //     enableSettings={true}
  //     // checkbox 2nd column
  //     isCustomCheckboxEnabled={true}
  //     // event reference for checkbox (mandotory if checkbox is true)
  //     handleCustomRowSelectionChange={(r) => {
  //       console.log(r);
  //     }}
  //     // settingsWidth
  //     settingsWidth={20}
  //     // checkBoxWidth
  //     checkBoxWidth={20}
  //   />
  // );
}
