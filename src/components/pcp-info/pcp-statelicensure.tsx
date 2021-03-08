import React from "react";
import MemberData from "../user-details/member-data/MemberData";

import "./pcp-statelicensure.scss";
export default function PcpStateLicensure() {


    return (
        <div>
            <div className="pcpStateLicensure">
                <MemberData keyValue="License Number" value="J7808" classname="contactInfo" />
                <MemberData keyValue="License State" value="TX" classname="contactInfo" />
                <MemberData keyValue="Issue Date" value="MM/DD/YYYY" classname="contactInfo" />
                <MemberData keyValue="Expiry Date" value="MM/DD/YYYY" classname="contactInfo" />
            </div>
            <div className="specialty-box2">
                <div className="pcpStateLicensure">
                    <MemberData keyValue="License Number" value="J7808" classname="contactInfo" />
                    <MemberData keyValue="License State" value="TX" classname="contactInfo" />
                    <MemberData keyValue="Issue Date" value="MM/DD/YYYY" classname="contactInfo" />
                    <MemberData keyValue="Expiry Date" value="MM/DD/YYYY" classname="contactInfo" />
                </div>
            </div>
        </div>


    );
}
