import React from 'react';

// Material
import { Box, Grid } from "@material-ui/core";

interface Props {
    prescriberTabSpeciality: any
}

class TabSpeciality extends React.Component<Props> {
    render() {
        const {prescriberTabSpeciality} = this.props;
        return(
            <Grid item xs={12} className="prescriber-tabbed-view-root__content--speciality">
                <Grid>
                    <h5>Primary Specialty</h5>
                    <div className="row">
                    <Box component="div" display="inline">
                    Taxonomy Code
                    </Box>
                    <Box component="div" display="inline">
                        {prescriberTabSpeciality.primarySpeciality.taxonomyCode}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    Taxonomy Description
                    </Box>
                    <Box component="div" display="inline">
                        {prescriberTabSpeciality.primarySpeciality.taxonomyDescription}
                    </Box>
                    </div>
                </Grid>
                <Grid>
                    <h5>Secondary Specialty</h5>
                    <div className="row">
                    <Box component="div" display="inline">
                    Taxonomy Code
                    </Box>
                    <Box component="div" display="inline">
                        {prescriberTabSpeciality.secondarySpeciality.taxonomyCode}
                    </Box>
                    </div>
                    <div className="row">
                    <Box component="div" display="inline">
                    Taxonomy Description
                    </Box>
                    <Box component="div" display="inline">
                        {prescriberTabSpeciality.secondarySpeciality.taxonomyDescription}
                    </Box>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default TabSpeciality;