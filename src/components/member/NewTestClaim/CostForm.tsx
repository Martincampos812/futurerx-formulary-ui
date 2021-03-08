import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import "./NewTestClaim3.scss";

export default class SubmissionForm extends React.Component<any,any> {
    render(){
        return (
            <Grid item xs={12} className="cost">
            <div className="cost-container">
                <div className="submission-header">
                <span>Cost Fields</span>
                </div>
                <div className="cost-field">
                <div className="column-1">
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">Ingredient Cost<span className="astrict">&#42;</span></span>
                    </div>
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
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">Dispense Fee<span className="astrict">&#42;</span></span>
                    </div>
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
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">Incentive Amount</span>
                    </div>
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
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">Flat Sales Tax</span>
                    </div>
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
                </div>
                <div className="column-2">
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">Percentage Sales Tax Amount</span>
                    </div>
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
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">Percentage Sales Tax Rate</span>
                    </div>
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
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">Percentage Sales Tax Basis</span>
                    </div>
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
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">U&C Amount</span>
                    </div>
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
                </div>
                <div className="column-3">
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">Gross Amount Due<span className="astrict">&#42;</span></span>
                    </div>
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
                    <Grid container justify="space-between" alignItems="center">
                    <div className="label">
                        <span className="">Basic of Cost Determination<span className="astrict">&#42;</span></span>
                    </div>
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
                </div>
                </div>
            </div>
            </Grid>
        )
    }
}