import React, { Component } from "react";

import Tag from "../../shared/Frx-components/tags/Tag";
import { Avatar } from "@material-ui/core";
import "./MemberInfo.scss";
import MemberDetailsPopup from "../../member/MemberDetailsPopup";

interface Props {
  icon?: any;
  customStyle?: any;
  user: any;
  handlClick: (id: number) => void;
}
// interface State {}

class MemeberInfo extends Component<Props> {
  state = { showAccordion: false };

  getGenderIcon = () => {
    if (this.props.user) {
      switch (this.props.user.gender) {
        case "M":
          return (
            <svg
              width="11"
              height="27"
              viewBox="0 0 11 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.5 6C7.15685 6 8.5 4.65685 8.5 3C8.5 1.34315 7.15685 0 5.5 0C3.84315 0 2.5 1.34315 2.5 3C2.5 4.65685 3.84315 6 5.5 6ZM5.5 5C6.60457 5 7.5 4.10457 7.5 3C7.5 1.89543 6.60457 1 5.5 1C4.39543 1 3.5 1.89543 3.5 3C3.5 4.10457 4.39543 5 5.5 5ZM0 8C0 7.44772 0.447715 7 1 7H10C10.5523 7 11 7.44772 11 8V16.5C11 16.7761 10.7761 17 10.5 17C10.2239 17 10 16.7761 10 16.5V8.5C10 8.22386 9.77614 8 9.5 8H1.5C1.22386 8 1 8.22386 1 8.5V16.5C1 16.7761 0.776142 17 0.5 17C0.223858 17 0 16.7761 0 16.5V8ZM2 10.5C2 10.2239 2.22386 10 2.5 10C2.77614 10 3 10.2239 3 10.5V25C3 25.5523 3.44772 26 4 26C4.55228 26 5 25.5523 5 25V18.5C5 18.2239 5.22386 18 5.5 18C5.77614 18 6 18.2239 6 18.5V25C6 25.5523 6.44772 26 7 26C7.55228 26 8 25.5523 8 25V10.5C8 10.2239 8.22386 10 8.5 10C8.77614 10 9 10.2239 9 10.5V25C9 26.1046 8.10457 27 7 27C6.40265 27 5.86647 26.7381 5.5 26.3229C5.13353 26.7381 4.59735 27 4 27C2.89543 27 2 26.1046 2 25V10.5Z"
                fill="#4FA2EF"
              />
            </svg>
          );

        case "F":
          return (
            <svg
              width="15"
              height="27"
              viewBox="0 0 15 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.33305 6C8.9899 6 10.333 4.65685 10.333 3C10.333 1.34315 8.9899 0 7.33305 0C5.67619 0 4.33305 1.34315 4.33305 3C4.33305 4.65685 5.67619 6 7.33305 6ZM7.33305 5C8.43762 5 9.33305 4.10457 9.33305 3C9.33305 1.89543 8.43762 1 7.33305 1C6.22848 1 5.33305 1.89543 5.33305 3C5.33305 4.10457 6.22848 5 7.33305 5ZM3.83305 18H3.11384C2.46327 18 1.98591 17.3886 2.14369 16.7575L3.72283 10.4409C3.78762 10.1818 4.02044 10 4.28754 10C4.66622 10 4.94408 10.3559 4.85224 10.7233L3.28306 17H4.83306V18H4.83305V24.5C4.83305 25.0523 5.28076 25.5 5.83305 25.5C6.38533 25.5 6.83305 25.0523 6.83305 24.5V18C6.83305 17.7239 7.0569 17.5 7.33305 17.5C7.60919 17.5 7.83305 17.7239 7.83305 18V24.5C7.83305 25.0523 8.28076 25.5 8.83305 25.5C9.38533 25.5 9.83305 25.0523 9.83305 24.5V18L9.83306 17.9961V17H11.4199L9.85073 10.7233C9.75889 10.3559 10.0368 10 10.4154 10C10.6825 10 10.9154 10.1818 10.9801 10.4409L12.5593 16.7575C12.7171 17.3886 12.2397 18 11.5891 18H10.833V24.5C10.833 25.6046 9.93762 26.5 8.83305 26.5C8.2357 26.5 7.69952 26.2381 7.33305 25.8229C6.96657 26.2381 6.43039 26.5 5.83305 26.5C4.72848 26.5 3.83305 25.6046 3.83305 24.5V18ZM2.90964 7C2.45272 7 2.05391 7.30971 1.94078 7.7524L0.0183973 15.2748C-0.0755518 15.6424 0.202172 16 0.581613 16C0.847229 16 1.07906 15.82 1.14483 15.5626L3.0775 8H11.5886L13.5213 15.5626C13.587 15.82 13.8189 16 14.0845 16C14.4639 16 14.7417 15.6424 14.6477 15.2748L12.7253 7.7524C12.6122 7.30971 12.2134 7 11.7565 7H2.90964Z"
                fill="#FF80BD"
              />
            </svg>
          );
        default:
          return (
            <svg
              width="13"
              height="27"
              viewBox="0 0 13 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.16602 0C8.82287 0 10.166 1.34315 10.166 3C10.166 4.65685 8.82287 6 7.16602 6V5C8.27059 5 9.16602 4.10457 9.16602 3C9.16602 1.89543 8.27059 1 7.16602 1V0Z"
                fill="#999999"
              />
              <path
                d="M7.16602 7H11.666C12.2183 7 12.666 7.44772 12.666 8V16.5C12.666 16.7761 12.4422 17 12.166 17C11.8899 17 11.666 16.7761 11.666 16.5V8.5C11.666 8.22386 11.4422 8 11.166 8H7.16602V7Z"
                fill="#999999"
              />
              <path
                d="M7.16602 18C7.44216 18 7.66602 18.2239 7.66602 18.5V25C7.66602 25.5523 8.11373 26 8.66602 26C9.2183 26 9.66602 25.5523 9.66602 25V10.5C9.66602 10.2239 9.88987 10 10.166 10C10.4422 10 10.666 10.2239 10.666 10.5V25C10.666 26.1046 9.77058 27 8.66602 27C8.06867 27 7.53249 26.7381 7.16601 26.3229L7.16602 18Z"
                fill="#999999"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.16602 26.3183C6.79954 26.7336 6.26336 26.9954 5.66602 26.9954C4.56145 26.9954 3.66602 26.1 3.66602 24.9954V17.9954H2.94303C2.29363 17.9954 1.81649 17.3861 1.97219 16.7557L3.53286 10.4363C3.59686 10.1772 3.82685 9.99543 4.09072 9.99543C4.4648 9.99543 4.73929 10.3513 4.64856 10.7187L3.09842 16.9954H4.16602H4.66602V17.4954V17.9954V24.9954C4.66602 25.5477 5.11373 25.9954 5.66602 25.9954C6.2183 25.9954 6.66602 25.5477 6.66602 24.9954V18.4954C6.66602 18.2193 6.88987 17.9954 7.16602 17.9954V26.3183ZM7.16602 7.99543H3.07741L1.14474 15.558C1.07897 15.8154 0.84714 15.9954 0.581524 15.9954C0.202083 15.9954 -0.0756407 15.6378 0.0183086 15.2702L1.94069 7.74783C2.05382 7.30514 2.45263 6.99543 2.90955 6.99543H7.16602V7.99543ZM7.16602 5.99086C5.58682 5.90424 4.33298 4.59626 4.33298 2.99543C4.33298 1.3946 5.58682 0.0866282 7.16602 0V1.0023C6.13957 1.08714 5.33298 1.94709 5.33298 2.99543C5.33298 4.04378 6.13957 4.90373 7.16602 4.98856V5.99086Z"
                fill="#999999"
              />
            </svg>
          );
      }
    }
  };

