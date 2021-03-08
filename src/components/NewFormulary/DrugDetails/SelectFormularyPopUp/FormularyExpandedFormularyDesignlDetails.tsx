import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";

export default class FormularyExpandedFormularyDesignlDetails extends React.Component<
  any,
  any
> {
  render() {
    return (
      <div className="formulary-expanded-details-right__content_2">
        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCLUDED IN THIS FORMULARY?
            <svg
              style={{ marginLeft: "0.5em" }}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.3335 3.66671H7.66683V5.00004H6.3335V3.66671ZM6.3335 6.33337H7.66683V10.3334H6.3335V6.33337ZM7.00016 0.333374C3.32016 0.333374 0.333496 3.32004 0.333496 7.00004C0.333496 10.68 3.32016 13.6667 7.00016 13.6667C10.6802 13.6667 13.6668 10.68 13.6668 7.00004C13.6668 3.32004 10.6802 0.333374 7.00016 0.333374ZM7.00016 12.3334C4.06016 12.3334 1.66683 9.94004 1.66683 7.00004C1.66683 4.06004 4.06016 1.66671 7.00016 1.66671C9.94016 1.66671 12.3335 4.06004 12.3335 7.00004C12.3335 9.94004 9.94016 12.3334 7.00016 12.3334Z"
                fill="#1D54B4"
              />
            </svg>
          </div>
          <div className="formulary-info-field__value">
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 1"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 2"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 3"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="N/A"
              labelPlacement="end"
            />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            ARE PART D DRUGS REQUIRED IN PART B STEP THERAPY PROTOCOLS?
            <span className="formulary-info-field__required">*</span>
            <svg 
              style={{ marginLeft: "0.5em" }}
              width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.3335 3.66671H7.66683V5.00004H6.3335V3.66671ZM6.3335 6.33337H7.66683V10.3334H6.3335V6.33337ZM7.00016 0.333374C3.32016 0.333374 0.333496 3.32004 0.333496 7.00004C0.333496 10.68 3.32016 13.6667 7.00016 13.6667C10.6802 13.6667 13.6668 10.68 13.6668 7.00004C13.6668 3.32004 10.6802 0.333374 7.00016 0.333374ZM7.00016 12.3334C4.06016 12.3334 1.66683 9.94004 1.66683 7.00004C1.66683 4.06004 4.06016 1.66671 7.00016 1.66671C9.94016 1.66671 12.3335 4.06004 12.3335 7.00004C12.3335 9.94004 9.94016 12.3334 7.00016 12.3334Z" fill="#1D54B4"/>
            </svg>
          </div>
          <div className="formulary-info-field__value">
            {" "}
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-type-material-radio"
            />
            <RadioButton label="No" name="pa-type-material-radio" />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            DO ANY DRUGS IN THE FORMULARY HAVE QUANTITY LIMITS?
            <span className="formulary-info-field__required">*</span>
            <svg 
              style={{ marginLeft: "0.5em" }}
              width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.3335 3.66671H7.66683V5.00004H6.3335V3.66671ZM6.3335 6.33337H7.66683V10.3334H6.3335V6.33337ZM7.00016 0.333374C3.32016 0.333374 0.333496 3.32004 0.333496 7.00004C0.333496 10.68 3.32016 13.6667 7.00016 13.6667C10.6802 13.6667 13.6668 10.68 13.6668 7.00004C13.6668 3.32004 10.6802 0.333374 7.00016 0.333374ZM7.00016 12.3334C4.06016 12.3334 1.66683 9.94004 1.66683 7.00004C1.66683 4.06004 4.06016 1.66671 7.00016 1.66671C9.94016 1.66671 12.3335 4.06004 12.3335 7.00004C12.3335 9.94004 9.94016 12.3334 7.00016 12.3334Z" fill="#1D54B4"/>
            </svg>
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-theray-type-material-radio"
            />
            <RadioButton label="No" name="pa-theray-type-material-radio" />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            WHAT STEP THERAPY TYPE(S) ARE INCLUDED IN THIS FORMULARY?
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 1"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="Type 2"
              labelPlacement="end"
            />
            <FormControlLabel
              className="custom-checkbox-label"
              value="end"
              control={
                <Checkbox
                  className="custom-checkbox-svg-style"
                  color="primary"
                />
              }
              label="N/A"
              labelPlacement="end"
            />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES?
            <span className="formulary-info-field__required">*</span>
            <svg 
              style={{ marginLeft: "0.5em" }}
              width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.3335 3.66671H7.66683V5.00004H6.3335V3.66671ZM6.3335 6.33337H7.66683V10.3334H6.3335V6.33337ZM7.00016 0.333374C3.32016 0.333374 0.333496 3.32004 0.333496 7.00004C0.333496 10.68 3.32016 13.6667 7.00016 13.6667C10.6802 13.6667 13.6668 10.68 13.6668 7.00004C13.6668 3.32004 10.6802 0.333374 7.00016 0.333374ZM7.00016 12.3334C4.06016 12.3334 1.66683 9.94004 1.66683 7.00004C1.66683 4.06004 4.06016 1.66671 7.00016 1.66671C9.94016 1.66671 12.3335 4.06004 12.3335 7.00004C12.3335 9.94004 9.94016 12.3334 7.00016 12.3334Z" fill="#1D54B4"/>
            </svg>
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-restricted-material-radio"
            />
            <RadioButton label="No" name="pa-restricted-material-radio" />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL?
            <span className="formulary-info-field__required">*</span>
            <svg 
              style={{ marginLeft: "0.5em" }}
              width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.3335 3.66671H7.66683V5.00004H6.3335V3.66671ZM6.3335 6.33337H7.66683V10.3334H6.3335V6.33337ZM7.00016 0.333374C3.32016 0.333374 0.333496 3.32004 0.333496 7.00004C0.333496 10.68 3.32016 13.6667 7.00016 13.6667C10.6802 13.6667 13.6668 10.68 13.6668 7.00004C13.6668 3.32004 10.6802 0.333374 7.00016 0.333374ZM7.00016 12.3334C4.06016 12.3334 1.66683 9.94004 1.66683 7.00004C1.66683 4.06004 4.06016 1.66671 7.00016 1.66671C9.94016 1.66671 12.3335 4.06004 12.3335 7.00004C12.3335 9.94004 9.94016 12.3334 7.00016 12.3334Z" fill="#1D54B4"/>
            </svg>
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-included-material-radio"
            />
            <RadioButton label="No" name="pa-included-material-radio" />
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">
            <RadioButton
              label="Yes"
              defaultChecked={true}
              name="pa-expedited-material-radio"
            />
            <RadioButton label="No" name="pa-expedited-material-radio" />
          </div>
        </div>
        <div className="formulary-info-field">
          <button
            onClick={() => this.props.formularyToggle()}
            className="Button select-formulary-popup-root__submit-btn"
          >
            View Full Formulary
          </button>
        </div>
      </div>
    );
  }
}
