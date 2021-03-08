/**
 * Component to render the ellipses in settings column
 * @author Deepak_T
 * @version 1.0.0
 */

import { Radio, Checkbox, Popover } from "antd";
// import Checkbox from "antd/lib/checkbox/Checkbox";
import { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { GridMenu } from "../../../../../models/grid.model";
import FrxGridMenu from "../FrxGridMenu/FrxGridMenu";
import "./FrxGridSettingsCell.scss";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

export interface FrxGridSettingsCellProps {
  expanded: boolean;

  dataRow: any;
  settingsAnchor: HTMLElement | null;
  setingsComponent?: "grid-menu";
  isRowSelectionEnabled?: boolean;
  handleCheck?: any;
  settingsMenuItems?: GridMenu[];
  isRowSelectorCheckbox?: boolean;
  customSettingIcon?: string;
  className?: string;
  settingsTriDotDropDownItems?: any[];
  handleSettingsComponentMenuClose?: () => void;
  handleMenuClick?: (menuItem: GridMenu, data?: any) => void;
  onSettingsTriDotClick: (dataRow: any) => void;
  onsettingsTriDotDropDownItemClick?: (dataRow: any, item: any) => void;
  rowSelectionChange: (dataRow: any, event: any) => void;
  onSettingsCellClick: (
    expanded: boolean,
    data: any,
    eventTarget: EventTarget & HTMLButtonElement
  ) => void;
}

class FrxGridSettingsCell extends React.Component<FrxGridSettingsCellProps> {
  /**
   * @function getComponentToDisplayOnSettingsClick
   * to retrieve the type of component to be opened on click of settings ellipses
   * @author Deepak_T
   */
  getComponentToDisplayOnSettingsClick = () => {
    if (this.props.setingsComponent) {
      switch (this.props.setingsComponent) {
        case "grid-menu":
          if (
            this.props.settingsMenuItems &&
            this.props.settingsMenuItems.length > 0
          ) {
            return (
              <FrxGridMenu
                menuItems={this.props.settingsMenuItems}
                anchorEl={this.props.settingsAnchor}
                handleMenuClick={(menu: GridMenu) => {
                  console.log("data row ", this.props.dataRow);
                  if (this.props.handleMenuClick)
                    this.props.handleMenuClick(menu, this.props.dataRow);
                }}
                handleClose={() => {
                  if (this.props.handleSettingsComponentMenuClose)
                    this.props.handleSettingsComponentMenuClose();
                }}
              />
            );
          } else {
            return <></>;
          }

        default:
          console.log("no component specified");
      }
    }
  };

  /**
   * @function rowSelectionChange
   * to detect the row selected in grid
   *
   * NOTE: handleCheck is used in greievance communication tab
   */
  rowSelectionChange = (e: RadioChangeEvent | CheckboxChangeEvent) => {
    if (this.props.handleCheck) this.props.handleCheck(e.target);
    this.props.rowSelectionChange(this.props.dataRow, e);
  };

  /**
   * @function onSettingsTriDotClcik
   * to detect click on tridot and react to it
   * @author Deepak_T
   */
  onSettingsTriDotClcik = () => {
    if (this.props.isRowSelectionEnabled) return;
    if (
      this.props.settingsTriDotDropDownItems &&
      this.props.settingsTriDotDropDownItems.length > 0
    )
      return;
    if (this.props.onSettingsTriDotClick) {
      this.props.onSettingsTriDotClick(this.props.dataRow);
    }
  };
  onTriDotDropDownItemClick = (selectedItem: any) => {
    if (this.props.onsettingsTriDotDropDownItemClick) {
      this.props.onsettingsTriDotDropDownItemClick(
        this.props.dataRow,
        selectedItem
      );
    }
  };
  /**
   * @function renderExpandedCell
   * to render the content when ellipses is expanded
   * @author Deepak_T
   */
  renderExpandedCell = () => {
    const isRowSelectionEnabled = this.props.isRowSelectionEnabled;
    let customSettingIcon = this.props.customSettingIcon;

    if (customSettingIcon) {
      if (
        customSettingIcon &&
        customSettingIcon === "RED-DOT" &&
        !this.props.dataRow.checked
      ) {
        customSettingIcon = "NONE";
      }

      switch (customSettingIcon) {
        case "RED-DOT":
          return (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="6" fill="#E76262" />
            </svg>
          );

        case "PLUS-BTN":
          return (
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.71751 6.71751C3.01352 10.4215 3.01352 16.4485 6.71751 20.1525C10.4215 23.8565 16.4485 23.8565 20.1525 20.1525C23.8565 16.4485 23.8565 10.4215 20.1525 6.71751C16.4485 3.01351 10.4215 3.01352 6.71751 6.71751ZM17.5689 12.7045C17.6664 12.702 17.7634 12.7191 17.8542 12.7546C17.945 12.7902 18.0278 12.8436 18.0977 12.9117C18.1675 12.9798 18.223 13.0612 18.2609 13.1511C18.2988 13.2409 18.3184 13.3375 18.3184 13.435C18.3184 13.5326 18.2988 13.6291 18.2609 13.719C18.223 13.8089 18.1675 13.8902 18.0977 13.9583C18.0278 14.0264 17.945 14.0798 17.8542 14.1154C17.7634 14.151 17.6664 14.1681 17.5689 14.1656L14.1659 14.1659L14.1656 17.5689C14.1607 17.7594 14.0816 17.9405 13.9451 18.0735C13.8086 18.2065 13.6256 18.2809 13.435 18.2809C13.2445 18.2809 13.0614 18.2065 12.925 18.0735C12.7885 17.9405 12.7094 17.7594 12.7045 17.5689L12.7042 14.1659L9.30117 14.1656C9.11066 14.1607 8.9296 14.0816 8.79658 13.9451C8.66356 13.8086 8.58911 13.6256 8.58911 13.435C8.58911 13.2445 8.66356 13.0614 8.79658 12.925C8.9296 12.7885 9.11066 12.7094 9.30117 12.7045L12.7042 12.7042L12.7045 9.30117C12.7094 9.11066 12.7885 8.9296 12.925 8.79658C13.0614 8.66356 13.2445 8.58911 13.435 8.58911C13.6256 8.58911 13.8086 8.66356 13.9451 8.79658C14.0816 8.9296 14.1607 9.11066 14.1656 9.30117L14.1659 12.7042L17.5689 12.7045Z"
                fill="#1D54B4"
              />
            </svg>
          );
        case "NONE":
          return null;
        default:
          return null;
      }
    }
    return (
      <>
        {!isRowSelectionEnabled ? (
          <span
            id={this.props.dataRow.key + "-expanded"}
            className="frx-grid-settings-cell__icon"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              const savedTarget = event.currentTarget;
              this.props.onSettingsCellClick(
                false,
                this.props.dataRow,
                savedTarget
              );
            }}
          >
            <svg
              className="frx-grid-settings-cell__icon--expanded"
              width="22"
              height="6"
              viewBox="0 0 22 6"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="19.1552" cy="2.58853" r="2.58853" fill="#A5A5A5" />
              <circle cx="10.8717" cy="2.58853" r="2.58853" fill="#C1C2C4" />
              <circle cx="2.58853" cy="2.58853" r="2.58853" fill="#E1E1E1" />
            </svg>
          </span>
        ) : (
          <>
            {!this.props.isRowSelectorCheckbox ? (
              <Radio
                onChange={this.rowSelectionChange}
                checked={this.props.dataRow.isSelected}
              ></Radio>
            ) : (
              <Checkbox onChange={this.rowSelectionChange}></Checkbox>
            )}
          </>
        )}
        {!isRowSelectionEnabled && this.props.setingsComponent
          ? this.getComponentToDisplayOnSettingsClick()
          : null}
      </>
    );
  };

  /**
   * @function renderNonExpandedCell
   * to render the content when ellipses is not expanded
   * @author Deepak_T
   */
  renderNonExpandedCell = () => {
    const isRowSelectionEnabled = this.props.isRowSelectionEnabled;
    let customSettingIcon = this.props.customSettingIcon;
    const { dataRow } = this.props;
    if (customSettingIcon) {
      if (
        customSettingIcon &&
        customSettingIcon === "RED-DOT" &&
        !this.props.dataRow.checked
      ) {
        customSettingIcon = "NONE";
      }

      switch (customSettingIcon) {
        case "RED-DOT":
          return (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="6" fill="#E76262" />
            </svg>
          );
        case "PLUS-BTN":
          return (
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.71751 6.71751C3.01352 10.4215 3.01352 16.4485 6.71751 20.1525C10.4215 23.8565 16.4485 23.8565 20.1525 20.1525C23.8565 16.4485 23.8565 10.4215 20.1525 6.71751C16.4485 3.01351 10.4215 3.01352 6.71751 6.71751ZM17.5689 12.7045C17.6664 12.702 17.7634 12.7191 17.8542 12.7546C17.945 12.7902 18.0278 12.8436 18.0977 12.9117C18.1675 12.9798 18.223 13.0612 18.2609 13.1511C18.2988 13.2409 18.3184 13.3375 18.3184 13.435C18.3184 13.5326 18.2988 13.6291 18.2609 13.719C18.223 13.8089 18.1675 13.8902 18.0977 13.9583C18.0278 14.0264 17.945 14.0798 17.8542 14.1154C17.7634 14.151 17.6664 14.1681 17.5689 14.1656L14.1659 14.1659L14.1656 17.5689C14.1607 17.7594 14.0816 17.9405 13.9451 18.0735C13.8086 18.2065 13.6256 18.2809 13.435 18.2809C13.2445 18.2809 13.0614 18.2065 12.925 18.0735C12.7885 17.9405 12.7094 17.7594 12.7045 17.5689L12.7042 14.1659L9.30117 14.1656C9.11066 14.1607 8.9296 14.0816 8.79658 13.9451C8.66356 13.8086 8.58911 13.6256 8.58911 13.435C8.58911 13.2445 8.66356 13.0614 8.79658 12.925C8.9296 12.7885 9.11066 12.7094 9.30117 12.7045L12.7042 12.7042L12.7045 9.30117C12.7094 9.11066 12.7885 8.9296 12.925 8.79658C13.0614 8.66356 13.2445 8.58911 13.435 8.58911C13.6256 8.58911 13.8086 8.66356 13.9451 8.79658C14.0816 8.9296 14.1607 9.11066 14.1656 9.30117L14.1659 12.7042L17.5689 12.7045Z"
                fill="#1D54B4"
              />
            </svg>
          );
        case "FILL-DOT":
          let color = "";

          if (
            (dataRow["isDisabled"] || dataRow["isChecked"]) &&
            dataRow["rowStyle"] &&
            dataRow["rowStyle"] === "table-row--green-font"
          ) {
            color = "green";
          } else if (
            (dataRow["isDisabled"] || dataRow["isChecked"]) &&
            dataRow["rowStyle"] &&
            dataRow["rowStyle"] === "table-row--red-font"
          ) {
            color = "red";
          } else if (
            (dataRow["isDisabled"] || dataRow["isChecked"]) &&
            dataRow["rowStyle"] &&
            dataRow["rowStyle"] === "table-row--blue-font"
          ) {
            color = "#5f80b9";
          }

          return (
            <>
              {color ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="6" r="6" fill={`${color}`} />
                </svg>
              ) : (
                <></>
              )}
            </>
          );
        case "NONE":
          return null;
        default:
          return null;
      }
    }
    const TriDotDropdownContent = (
      <div className="tri-dot-drop-down-wrapper">
        {this.props.settingsTriDotDropDownItems?.map((data, index) => (
          <p onClick={(e) => this.onTriDotDropDownItemClick(data)}>{data}</p>
        ))}
      </div>
    );
    return (
      <>
        {!isRowSelectionEnabled ? (
          <span
            id={this.props.dataRow.key + "-non-expanded"}
            className="frx-grid-settings-cell__icon"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              // const savedEvent = event;
              const savedTarget = event.currentTarget;
              this.props.onSettingsCellClick(
                false,
                this.props.dataRow,
                savedTarget
              );
            }}
          >
            {this.props.settingsTriDotDropDownItems &&
            this.props.settingsTriDotDropDownItems.length > 0 ? (
              <Popover
                content={TriDotDropdownContent}
                trigger="click"
                placement="bottom"
              >
                <svg
                  className="frx-grid-settings-cell__icon--non-expanded"
                  width="22"
                  height="6"
                  viewBox="0 0 22 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="19.1552"
                    cy="2.58853"
                    r="2.58853"
                    fill="#A5A5A5"
                  />
                  <circle
                    cx="10.8717"
                    cy="2.58853"
                    r="2.58853"
                    fill="#C1C2C4"
                  />
                  <circle
                    cx="2.58853"
                    cy="2.58853"
                    r="2.58853"
                    fill="#E1E1E1"
                  />
                </svg>
              </Popover>
            ) : (
              <svg
                className="frx-grid-settings-cell__icon--non-expanded"
                width="22"
                height="6"
                viewBox="0 0 22 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="19.1552" cy="2.58853" r="2.58853" fill="#A5A5A5" />
                <circle cx="10.8717" cy="2.58853" r="2.58853" fill="#C1C2C4" />
                <circle cx="2.58853" cy="2.58853" r="2.58853" fill="#E1E1E1" />
              </svg>
            )}
          </span>
        ) : (
          <>
            {!this.props.isRowSelectorCheckbox ? (
              <Radio
                onChange={this.rowSelectionChange}
                checked={this.props.dataRow.isSelected}
              ></Radio>
            ) : (
              <Checkbox
                id={this.props.dataRow.key}
                onChange={this.rowSelectionChange}
              ></Checkbox>
            )}
          </>
        )}
        {!isRowSelectionEnabled && this.props.setingsComponent
          ? this.getComponentToDisplayOnSettingsClick()
          : null}
      </>
    );
  };
  render() {
    // const { expanded } = this.props;
    return (
      <span
        className="frx-grid-settings-cell"
        onClick={this.onSettingsTriDotClcik}
      >
        {/* USE IF YOU WNT TO CHANGE ELLIPSES WHEN CLICKED */}
        {/* {expanded ? this.renderExpandedCell() : this.renderNonExpandedCell()} */}

        {this.renderNonExpandedCell()}
      </span>
    );
  }
}

export default FrxGridSettingsCell;
