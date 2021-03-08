import { Box, Grid, InputLabel, LinearProgress, MenuItem, Select } from '@material-ui/core';
import React, { Component } from 'react';
import './FrxAssignedDetails.scss';

interface FrxAssignedDetailsState {
    assignTo: string;
    status: string;
    reason: string;
    explanation: string;
}
interface FrxAssignedDetailsProps {

}

const styles = theme => ({

    dropdownStyle: {
        border: "1px solid black",
        borderRadius: "5%",
        backgroundColor: 'lightgrey',
    }

});

class FrxAssignedDetails extends Component<FrxAssignedDetailsProps, FrxAssignedDetailsState>{
    state = {
        assignTo: '',
        status: '',
        reason: '',
        explanation: '',
    }

    componentDidMount() {
        this.setState({
            assignTo: 'Jonathan Richardson',
            status:'closed',
            reason:'Select Reason',
            explanation:'Select Explanation'
        })
    }
    render() {
        return (
            <div className="FrxAssignedDetails-root">
                <div className="assignedTo-root">
                    <InputLabel className="label" htmlFor="assignedTo">ASSIGNED TO</InputLabel>
                    <Select
                        data-name={this.state.assignTo.substr(0, 1)}
                        className="selectBox"
                        value={this.state.assignTo}
                        onChange={(item: any) => {
                            this.setState({ assignTo: item.target.value })
                        }}
                        inputProps={{
                            name: 'assignedTo',
                            id: 'assignedTo',
                        }}
                        MenuProps={{ classes: { paper: 'options' } }}
                    >
                        <MenuItem value={'Jonathan Richardson'}>Jonathan Richardson</MenuItem>
                        <MenuItem value={'George Smith'}>George Smith</MenuItem>
                        <MenuItem value={'Raghu Rao'}>Raghu Rao</MenuItem>
                    </Select>
                </div>
                <div className="grid2x2">
                    <Grid container justify="center">
                        <Grid item>
                            <Box component="span" display="block">
                                WORKFLOW
                        </Box>
                            <Box component="span" display="block">
                                PA
                        </Box>
                        </Grid>
                        <Grid item>
                            <Box component="span" display="block">
                                PRIORITY
                        </Box>
                            <Box component="span" display="block" style={{ color: '#5F80B9', fontWeight: "bold" }}>
                                MEDIUM
                        </Box>
                        </Grid>
                    </Grid>
                </div>
                <div className="grid1x2">
                    <Box component="span" display="block">
                        Description
                    </Box>
                    <Box component="span" display="block">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </Box>
                </div>
                <div className="grid2x2">
                    <Grid container justify="center">
                        <Grid item>
                            <Box component="span" display="block">
                                CREATED
                        </Box>
                            <Box component="span" display="block">
                                September 08, 2020
                        </Box>
                        </Grid>
                        <Grid item>
                            <Box component="span" display="block">
                                CREATED BY
                        </Box>
                            <Box component="span" display="block" >
                                Mary Smith
                        </Box>
                        </Grid>
                    </Grid>
                </div>
                <div className="grid1x2">
                    <Box component="span" display="block">
                        Remaining
                    </Box>
                    <Box component="span" display="block">
                        <div className="progress-root">
                            <span className="label">09/18/2020 @ 10:30 AM</span>
                            <LinearProgress variant="determinate" value={50} classes={{ root: 'progress', colorPrimary: 'color', bar: 'bar' }} />
                        </div>

                    </Box>
                </div>
                <div className="grid1x2" style={{ marginTop: 18 }}>
                    <Box component="span" display="block">
                        STATUS
                    </Box>
                    <Box component="span" display="block">
                        <div className="grid2x2">
                            <Grid container justify="center">
                                <Grid item>
                                    <Box component="span" display="block">
                                        <Select
                                            value={this.state.status}
                                            onChange={(item: any) => { this.setState({ status: item.target.value }) }}
                                            className="selectBox"
                                            disableUnderline
                                            data-value={this.state.status}
                                        >
                                            <MenuItem aria-label="None" value="" />
                                            <MenuItem value={'closed'}>Closed</MenuItem>
                                        </Select>
                                    </Box>
                                    <Box component="span" display="block">
                                        <Select
                                            value={this.state.reason}
                                            onChange={(item: any) => { this.setState({ reason: item.target.value }) }}
                                            className="selectBox"
                                            disableUnderline
                                        >
                                            <MenuItem value="Select Reason" disabled>Select Reason</MenuItem>
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box component="span" display="block" style={{ minHeight: 38 }}>

                                    </Box>
                                    <Box component="span" display="block" >
                                        <Select
                                        aria-placeholder="sample"
                                            disabled={true}
                                            disableUnderline
                                            value={this.state.explanation}
                                            onChange={(item: any) => { this.setState({ explanation: item.target.value }) }}
                                            className="selectBox"
                                        >
                                            <MenuItem value="Select Explanation" disabled>Select Explanation</MenuItem>
                                        </Select>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </div>

            </div>
        )
    }
}

export default FrxAssignedDetails;