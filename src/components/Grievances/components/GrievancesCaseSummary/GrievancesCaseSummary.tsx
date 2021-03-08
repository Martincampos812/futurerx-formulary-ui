import React from 'react';
import Grid from "@material-ui/core/Grid";
import NotesPopup from "../../../member/MemberNotesPopup";

const summaryData = {
    caseNumber: 'M000001',
    status: 'Closed',
    memberName: 'Machenzie Johnson-Robertson III',
    memberDOB: '06/01/1957',
    memberId: '8133381165',
    residenceCode: '001 Home',
    requestor: 'Savannah Nguyen',
    aor: 'Y',
    intakeMethod: 'Oral',
    methodDetail: 'Electronic',
    priorityType: 'Standard',
    caseType: 'Pharmacy: Coverage Determination/Appeal Process',
    qualityOfCare: 'N',
    priorityChange: 'Y',
    numberOfIssues: '3',
    issueDesc: 'Issue Descripition',
    writtenNotificaitonRequired: 'N',
    writtenNotificaitonSent: 'N',
    planDateTimeReceived: 'Date and Time Request Received',
    departmentDate: '10/10/2020',
    departmentTime: '01:43:19 EST',
    dueDate: '10/21/2020',
    dueTime: '02:22:54 EST',
    issueResolution: '2',
    resolutionDesc: 'Member spoke to CSR about issue with recent...',
    requestClosedDate: '10/29/2020',
    requestClosedTime: '10:36:01 EST',
    memberNotificationOral: 'Oral, 10/20/2020, 10:34:22 EST',
    memberNotificationWritten: 'Written, 10/20/2020, 10:34:22 EST',
    priorAuth: 'Y',
    numberOfAttachments: '4',
    outboundCommunications: '2',
    inboundCommunications: '1',
    otherDocuments: '1',
    caseSummaryAorLink: 'https://futurerx.sharepoint.com/:b:/s/MemberProfile/ERU2xBVhTHNGpkXHk-GWgM4BU8IvwZhwDZ9C4isRrb9d3g?e=5dZotg'
}

export default function CaseSummary(props: any){
    const [isNotesOpen, setIsNotesOpen] = React.useState<boolean | false>(false);
    const handleNoteClick = () => {
        setIsNotesOpen(!isNotesOpen);
    };
    return (
        <div className="case-summar-info">
            <div className="title mb-15">
                <span>Case Summary</span>
                <div className="icon-wrapper">
                    <svg onClick={handleNoteClick} className="note-icon" width="10" height="12" viewBox="0 0 10 12" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z" fill="#2055B5"></path>
                    </svg>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.90625 0H8.09375C8.45742 0 8.75 0.292578 8.75 0.65625V5.25H11.148C11.6348 5.25 11.8781 5.83789 11.5336 6.18242L7.37461 10.3441C7.16953 10.5492 6.8332 10.5492 6.62812 10.3441L2.46367 6.18242C2.11914 5.83789 2.3625 5.25 2.84922 5.25H5.25V0.65625C5.25 0.292578 5.54258 0 5.90625 0ZM14 10.2812V13.3438C14 13.7074 13.7074 14 13.3438 14H0.65625C0.292578 14 0 13.7074 0 13.3438V10.2812C0 9.91758 0.292578 9.625 0.65625 9.625H4.66758L6.00742 10.9648C6.55703 11.5145 7.44297 11.5145 7.99258 10.9648L9.33242 9.625H13.3438C13.7074 9.625 14 9.91758 14 10.2812ZM10.6094 12.6875C10.6094 12.3867 10.3633 12.1406 10.0625 12.1406C9.76172 12.1406 9.51562 12.3867 9.51562 12.6875C9.51562 12.9883 9.76172 13.2344 10.0625 13.2344C10.3633 13.2344 10.6094 12.9883 10.6094 12.6875ZM12.3594 12.6875C12.3594 12.3867 12.1133 12.1406 11.8125 12.1406C11.5117 12.1406 11.2656 12.3867 11.2656 12.6875C11.2656 12.9883 11.5117 13.2344 11.8125 13.2344C12.1133 13.2344 12.3594 12.9883 12.3594 12.6875Z" fill="#1D54B4"/>
                    </svg>
                    {isNotesOpen ? (
                        <NotesPopup
                            category="Grievances"
                            openPopup={isNotesOpen}
                            onClose={handleNoteClick}
                        />
                        ) : (
                            ""
                    )}
                </div>
            </div>
            <Grid container>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Case Number</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.caseNumber}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Case Status</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.status}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Member Name</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.memberName}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Member DOB</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.memberDOB}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Member ID</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.memberId}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Patient Residence Code</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.residenceCode}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Requestor</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.requestor}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">AOR</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">
                                {summaryData.aor}
                                <a href={summaryData.caseSummaryAorLink} target="_blank" className="color-blue cs-aor-link">AOR Document on File</a>
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Case Intake Method</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.intakeMethod}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Intake Method Detail</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.methodDetail}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Priority Type</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.priorityType}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Case Type</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.caseType}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Quality of Care</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.qualityOfCare}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Priority Change</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.priorityChange}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Number of Issues</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.numberOfIssues}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Issue Description</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.issueDesc}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Written Notification Required</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.writtenNotificaitonRequired}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Written Notification Sent</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.writtenNotificaitonSent}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Plan Request Date and Time Received</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.planDateTimeReceived}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Department Request Date and Time Received</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text dateTime">
                                <span className="date">{summaryData.departmentDate}</span>
                                <span className="date">{summaryData.departmentTime}</span>
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Due Date and Time</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text dateTime">
                                <span className="date">{summaryData.dueDate}</span>
                                <span className="date">{summaryData.dueTime}</span>
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Number of Issues Addressed in Resolution</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.issueResolution}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Resolution Description</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.resolutionDesc}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Date and Time Request Closed</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text dateTime">
                                <span className="date">{summaryData.requestClosedDate}</span>
                                <span className="date">{summaryData.requestClosedTime}</span>
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Member Notification</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text mb-15">{summaryData.memberNotificationOral}</p>
                            <p className="text">{summaryData.memberNotificationWritten}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Embedded Prior Authorization</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">
                                {summaryData.priorAuth}
                                <a href='#' className="color-blue cs-aor-link">PA Case ID</a>
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div className="title mb-15 pt-5">
                        <span>Attachments</span>
                    </div>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Number of Attachments</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.numberOfAttachments}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Outbound Communications</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.outboundCommunications}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Inbound Communications</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.inboundCommunications}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <span className="label">Other Documents</span>
                        </Grid>
                        <Grid item xs={7}>
                            <p className="text">{summaryData.otherDocuments}</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}