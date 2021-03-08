import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotesPopup from "../../../member/MemberNotesPopup";
import './GrievancesDetails.scss';

export default function GrievancesIntake(props: any) {
    const {
        occurrenceDate,
        occurrenceTime,
        category,
        subcategory,
        qualityOfCare,
        priorAuthorization,
        grievanceIssues,
        planDate,
        planTime,
        departmentDate,
        departmentTime,
        dueDate,
        dueTime,
        extensionTaken,
        notifiedOfDelay,
        extentionNotificationLetterLink
    } = props.details;

    const [expanded, setExpanded] = React.useState<string | false>('detailPanel');

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [isNotesOpen, setIsNotesOpen] = React.useState<boolean | false>(false);
    const handleNoteClick = (event: React.ChangeEvent<{}>) => {
        event.stopPropagation();
        setIsNotesOpen(!isNotesOpen);
    };
    const handleCloseNote = () => {
        setIsNotesOpen(!isNotesOpen);
    };
    return (
        <Accordion
            expanded={expanded === 'detailPanel'}
            onChange={handleChange("detailPanel")}>
            <AccordionSummary
                className="accordian-heading"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>
                    Details
                    <svg onClick={handleNoteClick} className="note-icon" width="10" height="12" viewBox="0 0 10 12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z" fill="#2055B5"></path></svg>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="grievance-details">
                    {isNotesOpen ? (
                        <NotesPopup
                                category="Grievances"
                                openPopup={isNotesOpen}
                                onClose={handleCloseNote}
                        />) : (
                            ""
                    )}
                    <Grid container>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Grievance Occurrence Date and Time</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p className="dateTime">
                                        <span className="date">{occurrenceDate}</span>
                                        <span className="time">{occurrenceTime}</span>
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Grievance Category</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{category}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Grievance Subcategory</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{subcategory}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Quality of Care Grievance</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{qualityOfCare}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Embedded Prior Authorization</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{priorAuthorization}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Grievance Issue Description</span>
                                </Grid>
                                <Grid item xs={7}>
                                    {grievanceIssues.map(e => (
                                        <p className="mb-15">{e.title}</p>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Plan Request Date and Time Received</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p className="dateTime">
                                        <span className="date">{planDate}</span>
                                        <span className="time">{planTime}</span>
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Department Request Date and Time Start</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p className="dateTime">
                                        <span className="date">{departmentDate}</span>
                                        <span className="time">{departmentTime}</span>
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Due Date</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p className="dateTime">
                                        <span className="date">{dueDate}</span>
                                        <span className="time">{dueTime}</span>
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">14 Day Timeframe Extension Taken</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{extensionTaken}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Member Notified for Reason of Delay</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{notifiedOfDelay}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Plan extension member notification Letter</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p className="color-blue">
                                        <a  href={extentionNotificationLetterLink}
                                            target="_blank"
                                            className="color-blue">Member Extension Notification Letter</a>
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </div>
            </AccordionDetails>
        </Accordion>

    )
}