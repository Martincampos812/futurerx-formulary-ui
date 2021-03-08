import React, { useState, useEffect } from "react";
import MemberData from "../member-data/MemberData";
import { Form, Input } from 'antd'
import Button from '../../shared/Frx-components/button/Button'


import "./MemberDetails.scss";
export default function MemberDetails(props: any) {

  const [buttonflag, setButtonFlag] = useState(false)
  const [editflag, setEditablestate] = useState(false)

  let memberData = props.memberData;

  let phoneH = `${memberData.home_phone}`
  let phoneHome = phoneH === "Not mapped" ? `${memberData.home_phone}` : `(${phoneH.substr(0, 3)})` + " " + `${phoneH.substring(3, 6)}` + "-" + `${phoneH.substring(6)}`;
  let phoneM = `${memberData.mobile_phone}`
  let phoneMobile = phoneM === "Not mapped" ? `${memberData.mobile_phone}` : `(${phoneM.substr(0, 3)})` + " " + `${phoneM.substring(3, 6)}` + "-" + `${phoneM.substring(6)}`;
  let phoneW = `${memberData.work_phone}`
  let phoneWork = phoneW === "Not mapped" ? `${memberData.work_phone}` : `(${phoneW.substr(0, 3)})` + " " + `${phoneW.substring(3, 6)}` + "-" + `${phoneW.substring(6)}`;


  function onHandleClick() {
    setEditablestate(true);
    setButtonFlag(true);
  }

  return (


    <div className="memberDetails">
      {/* <form onSubmit={onFinish}> */}
      <div className="member-details-heading">

        <h3>Member Details</h3>
        {buttonflag == true ? <button className="memberDetailSave-button" onClick={() => onHandleClick()} >Save</button>
          : <button className="memberDetail-button" onClick={() => onHandleClick()} >Edit</button>}
      </div>

      <MemberData keyValue="Member ID" value={memberData.member_id} isEditable={editflag} />
      <MemberData keyValue="First Name" value={memberData.first_name} isEditable={editflag} />
      <MemberData keyValue="Last Name" value={memberData.last_name} isEditable={editflag} />
      <MemberData keyValue="Gender" value={memberData.gender} isEditable={editflag} />
      <MemberData keyValue="DOB" value={memberData.date_of_birth} isEditable={editflag} />
      <MemberData keyValue="MBI #" value={memberData.mbi} isEditable={editflag} />
      <MemberData keyValue="UPI #" value={memberData.upi} isEditable={editflag} />
      <MemberData keyValue="Multi-birth" value={memberData.multi_birth} isEditable={editflag} />
      <MemberData keyValue="Language" value={memberData.language} isEditable={editflag} />
      <MemberData keyValue="Person Code" value={memberData.person_code} isEditable={editflag} />
      <MemberData keyValue="Relationship Code" value={memberData.relationship_code} isEditable={editflag} />
      <MemberData keyValue="SSN #" value={memberData.ssn} isEditable={editflag} />
      <MemberData keyValue="PCM" value={memberData.pcm} isEditable={editflag} />
      <MemberData keyValue="AOR/POR" value={memberData.aor_poa} isEditable={editflag} />
      <MemberData keyValue="Primary Email" value={memberData.email_address} isEditable={editflag} />
      <MemberData keyValue="Secondary Email" value={memberData.secondary_email} isEditable={editflag} />
      <MemberData keyValue="Phone (home)" value={phoneHome} isEditable={editflag} />
      <MemberData keyValue="Phone (mobile)" value={phoneMobile} isEditable={editflag} />
      <MemberData keyValue="Phone (work)" value={phoneWork} isEditable={editflag} />
      <MemberData keyValue="Reporting Tags" value={memberData.reporting1} isEditable={editflag} />
      <MemberData keyValue="" value={memberData.reporting2} isEditable={editflag} />
      <MemberData keyValue="" value={memberData.reporting3} isEditable={editflag} />
      <MemberData keyValue="" value={memberData.reporting4} isEditable={editflag} />
      <MemberData keyValue="" value={memberData.reporting5} isEditable={editflag} />

      <div className="member-details-preferences">
        <h3>Member Preferences</h3>
      </div>
      <MemberData keyValue="Reference (pronoun)" value={memberData.reference} isEditable={editflag} />
      <MemberData keyValue="Nickname" value={memberData.nick_name} isEditable={editflag} />
      <MemberData keyValue="Privacy" value={memberData.privacy} isEditable={editflag} />

    </div>

  );
}
