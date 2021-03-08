import React, { useState, Component } from "react";
import MemberData from "../member-data/MemberData";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import { TabInfo } from "../../../models/tab.model";

import "./MemberAddress.scss";

interface MemberAddressProps {
    activeTabIndex: number,
    memberAddress: Array<any>
}
export default class MemberAddress extends Component<MemberAddressProps> {


    state = {
        primaryAdd: []
    }


    componentWillReceiveProps(nextprops: any) {
        // console.log("add-data",nextprops.memberAddress[0])  
        this.setState({ primaryAdd: nextprops.memberAddress })

        console.log("add-data", this.state.primaryAdd)
    }


    render() {

        return (
            <div>
                {this.props.memberAddress.map((result: any) =>
                    (
                        <div>
                            {
                                this.props.activeTabIndex == 0 ?
                                    <div className="memberAddress">
                                        <MemberData keyValue="Street 1" value={result.address1} classname="contactInfo" />
                                        <MemberData keyValue="Street 2" value={result.address2} classname="contactInfo" />
                                        <MemberData keyValue="City" value={result.city} classname="contactInfo" />
                                        <MemberData keyValue="State" value={result.state} classname="contactInfo" />
                                        <MemberData keyValue="Zip" value={result.zip} classname="contactInfo" />
                                        <MemberData keyValue="County" value={result.county} classname="contactInfo" />
                                        <MemberData keyValue="Country" value={result.country} classname="contactInfo" />
                                        <MemberData keyValue="Mailing Address" value={result.mailing_address} classname="contactInfo" />
                                    </div> : this.props.activeTabIndex == 1 ? <div className="memberAddress">
                                        <MemberData keyValue="Street 1" value="Secondary address" classname="contactInfo" />
                                        <MemberData keyValue="Street 2" value="Mackenzie" classname="contactInfo" />

                                        <MemberData keyValue="City" value="Tampa" classname="contactInfo" />
                                        <MemberData keyValue="State" value="FL" classname="contactInfo" />
                                        <MemberData keyValue="Zip" value="12345" classname="contactInfo" />
                                        <MemberData keyValue="County" value="346786543278975" classname="contactInfo" />
                                        <MemberData keyValue="Country" value="123154566" classname="contactInfo" />
                                        
                                        <MemberData keyValue="Mailing Address" value="Yes" classname="contactInfo" />
                                    </div> : <div className="memberAddress">

                                            <MemberData keyValue="Street 1" value="Temporary address" classname="contactInfo" />
                                            <MemberData keyValue="Street 2" value="Mackenzie" classname="contactInfo" />
                                            <MemberData keyValue="City" value="Tampa" classname="contactInfo" />
                                            <MemberData keyValue="State" value="FL" classname="contactInfo" />
                                            <MemberData keyValue="Zip" value="12345" classname="contactInfo" />
                                            <MemberData keyValue="County" value="346786543278975" classname="contactInfo" />
                                            <MemberData keyValue="Country" value="123154566" classname="contactInfo" />
                                            <MemberData keyValue="Mailing Address" value="Yes" classname="contactInfo" />
                                        </div>
                            }
                        </div>
                    )

                )}



            </div>
        );
    }

}
