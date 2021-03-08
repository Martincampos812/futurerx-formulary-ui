import React from "react";
import MemberData from "../user-details/member-data/MemberData";

import "./demographics.scss";
export default function Demographics() {

    return (
        
        <div className="demographics">
            <MemberData keyValue="Pharmacy NCPDP#" value="HD0364FPK6" classname="contactInfo_hyperlink_first" />
            <MemberData keyValue="Pharmacy Name" value="Walgreens" classname="contactInfo" />
            <MemberData keyValue="NPI" value="21791777" classname="contactInfo_hyperlink"  />
            <MemberData keyValue="Tax ID" value="09-234895723" classname="contactInfo" />
            <MemberData keyValue="Medicaid ID" value="MD1234" classname="contactInfo" />
            <MemberData keyValue="Relationship ID" value="12345678" classname="contactInfo_hyperlink" />
            <MemberData keyValue="DEA Number" value="FF183731292" classname="contactInfo" />
            <MemberData keyValue="Status Code" value="active/inactive" classname="contactInfo" />
            <MemberData keyValue="Renewal Date" value="MM/DD/YYYY" classname="contactInfo" />
        </div>
    );
}
