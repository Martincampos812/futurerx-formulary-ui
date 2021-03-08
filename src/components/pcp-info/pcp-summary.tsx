import React from "react";
import Grid from "@material-ui/core/Grid";

import "./pcp-info.scss";
export default function PcpSummary() {


    return (

        <div className="pcpsummary">
            <div className="pcp-data">
                <Grid container xs={12}>
                    <Grid xs={12} sm={3}>
                        <div className="keyValue">
                            <div >Provider ID</div>
                            <div >Name</div>
                            <div >Gender</div>
                            <div >Birth Date</div>
                            <div >Deceased Date</div>
                            <div >Relationship ID</div>
                            <div >DEA #</div>
                            <div >Drug Schedule</div>
                        </div>

                    </Grid>
                    <Grid xs={12} sm={3}>
                        <div className="value">
                            <div >HD120498151K</div>
                            <div >James Sullivan</div>
                            <div >M</div>
                            <div >04/21/1957(64)</div>
                            <div >-</div>
                            <div>123598237</div>
                            <div>FF113123588</div>
                            <div>22N 33N 4 5</div>
                        </div>

                    </Grid>
                    <Grid xs={12} sm={3}>
                        <div className="keyValue_padding_left">
                            <div >NPI #</div>
                            <div >UPIN #</div>
                            <div >Degree</div>
                            <div >Tax ID</div>
                            <div >Medicaid ID</div>
                            <div >SPI Root</div>
                            <div >Status Code</div>
                            <div >Renewal Date</div>
                        </div>
                    </Grid>
                    <Grid xs={12} sm={3}>
                        <div className="value">
                            <div>143125478963</div>
                            <div >GJ21419</div>
                            <div >MD</div>
                            <div >09-2315561</div>
                            <div >MD123145</div>
                            <div >98723543987</div>
                            <div >Active</div>
                            <div >01/01/2023</div>
                        </div>
                    </Grid>
                </Grid>

            </div>
        </div>

    );
}
