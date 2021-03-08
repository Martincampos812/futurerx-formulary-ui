import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import "./NewTestClaim3.scss";

export default function MultiIngredientField(props: any) {
    return (
        
        <div className="row-wrapper submission-field">
            <Grid item xs={12} className="mb-15">
                <Grid container className="mb-5" spacing={1}>
                    <Grid item xs={2}>
                        <div className="input">
                            <Input
                                className=""
                                placeholder=""
                                type="text"
                                name="claimId"
                                value=''
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="input">
                            <Input
                                className=""
                                placeholder=""
                                type="text"
                                name="claimId"
                                value=''
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="input">
                            <Input
                                className=""
                                placeholder=""
                                type="text"
                                name="claimId"
                                value=''
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="input">
                            <Input
                                className=""
                                placeholder=""
                                type="text"
                                name="claimId"
                                value=''
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="input">
                            <Input
                                className=""
                                placeholder=""
                                type="text"
                                name="claimId"
                                value=''
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="input">
                            <Input
                                className=""
                                placeholder=""
                                type="text"
                                name="claimId"
                                value=''
                            />
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <div className="delete-wrapper">
                <Box component="span" display="block" className="dml" onClick={props.deleteField}>
                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                    </svg>
                </Box>
            </div>
        </div>
    )
}