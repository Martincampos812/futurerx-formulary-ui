import React from "react";
import DropDown from "../../../shared/Frx-components/dropdown/DropDown";

export default class FormularyExpandedTiersDetails extends React.Component<
  any,
  any
> {
  render() {
    return (
      <>
        <div className="formulary-expanded-details-right__content_1">
          <div className="formulary-info-field">
            <div className="formulary-info-field__label">
              NUMBER OF TIERS
              <span className="formulary-info-field__required">*</span>
            </div>
            <div className="formulary-info-field__value custom-dropdown-for-tire-info">
              <DropDown value={"1"} disabled options={["1", "2"]} />
            </div>
          </div>
          <div className="tire-info-holder">
            <div className="formulary-info-field">
              <div className="formulary-info-field__label">
                Tire 0<span className="formulary-info-field__required">*</span>
              </div>
              <DropDown disabled value={"OTC"} options={["OTC"]} />
            </div>
            <div className="formulary-info-field">
              <div className="formulary-info-field__label">
                Tire 1<span className="formulary-info-field__required">*</span>
              </div>
              <DropDown disabled options={["1", "2"]} />
            </div>
            <div className="formulary-info-field">
              <div className="formulary-info-field__label">
                Tire 2<span className="formulary-info-field__required">*</span>
              </div>
              <DropDown disabled options={["1", "2"]} />
            </div>
          </div>
        </div>
        <div className="formulary-expanded-details-right__content">
          <div className="formulary-info-field"></div>
          <div className="formulary-info-field"></div>
          <div className="formulary-info-field">
            <button
              onClick={() => this.props.formularyToggle()}
              className="Button select-formulary-popup-root__submit-btn"
            >
              View Full Formulary
            </button>
          </div>
        </div>
      </>
    );
  }
}
