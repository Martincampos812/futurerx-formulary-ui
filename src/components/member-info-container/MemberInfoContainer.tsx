import React, { useState, useEffect } from "react";
import axios from "axios";

// import {Select, MenuItem} from "@material-ui/core";
import { CaretDownOutlined } from "@ant-design/icons";
import { Input } from "@material-ui/core";
import { Button, Select } from "antd";

import IconButton from "@material-ui/core/IconButton";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import AttributesPanel from "../user-details/attributes-panel/AttributesPanel";
import Tag from "../shared/Frx-components/tags/Tag";
import { ReactComponent as MessageIcon } from "../../assets/icons/MessageIcon.svg";
import { ReactComponent as IconAudit } from "../../assets/icons/IconAudit.svg";
import { ReactComponent as IconAlerts } from "../../assets/icons/IconAlerts.svg";
import { ReactComponent as IndicatorNewitems } from "../../assets/icons/IndicatorNewitems.svg";
import { ReactComponent as TextIcon } from "../../assets/icons/Text.svg";
import { ReactComponent as LetterIcon } from "../../assets/icons/Letter.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/ArrowDown.svg";
import { ReactComponent as MessageIcon1 } from "../../assets/icons/MessageIcon1.svg";
import { ReactComponent as MessageIcon2 } from "../../assets/icons/MessageIcon2.svg";
import { ReactComponent as FileIcon } from "../../assets/icons/FileIcon.svg";
import { ReactComponent as VideoCall } from "../../assets/icons/VideoCall.svg";
import { ReactComponent as MailIcon } from "../../assets/icons/MailIcon.svg";
// import {ReactComponent as CallIcon} from "../../assets/icons/CallIcon.svg";

import MembersDropdown from "../user-details/members-dropdown/MembersDropdown";
// import ForumIcon from "@material-ui/icons/Forum";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import AddIcon from "@material-ui/icons/Add";
// import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CallIcon from "@material-ui/icons/Call";
// import EmailIcon from "@material-ui/icons/Email";
// import VideocamIcon from "@material-ui/icons/Videocam";

import CustomMenu from "../shared/Frx-components/menu/CustomMenu";
import CustomMenuItem from "../shared/Frx-components/menu/menu-item/CustomMenuItem";
import NotesPopup from "../member/MemberNotesPopup";

import DropDown from "../shared/Frx-components/dropdown/DropDown";
import ArrowUp from "../../assets/icons/ArrowUp.svg";
// import {  } from "../../assets/icons/ArrowDown";
import "./MemberInfoContainer.css";
import MemberAuditPopup from "../member/MemberAuditPopup";
import MemberPopup from "../member/MemberPopup";
import { getNotificationMockColumns } from "../../utils/grid/columns";
import { getAlertsData } from "../../mocks/grid/alerts-mocks";

const { Option } = Select;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "11px",
      backgroundColor: "#FFFFFF",
      // border: "1px solid #FFFFFF",
      // borderRadius: "3px",
      boxShadow: "none",
      padding: 5,
    },
    dropdownStyle: {
      // marginTop: 3,
      margin: 3,
      // width: 60,
      boxShadow: "none",
      border: "1px solid #e5e5e5",
    },

    outlined: {
      borderRadius: 0,
    },

    selectMenu: {
      padding: "0 0 0 5px",
    },
    nativeInput: {
      padding: 0,
    },
  })
);

// const defaultSelectStyle = {
//   fontFamily:String: "Roboto";
//   fontStyle:String: "normal";
//   fontWeight:String: "normal";
//   fontSize:String: "11px";
// };

