import React from 'react';

// Material
import { Box, Grid } from "@material-ui/core";

interface Props {
    prescriberTabLicensure: any
}

class TabLicensure extends React.Component<Props> {
    render() {
        const {prescriberTabLicensure} = this.props;
        return(
            <Grid item xs={12} className="prescriber-tabbed-view-root__content--demographic">
                <Grid item xs={5}>
                <h5>Primary Licensure</h5>
                    <div className="row">
                    <Box component="div" display="inline">
                    Expiration Date
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabLicensure.expirationDate}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    License Number
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabLicensure.licenseNumber}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    License State
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabLicensure.licenseDate}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
                </Grid>
            </Grid>
        );
    }
}

export default TabLicensure;