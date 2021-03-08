import React from "react";
import MemberData from "../user-details/member-data/MemberData";

import "./specialty.scss";
export default function PharmacySpecialty(props) {

    return (
        <div>
            {props.activeTabIndex == 0 ?
                <span>
                    <div className="memberSpecialty">
                        <MemberData keyValue="Taxonomy Code" value="363LA2200X" classname="contactInfo" />
                        <MemberData keyValue="Taxonomy Description" value="Physician Assistants & Advanced Practice Nursing " classname="contactInfo" />
                        <MemberData keyValue="" value="Providers - Nurse Practitioner - Adult Health" classname="contactInfo" />
                        <MemberData keyValue="Primary Taxonomy" value="Yes" classname="contactInfo" />
                    </div>
                    <div className="specialty-box2">
                        <div className="memberSpecialty">
                            <MemberData keyValue="Taxonomy Code" value="363LA2200X" classname="contactInfo" />
                            <MemberData keyValue="Taxonomy Description" value="Physician Assistants & Advanced Practice Nursing" classname="contactInfo" />
                            <MemberData keyValue="" value="Providers - Nurse Practitioner - Adult Health" classname="contactInfo" />
                            <MemberData keyValue="Primary Taxonomy" value="No" classname="contactInfo" />
                        </div>
                    </div>
                </span>
                : props.activeTabIndex == 1 ?
                    <span>
                        <div className="memberSpecialty">
                            <MemberData keyValue="Taxonomy Code" value="363LA2200X" classname="contactInfo" />
                            <MemberData keyValue="Taxonomy Description" value="Physician Assistants & Advanced Practice Nursing " classname="contactInfo" />
                            <MemberData keyValue="" value="Providers - Nurse Practitioner - Adult Health" classname="contactInfo" />
                            <MemberData keyValue="Primary Taxonomy" value="No" classname="contactInfo" />
                        </div>
                        <div className="specialty-box2">
                            <div className="memberSpecialty">
                                <MemberData keyValue="Taxonomy Code" value="363LA2200X" classname="contactInfo" />
                                <MemberData keyValue="Taxonomy Description" value="Physician Assistants & Advanced Practice Nursing" classname="contactInfo" />
                                <MemberData keyValue="" value="Providers - Nurse Practitioner - Adult Health" classname="contactInfo" />
                                <MemberData keyValue="Primary Taxonomy" value="No" classname="contactInfo" />
                            </div>
                        </div>
                    </span>
                    : ""

            }


        </div>


    );
}
