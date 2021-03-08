import React from "react";
import Grid from "@material-ui/core/Grid";
import { Checkbox } from "antd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PanelHeader from "../NewFormulary/DrugDetails/components/FormularyConfigure/components/PanelHeader";
class FormularyDesignCommercial extends React.Component<any, any> {
  state = {
    paIndex: 5,
    paIds: [1, 2, 3, 4, 13, 14, 15, 16],
    paKey: "pa",
    paChecked: [],
    stIndex: 6,
    stIds: [9, 10, 11, 21, 22, 23],
    stKey: "st",
    stChecked: [],
    ql: true,
    egs: false,
    dr: false,
    st: false,
    stp: false,
  };

  // designRadioButton = (type) => {
  //   let radioBox: any;
  //   if (this.props.designOptions) {
  //     const id = this.props.designOptions.find((el) => el.edit_name === type)
  //       ?.id_edit;
  //     const value =
  //       this.props.edit_info.indexOf(id) !== -1
  //         ? true
  //         : this.props.edit_info.edits_no.indexOf(id) !== -1
  //         ? false
  //         : null;
  //     return (
  //       <RadioGroup
  //         className="radio-group-custom mr-80"
  //         aria-label={type}
  //         name={type}
  //         value={value}
  //         onClick={(e) => this.props.formularyRadioChange(e, id)}
  //       >
  //         <FormControlLabel value={true} control={<Radio />} label="Yes" />
  //         <FormControlLabel value={false} control={<Radio />} label="No" />
  //       </RadioGroup>
  //     );
  //   }
  //   return radioBox;
  // };

  getChecked = (id) => {
    let isChecked = false;
    if (this.props.edit_info) {
      isChecked =
        this.props.edit_info.filter((e) => e.id_edit === id).length > 0;
    }
    return isChecked;
  };
  renderCustomCheckbox = () => {
    let inputs: any = [];
    const custom = this.props.designOptions.filter((e) => e.is_custom === true);
    if (custom.length > 0) {
      inputs = custom?.map((el, index) => {
        return (
          <div className="custom-input-wrapper">
            <input
              type="text"
              className="add-new-cbx"
              value={el.edit_name}
              disabled
              onChange={() => {}}
            />
          </div>
        );
      });
    }
    let finalEle = (
      <div>
        <Checkbox
          className="custom-checkbox mb-16"
          onChange={() => {}}
          disabled
          checked={custom.length > 0}
        >
          Other
        </Checkbox>
        {inputs}
      </div>
    );
    return finalEle;
  };
  renderCheckbox = () => {
    let checkbox = [];
    let custom = [];
    if (this.props.designOptions) {
      const des_opt = this.props.designOptions?.filter(
        (e) =>
          e.is_custom === false &&
          e.edit_name !== "Prescriber Taxonomy" &&
          e.edit_name !== "N/A"
      );
      custom = this.props.designOptions?.filter((e) => e.is_custom === true);
      let count = 0;
      checkbox = des_opt?.map((el) => {
        return (
          <Grid item xs={6}>
            <Checkbox
              className="custom-checkbox mb-16"
              onChange={() => {}}
              disabled
              checked={this.getChecked(el.id_edit)}
            >
              {el.edit_name}
            </Checkbox>
          </Grid>
        );
      });
    }
    return checkbox;
  };
  renderPrescribeCheckbox = () => {
    let checkbox = [];
    if (this.props.designOptions) {
      const des_opt = this.props.designOptions?.filter(
        (e) => e.is_custom === false && e.edit_name === "Prescriber Taxonomy"
      );
      checkbox = des_opt?.map((el) => {
        return (
          <Checkbox
            className="custom-checkbox mb-16"
            onChange={() => {}}
            disabled
            checked={this.getChecked(el.id_edit)}
          >
            {el.edit_name}
          </Checkbox>
        );
      });
    }
    return checkbox;
  };
  renderNACheckbox = () => {
    let checkbox = [];
    if (this.props.designOptions) {
      const des_opt = this.props.designOptions?.filter(
        (e) => e.is_custom === false && e.edit_name === "N/A"
      );
      checkbox = des_opt?.map((el) => {
        return (
          <Checkbox
            className="custom-checkbox mb-16"
            disabled
            onChange={() => {}}
            checked={this.getChecked(el.id_edit)}
          >
            {el.edit_name}
          </Checkbox>
        );
      });
    }
    return checkbox;
  };

  componentDidMount() {
    const paChecked: any[] = [];
    const stChecked: any[] = [];
    this.props?.edit_info
      ?.filter((data) => {
        if (this.state.paIds.includes(data.id_edit)) return data;
      })
      .forEach((data) => {
        if (data.id_checked) paChecked.push(data.id_edit);
      });

    this.props?.edit_info
      ?.filter((data) => {
        if (this.state.stIds.includes(data.id_edit)) return data;
      })
      .forEach((data) => {
        if (data.id_checked) stChecked.push(data.id_edit);
      });

    this.setState({
      paChecked,
      stChecked,
    });
  }

  isPaChecked = (id: number): boolean => {
    const checks: number[] = [...this.state.paChecked];
    let result = false;
    if (checks.includes(id)) result = true;
    else result = false;
    return result;
  };

