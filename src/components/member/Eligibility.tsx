import React from "react";
import axios from "axios";
import FrxInfoCard from "../shared/FrxInfoCard/FrxInfoCard";
import MemberDetailsPopup from "./MemberDetailsPopup";
import "./Eligibility.scss";


interface EligibilityProps {
  elegibilityData: any
}


class Eligibility extends React.Component<EligibilityProps,any> {
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
    const {elegibilityData} = this.props;
    let memberDetails: any[] = []
    elegibilityData.map((data, i) => {
      memberDetails = [
        {
          column1: "Start Date",
          column2: data.start_date,
        },
        {
          column1: "Term Date",
          column2: data.term_date,
        },
        {
          column1: "Transition Date",
          column2: data.transition_date
        }
    ]
  })
    return (
      <div className="eligibility-root">
        <FrxInfoCard
          heading="Eligibility"
          onHeadingClick={this.onHeadingClick}
          itemList={memberDetails}
        />
        {/* DISABLED FOR NOW */}
        {
                    this.state.openPopup ? 
                    (
                        <MemberDetailsPopup
                            isOpen={this.state.openPopup}
                            onClose={this.onHeadingClick}
                            panelName ="eligibility-tab"
                        />
                    ) 
                    :
                    ""
                }
      </div>
    );
  }
}

export default Eligibility;
