import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import { Select, Divider, Input } from "antd";

import DialogPopup from "../../shared/FrxDialogPopup/FrxDialogPopup";

import "./LocationSearch.scss";
import { timeout } from "d3";
const { Option } = Select;

export interface Props {
  handleLocationPopup: any;
  locationSearchPopup: boolean;
}
interface State {
  //   distance: any[];
}

export default class LocationSearch extends Component<Props, State> {
  state = {
    distnace: [
      "2 miles",
      "5 miles",
      "10 miles",
      "15 miles",
      "20 miles",
      "25 miles",
    ],
    miles: '',
    inputMiles: '',
    isDistanceDropdownOpen: false,
    addMilesFocus: false
  };
  drpMil: any = undefined
  drpSel: any = undefined
  butt_sel: any = undefined
  showDropDownIcon = () => {
    this.setState({
      isDistanceDropdownOpen: !this.state.isDistanceDropdownOpen,
    });
  };

  render() {
    const { distnace, isDistanceDropdownOpen } = this.state;
    const { locationSearchPopup } = this.props;
    return (
      <DialogPopup
        className="frx-location-serach"
        open={locationSearchPopup}
        positiveActionText="Set Location"
        negativeActionText="Cancel"
        title="CHANGE SEARCH LOCATION"
        showCloseIcon
        showActions={true}
        handleClose={this.props.handleLocationPopup}
        handleAction={this.props.handleLocationPopup}
        height="100vh"
      >
        <div className="location-search">
          <div className="steetAndCityContainer">
            <Input
              className="location-search__input input_Stress_Address"
              placeholder="Street Addess"
              type="text"
            />
            <Input
              className="location-search__input input_City"
              placeholder="City"
              type="text"
            />
          </div>
          <div className="state_zipcode_distance_container">
            <Select
              //   name="state"
              //   defaultValue="lucy"
              //   style={{width: 120}}
              //   onChange={handleChange}
              placeholder="State"
              className="select_state"
              suffixIcon={
                <svg
                  width="6"
                  height="3"
                  viewBox="0 0 6 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                    fill="#999999"
                  />
                </svg>

                //   <svg
                //     width="9"
                //     height="5"
                //     viewBox="0 0 9 5"
                //     fill="none"
                //     xmlns="http://www.w3.org/2000/svg"
                //     //   style={{display: !serviceDropdownCaret ? "block" : "none"}}
                //     // style={{transform: serviceDropdownCaret ? "rotate(180deg)": "intial"}}
                //   >
                //     <path
                //       d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                //       fill="#999999"
                //     />
                //   </svg>
              }
            >
              <Option value="state">state 1</Option>
            </Select>

            <Input
              className="location-search__input input_Zip_Code"
              placeholder="Zip Code"
              type="text"
            />
            <Select
              value={this.state.miles !== '' ? this.state.miles : undefined}
              className="antd-select-dropdown  select_distance"
              placeholder="Distance"
              onFocus={this.showDropDownIcon}
              onSelect={(e: any) => {
                this.setState({
                  miles: e
                })
                document.getElementById('but-hide')?.click()
              }}
              open={this.drpMil}
              ref={input => this.drpSel = input}
              onBlur={this.showDropDownIcon}
              suffixIcon={
                // isDistanceDropdownOpen ? (
                <>
                  <svg
                    width="6"
                    height="3"
                    viewBox="0 0 6 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: isDistanceDropdownOpen ? "none" : "inline",
                    }}
                  >
                    <path
                      d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                      fill="#999999"
                    />
                  </svg>
                  <svg
                    width="6"
                    height="3"
                    viewBox="0 0 6 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: isDistanceDropdownOpen ? "inline" : "none",
                    }}
                  >
                    <path
                      d="M5.79875 3H0.20125C0.0333594 3 -0.0603867 2.85282 0.0435863 2.75234L2.84234 0.0578451C2.92245 -0.0192821 3.0767 -0.0192821 3.15766 0.0578451L5.95641 2.75234C6.06039 2.85282 5.96664 3 5.79875 3Z"
                      fill="#999999"
                    />
                  </svg>
                </>
                // ) : ""
              }
              dropdownClassName="distance-dropdown"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div className="distance-add-miles-contianer">
                    <Input className="add-miles"
                      value={this.state.inputMiles}
                      onChange={(e: any) => {
                        this.setState({
                          inputMiles: e.target.value
                        })
                      }} />
                    miles
                    <Button color="primary" onClick={() => {
                      this.drpSel.selectRef.current.props.onSelect(this.state.inputMiles + ' miles')
                      setTimeout(() => {
                        this.setState({
                          inputMiles: ''
                        })
                        console.log(this.butt_sel);
                        this.butt_sel?.focus()
                      }, 300);
                    }}>OK</Button>
                  </div>
                </>
              )}
            >
              {distnace.map((dist) => (
                <Option value={dist} className="antd-select-dropdown-options">
                  {dist}
                </Option>
              ))}
            </Select>
            <Button ref={input => this.butt_sel = input} onClick={() => { this.drpMil = false }}/>
          </div>
        </div>
      </DialogPopup>
    );
  }
}
