import React from "react";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import DialogList from "../shared/FrxDialogList/FrxDialogList";
import { DialogListItemModel } from "../../models/dialog-list-item.model";
import { TabModel } from "../../models/tab.model";
import { FormModel } from '../../models/form-model';
import BasicList from "../shared/FrxBasicList/FrxBasicList";
import NotesPopup from '../member/MemberNotesPopup';
import "./MemberNotification.scss";

import { TabInfo } from '../../models/tab.model';
import { getTabNames } from '../../mocks/SearchFormMocks';
import MemberPopup from "./MemberPopup";
import { getNotificationMockData } from "../../mocks/grid/notification-mock";
import { getNotificationMockColumns } from "../../utils/grid/columns";


interface MemberNotificationState {
  isMemberNotificationsDialogOpen: boolean;
  items: DialogListItemModel[];
  tabs: TabModel[];
  formList: any,
  selectedTab: number;
  openMemberNotesPopup: boolean;

  miniTabs: any;
  activeMiniTabIndex: number;
}

class MemberNotification extends React.Component<any, MemberNotificationState> {
  state = {
    isMemberNotificationsDialogOpen: false,
    items: [],
    tabs: [],
    formList: [],
    selectedTab: 0,
    openMemberNotesPopup: false,

    miniTabs: getTabNames(),
    activeMiniTabIndex: 0,
  };
  componentDidMount() {
    /**
     * TODO: mock data
     * this would come from server
     */
    const items: DialogListItemModel[] = [
      {
        id: 1,
        avatar: "",
        content: "Member has not had a flu shot this year",
        heading: "Member is due for a flu shot"
      },
      {
        id: 2,
        avatar: "",
        content: "Member is currently taking abilify",
        heading: "Abilify case is pending"
      }
    ];

    /**
     * The tabs required for the model
     */
    const tabs: TabModel[] = [
      {
        id: 1,
        text: "Update",
        isSelected: true
      },
      {
        id: 2,
        text: "Add",
        isSelected: false
      }
    ];

    const formList: FormModel[] = []

    this.setState({ items, tabs, formList });
  }

  onClickMiniTab = (selectedTabIndex: number) => {
    let activeMiniTabIndex = 0;

    const miniTabs = this.state.miniTabs.map(
      (miniTab: TabInfo, index: number) => {
        if (index === selectedTabIndex) {
          activeMiniTabIndex = index;
        }
        return miniTab;
      }
    );

    this.setState({ miniTabs, activeMiniTabIndex })
  };

  /**
   * @function openMemberNotificationsEditDialog
   * to open the dialog to see list of member notifications and take action
   * @author Deepak_T
   */
  openMemberNotificationsEditDialog = () => {
    this.setState({ isMemberNotificationsDialogOpen: true });
  };

  /**
   * @function handleMemberNotificationEditDialogAction
   * to peform the action cancel/save for edit dialog
   * @param action type of action 'positive' | 'negative'
   * @author Deepak_T
   */
  handleMemberNotificationEditDialogAction = (action: string) => {
    this.setState({ isMemberNotificationsDialogOpen: false });
  };

  /**
   * @function handleMemberNotificationDialogClose
   * to close the member notification edit dialog
   * @author Deepak_T
   */
  handleMemberNotificationDialogClose = () => {
    console.log("dialog close ");
    this.setState({ isMemberNotificationsDialogOpen: false });
  };

  /**
   * @function handleTabChange
   * to switch to different view
   * @param tab selected view
   * @author Deepak_T
   */
  handleTabChange = (selectedTab: TabModel) => {
    let index = 0;
    const tabs = this.state.tabs.map((tab: TabModel, idx: number) => {
      if (selectedTab.id === tab.id) {
        index = idx;
        tab.isSelected = true;
      } else tab.isSelected = false;
      return tab;
    });

    this.setState({ tabs, selectedTab: index });
  };

  openNotesDialog = () => {
    this.setState({ openMemberNotesPopup: !this.state.openMemberNotesPopup });
  };

  render() {
    const { isMemberNotificationsDialogOpen, selectedTab } = this.state;
    return (
      <div className="member-notification-root">
        <div className="member-notification-header">
          <label className="member-notification-root__header-text">Member Notifications</label>
          <span className="member-notification-header__icon-container">
            <svg
              className="member-notification-header--editicon"
              onClick={this.openMemberNotificationsEditDialog}
              width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9461 0L13 2.05393L11.4342 3.6204L9.3803 1.56647L10.9461 0ZM3.42322 9.57679H5.47715L10.4662 4.58779L8.41222 2.53386L3.42322 7.52286V9.57679ZM3.53139 11.6307H10.9543V7.06551L12.3236 5.69622V11.6307C12.3236 11.9939 12.1793 12.3422 11.9225 12.5989C11.6657 12.8557 11.3175 13 10.9543 13H1.36929C0.614125 13 0 12.3866 0 11.6307V2.0457C0 1.28985 0.614125 0.676412 1.36929 0.676412H7.42633L6.05704 2.0457H1.36929V11.6307H3.40884C3.4199 11.631 3.4308 11.6326 3.44162 11.6341C3.45358 11.6359 3.46544 11.6376 3.47731 11.6376C3.48621 11.6376 3.49528 11.6358 3.50435 11.6341C3.51342 11.6324 3.52249 11.6307 3.53139 11.6307Z" fill="#2055B5" />
            </svg>
            <svg
              onClick={this.openNotesDialog}
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="member-notification-header--noteicon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                fill="#2055B5"
              />
            </svg>
          </span>
        </div>
        {/* <DialogPopup
          positiveActionText="Save"
          negativeActionText="Cancel"
          title="MEMBER NOTIFICATIONS"
          handleClose={this.handleMemberNotificationDialogClose}
          handleAction={this.handleMemberNotificationEditDialogAction}
          open={isMemberNotificationsDialogOpen}
          showActions={true}
          showCloseIcon={true}
        >
          <div>
            <DialogList
              onChangeTab={this.handleTabChange}
              showTabs={false}
              type="member notifications"
              tabs={this.state.tabs}
              selectedTab={selectedTab}
              items={this.state.items}
              formList={this.state.formList}
              title="NOTIFICATION DESCRIPTION"

              miniTabs={this.state.miniTabs}
              activeMiniTabIndex={this.state.activeMiniTabIndex}
              onClickMiniTab={this.onClickMiniTab}
            />
          </div>
        </DialogPopup> */}
        <MemberPopup
          title="MEMBER NOTIFICATIONS"
          onClose={this.handleMemberNotificationDialogClose}
          openPopup={isMemberNotificationsDialogOpen}
          data={getNotificationMockData()}
          columns={getNotificationMockColumns()}
          showTabs={false}
        />
        {this.state.openMemberNotesPopup ? (
          <NotesPopup
            category="Member Notifications"
            openPopup={this.state.openMemberNotesPopup}
            onClose={this.openNotesDialog}
          />
        ) : ""}
        <div className="member-notification-list-container">
          <BasicList
            rows={[{ title: "Member is due for a flu shot", date: "09/03/2020" },
            { title: "Abilify case is pending", date: "08/24/2020" }]}
          />
        </div>

      </div>
    );
  }
}

export default MemberNotification;
