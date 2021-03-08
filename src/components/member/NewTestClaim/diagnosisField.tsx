import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import { drugsSearch } from "../../../mocks/grid/drugs-mock";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function DiagnosisField(props: any){
    return (
        <div className="claims-search claims-history-search custom-grid-wrapper w-50p">
            <div className="row-wrapper">
                <Grid container spacing={1}>
                    <Grid item>
                        <div className="input">
                        <Autocomplete
                            id="free-solo-demo"
                            className="claims-search__input"
                            freeSolo
                            placeholder="02"
                            options={drugsSearch['Diagnosis'].map((option) => option.Code)}
                            renderInput={(params) => (
                            <TextField {...params} placeholder="02" />
                            )}
                        />
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="input">
                        <Autocomplete
                            id="free-solo-demo"
                            className="claims-search__input"
                            freeSolo
                            placeholder="Search"
                            options={drugsSearch['Diagnosis'].map((option) => `${option.Code}:  ${option.Meaning}`)}
                            renderInput={(params) => (
                            <TextField {...params} placeholder="Search" InputProps={{
                                ...params.InputProps,
                                startAdornment: <span>{
                                    <svg
                                    className="test-claim-search__icon"
                                    width="11"
                                    height="11"
                                    viewBox="0 0 11 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                                        fill="#999999"
                                    />
                                    </svg>
                                }</span>
                            }}/>
                            )}
                        />
                        </div>
                    </Grid>
                </Grid>
                <div className="delete-wrapper">
                    <Box component="span" display="block" onClick={props.deleteField}>
                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                    </svg>
                    </Box>
                </div>
            </div>
        </div>
    )
}