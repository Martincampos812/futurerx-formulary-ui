import React from "react";
import CustomAccordion from "../../../../../../shared/Frx-components/accordion/CustomAccordion";
import "./ComponentActivity.scss";
import ActivityGridDetail from "./ActivityGridDetail";


export default class Activity extends React.Component<any, any> {
state={
  activity: false
}   
  render() {
    return (
      <div className="inner-container" >
        <div className="activity-container activity-container-bordered">
            <div className="component-activity-heading">
                <h4>component ACTIVITY</h4>
            </div>
            <div className="component-table-heading-wrapper">
                <div className="border-right"><span>component list name</span></div>
                <div className="border-right"><span>type</span></div>
                <div className="border-right"><span>details</span></div>
                <div className="border-right"><span>version #</span></div>
                <div className="border-right"><span>version effective date</span></div>
                <div className="border-right"><span>accept/reject</span></div>
                <div><span>effective date</span></div>
            </div>
            <div className="accordion-wrapper set-padding">
              <CustomAccordion name="Tier" activity={true}>
                <ActivityGridDetail accordionIdentifier="tier" />
              </CustomAccordion>

              <CustomAccordion name="QL" activity={true}>
                <ActivityGridDetail accordionIdentifier="ql" />
              </CustomAccordion>

              <CustomAccordion name="ST" activity={true}>
                <ActivityGridDetail accordionIdentifier="st" />
              </CustomAccordion>

              <CustomAccordion name="PA" activity={true}>
                <ActivityGridDetail accordionIdentifier="pa" />
              </CustomAccordion>

              <CustomAccordion name="Drug Details" activity={true}>
                <ActivityGridDetail accordionIdentifier="drug_detail" />
              </CustomAccordion>
            </div>
        </div>
        </div>
    );
  }
}
