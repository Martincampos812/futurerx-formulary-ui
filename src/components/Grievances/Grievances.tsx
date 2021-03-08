import React from "react";
import GrievancesIntake from "./components/GrievancesIntake/GrievancesIntake";
import GrievancesDetails from "./components/GrievancesDetails/GrievancesDetails";
import GrievancesIssueResolution from "./components/GrievancesIssueResolution/GrievancesIssueResolution";
import GrievancesNotification from "./components/GrievancesNotification/GrievancesNotification";
import GrievancesAll from "./components/GrievancesAll/GrievancesAll";
import GrievancesCaseSummary from "./components/GrievancesCaseSummary/GrievancesCaseSummary";
import GrievancesCommunication from "./components/GrievancesCommunication/GrievancesCommunication";
import GrievancesReviewNotes from "./components/GrievancesReviewNotes/GrievancesReviewNotes";
import GrievanceMemberProfile from "./components/GrievanceMemberProfile/GrievanceMemberProfile";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { TabInfo } from "../../models/tab.model";
import FrxTabs from "../shared/FrxTabs/FrxTabs";
import { getCommunicationsGrievances } from "../../utils/grid/GrievancesCommunicationColumn";
import { getGCommunicationData } from "../../mocks/GrievanceCommunicationMock";
import { getGAllData } from "../../mocks/GrievancesAllMock";
import { getAllGrievancesColumn } from "./components/GrievancesAll/GrievanceAllColumn";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./Grievances.scss";
import GrievanceOverlay from "./components/GrievanceOverlay/GrievanceOverlay";

const tabs = [
  { id: 1, text: "COMMUNICATIONS" },
  { id: 2, text: "REVIEW NOTES" },
  { id: 3, text: "ALL GRIEVANCES" },
  { id: 4, text: "CASE SUMMARY" },
];

interface State {
  caseId: string;
  caseStatus: string;
  expanded: boolean;
  grievancesIntake: Object;
  grievanceDetails: Object;
  grievanceIssueResolution: Object;
  greievanceNotification: Object;
  tabs: Array<TabInfo>;
  activeTabIndex: number;
}

class Grievances extends React.Component<any, any> {
  state: State = {
    caseId: "M000001",
    caseStatus: "Closed",
    expanded: true,
    grievancesIntake: {
      type: "Pharmacy",
      priority: "Standard",
      upgradeToExpedited: "Yes",
      intakeMethod: "Oral",
      methodDetails: "Electronic",
      requestor: "Savannah Nguyen",
      date: "10/10/2020",
      time: "12:23:11 EST",
      AORLink:
        "https://futurerx.sharepoint.com/:b:/s/MemberProfile/ERU2xBVhTHNGpkXHk-GWgM4BU8IvwZhwDZ9C4isRrb9d3g?e=5dZotg",
    },
    grievanceDetails: {
      occurrenceDate: "10/10/2020",
      occurrenceTime: "01:43:19 EST",
      category: "Coverage Determination/Appeal Process",
      subcategory: "Coverage Determination/Appeal Process",
      qualityOfCare: "Yes",
      priorAuthorization: "No",
      grievanceIssues: [
        { title: "Issue #1 of Grievance" },
        { title: "Issue #2 of Grievance" },
        { title: "Issue #3 of Grievance" },
      ],
      planDate: "10/10/2020",
      planTime: "01:43:19 EST",
      departmentDate: "10/10/2020",
      departmentTime: "01:43:19 EST",
      dueDate: "10/10/2020",
      dueTime: "01:43:19 EST",
      extensionTaken: "Yes",
      notifiedOfDelay: "Yes",
      extentionNotificationLetterLink:
        "https://futurerx.sharepoint.com/:b:/s/MemberProfile/ERU2xBVhTHNGpkXHk-GWgM4BU8IvwZhwDZ9C4isRrb9d3g?e=5dZotg",
    },
    grievanceIssueResolution: {
      resolvedIssue: 2,
      issues: [
        {
          title: "Issue #1 of Grievance",
          resolved: true,
        },
        {
          title: "Issue #2 of Grievance",
          resolved: true,
        },
        {
          title: "Issue #3 of Grievance",
          resolved: false,
        },
      ],
      description:
        "This is a Resolution Description sentence. This is a Resolution Description sentence.This is a Resolution Description sentence.This is a Resolution Description sentence.",
    },
    greievanceNotification: {
      writtenNotificationRequired: true,
      oralNotification: {
        date: "10/10/2020",
        time: "12:23:11 EST",
      },
      writtenNotification: {
        date: "10/10/2020",
        time: "12:23:11 EST",
      },
      expanded: true,
    },
    tabs: tabs,
    activeTabIndex: 0,
  };

  handleGrievanceToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  onReportsClickHandler = (e) => {
    e.stopPropagation();
  };
  onClickTab = (selectedTabIndex: number) => {
    let activeTabIndex = 0;

    const tabs = this.state.tabs.map((tab: TabInfo, index: number) => {
      if (index === selectedTabIndex) {
        activeTabIndex = index;
      }
      return tab;
    });
    this.setState({ tabs, activeTabIndex });
  };
  renderActiveTabContent = () => {
    const tabIndex = this.state.activeTabIndex;
    return tabIndex === 0 ? (
      <GrievancesCommunication
        title=""
        // onClose={this.onButtonClick}
        // openPopup={true}
        data={getGCommunicationData()}
        columns={getCommunicationsGrievances()}
        showTabs={true}
        tabs={[
          { id: 1, text: "Inbound" },
          { id: 2, text: "Outbound" },
        ]}
        tabTypes={["grid", "form"]}
      />
    ) : tabIndex === 1 ? (
      <GrievancesReviewNotes title="Grievances Review Notes" />
    ) : tabIndex === 2 ? (
      <GrievancesAll
        title=""
        data={getGAllData()}
        columns={getAllGrievancesColumn()}
        intakeData={this.state.grievancesIntake}
        details={this.state.grievanceDetails}
        issueResolutionData={this.state.grievanceIssueResolution}
        notificationData={this.state.greievanceNotification}
      />
    ) : tabIndex === 3 ? (
      <GrievancesCaseSummary />
    ) : null;
  };
  onNewGrievancesClickHandler = () => {
    this.setState({ activeTabIndex: 0 });
    this.props.onSwitchNewGrievance();
  };
  render() {
    const caseStatusClass =
      this.state.caseStatus === "Closed"
        ? "case-status closed"
        : "case-status open";
    const grievanceContent =
      this.props.isOpen === true ? (
        <GrievanceOverlay
          caseStatusClass={caseStatusClass}
          memberInformation={this.props.memberInformation}
          contactInformation={this.props.contactInformation} 
          onNewGrievancesClickHandler={this.onNewGrievancesClickHandler}
          />
      ) : (
          <div className="grievance-module">
            <span>Grievances</span>
            <Button
              className="new-grievance-button"
              onClick={this.onNewGrievancesClickHandler}
            >
              {" "}
            + New Grievances
          </Button>
          </div>
        );
    return grievanceContent;
  }
}

export default Grievances;
