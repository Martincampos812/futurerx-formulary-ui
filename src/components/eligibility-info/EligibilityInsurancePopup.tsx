import React from "react";
import Grid from "@material-ui/core/Grid";
import {
    Input,
    Form,
    DatePicker
} from 'antd';
import moment from "moment";

import "./EligibilityInsurancePopup.scss";

interface EligibilityInsurancePopupProps {
    activeTabIndex: number
    isClose: any
}

class EligibilityInsurancePopup extends React.Component<EligibilityInsurancePopupProps> {


    render() {
        return (
            <div>
                {this.props.activeTabIndex == 0 ?
                    (<div className="eligibilityInsurance-info">
                        <div className="eligibilityInsurance-data">
                            <Grid container xs={12}>
                                <Grid xs={12} sm={3}>
                                    <div className="keyValue">
                                        <div >Begin Date</div>
                                        <div >End Date</div>
                                        <div >Process Flag</div>
                                        <div >Person Code</div>
                                    </div>

                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="value">
                                        <div >09/22/2020</div>
                                        <div >09/22/2021</div>
                                        <div >Tampa</div>
                                        <div >FL</div>
                                    </div>

                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="keyValue_left_title">
                                        <div >Insurance ID</div>
                                        <div >BIN#</div>
                                        <div >PCN</div>
                                        <div >Group ID</div>

                                    </div>
                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="keyValue_right_title">
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <button className="close-button" onClick={this.props.isClose} >Close</button>
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                    </div>) : this.props.activeTabIndex == 1 ? (<div className="eligibilityInsurance-info">
                        <div className="eligibilityInsEditAddData">
                            <Grid container xs={12}>
                                <Grid xs={12} sm={3}>
                                    <div className="keyValue_edit">
                                        <div >Begin Date</div>
                                        <div >End Date</div>
                                        <div >Process Flag</div>
                                        <div >Person Code</div>
                                    </div>

                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="value_edit">
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY" defaultValue={moment("09/22/2020")} suffixIcon={
                                            <svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 18 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ant-picker-suffix"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                                                    fill="#C4C4C4"
                                                />
                                            </svg>
                                        } />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY" defaultValue={moment("09/22/2021")} suffixIcon={
                                            <svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 18 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ant-picker-suffix"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                                                    fill="#C4C4C4"
                                                />
                                            </svg>
                                        }/>
                                        <Input defaultValue="Tampa" />
                                        <Input defaultValue="FL" />

                                    </div>

                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="keyValue_edit_right">
                                        <div >Insurance ID</div>
                                        <div >BIN#</div>
                                        <div >PCN</div>
                                        <div >Group ID</div>
                                    </div>
                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="value_edit">
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />

                                        <div className="eligibility-btn-container">
                                            <button className="cancel-button" onClick={this.props.isClose} >Cancel</button>
                                            <button className="save-button" >Save</button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                    </div>) : this.props.activeTabIndex == 2 ? (<div className="eligibilityInsurance-info">
                        <div className="eligibilityInsEditAddData">
                            <Form
                                name="varification-Form"
                                initialValues={{
                                    remember: true,
                                }}

                            >
                                <Grid container xs={12}>
                                    <Grid xs={12} sm={3}>
                                        <div className="keyValue_add_title">
                                            <div >Begin Date</div>
                                            <div >End Date</div>
                                            <div >Process Flag</div>
                                            <div >Person Code</div>

                                        </div>

                                    </Grid>
                                    <Grid xs={12} sm={3}>
                                        <div className="value_edit">
                                            <DatePicker placeholder="" format="MM/DD/YYYY"  suffixIcon={
                                            <svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 18 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ant-picker-suffix"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                                                    fill="#C4C4C4"
                                                />
                                            </svg>
                                        }/>
                                            <DatePicker placeholder="" format="MM/DD/YYYY" suffixIcon={
                                            <svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 18 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ant-picker-suffix"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                                                    fill="#C4C4C4"
                                                />
                                            </svg>
                                        }/>
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />

                                        </div>
                                    </Grid>
                                    <Grid xs={12} sm={3}>
                                        <div className="keyValue_add_title_right">
                                            <div >Insurance ID</div>
                                            <div >BIN#</div>
                                            <div >PCN</div>
                                            <div >Group ID</div>
                                        </div>
                                    </Grid>
                                    <Grid xs={12} sm={3}>
                                        <div className="value_add">
                                            <Input />
                                            <Input />
                                            <Input  />
                                            <Input />
                                            <div className="eligibility-btn-container">
                                                <button className="cancel-button" onClick={this.props.isClose} >Cancel</button>
                                                <button className="save-button" >Save</button>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Form>
                        </div>
                    </div>) : ("")}
            </div>

        );
    }

}
export default EligibilityInsurancePopup;