  isStChecked = (id: number): boolean => {
    const checks: number[] = [...this.state.stChecked];
    let result = false;
    if (checks.includes(id)) result = true;
    else result = false;
    return result;
  };

  isSelected = (id: number): boolean => {
    let result = false;

    this.props?.edit_info?.some((option) => {
      if (option.id_edit === id) {
        result = option.id_checked;
        return result;
      }
    });
    return result;
  };
  render() {
    return (
      <>
        {this.props.formularyLobId === 1 ? (
          <div className="formulary-design-fields-wrapper setup-label">
            <Grid container>
              <Grid item xs={6}>
                <div className="field-group group setup-panel">
                  <PanelHeader
                    title="WHAT PRIOR AUTHORIZATION TYPES(S) ARE INCLUDED IN THIS FORMULARY?"
                    required={true}
                  />
                  <div className="radio-group field-group__radio-group">
                    {this.props?.designOptions[this.state.paIndex][
                      this.state.paKey
                    ]?.map((pas) => (
                      <div
                        className="label-wrapper checkbox-wrapper"
                        key={pas.id_edit}
                      >
                        <Checkbox
                          className="custom-checkbox mb-16 checkbox-antd"
                          checked={this.isPaChecked(pas.id_edit)}
                          disabled
                        >
                          {pas.edit_name}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="field-group group setup-panel">
                  <PanelHeader
                    title="DO ANY DRUGS IN THE FORMULARY HAVE QUANTITY LIMITS?"
                    required={true}
                  />
                  <div className="radio-group field-group__radio-group">
                    {this.props?.designOptions
                      ?.filter((type) => type.code_value === "QL")
                      .map((ql) => (
                        <RadioGroup
                          className="radio-group-custom mr-80"
                          aria-label={ql.edit_name}
                          name={ql.edit_name}
                          value={this.isSelected(ql.id_edit)}
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
                      ))}
                  </div>
                </div>
                <div className="field-group group setup-panel">
                  <PanelHeader
                    title="IS ACCESS TO ANY FORMULARY DRUG RESTRICTED TO CERTAIN PHARMACIES?"
                    required={true}
                  />
                  <div className="radio-group field-group__radio-group">
                    {this.props?.designOptions
                      ?.filter((type) => type.code_value === "LA")
                      .map((la) => (
                        <RadioGroup
                          className="radio-group-custom mr-80"
                          aria-label={la.edit_name}
                          name={la.edit_name}
                          value={this.isSelected(la.id_edit)}
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
                      ))}
                  </div>
                </div>
                <div className="field-group group setup-panel">
                  <PanelHeader
                    title="SUBJECT TO EXPEDITED GENERIC SUBSTITUTION?"
                    required={true}
                  />
                  <div className="radio-group field-group__radio-group">
                    {this.props?.designOptions
                      ?.filter((type) => type.code_value === "EGS")
                      .map((egs) => (
                        <RadioGroup
                          className="radio-group-custom mr-80"
                          aria-label={egs.edit_name}
                          name={egs.edit_name}
                          value={this.isSelected(egs.id_edit)}
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
                      ))}
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field-group group setup-panel">
                  <PanelHeader
                    title="ARE PART D DRUGS REQUIRED IN PART B STEP THERAPY PROTOCOLS?"
                    required={true}
                  />
                  <div className="radio-group field-group__radio-group">
                    {this.props?.designOptions
                      ?.filter((type) => type.code_value === "PBST")
                      .map((pbst) => (
                        <RadioGroup
                          className="radio-group-custom mr-80"
                          aria-label={pbst.edit_name}
                          name={pbst.edit_name}
                          value={this.isSelected(pbst.id_edit)}
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
                      ))}
                  </div>
                </div>
                <div className="field-group group setup-panel">
                  <PanelHeader
                    title="WHAT STEP THERAPY TYPE(S) ARE INCLUDED IN THIS FORMULARY?"
                    required={true}
                  />
                  <div className="radio-group field-group__radio-group">
                    {this.props?.designOptions[this.state.stIndex][
                      this.state.stKey
                    ]?.map((sts) => (
                      <div
                        className="label-wrapper checkbox-wrapper"
                        key={sts.id_edit}
                      >
                        <Checkbox
                          className="custom-checkbox mb-16 checkbox-antd"
                          checked={this.isStChecked(sts.id_edit)}
                          disabled
                        >
                          {sts.edit_name}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="field-group group setup-panel">
                  <PanelHeader
                    title="ARE OTCS INCLUDED AS PART OF A STEP THERAPY PROTOCOL?"
                    required={true}
                  />
                  <div className="radio-group field-group__radio-group">
                    {this.props?.designOptions
                      ?.filter((type) => type.code_value === "OTC")
                      .map((otc) => (
                        <RadioGroup
                          className="radio-group-custom mr-80"
                          aria-label={otc.edit_name}
                          name={otc.edit_name}
                          value={this.isSelected(otc.id_edit)}
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
                      ))}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className="supplemental-models-container">
            <div className="formulary-design-fields-wrapper setup-label">
              <Grid container>
                <Grid item xs={11}>
                  {this.renderNACheckbox()}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={8}>
                  <Grid container>{this.renderCheckbox()}</Grid>
                </Grid>
                <Grid item xs={4}>
                  {this.renderPrescribeCheckbox()}
                  {this.renderCustomCheckbox()}
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default FormularyDesignCommercial;
