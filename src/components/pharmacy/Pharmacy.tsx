

import React, { useState, Component } from "react";
import MapboxSearch from "../communication/Search/MapboxSearch/MapboxSearch";
import MemberData from "../user-details/member-data/MemberData";
import PharmacyPopup from '../pharmacy/PharmacyPopup';
import GoogleMap from '../GoogleMap/GoogleMap';
import { MAPAPI } from '../../api/httptemp-helper';
import Constant from '../../constants/Constants';
import "./Pharmacy.scss";
import { lookup } from "dns";
import { Box, Grid } from "@material-ui/core";
import { getPharmacySearchFields } from "../../mocks/search/pharmacy-search-mocks";
import FrxGenericSearch from "../shared/FrxGenericSearch/FrxGenericSearch";
const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;
const mapData = [
    { title: 'Pharmacy Name', value: ' Walgreens' },
    { title: 'NPI #', value: '1417921222', highlight: true },
    { title: 'Pharmacy NCPDP#', value: 'HD0363FPK6', highlight: true },
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
// let authId = "6906aee3-8446-1b05-301b-f82a6037dc47";
// let authToken = "fPdcYREJn9PIvvwnKt1q";
// const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);
// let client = SmartyStreetsCore.buildClient.usStreet(credentials);
// let lookup1 = new Lookup();
// lookup1.inputId = "24601";  // Optional ID from your system
// lookup1.addressee = "John Doe";
// lookup1.street = "330 N 100 W";
// lookup1.street2 = "closet under the stairs";
// lookup1.secondary = "APT 2";
// lookup1.urbanization = "";  // Only applies to Puerto Rico addresses
// lookup1.city = "Provo";
// lookup1.state = "Utah";
// lookup1.zipCode = "84601";
// lookup1.maxCandidates = 3;
// lookup1.match = "invalid";
// let lookup2 = new Lookup();
// lookup2.street = "1600 Amphitheater Pkwy";
// lookup2.lastLine = "Mountainview, CA";
// lookup2.maxCandidates = 5;
// let lookup3 = new Lookup();
// lookup3.inputId = "8675309";
// lookup3.street = "1600 Amphitheatre Parkway Mountain View, CA 94043";
// lookup3.maxCandidates = 1;
// NOTE: batches are not supported when using SharedCredentials.
// let batch = new SmartyStreetsCore.Batch();
// batch.add(lookup1);
// batch.add(lookup2);
// batch.add(lookup3);
// client.send(batch)
//     .then(handleSuccess)
//     .catch(handleError);
// function handleSuccess(response) {
//     response.lookups.map(lookup => console.log("lookup", lookup.result));
// }
// function handleError(response) {
//     console.log(response);
// }
// const Pharmacy = () => {
class Pharmacy extends Component {
    state = {
        isOpen: false,
        lookup1: new Lookup(),
        batch: new SmartyStreetsCore.Batch(),
        mapData: {},
        defaultCenter: {
            lng: "",
            lat: ""
        },
        showMap: true,
    }
    componentDidMount() {
        // this.onGetCoordinatesInfo();
    }
    onSearchForm = (searchObj: any) => {
        var _temp: any = searchObj.filter((item: any) => item.key === 'pharmacyType')[0]
        if (_temp) {
            var showMapValues: any = ['Retail', 'Home Infusion', 'LTC', 'I/T/U']
            if (showMapValues.includes(_temp.value)) {
                this.setState({
                    showMap: true
                })
            } else {
                this.setState({
                    showMap: false
                })
            }
        } else {
            this.setState({
                showMap: true
            })
        }
    }
    onGetCoordinatesInfo = () => {
        const credentials = new SmartyStreetsCore.SharedCredentials("50923126192373041");
        let client = SmartyStreetsCore.buildClient.usStreet(credentials);
        // this.state.lookup1.inputId = "24601";  
        this.state.lookup1.addressee = "John Doe";
        this.state.lookup1.street = "330 N 100 W";
        this.state.lookup1.street2 = "closet under the stairs";
        this.state.lookup1.secondary = "APT 2";
        this.state.lookup1.city = "Provo";
        this.state.lookup1.state = "Utah";
        this.state.lookup1.zipCode = "84601";
        this.state.lookup1.maxCandidates = 3;
        // this.state.lookup1.match = "invalid";
        this.state.batch.add(this.state.lookup1);
        const handleData = (res): any => {
            res.lookups.map((look) => {
                console.log("map-data", look.result[0])
                // this.setState({ mapData: look.result[0].metadata })
                this.setState({ defaultCenter: { lat: look.result[0].metadata.latitude, lng: look.result[0].metadata.longitude } })
            })
        }
        const handleError = (response) => {
            console.log(response);
        }
        client.send(this.state.lookup1)
            .then(handleData)
            .catch(handleError);
    }
    onSearch = (data) => {
        this.onGetCoordinatesInfo();
        console.log("Search Data", data)
    }
    // getPharmacyAddress = () => {
    //     try {
    //         MAPAPI.get('street-address?auth-id=6d50b1d7-e741-05d1-25e8-b9280609ae4c&auth-token=40vqXXz5W8GXiDHwc62K&street=1600+amphitheatre+pkwy&city=mountain+view&state=CA&candidates=10&key=50923123962877502')
    //             .then((response) => {
    //                 console.log("map-response", response)
    //             })
    //             .catch((error) => {
    //                 console.log("error_maping", error)
    //             })
    //     } catch (e) {
    //         console.log("map_error", e)
    //     }
    // }
    handleDialogOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    render() {
        const { showMap } = this.state
        return (
            <div>
                <div className="Pharmacy">
                    <div className="Pharmacy-heading">PHARMACY SEARCH</div>
                    <FrxGenericSearch searchOptions={getPharmacySearchFields()} onSearch={this.onSearchForm} />
                </div>
                <div className="PharmacyMapbox-container">
                    {showMap && <div className="map-container">
                        <GoogleMap defaultZoom={16} />
                    </div>}
                    <div className={showMap?"map-container-info":"map-container-info alignLeft"}>
                        <div className="map-data">
                            <Grid container className="member-data">
                                {
                                    mapData.map((item: any) => (<div className="row">
                                        <Box component="div" display="inline">
                                            {item.title}
                                        </Box>
                                        <Box component="div" display="inline" onClick={() => item.title == "Pharmacy ID" ? this.handleDialogOpen() : ""} className={item.highlight ? 'highlight' : ''}>
                                            {item.value}
                                        </Box>
                                    </div>))
                                }
                                {
                                    timeData.map((item: any) => (<div className="row">
                                        <Box component="div" display="inline">
                                            {item.title}
                                        </Box>
                                        <Box component="div" display="inline" className='timeRow-root'>
                                            {item.value.map((_item: any) => (
                                                <div className="timeRow">
                                                    <Box component="div" display="inline" className={_item.day == "Sun" ? "lastDay" : ""}>
                                                        {_item.day}
                                                    </Box>
                                                    <Box component="div" display="inline" className={_item.time == "Closed" ? "closeDay" : ""}>
                                                        {_item.time}
                                                    </Box>
                                                </div>
                                            ))}
                                        </Box>
                                    </div>))
                                }
                            </Grid>
                            {/* <MemberData keyValue="Pharmacy Name" value="Walgreens" />
                            <MemberData keyValue="NPI #" value="1417921222" classname="npiIdText" />
                            <MemberData keyValue="Pharmacy ID" value="HD0363FPK6" classname="pharmacyIdText" isClose={this.handleDialogOpen} />
                            <MemberData keyValue="Address" value="5357,Southwick,Dr Tampa,FL 33624 " />
                            <MemberData keyValue="Phone #" value="(814) 269-2814" />
                            <MemberData keyValue="Fax #" value="(814) 269-2815" />
                            <MemberData keyValue="Operating Hours" value="" /> */}
                            {/* <div className="hours-container">
                                <div className="hoursBox">
                                    <div className="monthsTitle">Mon</div>
                                    <div className="timeTitle">9 AM - 5 PM EST</div>
                                </div>
                                <div className="hoursBox">
                                    <div className="monthsTitle">Thu</div>
                                    <div className="timeTitle">9 AM - 5 PM EST</div>
                                </div>
                                <div className="hoursBox">
                                    <div className="monthsTitle">Wed</div>
                                    <div className="timeTitle">9 AM - 5 PM EST</div>
                                </div>
                                <div className="hoursBox">
                                    <div className="monthsTitle">The</div>
                                    <div className="timeTitle">9 AM - 7 PM EST</div>
                                </div>
                                <div className="hoursBox">
                                    <div className="monthsTitle">Fri</div>
                                    <div className="timeTitle">9 AM - 7 PM EST</div>
                                </div>
                                <div className="hoursBox">
                                    <div className="monthsTitle">Sat</div>
                                    <div className="timeTitle">9 AM - 12 PM EST</div>
                                </div>
                                <div className="hoursBox">
                                    <div className="monthsTitle">Sun</div>
                                    <div className="timeTitle">Closed</div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                {this.state.isOpen ? (<PharmacyPopup isOpen={this.state.isOpen} onClose={this.handleDialogOpen} panelName="pharmacyTab" />) : ""}
            </div>
        );
    }
};
export default Pharmacy;