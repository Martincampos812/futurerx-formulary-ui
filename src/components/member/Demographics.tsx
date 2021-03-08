import React from "react";
import axios from "axios";
import FrxInfoCard from "../shared/FrxInfoCard/FrxInfoCard";
import MemberDetailsPopup from "./MemberDetailsPopup";
import "./Demographics.scss";
import { MemberInfo } from "../../models/member-info.model";
import MemberInfoService from "../../services/memberinfo.service";

import moment from "moment";

interface DemoGraphicProps {
  memberInfo: MemberInfo;
  demographicsData: any
}

class Demographics extends React.Component<DemoGraphicProps> {
  state = {
    openPopup: false,
  };

  onHeadingClick = () => {
    console.log("invoked onHeadingClick", this.state.openPopup);

    this.setState({
      openPopup: !this.state.openPopup
    });
  };

  render() {
    const { memberInfo, demographicsData } = this.props;
    // const dob = memberInfo
    //   ? moment(memberInfo.date_of_birth).format("M/DD/YYYY")
    //   : "6/1/1957 (64)";

    // const today = new Date();

    // const age = memberInfo
    //   ? moment(today).diff(moment(memberInfo.date_of_birth), "year")
    //   : 64;
    let dob = "";
    let today = null as any;
    let age = 64;
    let memberDetails: any[] =[]
    demographicsData.map((data, i) => {
      dob = moment(data.dob).format("M/DD/YYYY");
      today = new Date();
      age = moment(today).diff(moment(data.dob), "year");
      memberDetails = [
      {
        column1: "Member ID",
        column2: memberInfo ? memberInfo.member_id : data.member_id
      },
      {
        column1: "DOB",
        column2: memberInfo ? `${dob} (${age})` : `${data.dob} (${age})`
      },
      {
        column1: "Language",
        column2: data.language
      }
    ];
  })
    return (
      <div className="demographics-root">
        <FrxInfoCard
          heading="Demographics"
          onHeadingClick={this.onHeadingClick}
          itemList={memberDetails}
        />

				{/* DISABLED FOR NOW */}
        {this.state.openPopup ? (
          <MemberDetailsPopup
            isOpen={this.state.openPopup}
            onClose={this.onHeadingClick}
            panelName="demographics-tab"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Demographics;
