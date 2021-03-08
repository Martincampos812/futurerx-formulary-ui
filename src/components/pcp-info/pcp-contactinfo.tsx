import React from "react";
import Grid from "@material-ui/core/Grid";

import "./pcp-contactinfo.scss";
export default function PcpContactInfo() {


    return (

        <div className="pcpcontact-info">
            <div className="pcp-data">
                <Grid container xs={12}>
                    <Grid xs={12} sm={3}>
                        <div className="keyValue">
                            <div >Street 1</div>
                            <div >Street 2</div>
                            <div >City</div>
                            <div >State</div>
                            <div >Zip</div>
                            <div >Country</div>
                            <div >County</div>
                            <div >Phone</div>
                            <div >Email</div>
                            <div >Fax</div>
                            <div >Language</div>
                        </div>

                    </Grid>
                    <Grid xs={12} sm={3}>
                        <div className="value">
                            <div >1234 Main St.</div>
                            <div >Suite a</div>
                            <div >Tampa</div>
                            <div >FL</div>
                            <div >12345-6789</div>
                            <div>USA</div>
                            <div>Hillsborough</div>
                            <div>(555) 555 - 5555</div>
                            <div>abc@gmail.com</div>
                            <div>(555) 555 - 5555</div>
                            <div>Spanish, french</div>
                        </div>

                    </Grid>
                    <Grid xs={12} sm={3}>
                        <div className="keyValue_padding_left">
                            <div >Contact Name</div>
                            <div >Contact Title</div>
                            <div >Contact Phone</div>
                            <div >Contact Email</div>
                            <div className="hoursBox-container">Office Hours</div>
                            <div className="hoursFlag">24 Hours Flag</div>
                        </div>
                    </Grid>
                    <Grid xs={12} sm={3}>
                        <div className="value">
                            <div>John Robart</div>
                            <div >Office Manager</div>
                            <div>(555) 555 - 5555</div>
                            <div >abc@gmail.com</div>
                            <div className="hoursBox-container">
                            <div className="hoursBox">
                                <div className="monthsTitle">Mon</div>
                                <div className="timeTitle">9 AM - 5 PM EST</div>
                            </div>
                            <div className="hoursBox">
                                <div className="monthsTitle">Thu</div>
                                <div className="timeTitle">9 AM - 5 PM EST</div>
                            </div>
                            <div className="hoursBox">
                                <div className="monthsTitle">Wed</div>
                                <div className="timeTitle">9 AM - 5 PM EST</div>
                            </div>
                            <div className="hoursBox">
                                <div className="monthsTitle">The</div>
                                <div className="timeTitle">9 AM - 7 PM EST</div>
                            </div>
                            <div className="hoursBox">
                                <div className="monthsTitle">Fri</div>
                                <div className="timeTitle">9 AM - 7 PM EST</div>
                            </div>
                            <div className="hoursBox">
                                <div className="monthsTitle">Sat</div>
                                <div className="timeTitle">9 AM - 12 PM EST</div>
                            </div>
                            <div className="hoursBox">
                                <div className="monthsTitle">Sun</div>
                                <div className="timeTitle">Closed</div>
                            </div>
                            <div className="hoursBox">
                                <div className="monthsTitle"></div>
                                <div className="timeTitle">No</div>
                            </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>

            </div>
        </div>

    );
}
