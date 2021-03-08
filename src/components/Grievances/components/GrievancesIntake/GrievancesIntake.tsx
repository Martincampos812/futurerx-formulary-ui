import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import NotesPopup from "../../../member/MemberNotesPopup";

import './GrievancesIntake.scss';

export default function GrievancesIntake(props: any){
    
    const {type,priority,upgradeToExpedited,intakeMethod,methodDetails,requestor, date, time,AORLink} = props.intakeData;
    const [expanded, setExpanded] = React.useState<string | false>('intakePanel');

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
            expanded={expanded === 'intakePanel'}
            onChange={handleChange("intakePanel")}>
            <AccordionSummary
                className="accordian-heading"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>
                    Intake
                    <svg onClick={handleNoteClick} className="note-icon" width="10" height="12" viewBox="0 0 10 12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z" fill="#2055B5"></path></svg>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="grievance-intake">
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
                                    <span className="label">Type</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{type}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Priority</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{priority}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">
                                        Upgraded to Expedited
                                        <Tooltip 
                                            classes={{
                                                tooltip: 'custom-tooltip'
                                            }}
                                            title="Based on member’s health." 
                                            placement="right" 
                                            arrow>
                                            <svg className="info-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z" fill="#1D54B4"/>
                                            </svg>
                                        </Tooltip>
                                    </span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{upgradeToExpedited}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Case Intake Method</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{intakeMethod}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">
                                        Method Details
                                        <Tooltip 
                                            classes={{
                                                tooltip: 'custom-tooltip'
                                            }}
                                            title="Optional" 
                                            placement="right" 
                                            arrow>
                                            <svg className="info-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z" fill="#1D54B4"/>
                                            </svg>
                                        </Tooltip>
                                    </span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p>{methodDetails}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mb-15">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">Requestor</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p className="mb-15">{requestor}</p>
                                    <p className="color-blue">
                                        <a href={AORLink} className="color-blue" target="_blank">AOR</a>
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span className="label">AOR Receipt Date and Time</span>
                                </Grid>
                                <Grid item xs={7}>
                                    <p className="dateTime">
                                        <span className="date">{date}</span>
                                        <span className="time">{time}</span>
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