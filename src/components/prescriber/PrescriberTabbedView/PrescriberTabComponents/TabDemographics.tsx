import React from 'react';

// Material
import { Box, Grid } from "@material-ui/core";

interface Props {
    prescriberTabDemography: any
}

class TabDemographic extends React.Component<Props> {
    render() {
        const {prescriberTabDemography} = this.props;
        return(
            <Grid item xs={12} className="prescriber-tabbed-view-root__content--demographic">
                <Grid item xs={5}>
                    <div className="row">
                    <Box component="div" display="inline">
                    Provider ID
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.providerId}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    Birth Date
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.birthDate}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    Deceased Date
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.deceasedDate}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    Relationship ID
                    </Box>
                    <Box component="div" className="hyperlink-value" display="inline">
                    {prescriberTabDemography.relationShipId}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    NPI
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.npi}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    UPIN
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.upin}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
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
                    Renewal Date
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.renewalDate}
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
                    <div className="row">
                    <Box component="div" display="inline">
                    Drug Schedule
                    </Box>
                    <Box component="div" display="inline">
                    {prescriberTabDemography.drugSchedule}
                    </Box>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default TabDemographic;