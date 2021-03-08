import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotesPopup from "../../../member/MemberNotesPopup";
import "./GrievancesNotification.scss";

export default function Notification(props: any){
    const {writtenNotificationRequired,oralNotification,writtenNotification} = props.notificationData;

    const [expanded, setExpanded] = React.useState<string | false>('notificationPanel');

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
            className="notification-accordian"
            expanded={expanded === 'notificationPanel'}
            onChange={handleChange("notificationPanel")}>
            <AccordionSummary
                className="accordian-heading"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>
                    Notification
                    <svg onClick={handleNoteClick} className="note-icon" width="10" height="12" viewBox="0 0 10 12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z" fill="#2055B5"></path></svg>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="grievance-notification">
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
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Written Notification Required</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{writtenNotificationRequired ? 'Yes' : 'No'}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Oral Notification Date and Time</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p className="dateTime">
                                        <span className="date">{oralNotification.date}</span>
                                        <span className="time">{oralNotification.time}</span>
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                        {writtenNotificationRequired ? (<Grid item xs={12}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Written Notification Mailed Date and Time</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p className="dateTime">
                                        <span className="date">{writtenNotification.date}</span>
                                        <span className="time">{writtenNotification.time}</span>
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>) : null}
                        
                    </Grid>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};