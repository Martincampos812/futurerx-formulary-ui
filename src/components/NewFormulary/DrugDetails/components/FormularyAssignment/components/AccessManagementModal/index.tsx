import React, { Component } from "react";
import OutsideVendorTooltipForm from "../OutsideVendorTooltipForm";
import AdministratorTooltipForm from "../AdministratorTooltipForm";
import { Table, DatePicker } from "antd";

import "./styles.scss";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";

const dataSource = [
  {
    key: "1",
    administrator_name: "Future Rx",
    domain: "futurerx.com",
    effective_date: "12/20/2020",
    termination_date: "12/31/2020",
  },
  {
    key: "2",
    administrator_name: "Xerox",
    domain: "xerox.com",
    effective_date: "01/01/2020",
    termination_date: "12/19/2020",
  },
];

const columns = [
  {
    title: "ADMINISTRATOR NAME",
    dataIndex: "administrator_name",
    key: "administrator_name",
    width: "243px",
  },
  {
    title: "DOMAIN",
    dataIndex: "domain",
    key: "domain",
    width: "162px",
  },
  {
    title: "EFFECTIVE DATE",
    dataIndex: "effective_date",
    key: "effective_date",
    width: "219px",
  },
  {
    title: "TERMINATION DATE",
    dataIndex: "termination_date",
    key: "termination_date",
    width: "179px",
  },
];

const participantDataSource = [
  {
    key: "1",
    participant_name: "Matt Sanchez",
    domain: "10",
    effective_date: "12/20/2020",
    termination_date: "12/31/2020",
  },
  {
    key: "2",
    participant_name: "Jane Cooper",
    domain: "8",
    effective_date: "01/01/2020",
    termination_date: "12/19/2020",
  },
];

const participantColumns = [
  {
    title: "PARTICIPANT NAME",
    dataIndex: "participant_name",
    key: "participant_name",
    width: "243px",
  },
  {
    title: "DOMAIN",
    dataIndex: "domain",
    key: "domain",
    width: "162px",
  },
  {
    title: "EFFECTIVE DATE",
    dataIndex: "effective_date",
    key: "effective_date",
    width: "219px",
  },
  {
    title: "TERMINATION DATE",
    dataIndex: "termination_date",
    key: "termination_date",
    width: "179px",
  },
];

export interface IProps {}

export interface IState {}

class AccessManagementModal extends Component<any, IState> {
  handleDateChange = (e) => {
    console.log("date changed");
  };

  render() {
    return (
      <div>
        <div className="access-management-modal">
          <div className="access-management-modal__header">
            <div className="section-title">Administer</div>
            <AdministratorTooltipForm>
              <div className="action-button">+ Add Administer</div>
            </AdministratorTooltipForm>
          </div>
          <div className="access-management-modal__body">
            <div className="section-table-container">
              <Table
                dataSource={dataSource}
                className="my-table"
                columns={columns}
                bordered={true}
                pagination={false}
                size="middle"
              />
            </div>

            <div className="select-form-section">
              <DropDown
                placeholder="Select Admin"
                className="role-dropdown"
                options={[""]}
              />
              <OutsideVendorTooltipForm>
                <div className="action-button">+ Add Outside Vendor</div>
              </OutsideVendorTooltipForm>
            </div>

            <div className="dates-form-section">
              <div className="date-form-field">
                <div className="date-form-field__label">Effective Date:</div>
                <div className="date-form-field__date">
                  <DatePicker onChange={this.handleDateChange} style={{height: "30px", width: "132px"}} />
                </div>
              </div>

              <div className="date-form-field">
                <div className="date-form-field__label">Termination Date:</div>
                <div className="date-form-field__date">
                  <DatePicker onChange={this.handleDateChange} style={{height: "30px", width: "132px"}} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="access-management-modal">
          <div className="access-management-modal__header">
            <div className="section-title">PARTICIPANTS</div>
            <AdministratorTooltipForm>
              <div className="action-button">+ Add Participant</div>
            </AdministratorTooltipForm>
          </div>
          <div className="access-management-modal__body">
            <div className="section-table-container">
              <Table
                dataSource={participantDataSource}
                className="my-table"
                columns={participantColumns}
                bordered={true}
                pagination={false}
                size="middle"
              />
            </div>

            <div className="select-form-section">
              <DropDown
                placeholder="Select Participant"
                className="role-dropdown"
                options={[""]}
              />
              <OutsideVendorTooltipForm>
                <div className="action-button">+ Add Outside Vendor</div>
              </OutsideVendorTooltipForm>
            </div>

            <div className="dates-form-section">
              <div className="date-form-field">
                <div className="date-form-field__label">Effective Date:</div>
                <div className="date-form-field__date">
                  <DatePicker onChange={this.handleDateChange} style={{height: "30px", width: "132px"}} />
                </div>
              </div>

              <div className="date-form-field">
                <div className="date-form-field__label">Termination Date:</div>
                <div className="date-form-field__date">
                  <DatePicker onChange={this.handleDateChange} style={{height: "30px", width: "132px"}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="access-management-actions">
            <div className="action-button">Cancel</div>
            <div className="action-button">Save</div>
        </div>
      
      </div>
    );
  }
}

export default AccessManagementModal;
