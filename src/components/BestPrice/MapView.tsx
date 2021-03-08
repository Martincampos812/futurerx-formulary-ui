import React, { useState, Component } from "react";
import { Box, Grid } from "@material-ui/core";
import GoogleMap from '../GoogleMap/GoogleMap';
import { Checkbox } from "antd";
import "./MapView.scss";

// const pharmacyData = [
//     { title: 'Pharmacy Name', value: ' Walgreens' },
//     { title: 'Address', value: '5357 Southwick Dr. Tampa, FL 33624' },
//     { title: 'Phone #', value: '(814) 269-2814' },
//     { title: 'Fax #', value: '(814) 269-2815' },
// ];
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
const _drugData = [
    { drugName: 'Diclofenac - 75 mg - 30 tablets', bestPrice: '$3.90' },
    { drugName: 'Lisinopril - 5 mg - 60 tablets', bestPrice: '$14.80' },
    { drugName: 'Gileyna - 5 mg - 90 tablets', bestPrice: '$100.80' }

]

interface Drug {
    drugName: string;
    bestPrice: number;
}
interface Props {
    drugData?: any;
    mapData?: any;
    selectedMapData?: any;
    preffered?: any;
    selectedPharmacy?: any;

}
interface State {
    drugData: Drug[];
    drugList: any;
    pharmacyData: any;
}
class MapView extends Component<Props, State> {

    state = {
        isOpen: false,
        defaultCenter:
            { lat: 27.964157, lng: -82.452606 },
        diclofenacDrug: false,
        lisinoprilDrug: false,
        gileynaDrug: false,
        drugList: [],
        drugData: [{ bestPrice: 0, drugName: '' }],
        pharmacyData: [
            { title: 'Pharmacy Name', value: ' Walgreens' },
            { title: 'Address', value: '5357 Southwick Dr. Tampa, FL 33624' },
            { title: 'Phone #', value: '(814) 269-2814' },
            { title: 'Fax #', value: '(814) 269-2815' },
        ]
    }

    componentDidMount() {
        var pharmacyData: any = this.state.pharmacyData
        if (this.props.mapData) {
            var index: number = this.props.selectedPharmacy || 0
            var data: any = this.props.mapData[index]
            pharmacyData = [
                { title: 'Pharmacy Name', value: data.pharmacy },
                { title: 'Address', value: data.address },
                { title: 'Phone #', value: data.phone },
                { title: 'Fax #', value: data.fax },
            ]
        }
        this.setState({
            drugList: this.props.drugData ? this.props.drugData : [],
            pharmacyData: pharmacyData
        })
    }

    componentWillReceiveProps(newProps: any) {
        var pharmacyData: any = this.state.pharmacyData
        if (this.props.mapData) {
            var index: number = this.props.selectedPharmacy || 0
            var data: any = this.props.mapData[index]
            pharmacyData = [
                { title: 'Pharmacy Name', value: data.pharmacy },
                { title: 'Address', value: data.address },
                { title: 'Phone #', value: data.phone },
                { title: 'Fax #', value: data.fax },
            ]
        }
        this.setState({
            drugList: newProps.drugData ? newProps.drugData : [],
            pharmacyData: pharmacyData
        })
    }


    render() {
        let { drugList, pharmacyData } = this.state
        let { mapData, selectedMapData, preffered } = this.props

        return (
            <div className="MapView-root">
                <div className="MapView-root__mapbox">
                    <GoogleMap coordinates={mapData} defaultZoom={16} preffered={preffered} />
                </div>
                <div className="MapView-root__mapbox_info">
                    <div className="MapView-root__mapbox_info_cost">
                        <div className="MapView-root__mapbox_info_cost_heading">
                            <div>Total Cost</div>
                            <div>${this.state.drugData.length > 0 ? this.state.drugData.reduce((tot: any, item: any) => {
                                return { bestPrice: item.bestPrice + tot.bestPrice, drugName: '' }
                            }).bestPrice.toFixed(2) : 0.00}</div>
                        </div>
                        <Grid container className="MapView-root__mapbox_info_data">
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
                    <div className="MapView-root__mapbox_info_pharmacy_details">
                        <Grid container className="member-data">
                            {pharmacyData.map((item: any) => (<div className="row">
                                <Box component="div" display="inline">
                                    {item.title}
                                </Box>
                                <Box component="div" display="inline">
                                    {item.value}
                                </Box>
                            </div>))}
                            {
                                timeData.map((item: any) => (<div className="row">
                                    <Box component="div" display="inline" className="oprTitle">
                                        {item.title}
                                    </Box>
                                    <Box component="div" display="inline" className='timeRow-root'>
                                        {item.value.map((_item: any) => (
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
                                </div>))
                            }
                        </Grid>
                    </div>
                </div>
            </div>



        );
    }

};

export default MapView;
