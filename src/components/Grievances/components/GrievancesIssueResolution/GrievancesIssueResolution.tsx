import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotesPopup from "../../../member/MemberNotesPopup";
import "./GrievancesIssueResolution.scss";

export default function GrievancesIssueResolution(props: any){
    const {resolvedIssue,issues,description} = props.issueResolutionData;
    const [expanded, setExpanded] = React.useState<string | false>('issueResolutionPanel');

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
            className="issue-resolution-accordian"
            expanded={expanded === 'issueResolutionPanel'}
            onChange={handleChange("issueResolutionPanel")}>
            <AccordionSummary
                className="accordian-heading"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>Issue Resolution</Grid>
                        <Grid item xs={7}>
                            <div className="number-of-issues">
                                <span>Number of Issues Addressed in Resolution:</span>
                                <span className="issue-number">{resolvedIssue}</span>
                            </div>
                        </Grid>
                    </Grid>
                    <svg onClick={handleNoteClick} className="note-icon" width="10" height="12" viewBox="0 0 10 12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z" fill="#2055B5"></path></svg>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="issue-resolution">
                    {isNotesOpen ? (
                        <NotesPopup
                                category="Grievances"
                                openPopup={isNotesOpen}
                                onClose={handleCloseNote}
                        />) : (
                            ""
                    )}
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container justify="flex-end" spacing={2}>
                                <Grid item xs={7}>
                                    {issues.map((e,index) => 
                                        <p className="mb-15 icon-text">
                                            <span>{e.title}</span>
                                            {e.resolved ? (
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.99981 0.761719C4.00271 0.761719 0.761719 4.00271 0.761719 7.99981C0.761719 11.9969 4.00271 15.2379 7.99981 15.2379C11.9969 15.2379 15.2379 11.9969 15.2379 7.99981C15.2379 4.00271 11.9969 0.761719 7.99981 0.761719ZM11.1261 5.63612L7.72354 10.3538C7.67598 10.4202 7.61329 10.4743 7.54066 10.5116C7.46803 10.5489 7.38755 10.5684 7.30589 10.5684C7.22424 10.5684 7.14376 10.5489 7.07113 10.5116C6.9985 10.4743 6.93581 10.4202 6.88825 10.3538L4.87354 7.56197C4.81214 7.47635 4.87354 7.35679 4.97856 7.35679H5.73629C5.90109 7.35679 6.05781 7.43595 6.15475 7.57167L7.30509 9.16793L9.84488 5.64582C9.94182 5.51172 10.0969 5.43094 10.2633 5.43094H11.0211C11.1261 5.43094 11.1875 5.5505 11.1261 5.63612Z" fill="#80C483"/>
                                                </svg>
                                            ): (
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.24 0C3.24791 0 0 3.24791 0 7.24C0 11.2321 3.24791 14.48 7.24 14.48C11.2321 14.48 14.48 11.2321 14.48 7.24C14.48 3.24791 11.2321 0 7.24 0ZM9.86137 9.07402C9.91526 9.12522 9.95835 9.18669 9.98812 9.25481C10.0179 9.32293 10.0337 9.39631 10.0347 9.47064C10.0356 9.54497 10.0217 9.61874 9.99366 9.6876C9.96565 9.75646 9.92414 9.81901 9.87158 9.87158C9.81901 9.92414 9.75646 9.96565 9.6876 9.99366C9.61874 10.0217 9.54497 10.0356 9.47064 10.0347C9.39631 10.0337 9.32293 10.0179 9.25481 9.98812C9.18669 9.95835 9.12522 9.91526 9.07402 9.86137L7.24 8.0277L5.40598 9.86137C5.30069 9.9614 5.16048 10.0163 5.01526 10.0145C4.87004 10.0126 4.73128 9.95411 4.62859 9.85141C4.52589 9.74872 4.46737 9.60996 4.46551 9.46474C4.46365 9.31952 4.5186 9.17931 4.61863 9.07402L6.4523 7.24L4.61863 5.40598C4.5186 5.30069 4.46365 5.16048 4.46551 5.01526C4.46737 4.87004 4.52589 4.73128 4.62859 4.62859C4.73128 4.52589 4.87004 4.46737 5.01526 4.46551C5.16048 4.46365 5.30069 4.5186 5.40598 4.61863L7.24 6.4523L9.07402 4.61863C9.17931 4.5186 9.31952 4.46365 9.46474 4.46551C9.60996 4.46737 9.74872 4.52589 9.85141 4.62859C9.95411 4.73128 10.0126 4.87004 10.0145 5.01526C10.0163 5.16048 9.9614 5.30069 9.86137 5.40598L8.0277 7.24L9.86137 9.07402Z" fill="#E76262"/>
                                                </svg>
                                            )}
                                        </p>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Resolution Description</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{description}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </div>
            </AccordionDetails>
        </Accordion>
    );
};