import React from 'react';

// Material
import { Box, Grid } from "@material-ui/core";

interface Props {
    prescriberTabDemography: any
}

class TabPharmacyDemographics extends React.Component<Props> {
    render() {
        const {prescriberTabDemography} = this.props;
        return(
            <Grid item xs={12} className="prescriber-tabbed-view-root__content--demographic">
                <Grid item xs={5}>
                    <div className="row">
                    <Box component="div" display="inline">
                    Pharmacy NCPDP 
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.pharmacyNcpdp}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    NPI
                    </Box>
                    <Box className="hyperlink-value" component="div" display="inline">
                    {prescriberTabDemography.npi}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    Tax ID
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.taxId}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    Medicaid ID
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.medicaidId}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    Relationship ID
                    </Box>
                    <Box className="hyperlink-value" component="div" display="inline">
                    {prescriberTabDemography.relationShipId}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    DEA Number
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.deaNumber}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className="row">
                    <Box component="div" display="inline">
                    Renewal Date
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.renewalDate}
                    </Box>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default TabPharmacyDemographics;