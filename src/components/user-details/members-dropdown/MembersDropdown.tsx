import React, { Component } from "react";
// import React, {useState} from "react";

import MemeberInfo from "../member-info/MemeberInfo";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { IconButton } from "@material-ui/core";

import DialogPopup from "../../shared/FrxDialogPopup/FrxDialogPopup";

import AddNewMember from "../addNewMember/AddNewMember";
import MemberDetailsContianer from "../member-details-container/MemberDetailsContianer";
import MemberSearch from "../member-search/MemberSearch";
import memberinfoService from "../../../services/memberinfo.service";
import { getUserDetails } from "../../../mocks/UserDetailsMock";

import Backdrop from "@material-ui/core/Backdrop";

import "./MembersDropDown.scss";
import { MemberSummary } from "../../../models/member-info.model";
import Constants from "../../../constants/Constants";

interface Props {
  showMembers: any;
  hideMembers: any;
  isOpen: any;
  user: MemberSummary;
  onMemberInfoClick: (id: number) => void;
  memberInformation: any;
  contactInformation: any;
}
interface MembersDropdown {
  showMembers: boolean;
  openAddNewMember: boolean;
  openMemberDetails: boolean;
  openMemberSearch: boolean;
}

class MembersDropdown extends Component<Props> {
  state = {
    showMembers: false,
    openAddNewMember: false,
    openMemberDetails: false,
    openMemberSearch: false,
  };

  handleShowMembers = () => {
    this.setState({
      showMembers: !this.state.showMembers,
    });
  };

  handleAddNewMemberDialogpopup = () => {
    this.setState({
      openAddNewMember: !this.state.openAddNewMember,
    });
  };

  handleMemberDetailsDiaglogpopup = () => {
    this.setState({
      openMemberDetails: !this.state.openMemberDetails,
    });
  };

  handleMemberSearchDiaglogpopup = () => {
    console.log("show Member Search");

    this.setState({
      // openMemberSearch: !this.state.openMemberSearch,
      openAddNewMember: false,
    });
  };

  componentDidMount() {
    // console.log(getUserDetails());
    // this.setState({ user: getUserDetails() });
    this.getMemberSummary(Constants.MEMBER_ID);
  }

  getMemberSummary = async (id) => {
    let memberData: any[];
    const res = await memberinfoService.getInfoCardsData(id);
    if (res && res.data.data.member_summary) {
      const data = res.data.data.member_summary;
      console.log("res", res.data.data.member_summary);
      memberData = [
        {
          family_id: data.family_id,
          family_members: data.family_members,
          first_name: data.first_name,
          middle_name: data.middle_name,
          last_name: data.last_name,
          id_member_info: data.id_member_info,
          status: data.status,
          img_url: data.img_url,
          gender: data.gender,
          lob: data.lob,
        },
      ];
      this.setState({ user: memberData });
    }
    // console.log("user", this.state.user);
    // await memberinfoService.getInfoCardsData(id).then(response => {
    //   console.log("response: ", response);
    //   this.setState({
    //     user: response.data.data.member_summary
    //   })
    // });
  };

