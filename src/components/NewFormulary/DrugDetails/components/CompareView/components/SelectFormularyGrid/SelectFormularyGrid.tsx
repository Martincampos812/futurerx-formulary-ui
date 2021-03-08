import React, { Component } from "react";

class SelectFormularyGrid extends Component {
  render() {
    return (
      <div>
        <h1></h1>
      </div>
    );
  }
}

export default SelectFormularyGrid;
// {this.state.isSelectFormularyPopUpEnabled ? (
//     <FrxDialogPopup
//       positiveActionText=""
//       negativeActionText="Close"
//       title={
//         this.state.PopUpType === PopUpTypes.TYPE1
//           ? "Select Formulary"
//           : "View Full Formulary"
//       }
//       handleClose={this.closeSelectFormularies}
//       handleAction={this.action}
//       open={this.state.isSelectFormularyPopUpEnabled}
//       showActions={false}
//       className=""
//       height="80%"
//       width="90%"
//     >
//       {this.state.PopUpType === PopUpTypes.TYPE1 ? (
//         <SelectFormularyPopUp
//           formularyToggle={this.formularyToggle}
//         />
//       ) : (
//         <ViewFullFormulary />
//       )}
//     </FrxDialogPopup>
//   ) : null}
