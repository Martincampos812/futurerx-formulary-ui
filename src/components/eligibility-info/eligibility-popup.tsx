import React from "react";
import Grid from "@material-ui/core/Grid";
import {
    Input,
    Button,
    Form,
    DatePicker
} from 'antd';
import moment from "moment";


import "./eligibility-popup.scss";

interface EligibilityPopupInfoProps {
    activeTabIndex: number,
    isClose: any
}

class EligibilityPopupInfo extends React.Component<EligibilityPopupInfoProps> {

    render() {

        return (
            <div>
                {this.props.activeTabIndex == 0 ?
                    (<div className="eligibility-info">
                        <div className="eligibility-data">
                            <Grid container xs={12}>
                                <Grid xs={12} sm={3}>
                                    <div className="keyValue">
                                        <div >Begin Date</div>
                                        <div >End Date</div>
                                        <div >UPI/MBN</div>
                                        <div >Contract/PBP</div>
                                        <div >Group ID</div>
                                        <div >Submit Group ID</div>
                                        <div >BIN#</div>
                                        <div >Carrier</div>
                                        <div >PCN</div>
                                        <div >Account</div>
                                        <div >Segment ID</div>
                                        <div >Enrollment Source</div>
                                        <div >Plan Year</div>
                                        <div >Effective Date</div>
                                        <div >HIC #</div>
                                        <div >Plan ID</div>
                                        <div >Plan Start Date</div>
                                        <div >Plan End Date</div>
                                    </div>

                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="value">
                                        <div >09/22/2020</div>
                                        <div >09/22/2021</div>
                                        <div >Tampa</div>
                                        <div >FL</div>
                                        <div >12345</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>12/12/2019</div>
                                        <div>12345</div>
                                        <div>12345</div>
                                        <div>01/01/2014</div>
                                        <div>12/31/2020</div>
                                    </div>

                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="keyValue_padding_left">
                                        <div >LICS Code</div>
                                        <div >LICS Start Date</div>
                                        <div >LICS End Date</div>
                                        <div >LTC</div>
                                        <div >LTC Start Date</div>
                                        <div >LTC End Date</div>
                                        <div >Hospice</div>
                                        <div >Hospice Start Date</div>
                                        <div >Hospice End Date</div>
                                        <div >ESRD</div>
                                        <div >ESRD Start Date</div>
                                        <div >ESRD End Date</div>
                                        <div >Transplant</div>
                                        <div >Transplant Start Date</div>
                                        <div >Transplant End Date</div>
                                        <div >Transition Eligibility</div>
                                        <div >Transition Start Date</div>
                                        <div >Transition End Date</div>
                                    </div>
                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="value">
                                        <div >-</div>
                                        <div>12/12/2020</div>
                                        <div >12/22/2020</div>
                                        <div >12345</div>
                                        <div>11/11/2020</div>
                                        <div >11/11/2020</div>
                                        <div >12345</div>
                                        <div >03/03/2020</div>
                                        <div >12/22/2020</div>
                                        <div >12345</div>
                                        <div >01/01/2010</div>
                                        <div >01/22/2020</div>
                                        <div >12345</div>
                                        <div >04/04/2020</div>
                                        <div >01/02/2021</div>
                                        <div >12345</div>
                                        <div >01/22/2020</div>
                                        <div >12/21/2020</div>
                                        <button className="close-button" onClick={this.props.isClose} >Close</button>
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                    </div>) : this.props.activeTabIndex == 1 ? (<div className="eligibility-info">
                        <div className="eligibilityEditAddData">
                            <Grid container xs={12}>
                                <Grid xs={12} sm={3}>
                                    <div className="keyValue_edit">
                                        <div >Begin Date</div>
                                        <div >End Date</div>
                                        <div >UPI/MBN</div>
                                        <div >Contract/PBP</div>
                                        <div >Group ID</div>
                                        <div >Submit Group ID</div>
                                        <div >BIN#</div>
                                        <div >Carrier</div>
                                        <div >PCN</div>
                                        <div >Account</div>
                                        <div >Segment ID</div>
                                        <div >Enrollment Source</div>
                                        <div >Plan Year</div>
                                        <div >Effective Date</div>
                                        <div >HIC #</div>
                                        <div >Plan ID</div>
                                        <div >Plan Start Date</div>
                                        <div >Plan End Date</div>
                                    </div>

                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="value_edit">
                                        <DatePicker placeholder="MM/DD/YYYY" suffixIcon={
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
                                        } format="MM/DD/YYYY" defaultValue={moment("09/22/2020")} />
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
                                        } />
                                        <Input defaultValue="Tampa" />
                                        <Input defaultValue="FL" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY" defaultValue={moment("12/12/2020")} suffixIcon={
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
                                        <Input defaultValue="12345" />
                                        <Input defaultValue="12345" />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY" defaultValue={moment("01/01/2014")} suffixIcon={
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
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY" defaultValue={moment("12/31/2020")} suffixIcon={
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
                                    </div>

                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="keyValue_edit_right">
                                        <div >LICS Code</div>
                                        <div >LICS Start Date</div>
                                        <div >LICS End Date</div>
                                        <div >LTC</div>
                                        <div >LTC Start Date</div>
                                        <div >LTC End Date</div>
                                        <div >Hospice</div>
                                        <div >Hospice Start Date</div>
                                        <div >Hospice End Date</div>
                                        <div >ESRD</div>
                                        <div >ESRD Start Date</div>
                                        <div >ESRD End Date</div>
                                        <div >Transplant</div>
                                        <div >Transplant Start Date</div>
                                        <div >Transplant End Date</div>
                                        <div >Transition Eligibility</div>
                                        <div >Transition Start Date</div>
                                        <div >Transition End Date</div>
                                    </div>
                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <div className="value_edit">
                                        <Input defaultValue="-" />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            }
                                            defaultValue={moment("12/12/2020")} />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("12/22/2020")} />
                                        <Input defaultValue="12345" />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("11/11/2020")} />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("11/11/2020")} />
                                        <Input defaultValue="12345" />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("03/03/2020")} />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("12/22/2020")} />
                                        <Input defaultValue="12345" />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("01/01/2020")} />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("01/22/2020")} />
                                        <Input defaultValue="12345" />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("04/04/2020")} />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY" suffixIcon={
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
                                        } defaultValue={moment("04/02/2020")} />
                                        <Input defaultValue="12345" />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("01/22/2020")} />
                                        <DatePicker placeholder="MM/DD/YYYY" format="MM/DD/YYYY"
                                            suffixIcon={
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
                                            } defaultValue={moment("12/21/2021")} />

                                        <div className="eligibility-btn-container">
                                            <button className="cancel-button" onClick={this.props.isClose} >Cancel</button>
                                            <button className="save-button" >Save</button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                    </div>) : this.props.activeTabIndex == 2 ? (<div className="eligibility-info">
                        <div className="eligibilityEditAddData">
                            <Form

                                name="Eligibility-Form"
                                initialValues={{
                                    remember: true,
                                }}

                            >
                                <Grid container xs={12}>
                                    <Grid xs={12} sm={3}>
                                        <div className="keyValue_add_title">
                                            <div >Begin Date</div>
                                            <div >End Date</div>
                                            <div >UPI/MBN</div>
                                            <div >Contract/PBP</div>
                                            <div >Group ID</div>
                                            <div >Submit Group ID</div>
                                            <div >BIN#</div>
                                            <div >Carrier</div>
                                            <div >PCN</div>
                                            <div >Account</div>
                                            <div >Segment ID</div>
                                            <div >Enrollment Source</div>
                                            <div >Plan Year</div>
                                            <div >Effective Date</div>
                                            <div >HIC #</div>
                                            <div >Plan ID</div>
                                            <div >Plan Start Date</div>
                                            <div >Plan End Date</div>
                                        </div>

                                    </Grid>
                                    <Grid xs={12} sm={3}>
                                        <div className="value_add">
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
                                            } />
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
                                            } />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
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
                                            } />
                                            <Input defaultValue="" />
                                            <Input defaultValue="" />
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
                                            } />
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
                                            } />
                                        </div>
                                    </Grid>
                                    <Grid xs={12} sm={3}>
                                        <div className="keyValue_add_title_right">
                                            <div >LICS Code</div>
                                            <div >LICS Start Date</div>
                                            <div >LICS End Date</div>
                                            <div >LTC</div>
                                            <div >LTC Start Date</div>
                                            <div >LTC End Date</div>
                                            <div >Hospice</div>
                                            <div >Hospice Start Date</div>
                                            <div >Hospice End Date</div>
                                            <div >ESRD</div>
                                            <div >ESRD Start Date</div>
                                            <div >ESRD End Date</div>
                                            <div >Transplant</div>
                                            <div >Transplant Start Date</div>
                                            <div >Transplant End Date</div>
                                            <div >Transition Eligibility</div>
                                            <div >Transition Start Date</div>
                                            <div >Transition End Date</div>
                                        </div>
                                    </Grid>
                                    <Grid xs={12} sm={3}>
                                        <div className="value_add">
                                            <Input />
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
                                            } />
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
                                            } />
                                            <Input />
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
                                            } />
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
                                            } />
                                            <Input />
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
                                            } />
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
                                            } />
                                            <Input />
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
                                            } />
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
                                            } />
                                            <Input />
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
                                            } />
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
                                            } />
                                            <Input />
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
                                            } />
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
                                            } />


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
export default EligibilityPopupInfo;