export default function MemberInfoContainer(props: any) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [isNotesOpen, openNotesDialog] = useState(false);
  const [isAuditOpen, openAuditDialog] = useState(false);
  const [isNotificationsOpen, openNotifications] = useState(false);
  const [serviceDropdown, setServiceDropdown] = useState<any[]>([]);
  const [serviceDropdownCaret, setServiceDropdownCaret] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleNoteIconClick = () => {
    openNotesDialog(!isNotesOpen);
  };
  const handleAuditIconClick = () => {
    openAuditDialog(!isAuditOpen);
  };
  const handleNotificationIconClick = () => {
    openNotifications(!isNotificationsOpen);
  };

  const onMemberInfoClick = (id) => {
    props.onMemberSelect(id);
  };

  const handleChange = (value) => {
    setServiceDropdown(value);
  };
  const onCaretChange = () => {
    setServiceDropdownCaret(!serviceDropdownCaret);
  };

  const statusTag =
    props.user && props.user.status ? (
      <Tag tagValue="Active" style={{ backgroundColor: "#59B35E" }} />
    ) : (
      <Tag tagValue="Termed" style={{ backgroundColor: "#E76262" }} />
    );

  return (
    <div
      className="MemberInfoContainer"
      onClick={
        props.isOpen
          ? () => props.hideMembers()
          : () => {
              console.log("do nothing");
            }
      }
    >
      <div className="memberDrop-icon-container" style={{ maxHeight: "50px" }}>
        <MembersDropdown
          showMembers={() => props.showMembers()}
          hideMembers={() => props.hideMembers()}
          isOpen={props.isOpen}
          user={props.user}
          memberInformation={props.memberInformation}
          contactInformation={props.contactInformation}
          onMemberInfoClick={onMemberInfoClick}
        />
        <div className="icons">
          <div className="message-icon" onClick={handleClick}>
            {/* <ForumIcon
              style={{color: "#2055B5", fontSize: "1rem", marginTop: 6}}
            /> */}
            {/* <div> */}
            <MessageIcon1 className="MessageIcon1" />
            <MessageIcon2 className="MessageIcon2" />
            {/* </div> */}
            <CustomMenu className="chat-menu" anchorEl={anchorEl} open={open}>
              <CustomMenuItem
                label="Phone Call"
                handleClose={() => {
                  setOpen(!open);
                }}
              >
                <CallIcon className="menu-icons" style={{ fontSize: "1rem" }} />
              </CustomMenuItem>
              <CustomMenuItem
                label="Video Call"
                handleClose={() => {
                  setOpen(!open);
                }}
              >
                <VideoCall
                  className="menu-icons"
                  style={{ fontSize: "1rem" }}
                />
              </CustomMenuItem>
              <CustomMenuItem
                label="Letter"
                handleClose={() => {
                  setOpen(!open);
                }}
              >
                <LetterIcon
                  className="menu-icons"
                  style={{ fontSize: "1rem" }}
                />
              </CustomMenuItem>
              <CustomMenuItem
                label="E-mail"
                handleClose={() => {
                  setOpen(!open);
                }}
              >
                <MailIcon className="menu-icons" style={{ fontSize: "1rem" }} />
              </CustomMenuItem>
              <CustomMenuItem
                label="Text"
                handleClose={() => {
                  setOpen(!open);
                }}
              >
                <TextIcon className="menu-icons" style={{ fontSize: "1rem" }} />
              </CustomMenuItem>
            </CustomMenu>
          </div>
          <div>
            <IconAudit onClick={handleAuditIconClick} />
            {isAuditOpen ? (
              <MemberAuditPopup
                onClose={handleAuditIconClick}
                openPopup={isAuditOpen}
              />
            ) : (
              ""
            )}
          </div>
          <div className="alter-indicator-icons">
            <IndicatorNewitems className="indicatiorIcon" />
            <IconAlerts onClick={handleNotificationIconClick} />
            {isNotificationsOpen ? (
              <MemberPopup
                title="MEMBER ALERTS"
                onClose={handleNotificationIconClick}
                openPopup={isNotificationsOpen}
                data={getAlertsData()}
                columns={getNotificationMockColumns()}
                showTabs={false}
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <FileIcon onClick={handleNoteIconClick} />
            {isNotesOpen ? (
              <NotesPopup
                category="all"
                openPopup={isNotesOpen}
                onClose={handleNoteIconClick}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="tags-service-container">
        {props.user ? (
          <div className="tage-panel">
            {statusTag}
            {/* <Tag tagValue={props.user.status} style={{backgroundColor: "#59B35E"}} /> */}
            <Tag
              tagValue={props.user.lob}
              style={{ backgroundColor: "#1077B0" }}
            />
            <Tag tagValue={"Really long tag..."} />
            <Tag tagValue={"Maricopa County"} />
            <Tag tagValue={"Product ID"} />
            <Tag tagValue={"Extra tag with a long  value"} />
          </div>
        ) : null}
        <div className="sevice-section">
          <label htmlFor="">Service year</label>
          {/* <DropDown oprion="01/01/2020 - 12/31/2020" />
          <ArrowDown /> */}
          <div className="action-drop">
            {/* <DropDown
            option="01/01/2020 - 12/31/2020"
            options={[
              "01/01/2020 - 12/31/2020",
              "01/01/2020 - 12/31/2020",
              "01/01/2020 - 12/31/2020",
            ]}
          /> */}

            {/* <Select */}
            {/* variant="outlined" */}
            {/* value={1} */}
            {/* className="outlined" */}
            {/* classes={classes} */}
            {/* // IconComponent={() => <ArrowDown className="Select-ArrowDown" />} */}
            {/* MenuProps={{classes: {paper: classes.dropdownStyle}}} */}
            {/* > */}
            {/* <MenuItem className={classes.root} value={1}> */}
            {/* 01/01/2020 - 12/31/2020 */}
            {/* <IconButton edge="end">
                  <ArrowDown className="Select-ArrowDown" />
                </IconButton> */}
            {/* </MenuItem> */}
            {/* <MenuItem className={classes.root} value={2}> */}
            {/* 01/01/2020 - 12/31/2020 */}
            {/* </MenuItem> */}
            {/* <MenuItem className={classes.root} value={3}> */}
            {/* 01/01/2020 - 12/31/2020 */}
            {/* </MenuItem> */}
            {/* </Select> */}

            <Select
              value={serviceDropdown}
              // style={defaultSelectStyle}
              placeholder="01/01/2020 - 12/31/2020"
              onChange={handleChange}
              onFocus={onCaretChange}
              onBlur={onCaretChange}
              size="large"
              className="antd-select-dropdown member-info-container__service-year"
              suffixIcon={
                <>
                  <span className="ant-select-suffix">
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        display: serviceDropdownCaret ? "none" : "block",
                      }}
                      // style={{transform: serviceDropdownCaret ? "rotate(180deg)": "intial"}}
                    >
                      <path
                        d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                        fill="#999999"
                      />
                    </svg>
                  </span>
                  <span className="ant-select-suffix">
                    <svg
                      style={{
                        display: serviceDropdownCaret ? "block" : "none",
                      }}
                      width="6"
                      height="3"
                      viewBox="0 0 6 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.79875 3H0.20125C0.0333594 3 -0.0603867 2.85282 0.0435863 2.75234L2.84234 0.0578451C2.92245 -0.0192819 3.0767 -0.0192819 3.15766 0.0578451L5.95641 2.75234C6.06039 2.85282 5.96664 3 5.79875 3Z"
                        fill="#999999"
                      />
                    </svg>
                  </span>
                </>
              }
              dropdownClassName="service-year-dropdown"
            >
              <Option
                style={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "11px",
                }}
                className="antd-select-dropdown-options"
                value="01/01/2020 - 12/31/2020"
              >
                01/01/2020 - 12/31/2020
              </Option>
              <Option
                style={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "11px",
                }}
                className="antd-select-dropdown-options"
                value="01/01/2019 - 12/31/2019"
              >
                01/01/2019 - 12/31/2019
              </Option>
              <Option
                style={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "11px",
                }}
                className="antd-select-dropdown-options"
                value="01/01/2018 - 12/31/2018"
              >
                01/01/2018 - 12/31/2018
              </Option>
            </Select>

            {/* <label htmlFor="">01/01/2020 - 12/31/2020</label> */}
            {/* { */}
            {/* // serviceDropdown ? */}
            {/* <ArrowDown /> */}
            {/* // : */}
            {/* <ArrowDown /> */}
          </div>
        </div>
      </div>
      {/* <AttributesPanel /> */}
    </div>
  );
}
