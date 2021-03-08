import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import Label from '../../../../../../../../../shared/Frx-components/label/Label';

import './styles.scss'
import DropDown from '../../../../../../../../../shared/Frx-components/dropdown/DropDown';
import { DatePicker, Select } from 'antd';
import moment from 'moment';

export interface FormularyComponentDetailsProps {
  
}

export interface FormularyComponentDetailsState {
  
}

const options = [{ value: 'Medicare' }, { value: 'Medicade' }];

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;

  return (
    <div className="select-tag">
      {label}
    </div>
  );
}

const tagRenderGrey = (props) => {
  const { label, value, closable, onClose } = props;

  return (
    <div className="select-tag__grey">
      {label}
    </div>
  );
}

const criteriaTagRender = (props) => {
  const { label, value, closable, onClose } = props;

  return (
    <div className="select-tag-criteria">
      {label}
    </div>
  );
}

class FormularyComponentDetails extends Component<FormularyComponentDetailsProps, FormularyComponentDetailsState> {
  render() { 
    return ( 
      <div className="formulary-component-details">
        <Grid container>
          {/* Row 1 */}
          <Grid item xs={4}>
            <Label required={true}>Component Name</Label>
            <input
              type="text"
              id="name"
              disabled
              className="setup-input-fields custom-disable"
              name="name"
              value={"PAList2020"}
            />
          </Grid>
          <Grid item xs={4}>
            <Label>LOB</Label><br/>
            <Select
              mode="multiple"
              className="ant-custom-select"
              disabled
              showArrow
              tagRender={tagRender}
              defaultValue={['Medicare',]}
              style={{ width: '355px' }}
              options={options}
            />
          </Grid>
          <Grid item xs={4}>
            <Label required={true}>Type</Label>
            <DropDown
              disabled
              className="formulary-type-dropdown"
              options={['Option1', 'Option2']}
              value={"Option 1"}
              onChange={(e) => console.log("")}
            />
          </Grid>
          
          {/* Row 2 */}
          
          <Grid item xs={4}>
            <Label required={true}>reporting tags</Label>
            <Select
              mode="multiple"
              className="ant-custom-select"
              disabled
              showArrow
              tagRender={tagRenderGrey}
              defaultValue={['Medicare',]}
              style={{ width: '355px' }}
              options={options}
            />
          </Grid>
          <Grid container item xs={4}>
            <Grid item xs={5}>             
              <Label required={true}>effective date</Label><br/>
              <DatePicker
                className="effective-date component-date-picker"
                placeholder={""}
                disabled={true}
                value={moment()}
                format={"MM/DD/YYYY"}
                onChange={(e) => {}}
                suffixIcon={
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ant-picker-suffix"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                      fill="#C4C4C4"
                    />
                  </svg>
                }
              />
            </Grid>
            <div className="date-margin"></div>
            <Grid item xs={5}>             
              <Label required={true}>termination date</Label><br/>
              <DatePicker
                className="effective-date component-date-picker"
                placeholder={""}
                disabled={true}
                value={moment()}
                format={"MM/DD/YYYY"}
                onChange={(e) => {}}
                suffixIcon={
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ant-picker-suffix"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                      fill="#C4C4C4"
                    />
                  </svg>
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Label required={true}>description</Label>
            <input
              type="text"
              id="description"
              className="setup-input-fields custom-disable"
              name="description"
              value={"30"}
            />
          </Grid>
          
          {/* Row 3 */}
          <Grid item xs={4}>
            <Label required={true}>QUANTITY</Label>
            <input
              type="text"
              id="quantity"
              className="setup-input-fields custom-disable"
              name="quantity"
              value={"60"}
            />
          </Grid>
          <Grid item xs={4}>
            <Label required={true}>Days</Label><br/>
            <input
              type="text"
              id="days"
              className="setup-input-fields custom-disable"
              name="days"
              value={"30"}
            />
          </Grid>
          <Grid item xs={4}>
            <Label required={true}>Period Of Time In Days</Label>
            <input
              type="text"
              id="time-in-days"
              className="setup-input-fields custom-disable"
              name="time-in-days"
              value={"30"}
            />
          </Grid>
          
          {/* Row 4 */}
          
          <Grid item xs={4}>
              <div className="group reporting-tag-group">
                <Label required={true}>do you want to add additional criteria?</Label>
                <Select
                  mode="multiple"
                  showSearch={false}
                  defaultActiveFirstOption={false}
                  disabled={true}
                  notFoundContent={null}
                  placeholder={"Add a tag"}
                  tagRender={criteriaTagRender}
                  onClick={()=>{}}
                  className="root--ant-select-tag"
                  value={['Criteria List 1']}
                />
              </div>
            {/* <input
              type="text"
              id="additiona"
              className="setup-input-fields"
              name="time-in-days"
              value={"30"}
            /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FormularyComponentDetails;