  render() {
    // console.log("user", this.state.user);
    const {
      showMembers,
      openAddNewMember,
      openMemberDetails,
      openMemberSearch,
    } = this.state;

    let isShown = this.props.isOpen ? (
      <IconButton
        disableFocusRipple={true}
        disableRipple={true}
        edge="end"
        color="inherit"
        onClick={
          // this.handleShowMembers
          this.props.hideMembers
        }
      >
        <svg
          // className="arrowIcon"
          onClick={
            // this.handleShowMembers
            this.props.hideMembers
          }
          width="9"
          height="5"
          viewBox="0 0 9 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.223752 4.55431C0.531543 4.86916 0.960049 4.89387 1.33632 4.55431L4.09513 1.90915L6.85395 4.55431C7.23022 4.89387 7.65943 4.86916 7.9651 4.55431C8.27289 4.24017 8.25313 3.7093 7.9651 3.41422C7.67849 3.11914 4.65071 0.236071 4.65071 0.236071C4.57861 0.161345 4.49219 0.101912 4.39662 0.0613189C4.30104 0.0207257 4.19827 -0.000195503 4.09443 -0.000195503C3.99059 -0.000195503 3.88782 0.0207257 3.79224 0.0613189C3.69666 0.101912 3.61025 0.161345 3.53815 0.236071C3.53815 0.236071 0.511776 3.11914 0.223752 3.41422C-0.0649778 3.7093 -0.0840382 4.24017 0.223752 4.55431Z"
            fill="#999999"
          />
        </svg>
      </IconButton>
    ) : (
      <IconButton
        disableFocusRipple
        disableRipple
        edge="end"
        onClick={
          // this.handleShowMembers
          this.props.showMembers
        }
      >
        <svg
          // className="arrowIcon"
          onClick={
            // this.handleShowMembers
            this.props.showMembers
          }
          width="9"
          height="5"
          viewBox="0 0 9 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
            fill="#999999"
          />
        </svg>
      </IconButton>
    );

    return (
      <div className="members-dropDown">
        <MemeberInfo
          user={this.props.user}
          icon={isShown}
          customStyle={{
            color: "#2055B5",
            fontSize: "24px",
            lineHeight: "50px",
            fontWeight: 400,
            cursor: "pointer",
            // textDecoration: "underline",
            // borderTop: "2px solid #2055B5",
            // borderTop: "2px solid #2055B5 ",
            borderBottom: "2px solid #2055B5 ",
          }}
          handlClick={this.handleMemberDetailsDiaglogpopup}
        />

        {
          // showMembers
          this.props.isOpen && this.props.user ? (
            <React.Fragment>
              {this.props.user!.family_members.map((user) => (
                <React.Fragment key={user.family_id}>
                  <MemeberInfo
                    user={user}
                    customStyle={{ borderRadius: 0 }}
                    handlClick={(id: number) =>
                      this.props.onMemberInfoClick(id)
                    }
                    // status/
                  />
                </React.Fragment>
              ))}

              <div
                className="addMember"
                onClick={this.handleAddNewMemberDialogpopup}
              >
                <div className="AddIcon">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.88867 4.13574H9.45703V5.67383H5.88867V9.7168H4.25391V5.67383H0.685547V4.13574H4.25391V0.400391H5.88867V4.13574Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
                <div className="addLabel">Add family member</div>
              </div>
            </React.Fragment>
          ) : null
        }

        <DialogPopup
          className="frx-add-new-member"
          open={openAddNewMember}
          positiveActionText="Save Member"
          negativeActionText="Cancel"
          title="Add New Member"
          showCloseIcon
          showActions={true}
          handleClose={this.handleAddNewMemberDialogpopup}
          handleAction={this.handleMemberSearchDiaglogpopup}
          width="100%"
          height="100%"
        >
          <AddNewMember
            memberInformation={this.props.memberInformation}
            contactInformation={this.props.contactInformation}
          />
        </DialogPopup>

        {/* Member search dialog box */}

        <DialogPopup
          className="frx-member-search"
          open={openMemberSearch}
          positiveActionText="Search"
          negativeActionText={""}
          title="Member Search"
          showCloseIcon
          showActions={true}
          handleClose={() => this.handleMemberSearchDiaglogpopup()}
          handleAction={() => this.handleMemberSearchDiaglogpopup()}
        >
          <MemberSearch />
        </DialogPopup>

        {/* -------- */}
        {/* 
        <DialogPopup
          open={openMemberDetails}
          positiveActionText="positiveActionText"
          negativeActionText="negativeActionText"
          title="title"
          showActions={false}
          handleClose={this.handleMemberDetailsDiaglogpopup}
          handleAction={() => console.log("handle action")}
        >
          <MemberDetailsContianer />
        </DialogPopup> */}

        <Backdrop
          open={this.props.isOpen}
          onClick={this.props.hideMembers}
          invisible
        />
      </div>
    );
  }
}

export default MembersDropdown;
