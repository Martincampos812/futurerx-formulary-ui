import React from "react";
import { checkIfFFFApplicable } from "./MassMaintenanceFFF";

class MMFFFRemove extends React.Component<any, any> {
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
              Drugs selected will have flag removed for this File
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

export default MMFFFRemove;
