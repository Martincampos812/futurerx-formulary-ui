import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import DropDown from "../../../../shared/Frx-components/dropdown/DropDown";
import Label from "../../../../shared/Frx-components/label/Label";
import Button from "../../../../shared/Frx-components/button/Button";
import { Input } from "@material-ui/core";

import RadioButton from "../../../../shared/Frx-components/radio-button/RadioButton";
import "./common.scss";
import FillLimitSettings from "../../../DrugDetails/components/QL/components/FillLimitSettings";
import AdvanceSearchContainer from "../../../NewAdvanceSearch/AdvanceSearchContainer";

class Replace extends Component<any, any> {
  state = {
    quantityAndFillLimitObject: {},
    is_additional_criteria_defined:false,
    isAdditionalCriteriaOpen:false,
    errorObject:{},
  }

  componentDidMount() {
    this.props.onUpdateSelectedCriteria([]);
  }

  openAdditionalCriteria = () => {
    if (this.state.is_additional_criteria_defined) {
      this.setState({
        is_additional_criteria_defined: false,
        isAdditionalCriteriaOpen: false,
      });
    } else {
      this.setState({
        is_additional_criteria_defined: true,
        isAdditionalCriteriaOpen: true,
      });
    }
  };
  closeAdditonalCriteria = () => {
    this.setState({
      isAdditionalCriteriaOpen: false,
    });
  };

  

  // handleOnChange = (e) => {
  //   var numbers = /^[0-9]+$/;
  //   let tempObject = {};
  //   let temError = {};
  //   console.log(e.target.value);

  //   if (e.target.value.match(numbers)) {
  //     tempObject = {
  //       ...this.state.quantityAndFillLimitObject,
  //       [e.target.name]: Number(e.target.value),
  //     };
  //     temError = {
  //       ...this.state.errorObject,
  //       [e.target.name]: false,
  //     };
  //     this.setState({
  //       quantityAndFillLimitObject: tempObject,
  //       errorObject: temError,
  //     });
  //   }
  //   if (e.target.value == "") {
  //     tempObject = {
  //       ...this.state.quantityAndFillLimitObject,
  //       [e.target.name]: e.target.value,
  //     };
  //     temError = {
  //       ...this.state.errorObject,
  //       [e.target.name]: false,
  //     };
  //     this.setState({
  //       quantityAndFillLimitObject: tempObject,
  //       errorObject: temError,
  //     });
  //   }
  // };
  render() {
    console.log("{values}:", this.props.values);
    const { quantity = "", days = "", periodOfTime = "" } = this.props.values;
    const searchProps = {
      lobCode: this.props.id_lob,
    };
    return (
      <div className="ql-replace-container">
        <div className="panel-note">
          By inputting ‘Period of Time in Days’ you are creating a Type 2 QL
          indicating Quantity Limit over Time. Populate ‘Quantity’ and ‘Days’ to
          create Type 1 QL indicating Daily Quantity Limit.
        </div>
        {this.props.radioButtons.length > 0 ? (
          <div className="input-group">
            <Label required={false}>What file type is this QL for?</Label>
            <div className="radio-group">{this.props.radioButtons}</div>
          </div>
        ) : null}
        <Grid container spacing={2}>
          {/* <Grid item xs={4}>
            <div className="input-group">{this.props.radioButtons}</div>
          </Grid> */}
          <Grid item xs={4}>
            <div className="input-group">
              <Label required={true}>QUANTITY</Label>
              {/* <DropDown options={[1, 2, 3]} /> */}
              <div>
                <Input
                  className={`formulary-list-search 
                  ${this.props.errors?.quantity ? "error_class" : null}
                  `}
                  // placeholder="Search"

                  type="text"
                  name="quantity"
                  disableUnderline={true}
                  onChange={this.props.handleOnChange}
                  value={quantity}
                  required={true}
                  disabled={this.props.isViweAll}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-group">
              <Label required={false}>DAYS </Label>
              {/* <DropDown options={[1, 2, 3]} /> */}
              <div>
                <Input
                  className={`formulary-list-search ${
                    this.props.errors?.days ? "error_class" : null
                  }`}
                  // placeholder="Search"
                  type="text"
                  name="days"
                  value={days}
                  onChange={this.props.handleOnChange}
                  disableUnderline={true}
                  disabled={this.props.isViweAll}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-group">
              <Label required={true}>PERIOD OF TIME IN DAYS</Label>
              {/* <DropDown options={[1, 2, 3]} /> */}
              <div>
                <Input
                  className="formulary-list-search"
                  // placeholder="Search"
                  type="text"
                  name="periodOfTime"
                  value={periodOfTime}
                  onChange={this.props.handleOnChange}
                  disableUnderline={true}
                  disabled={this.props.isViweAll}
                />
              </div>
            </div>
          </Grid>
          {/* <Button
          label="Apply"
          onClick={openTierGridContainer}
          // disabled={this.props.configureSwitch}
        ></Button> */}
        </Grid>
        <FillLimitSettings
                              handleOnChange={(e) => this.props.handleOnChange(e, this.props.formularyId)}
                              values={this.props.values}
                              isViweAll={this.props.switchState}
                              isChecked={this.state.isAdditionalCriteriaOpen}
                              onRadioButtonClick={this.openAdditionalCriteria}
                              is_additional_criteria_defined={
                                this.state.is_additional_criteria_defined
                              }
                              //onApply={this.onApply}
                              switchState={this.props.switchState}
                            />
                            {this.state.isAdditionalCriteriaOpen && (
                              <AdvanceSearchContainer
                                {...searchProps}
                                openPopup={this.state.isAdditionalCriteriaOpen}
                                onClose={this.closeAdditonalCriteria}
                                isAdvanceSearch={false}
                              />
                            )}
      </div>
    );
  }
}

export default Replace;
