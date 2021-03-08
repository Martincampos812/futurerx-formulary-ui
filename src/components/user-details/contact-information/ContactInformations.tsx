import React, {Component} from "react";
import TextBox from "../../shared/Frx-components/text-box/TextBox";

import "./ContactInformatiom.scss";

interface Props {
  contactInformation: any;
  memberInformation: any
}
interface State {}

class ContactInformations extends Component<Props, State> {
  state = {};

  render() {
    const {contactInformation, memberInformation} = this.props;
    console.log("contactInformation", contactInformation)
    return (
      <div className="contact-info">
        <h3 className="contact-heading">Contact Information</h3>
        {/* <div className="contact"> */}
        {contactInformation.map((member, i) => (
        <>
        {member.city ? (
        <div key={member.id_member_info} className="contact-fields">
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Street 1
            </label>
            <TextBox placeholder="Street 1" value={member.address1} />
          </div>
          <div className="fields">
            <label htmlFor="">Street 2</label>
            <TextBox placeholder="Street 2" value={member.address2} />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              City
            </label>
            <TextBox placeholder="City" value={member.city} />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              State
            </label>
            <TextBox placeholder="State" value={member.state} />
          </div>
          <div className="fields">
            <label className="requiredFields" htmlFor="">
              Zip
            </label>
            <TextBox placeholder="Zip" value={member.zip} />
          </div>
          <div className="fields">
            <label htmlFor="">County</label>
            <TextBox placeholder="County" value={member.county} />
          </div>
          <div className="fields">
            <label htmlFor="">Country</label>
            <TextBox placeholder="Country" value={member.country} />
          </div>
          {memberInformation.map((memberPhone, i) => (
          <>
          <div className="fields">
            <label htmlFor="">Phone (Home)</label>
            <TextBox placeholder="Phone (Home)" value={memberPhone.home_phone} />
          </div>
          <div className="fields">
            <label htmlFor="">Phone (Work)</label>
            <TextBox placeholder="Phone (Work)" value={memberPhone.work_phone} />
          </div>
          <div className="fields">
            <label htmlFor="">Phone (Mobile)</label>
            <TextBox placeholder="Phone (Mobile)" value={memberPhone.mobile_phone} />
          </div>
          </>
          ))}
        </div>
        ): null}
        </>
        ))}
        {/* </div> */}
      </div>
    );
  }
}

export default ContactInformations;

// export default function ContactInformations() {
//   return (
//     <div className="contact-info">
//       <h3 className="contact-heading">Contact Information</h3>
//       {/* <div className="contact"> */}
//       <div className="contact-fields">
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Street 1
//           </label>
//           <TextBox placeholder="Street 1" />
//         </div>
//         <div className="fields">
//           <label htmlFor="">Street 2</label>
//           <TextBox placeholder="Street 2" />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             City
//           </label>
//           <TextBox placeholder="City" />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             State
//           </label>
//           <TextBox placeholder="State" />
//         </div>
//         <div className="fields">
//           <label className="requiredFields" htmlFor="">
//             Zip
//           </label>
//           <TextBox placeholder="Zip" />
//         </div>
//         <div className="fields">
//           <label htmlFor="">County</label>
//           <TextBox placeholder="County" />
//         </div>
//         <div className="fields">
//           <label htmlFor="">Country</label>
//           <TextBox placeholder="Country" />
//         </div>
//         <div className="fields">
//           <label htmlFor="">Phone (Home)</label>
//           <TextBox placeholder="Phone (Home)" />
//         </div>
//         <div className="fields">
//           <label htmlFor="">Phone (Work)</label>
//           <TextBox placeholder="Phone (Work)" />
//         </div>
//         <div className="fields">
//           <label htmlFor="">Phone (Mobile)</label>
//           <TextBox placeholder="Phone (Mobile)" />
//         </div>
//       </div>
//       {/* </div> */}
//     </div>
//   );
// }