  render() {
    const { icon, customStyle, user, handlClick } = this.props;

    let genderIcon = this.getGenderIcon();
    let statusIConColor = user && user.status ? "#008A07" : "#C90808";
    let statusTag =
      user && user.status ? (
        <Tag tagValue="Active" style={{ backgroundColor: "#59B35E" }} />
      ) : (
        <Tag tagValue="Termed" style={{ backgroundColor: "#E76262" }} />
      );
    return (
      <div className="member-info">
        {user ? (
          <>
            <div className="member-avatar">
              <Avatar
                component="span"
                style={{ height: "30px", width: "30px" }}
                alt="profile-picture"
                src={user && user.img_url}
              >
                {user.first_name.charAt(0)}
              </Avatar>
            </div>
            <div className="member-gender-icon">{genderIcon}</div>
            <div
              className="member-name"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handlClick(user.id_member_info);
                this.setState({ showAccordion: true });
              }}
            >
              <span style={customStyle} className="member-name-text">
                {user.first_name}&nbsp;{user.middle_name}&nbsp;{user.last_name}{" "}
                III (Mickey)
              </span>
              <div className="bottom-border"></div>
            </div>
            <div className="member-status">{icon || statusTag}</div>
          </>
        ) : null}
        {this.state.showAccordion && (
          <MemberDetailsPopup
            isOpen={this.state.showAccordion}
            onClose={() => {
              this.setState({ showAccordion: false });
            }}
            panelName="*"
          />
        )}
      </div>
    );
  }
}

export default MemeberInfo;

// export default function MemeberInfo(props: any) {
//   const {icon, +customStyle, user, handlClick} = props;
//   // let genderIcon = user.gender == "M" ? <HumanIcon1 /> : <HumanIcon2 />;
//   let statusIConColor = user.status ? "#008A07" : "#C90808";
//   let statusTag = user.status ? (
//     <Tag tagValue="Active" style={{backgroundColor: "#59B35E"}} />
//   ) : (
//     <Tag tagValue="Termed" style={{backgroundColor: "#E76262"}} />
//   );
//   return (
//     <div className="member-info">
//       <div className="member-avatar">
//         <Avatar
//           component="span"
//           style={{height: "30px", width: "30px"}}
//           alt="profile-picture"
//           src={user.avatar}
//         />
//       </div>
//       <div className="member-gender-icon">{user.gender}</div>
//       <div className="member-name" onClick={handlClick}>
//         <span style={customStyle}>{user.name}</span>
//       </div>
//       <div className="member-status">{props.icon || statusTag}</div>
//       {/* <div className="member-status">{props.icon}</div> */}
//     </div>
//   );
// }
