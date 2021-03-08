import React from "react";
import axios from "axios";
import FrxInfoCard from "../shared/FrxInfoCard/FrxInfoCard";
import MemberDetailsPopup from "./MemberDetailsPopup";
import "./Preferences.scss";

export interface PreferencesProps{
  prefrencesData: any
}

class Preferences extends React.Component<PreferencesProps> {
  state = {
  };

  render() {
    let memberDetails:any[] = []
    this.props.prefrencesData.map((data, i) => {
      memberDetails = [
        {
          column1: "PCM",
          column2: data.pcm,
          column2Link: true
        },
        {
          column1: "AOR / POA",
          column2: data.aor_poa,
          column2Link: true
        }
      ];
    })
    
    return (
      <div className="preferences-root">
        <FrxInfoCard
          heading="Preferences"
          itemList={memberDetails}
        />
        {/* {
                    this.state.openPopup ?
                        (
                            <MemberDetailsPopup
                                isOpen={this.state.openPopup}
                                onClose={this.onHeadingClick}
                                panelName="preferences-tab"
                            />
                        )
                        :
                        ""
                } */}
      </div>
    );
  }
}

export default Preferences;
