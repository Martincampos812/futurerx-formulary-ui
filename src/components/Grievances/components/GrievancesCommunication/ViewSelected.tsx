import React from 'react'
import {Grid,Button} from "@material-ui/core";
import { viewSelectedMsg } from "../../../../mocks/grid/grievance-view-selected";

export default function ViewSelected(props:any){
    return (
        <React.Fragment>
            <Grid container className="view-selected">
                <Grid item xs={12} className="mb-15">
                    <Grid container spacing={2}>
                        {
                            viewSelectedMsg().slice(0,props.viewselecteMsgCount).map(msg=>{
                                const msgdetail = msg.message.split('<br>');
                                return (
                                    <Grid item xs={6}>
                                    <div className="scrollbar scrollbar-primary  mt-5 mx-auto view-com-sec">
                                        <Grid item xs={12} className="mb-15">
                                            <Grid container spacing={2}>
                                                <Grid item xs={5}>
                                                    <span className="label">Name</span>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <p className="text">{msg.name}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className="mb-15">
                                            <Grid container spacing={2}>
                                                <Grid item xs={5}>
                                                    <span className="label">Date</span>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <p className="text">{msg.date}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className="mb-15">
                                            <Grid container spacing={2}>
                                                <Grid item xs={5}>
                                                    <span className="label">Type</span>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <p className="text">{msg.type}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className="mb-15">
                                            <Grid container spacing={2}>
                                                <Grid item xs={5}>
                                                    <span className="label">Description</span>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <p className="text">{msg.description}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className="mb-15">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <span className="label">
                                                        <span className="greet">{msgdetail[0]}</span>
                                                        <span className="greet">
                                                        {msgdetail[1]}
                                                        </span>
                                                        <span className="greet">
                                                        {msgdetail[2]}
                                                        </span>
                                                    </span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                )
                            })
                        }
                    </Grid> 
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
