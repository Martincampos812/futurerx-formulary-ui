import React from "react";
import { checkIfFFFApplicable } from "./MassMaintenanceFFF";

class MMFFFReplace extends React.Component<any, any> {
  render() {
    const { drug } = this.props;

    return (
      <>
        <div className="mm-configure-pa-auth-grid-item" key={drug.id_formulary}>
          <div>
            <span className="font-style">{drug.formulary_name}</span>
          </div>
          {checkIfFFFApplicable(drug) ? (
            <p>
              Drugs selected will be flagged as Yes for this File
              Type/Supplemental Benefit.
            </p>
          ) : (
            <p>Not applicable for this formulary</p>
          )}
        </div>
      </>
    );
  }
}

export default MMFFFReplace;
