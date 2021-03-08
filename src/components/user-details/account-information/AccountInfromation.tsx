import React, {Component} from "react";
import TextBox from "../../shared/Frx-components/text-box/TextBox";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";

import "./AccountInfromation.scss";

interface Props {}
interface State {}

class AccountInfromation extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="Account-info">
        <h2 className="account-heading">Account Information</h2>
        <div className="accountFields">
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Client Name
            </label>
            <DropDown
              options={["select", "Client Name"]}
              placeholder="Client Name"
            />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Carrier Name
            </label>
            <DropDown
              options={["select", "Carrier Name"]}
              placeholder="Carrier Name"
            />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Carrier ID
            </label>
            <TextBox placeholder="Carrier ID" />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Account Name
            </label>
            <DropDown
              options={["select", "Account Name"]}
              placeholder="Account Name"
            />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Account ID
            </label>
            <DropDown
              options={["select", "Account ID"]}
              placeholder="Account ID"
            />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Group Name
            </label>
            <DropDown
              options={["select", "Group Name"]}
              placeholder="Group Name"
            />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Group ID
            </label>
            <TextBox placeholder="Group ID" />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              LOB
            </label>
            <TextBox placeholder="LOB" />
          </div>
        </div>
      </div>
    );
  }
}

export default AccountInfromation;
