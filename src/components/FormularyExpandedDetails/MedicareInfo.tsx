import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "../NewFormulary/DrugDetails/components/FormularyConfigure/components/PanelHeader";
import { connect } from "react-redux";
import { Checkbox } from "antd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class MedicareInfo extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      checkedOptions: [],
    };
  }

  componentDidMount() {
    const checkedIds: number[] = [];
    this.props.medicareContractTypes.forEach((checkedOptions) => {
      checkedIds.push(checkedOptions.id_medicare_contract_type);
    });

    this.props.medicareOption.forEach((allOption) => {
      if (checkedIds.includes(allOption.id_medicare_contract_type)) {
        allOption["isChecked"] = true;
      }
    });

    this.setState({
      checkedOptions: this.props.medicareOption,
    });
  }

  render() {
    const { checkedOptions } = this.state;
    return (
      <Grid container>
        <Grid item xs={6}>
          <div className="group">
            <label className="mb-16">
              MEDICARE CONTRACT TYPE <span className="astrict">*</span>
            </label>
            <div className="checkbox-ul medicare-information-container__checkbox-ul">
              {checkedOptions.map((option) => (
                <div className="checkbox-wrapper other-checkbox-wrapper">
                  <Checkbox
                    className="custom-checkbox mb-16 checkbox-antd"
                    checked={option.isChecked}
                    disabled={true}
                  >
                    {option.medicare_contract_type}
                  </Checkbox>
                </div>
              ))}
              <div className="checkbox-wrapper other-checkbox-wrapper">
                <Checkbox
                  className="custom-checkbox mb-16 checkbox-antd"
                  onChange={() => {}}
                  disabled={true}
                >
                  Other
                </Checkbox>
                {this.props?.generalInfo?.medicare_types_ref_other && (
                  <div>
                    <input
                      type="text"
                      className="setup-input-fields other-input"
                      onChange={() => {}}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className="field-group group setup-panel">
            <PanelHeader
              className="field-group__label-container"
              title="FORMULARY ID"
              tooltip="FORMULARY ID"
              required={true}
            />

            <div>
              <input
                type="text"
                className="setup-input-fields field-group__text-field"
                disabled={true}
                value={this.props.cmsFormularyId}
              />
            </div>

            <div className="field-group__post-fix-text text-tran-none">
              NOTE: Formulary ID assigned by CMS fter initial submission in HPMS
            </div>
          </div>

          <div className="field-group group setup-panel">
            <PanelHeader
              title="OPTIONAL ABRIDGED FORMULARY CREATION"
              tooltip="OPTIONAL ABRIDGED FORMULARY CREATION"
              required={true}
            />
            <div className="radio-group field-group__radio-group">
              <RadioGroup
                className="radio-group-custom mr-80"
                aria-label={"abridged"}
                name={"abridged"}
                value={this.props.abridgedCreation}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default MedicareInfo;
