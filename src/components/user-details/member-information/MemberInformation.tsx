import React, {Component} from "react";

import TextBox from "../../shared/Frx-components/text-box/TextBox";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import RadioButton from "../../shared/Frx-components/radio-button/RadioButton";

import CustomDatePicker from "../../shared/Frx-components/date-picker/CustomDatePicker";
// import {DatePicker} from "antd";
import "./MemberInformation.scss";

interface Props {
  memberInformation: any
}

interface State {
  dobDate: Date | null;
  eligibilityStartDate: Date | null;
  eligibilityEndDate: Date | null;
}

class MemberInformation extends Component<Props, State> {
  state = {
    dobDate: null,
    eligibilityStartDate: null,
    eligibilityEndDate: null,
  };

  /*
   @ fun used select the DataOfBirth
 */
  handleDobDateSelector = (date) => {
    this.setState({dobDate: date});
  };

  /*
   @ fun used select the  EligibilityStatDate 
 */
  handleEligibilityStartDate = (date) => {
    this.setState({eligibilityStartDate: date});
  };

  /*
   @ fun used select the EligibilityStatDate
 */
  handleEligibilityEndDate = (date) => {
    this.setState({eligibilityEndDate: date});
  };

  render() {
    const {dobDate, eligibilityStartDate, eligibilityEndDate} = this.state;
    const {memberInformation} = this.props;
    console.log("memberInformation", memberInformation)
    return (
      <div className="MemberInformation">
        <h2 className="member-heading">Member Information</h2>
        {memberInformation.map((member, i) => (
        <div key={member.id_member_info} className="member-fields">
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Member ID/UMI
            </label>
            <TextBox placeholder="Member ID or UMI" value={member.member_id} />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              First Name
            </label>
            <TextBox placeholder="First Name" value={member.first_name} />
          </div>
          <div className="fields">
            <label htmlFor="">M.I. </label>
            <TextBox placeholder="M.I." />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Last Name
            </label>
            <TextBox placeholder="Last Name" value={member.last_name} />
          </div>
          <div className="fields">
            <label htmlFor="">Suffix</label>
            <TextBox placeholder="Suffix" />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              D.O.B
            </label>
            <CustomDatePicker
              selected={dobDate}
              onchange={(date) => {
                this.handleDobDateSelector(date);
              }}
              placeholder="D.O.B."
              name="dobDate"
              // startDate={member.date_of_birth}
            />
          </div>
          <div className="fields">
            <label htmlFor=""> Multi-Birth </label>
            <div className="menber-radioButton">
              <RadioButton value="1" label="Yes" checked={member.multi_birth === "1"}  name="multi-birth" />
              <RadioButton value="0" label="No" checked={member.multi_birth === "0"} name="multi-birth" />
            </div>
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Gender
            </label>

            <div className="menber-radioButton">
              <RadioButton value="M" checked={member.gender === "M"} label="M" name="gender" />
              &nbsp;&nbsp;
              <RadioButton value="F" checked={member.gender === "F"} label="F" name="gender" />
              <RadioButton value="U" checked={member.gender === "U"} label="U" name="gender" />
            </div>
          </div>
          <div className="fields">
            <label htmlFor="">S.S.N.</label>
            <TextBox placeholder="S.S.N."  value={member.ssn}/>
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Person Code
            </label>
            <TextBox placeholder="Person Code" value={member.person_code} />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Language
            </label>
            <DropDown value={member.language} options={["Language"]} placeholder="Language" />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Relationship Code
            </label>
            <DropDown
              options={["Relationship Code"]}
              placeholder="Relationship Code"
              value={member.relationship_code}
            />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Family ID
            </label>
            <TextBox placeholder="Family ID" />
          </div>
          <div className="fields ">
            <label htmlFor="" className="requiredFields">
              MBI
            </label>
            <TextBox placeholder="MBI" value={member.mbi} />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Status
            </label>
            <DropDown options={["Status"]} placeholder="Status" />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Eligibility Start
            </label>
            <CustomDatePicker
              selected={eligibilityStartDate}
              onchange={(date) => {
                this.handleEligibilityStartDate(date);
              }}
              placeholder="Eligibility Start"
              name="eligibilityStartDate"
            />
          </div>
          <div className="fields">
            <label htmlFor="">Eligibility End</label>
            <CustomDatePicker
              selected={eligibilityEndDate}
              onchange={(date) => {
                this.handleEligibilityEndDate(date);
              }}
              placeholder="Eligibility End"
              name="eligibilityEndDate"
            />
          </div>
        </div>
        ))}
      </div>
    );
  }
}
export default MemberInformation;

//  function MemberInformation() {
//   const [dobDate, setDobDate] = useState();
//   const [eligibilityStartDate, seteligibilityStartDate] = useState();
//   const [eligibilityEndDate, seteligibilityEndDate] = useState();
//   return (
//     <div className="MemberInformation">
//       <h2 className="member-heading">Member Information</h2>
//       <div className="member-fields">
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Member ID
//           </label>
//           <TextBox placeholder="Member ID" />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             First Name
//           </label>
//           <TextBox placeholder="First Name" />
//         </div>
//         <div className="fields">
//           <label htmlFor="">M.I. </label>
//           <TextBox placeholder="M.I." />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Last Name
//           </label>
//           <TextBox placeholder="Last Name" />
//         </div>
//         <div className="fields">
//           <label htmlFor="">Suffix</label>
//           <TextBox placeholder="Suffix" />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             D.O.B
//           </label>
//           <CustomDatePicker
//             selected={dobDate}
//             onchange={(date: any) => {
//               setDobDate(date);
//             }}
//             placeholder="D.O.B."
//             name="dob"
//           />
//         </div>
//         <div className="fields">
//           <label htmlFor=""> Multi-Birth </label>
//           <div className="menber-radioButton">
//             <RadioButton label="Yes" name="multi-birth" />
//             <RadioButton label="No" name="multi-birth" />
//           </div>
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Gender
//           </label>

//           <div className="menber-radioButton">
//             <RadioButton label="M" name="gender" />
//             &nbsp;&nbsp;
//             <RadioButton label="F" name="gender" />
//             <RadioButton label="U" name="gender" />
//           </div>
//         </div>
//         <div className="fields">
//           <label htmlFor="">S.S.N.</label>
//           <TextBox placeholder="S.S.N." />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Person Code
//           </label>
//           <TextBox placeholder="Person Code" />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Language
//           </label>
//           <DropDown options={["Language"]} />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Relationship Code
//           </label>
//           <DropDown options={["Relationship Code"]} />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Family ID
//           </label>
//           <TextBox placeholder="Family ID" />
//         </div>
//         <div className="fields">
//           <label htmlFor="">UMI</label>
//           <TextBox placeholder="UMI" />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Status
//           </label>
//           <DropDown options={["Status"]} />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Eligibility Start
//           </label>
//           <CustomDatePicker
//             selected={eligibilityStartDate}
//             onchange={(date: any) => {
//               seteligibilityStartDate(date);
//             }}
//             placeholder="Eligibility Start"
//             name="eligibilityStartDate"
//           />
//         </div>
//         <div className="fields">
//           <label htmlFor="">Eligibility End</label>
//           <CustomDatePicker
//             selected={eligibilityEndDate}
//             onchange={(date: any) => {
//               seteligibilityEndDate(date);
//             }}
//             placeholder="Eligibility End"
//             name="eligibilityEndDate"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
