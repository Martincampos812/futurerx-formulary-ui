import React from "react";
import RadioButton from "../../../shared/Frx-components/radio-button/RadioButton";
import getClassificationName from "../../Utils/FormularyClassificationUtils";
import getSubmissionMonth from "../../Utils/SubmissionMonthUtils";
import { getformulary } from "../../../../redux/slices/formulary/setup/setupService";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class FormularyExpandedGeneralDetails extends React.Component<
  any,
  any
> {
  state = {
    formularyType: '',
    formularyName: '',
    formularyAbbrevation: '',
    methodofFormularyBuild:'Y',
    effectiveDate:'',
    serviceYear: '',
    formularyDescription: '',
    formularyClassificationSystem: '',
    formularySubmissionMonth: '',
  };

  fetchFormulary = async () => {
    try {
      let formularyData = await getformulary(this.props.rowData.formularyId);
      if(formularyData.formulary_info){
        this.setState({
          formularyType: this.props.rowData.lob,
          formularyName: this.props.rowData.fromularyName,
          formularyAbbrevation: formularyData.formulary_info.abbreviation ===  null ? '' : formularyData.formulary_info.abbreviation,
          methodofFormularyBuild: formularyData.formulary_info.formulary_build_method,
          effectiveDate: formularyData.formulary_info.effective_date,
          serviceYear: this.props.rowData.serviceYear,
          formularyDescription: formularyData.formulary_info.formulary_description,
          formularyClassificationSystem: getClassificationName(formularyData.formulary_info.id_classification_system),
          formularySubmissionMonth: formularyData.formulary_info.id_submission_month === null ? '' : getSubmissionMonth(formularyData.formulary_info.id_submission_month),
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount(){
    if(this.props.rowData){
      console.log('Row data is:'+JSON.stringify(this.props.rowData));
      this.fetchFormulary();
    }
  }

  render() {
    return (
      <div className="formulary-expanded-details-right__content">
        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY TYPE
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">{this.state.formularyType}</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY NAME
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">{this.state.formularyName}</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">ABBREVIATION</div>
          <div className="formulary-info-field__value">{this.state.formularyAbbrevation}</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            Method of Formulary Build
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value radio-group">
            <RadioGroup
              className="radio-group-custom"
              aria-label={this.state.methodofFormularyBuild}
              name="method"
              value={this.state.methodofFormularyBuild}>
              <FormControlLabel
                disabled={true}
                value="C"
                control={<Radio />}
                label="Clone"/>
              <FormControlLabel
                disabled={true}
                value="U"
                control={<Radio />}
                label="Upload"/>
              <FormControlLabel
                disabled={true}
                value="N"
                control={<Radio />}
                label="Create New"/>
            </RadioGroup>
          </div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">EFFECTIVE DATE</div>
          <div className="formulary-info-field__value">{this.state.effectiveDate}</div>
        </div>
        <div className="formulary-info-field">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            SERVICE YEAR
            <span className="formulary-info-field__required">*</span>
          </div>
          <div className="formulary-info-field__value">{this.state.serviceYear}</div>
        </div>

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY DESCRIPTION
          </div>
          <div className="formulary-info-field__value">
            {this.state.formularyDescription}
          </div>
        </div>

        <div className="formulary-info-field">
          {this.state.formularyType !== 'Commercial' ? (
            <>
            <div className="formulary-info-field__label">
              Which prior year's formulary does this most closely resemble?
            </div>
            <div className="formulary-info-field__value"></div>
            </>
          ) : null}
        </div>                

        <div className="formulary-info-field">
          <div className="formulary-info-field__label">
            FORMULARY CLASSIFICATION SYSTEM
          </div>
          <div className="formulary-info-field__value radio-group">
            <RadioGroup
              className="radio-group-custom"
              aria-label={this.state.formularyClassificationSystem}
              name="classification"
              value={this.state.formularyClassificationSystem}>
                {this.state.formularyType !== 'Commercial' ? (
                  <>
                  <FormControlLabel
                  disabled={true}
                  value="USP"
                  control={<Radio />}
                  label="USP"/>
                  <FormControlLabel
                  disabled={true}
                  value="AHFS"
                  control={<Radio />}
                  label="AHFS"/>
                  </>
                ): null}
              <FormControlLabel
                disabled={true}
                value="Medispan"
                control={<Radio />}
                label="Medispan"/>
            </RadioGroup>
          </div>
        </div>

        <div className="formulary-info-field">
          {this.state.formularyType !== 'Commercial' ? (
            <>
              <div className="formulary-info-field__label">SUBMISSION MONTH</div>
              <div className="formulary-info-field__value">{this.state.formularySubmissionMonth}</div>
            </>
          ): null}
        </div>
      </div>
    );
  }
}
