import React, { useState, Component } from "react";
import MemberData from "../user-details/member-data/MemberData";
import { Checkbox, Input, Select } from "antd";
import { Box, Grid } from "@material-ui/core";
import "./BestPharmacy.scss";

const pharmacyData = [
    { title: 'Pharmacy Name', value: ' Walgreens' },
    { title: 'Address', value: '5357 Southwick Dr. Tampa, FL 33624' },
    { title: 'Phone #', value: '(814) 269-2814' },
    { title: 'Fax #', value: '(814) 269-2815' },
];

const timeData = [
    {
        title: 'Operating Hours', value: [
            { day: 'Mon', time: '9 AM - 5 PM EST' },
            { day: 'Tue', time: '9 AM - 5 PM EST' },
            { day: 'Wed', time: '9 AM - 5 PM EST' },
            { day: 'Thu', time: '9 AM - 7 PM EST' },
            { day: 'Fri', time: '9 AM - 7 PM EST' },
            { day: 'Sat', time: '9 AM - 12 PM EST' },
            { day: 'Sun', time: 'Closed' }
        ]
    }
]
interface Drug {
    drugName: string;
    bestPrice: number;
}
interface Props {
    drugList: any;
    pharmacyData: any;
}
interface State {
    drugData: Drug[];
    pharmacyData: any;
}

class BestPharmacy extends Component<Props, State> {

    state = {
        isOpen: false,
        diclofenacDrug: false,
        lisinoprilDrug: false,
        gileynaDrug: false,
        pharmacyData: [{ title: '', value: '' }],
        drugData: [{ bestPrice: 0, drugName: '' }]
    }

    componentDidMount() {

    }




    render() {
        let { drugList, pharmacyData } = this.props
        return (
            <div className="BestPharmacy-root">
                <div className="BestPharmacy-info">
                    <Grid container className="member-data">
                        <div className="row">
                            <Box component="div" display="inline">
                                pharmacy name
                            </Box>
                            <Box component="div" display="inline">
                                {pharmacyData.pharmacy}
                            </Box>
                        </div>
                        <div className="row">
                            <Box component="div" display="inline">
                                address
                            </Box>
                            <Box component="div" display="inline">
                                {pharmacyData.address}
                            </Box>
                        </div>
                        <div className="row">
                            <Box component="div" display="inline">
                                phone #
                            </Box>
                            <Box component="div" display="inline">
                                {pharmacyData.phone}
                            </Box>
                        </div>
                        <div className="row">
                            <Box component="div" display="inline">
                                fax #
                            </Box>
                            <Box component="div" display="inline">
                                {pharmacyData.fax}
                            </Box>
                        </div>
                        <div className="row">
                            <Box component="div" display="inline" className="oprHours">
                                operating hours
                            </Box>
                            <Box component="div" display="inline" className='timeRow-root'>
                                {pharmacyData.workingHours.map((_item: any) => (
                                    <div className="timeRow">
                                        <Box component="div" display="inline">
                                            {_item.day}
                                        </Box>
                                        <Box component="div" display="inline">
                                            {_item.time}
                                        </Box>
                                    </div>
                                ))}
                            </Box>
                        </div>
                    </Grid>
                </div>
                <div className="BestPharmacy-data">
                    <div className="BestPharmacy-data_info">
                        <div className="BestPharmacy-data_info_cost">
                            <div className="BestPharmacy-data_info_cost_heading">
                                <div>Total Cost</div>
                                <div>${this.state.drugData.length > 0 ? this.state.drugData.reduce((tot: any, item: any) => {
                                    return { bestPrice: item.bestPrice + tot.bestPrice, drugName: '' }
                                }).bestPrice.toFixed(2) : 0.00}</div>
                            </div>
                            <Grid container className="BestPharmacy-data_info_data">
                                <div className="row">
                                    <div className="left">
                                        drug label
                                    </div>
                                    <div className="right">best price</div>
                                </div>

                                {drugList.map((item: any) => (
                                    <div className="row">
                                        <div className="left">
                                            <Checkbox onChange={(e: any) => {
                                                if (e.target.checked) {
                                                    this.setState({
                                                        drugData: [...this.state.drugData.filter((_item: any) => _item.drugName !== item.drugName), { ...item, bestPrice: parseFloat(item.bestPrice.replace('$', '')) }]
                                                    })
                                                } else {
                                                    this.setState({ drugData: [...this.state.drugData.filter((_item: any) => _item.drugName !== item.drugName)] })
                                                }
                                            }} className="input--checkbox">{`${item.drugName} - ${item.capacity} - ${item.qty} ${item.type}`}</Checkbox>
                                        </div>
                                        <div className="right">${parseFloat(item.bestPrice.replace('$', '')).toFixed(2)}</div>
                                        <div className="tag">{item.store.tag}</div>
                                    </div>

                                ))}
                                <span className="offer-title">OTHER SERVICES OFFERED BY THE PHARMACY</span>
                                <div className="row">
                                    <div className="left">
                                        <Checkbox className="input--checkbox">Flu Shot available</Checkbox>
                                    </div>
                                    <div className="right">$0.00</div>
                                </div>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default BestPharmacy;
