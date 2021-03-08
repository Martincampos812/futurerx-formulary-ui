import { Accordion, AccordionDetails, AccordionSummary, Button, Grid } from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import React from 'react';
import GrievancesIntake from "../GrievancesIntake/GrievancesIntake";
import GrievancesDetails from "../GrievancesDetails/GrievancesDetails";
import GrievancesIssueResolution from "../GrievancesIssueResolution/GrievancesIssueResolution";
import GrievancesNotification from "../GrievancesNotification/GrievancesNotification";
import GrievancesAll from "../GrievancesAll/GrievancesAll";
import GrievancesCaseSummary from "../GrievancesCaseSummary/GrievancesCaseSummary";
import GrievancesCommunication from "../GrievancesCommunication/GrievancesCommunication";
import GrievancesReviewNotes from "../GrievancesReviewNotes/GrievancesReviewNotes";
import GrievanceMemberProfile from "../GrievanceMemberProfile/GrievanceMemberProfile";
import { TabInfo } from '../../../../models/tab.model';
import FrxTabs from '../../../shared/FrxTabs/FrxTabs';
import { getGCommunicationData } from '../../../../mocks/GrievanceCommunicationMock';
import { getCommunicationsGrievances } from '../../../../utils/grid/GrievancesCommunicationColumn';
import grievancesAll from '../GrievancesAll/GrievancesAll';
import { getGAllData } from '../../../../mocks/GrievancesAllMock';
import { getAllGrievancesColumn } from '../GrievancesAll/GrievanceAllColumn';

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

const tabs = [
    { id: 1, text: "COMMUNICATIONS" },
    { id: 2, text: "REVIEW NOTES" },
    { id: 3, text: "ALL GRIEVANCES" },
    { id: 4, text: "CASE SUMMARY" },
];

export default class GrievanceOverlay extends React.Component<any, State>{
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
    // onNewGrievancesClickHandler = () => {

    // }
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
    handleGrievanceToggle = () => {

    }

    onReportsClickHandler = (e) => {
        e.stopPropagation();
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

    render() {
        const { caseStatusClass } = this.props
        return <React.Fragment>
            <div className="new-grievance-top">
                <div className="breadcrum">
                    <span
                        className="color-blue"
                        onClick={this.props.onNewGrievancesClickHandler}
                    >
                        Module{" "}
                    </span>
                    <span>&gt;</span>
                    <span>Grievances</span>
                </div>
                <GrievanceMemberProfile
                    memberInformation={this.props.memberInformation}
                    contactInformation={this.props.contactInformation}
                />
            </div>
            <div className="new-grievance-root">
                <Accordion
                    expanded={this.state.expanded}
                    onChange={this.handleGrievanceToggle}
                >
                    <AccordionSummary
                        className="newGrievancesAccordian-heading"
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className="grievances-header">
                            <span className="grievances_header-heading">Grievances</span>
                            <Button
                                className="common-btn"
                                onClick={this.onReportsClickHandler}
                            >
                                {" "}
                    Reports
                  </Button>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className="newGrievanceContent-details">
                        <div className="grievances-content">
                            <Grid container className="grievance-wrapper">
                                <Grid item xs={6} className="left-section">
                                    <div className="case-header">
                                        <div className="title">Grievance CASE</div>
                                        <div className="caseId">
                                            <span>ID:</span>{" "}
                                            <span className="case-id">{this.state.caseId}</span>
                                        </div>
                                        <div className="caseStatus">
                                            <span>Status:</span>{" "}
                                            <span className={caseStatusClass}>
                                                {this.state.caseStatus}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grievance-accordian">
                                        <GrievancesIntake
                                            intakeData={this.state.grievancesIntake}
                                        />
                                        <GrievancesDetails
                                            details={this.state.grievanceDetails}
                                        />
                                        <GrievancesIssueResolution
                                            issueResolutionData={
                                                this.state.grievanceIssueResolution
                                            }
                                        />
                                        <GrievancesNotification
                                            notificationData={this.state.greievanceNotification}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6} className="right-section">
                                    <div className="new-grievances-tabs">
                                        <FrxTabs
                                            tabList={this.state.tabs}
                                            activeTabIndex={this.state.activeTabIndex}
                                            onClickTab={this.onClickTab}
                                            count={3}
                                            countIndex={2}
                                        />
                                        <div className="grievance-tabs-info">
                                            {this.renderActiveTabContent()}
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </React.Fragment>
    }
}