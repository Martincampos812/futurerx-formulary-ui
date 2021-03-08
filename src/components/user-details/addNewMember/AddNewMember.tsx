import React, {Component} from "react";
import AccountInfromation from "../account-information/AccountInfromation";
import ContactInformations from "../contact-information/ContactInformations";
import MemberInformation from "../member-information/MemberInformation";

import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import "./AddNewMember.scss";

interface Props {
  memberInformation: any;
  contactInformation: any
}
interface State {}

class AddNewMember extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="AddNewMember scroll-bar">
        <Grid className="frx-add-member-container" container spacing={2}>
          <Grid item container direction="column" spacing={2} sm={6}>
            <Grid className="frx-member-account-info" item>
              <AccountInfromation />
            </Grid>
            <Grid className="frx-member-contact-info" item>
              <ContactInformations 
              contactInformation={this.props.contactInformation}
              memberInformation={this.props.memberInformation} 
              />
            </Grid>
          </Grid>
          <Grid className="frx-member-info" item sm={6}>
            <MemberInformation memberInformation={this.props.memberInformation} />
          </Grid>
        </Grid>
        {/* <h2 className="addNewMemberHeader">ADD NEW MEMBER</h2>
        <span className="closePopUp">
          <CloseIcon />
        </span>
        <hr /> */}
        {/* <div className="divContainerForMembers">
          <div className="divAccAndCont">
            <AccountInfromation />
            <ContactInformations />
          </div>
          <MemberInformation />
        </div> */}
        {/* <div className="btn-container">
          <button className="btn btnCancel">Cancel</button>
          <button className="btn btnSave">Save Member</button>
        </div> */}
      </div>
    );
  }
}

export default AddNewMember;
