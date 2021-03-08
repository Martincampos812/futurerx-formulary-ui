import React from "react";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import { connect } from "react-redux";
import { Checkbox } from "antd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class MedicareInformation extends React.Component<any, any> {
  state = {
    abridged_forumulary_creation: null,
    cms_formulary_id: null,
    is_disabled: ['H']
  };
  getRemovedID = (medicareInfo: any) => {
    const updatedMedicareInfo: any = { ...medicareInfo };
    const updatedMedicareInfoContract: any = [
      ...updatedMedicareInfo.medicare_contract_types,
    ];
    let removedId: any = [];
    const getAllId =
      this.props.medicare_contract_types !== undefined
        ? this.props.medicare_contract_types
            .filter(
              (e) =>
                updatedMedicareInfoContract.indexOf(
                  e.id_medicare_contract_type
                ) === -1
            )
            .map((e) => e.id_medicare_contract_type)
        : [];
    const getStaticId = this.props.contract_types
      .filter(
        (e) =>
          !e.is_custom && getAllId.indexOf(e.id_medicare_contract_type) > -1
      )
      .map((e) => e.id_medicare_contract_type);
    const fetchedStaticId =
      this.props.medicare_contract_types !== undefined
        ? this.props.medicare_contract_types
            .filter(
              (e) => getStaticId.indexOf(e.id_medicare_contract_type) > -1
            )
            .map((e) => e.id_formulary_medicare_contract)
        : [];
    const getCustomId = this.props.contract_types
      .filter(
        (e) => e.is_custom && getAllId.indexOf(e.id_medicare_contract_type) > -1
      )
      .map((e) => e.id_medicare_contract_type);
    const hasOwnPropertyCheck = updatedMedicareInfo.custom_medicare_contract_type.hasOwnProperty(
      "medicare_contract_type"
    );
    let fetchedCustomId: any = [];
    if (
      !hasOwnPropertyCheck ||
      updatedMedicareInfo.custom_medicare_contract_type
        .id_medicare_contract_type === null
    ) {
      fetchedCustomId =
        this.props.medicare_contract_types !== undefined
          ? this.props.medicare_contract_types
              .filter(
                (e) => getCustomId.indexOf(e.id_medicare_contract_type) > -1
              )
              .map((e) => e.id_formulary_medicare_contract)
          : [];
    }
    removedId = [...fetchedStaticId, ...fetchedCustomId];
    return removedId;
  };
  onMedicareCheck = (id: any) => {
    const updatedMedicareInfo: any = { ...this.props.medicareInfo };
    const updatedMedicareInfoContract: any = [
      ...updatedMedicareInfo.medicare_contract_types,
    ];
    const index = updatedMedicareInfoContract.indexOf(id);
    if (index > -1) {
      updatedMedicareInfoContract.splice(index, 1);
    } else {
      updatedMedicareInfoContract.push(id);
    }
    updatedMedicareInfo.medicare_contract_types = updatedMedicareInfoContract;
    const removedId = this.getRemovedID(updatedMedicareInfo);
    updatedMedicareInfo.removed_formulary_medicare_contracts = removedId;
    this.props.medicareCheck(updatedMedicareInfo);
  };

  getCheckboxData = () => {
    let data = null;
    const medicareInfo = this.props.medicareInfo;
    const staticID = medicareInfo.medicare_contract_types;
    const staticOptions = this.props.contract_types !== null ? this.props.contract_types.filter((e) => e.is_custom === false) : [];
    const isMMP = this.props.generalInfo.type_id === 2;
    if (this.props.contract_types !== null) {
      data = staticOptions.map((e) => {
        const isChecked = staticID.indexOf(e.id_medicare_contract_type) > -1;
        return (
          <div>
            <Checkbox
              className="custom-checkbox mb-16"
              disabled={isMMP && this.state.is_disabled.indexOf(e.code_value) > -1}
              onChange={() => this.onMedicareCheck(e.id_medicare_contract_type)}
              checked={isChecked}
            >
              {e.medicare_contract_type}
            </Checkbox>
          </div>
        );
      });
    }
    return data;
  };
  onAbridgedHandler = (e) => {
    const val =
      e.target.value === "true"
        ? true
        : e.target.value === "false"
        ? false
        : null;
    const newObj = {
      abridged_forumulary_creation: val,
      cms_formulary_id: this.props.others.cms_formulary_id,
    };
    this.setState({
      abridged_forumulary_creation: val,
    });
    this.props.onOthersChange(newObj);
  };
  onCmsFormularyIDHandler = (e) => {
    const val = e.target.value;
    const newObj = {
      abridged_forumulary_creation: this.props.others
        .abridged_forumulary_creation,
      cms_formulary_id: val,
    };
    this.setState({
      cms_formulary_id: val,
    });
    this.props.onOthersChange(newObj);
  };
  onCustomCheckboxHandler = (e) => {
    const medInfo = { ...this.props.medicareInfo };
    if (!e.target.checked) {
      medInfo.custom_medicare_contract_type = {};
    } else {
      medInfo.custom_medicare_contract_type = {
        code_value: null,
        id_medicare_contract_type: null,
        is_custom: true,
        medicare_contract_type: "",
      };
    }
    const removedId = this.getRemovedID(medInfo);
    medInfo.removed_formulary_medicare_contracts = removedId;
    this.props.medicareCheck(medInfo);
  };
  onCustomInputChange = (e) => {
    const medInfo = { ...this.props.medicareInfo };
    const medicareContractType = { ...medInfo.custom_medicare_contract_type };
    medicareContractType.medicare_contract_type = e.target.value;
    medInfo.custom_medicare_contract_type = medicareContractType;
    this.props.medicareCheck(medInfo);
  };
  getCustomCheckbox = () => {
    let input: any;
    const custom_val = this.props.medicareInfo.custom_medicare_contract_type;
    const isCustomCheck = this.props.medicareInfo.custom_medicare_contract_type.hasOwnProperty(
      "medicare_contract_type"
    );
    if (isCustomCheck) {
      input = (
        <div className="custom-input-wrapper">
          <input
            type="text"
            className="add-new-cbx"
            value={custom_val.medicare_contract_type}
            onChange={this.onCustomInputChange}
          />
        </div>
      );
    }
    let element = (
      <div>
        <Checkbox
          className="custom-checkbox mb-16"
          onChange={this.onCustomCheckboxHandler}
          checked={isCustomCheck}
        >
          Other
        </Checkbox>
        {input}
      </div>
    );
    return element;
  };
  render() {
    return (
      <div className="medicare-information-container">
        <h4>Medicare Information</h4>
        <div className="medicare-information-container__wrapper setup-label">
          <Grid container>
            <Grid item xs={6}>
              <div className="group">
                <label className="mb-16">
                  MEDICARE CONTRACT TYPE <span className="astrict">*</span>
                </label>
                <div className="checkbox-ul medicare-information-container__checkbox-ul">
                  {this.getCheckboxData()}
                  {this.getCustomCheckbox()}
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
                    value={this.props.others.cms_formulary_id}
                    className="setup-input-fields field-group__text-field"
                    onChange={this.onCmsFormularyIDHandler}
                    maxLength={8}
                  />
                </div>

                <div className="field-group__post-fix-text text-tran-none">
                  NOTE: Formulary ID assigned by CMS after initial submission in
                  HPMS
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
                    value={this.props.others.abridged_forumulary_creation}
                    onClick={this.onAbridgedHandler}
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    mode: state?.application?.mode,
    contract_types: state?.setupOptions?.medicareOptions,
    medicare_contract_types: state?.setup?.formulary?.medicare_contract_types,
  };
};
export default connect(mapStateToProps)(MedicareInformation);
