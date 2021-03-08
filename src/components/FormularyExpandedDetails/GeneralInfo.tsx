import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Button from ".././shared/Frx-components/button/Button";

const generalInfo = (props: any) => {
  return (
    <>
      <div className="formulary-info-field">
        <div className="formulary-info-field__label">
          FORMULARY TYPE{" "}
          <span className="formulary-info-field__required">*</span>
        </div>
        <div className="formulary-info-field__value">
          {props.generalInfo.formularyType}
        </div>
      </div>

      <div className="formulary-info-field">
        <div className="formulary-info-field__label">
          FORMULARY NAME{" "}
          <span className="formulary-info-field__required">*</span>
        </div>
        <div className="formulary-info-field__value">
          {props.generalInfo.formularyName}
        </div>
      </div>

      <div className="formulary-info-field">
        <div className="formulary-info-field__label">ABBREVIATION</div>
        <div className="formulary-info-field__value">
          {props.generalInfo.formularyAbbrevation}
        </div>
      </div>

      <div className="formulary-info-field">
        <div className="formulary-info-field__label">
          Method of Formulary Build
          <span className="formulary-info-field__required">*</span>
        </div>
        <div className="formulary-info-field__value radio-group">
          <RadioGroup
            className="radio-group-custom"
            aria-label={props.generalInfo.methodofFormularyBuild}
            name="method"
            value={props.generalInfo.methodofFormularyBuild}
          >
            <FormControlLabel
              disabled={true}
              value="C"
              control={<Radio />}
              label="Clone"
            />
            <FormControlLabel
              disabled={true}
              value="U"
              control={<Radio />}
              label="Upload"
            />
            <FormControlLabel
              disabled={true}
              value="N"
              control={<Radio />}
              label="Create New"
            />
          </RadioGroup>
        </div>
      </div>
      <div className="formulary-info-field">
        <div className="formulary-info-field__label">EFFECTIVE DATE</div>
        <div className="formulary-info-field__value">
          {props.generalInfo.effectiveDate}
        </div>
      </div>
      <div className="formulary-info-field">
        {/* <div className="formulary-info-field__label">CLONE FORMULARY<span className="formulary-info-field__required">*</span></div>
            <div className="formulary-info-field__value">Clone Formulary</div> */}
      </div>

      <div className="formulary-info-field">
        <div className="formulary-info-field__label">
          SERVICE YEAR<span className="formulary-info-field__required">*</span>
        </div>
        <div className="formulary-info-field__value">
          {props.generalInfo.serviceYear}
        </div>
      </div>

      <div className="formulary-info-field">
        <div className="formulary-info-field__label">FORMULARY DESCRIPTION</div>
        <div className="formulary-info-field__value">
          {props.generalInfo.formularyDescription}
        </div>
      </div>

      {props.generalInfo.formularyType !== "Commercial" ? (
        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            Which prior year's formulary does this most closely resemble?
          </div>
          <div className="formulary-info-field__value">2019</div>
        </div>
      ) : (
        <div className="formulary-info-field"></div>
      )}

      <div className="formulary-info-field">
        <div className="formulary-info-field__label">
          FORMULARY CLASSIFICATION SYSTEM
        </div>
        <div className="formulary-info-field__value radio-group">
          <RadioGroup
            className="radio-group-custom"
            aria-label={props.generalInfo.formularyClassificationSystem}
            name="classification"
            value={props.generalInfo.formularyClassificationSystem}
          >
            {props.generalInfo.formularyType !== "Commercial" ? (
              <>
                <FormControlLabel
                  disabled={true}
                  value="USP"
                  control={<Radio />}
                  label="USP"
                />
                <FormControlLabel
                  disabled={true}
                  value="AHFS"
                  control={<Radio />}
                  label="AHFS"
                />
              </>
            ) : null}
            <FormControlLabel
              disabled={true}
              value="Medispan"
              control={<Radio />}
              label="Medispan"
            />
          </RadioGroup>
        </div>
      </div>

      {props.generalInfo.formularyType !== "Commercial" ? (
        <div className="formulary-info-field">
          <div className="formulary-info-field__label">SUBMISSION MONTH</div>
          <div className="formulary-info-field__value">October</div>
        </div>
      ) : null}
      <div className="formulary-info-field"></div>
      <div className="formulary-info-field view-fl-field">
        <Box display="flex" justifyContent="flex-end">
          <Button
            className="Button view-fl-btn"
            label="View Full Formulary"
            onClick={() => props.drugDetailClick(props.generalInfo.formulayId)}
          />
        </Box>
      </div>
    </>
  );
};
export default generalInfo;
