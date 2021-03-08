import React from "react";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import DialogList from "../shared/FrxDialogList/FrxDialogList";
import { DialogListItemModel } from "../../models/dialog-list-item.model";
import { TabModel } from "../../models/tab.model";
import NotesPopup from '../member/MemberNotesPopup';
import { FormModel } from "../../models/form-model";
import BasicList from "../shared/FrxBasicList/FrxBasicList";
import './barriers.scss'

import { TabInfo } from '../../models/tab.model';
import { getTabNames } from '../../mocks/SearchFormMocks';
import MemberPopup from "../member/MemberPopup";
import { getBarriersColumns } from "../../utils/grid/columns";
import { getBarriersData } from "../../mocks/grid/barriers-mock";
interface BarriersState {
  isBarriersDialogOpen: boolean;
  items: DialogListItemModel[];
  tabs: TabModel[];
  formList: any[];
  selectedTab: number;
  isNotesOpen: boolean;
  miniTabs: any;
  activeMiniTabIndex: number;
}

class Barriers extends React.Component {
  state: BarriersState = {
    isBarriersDialogOpen: false,
    items: [],
    tabs: [],
    formList: [],
    selectedTab: 0,
    isNotesOpen: false,

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
        content:
          "Member has no access to transportation. He can not afford to fix his vehicle.",
        heading: "No access to transportation"
      },
      {
        id: 2,
        avatar: "",
        content: "Member does not own an internet connected device.",
        heading: "No access to internet"
      },
      {
        id: 3,
        avatar: "",
        content: "Member’s house was burglarized.",
        heading: "Exposure to crime, violence, and social disorder"
      },
      {
        id: 4,
        avatar: "",
        content: "Member and family earn low income.",
        heading: "Poverty"
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

    const formList: FormModel[] = [
      {
        id: 1,
        type: "autocomplete",
        required: true,
        placeholder: "Search Barrier description",
        fieldLabel: "Barrier*",
        list: [
          "No access to transportation",
          "No access to transportation",
          "Unknown"
        ]
      },
      {
        id: 2,
        type: "textarea",
        required: true,
        placeholder:
          "Add a custom note to help other user understand any additional information for this Barrier.",
        fieldLabel: "Barrier notes*",
        list: []
      },
      {
        id: 3,
        type: "datepicker",
        required: true,
        placeholder: "Add date",
        fieldLabel: "Effective date*",
        list: []
      }
    ];

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

  openNotesDialog = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  /**
   * @function openBarriersEditDialog
   * to open the dialog to see list of clinical history and take action
   * @author Muthu
   */
  openBarriersEditDialog = () => {
    this.setState({ isBarriersDialogOpen: true });
  };

  /**
   * @function handleBarriersEditDialogAction
   * to peform the action cancel/save for edit dialog
   * @param action type of action 'positive' | 'negative'
   * @author Muthu
   */
  handleBarriersEditDialogAction = (action: string) => {
    this.setState({ isBarriersDialogOpen: false });
  };

  /**
   * @function handleBarriersDialogClose
   * to close the clinical history edit dialog
   * @author Muthu
   */
  handleBarriersDialogClose = () => {
    console.log("dialog close ");
    this.setState({ isBarriersDialogOpen: false });
  };

  /**
   * @function handleTabChange
   * to switch to different view
   * @param tab selected view
   * @author Muthu
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

  render() {
    const { isBarriersDialogOpen, selectedTab } = this.state;
    return (
      <>
        <div className="barriers-root">
          <div className="barriers-root__header">
            <label className="barriers-root__header-text">BARRIERS</label>
            <span className="barriers-root__header__icon-container">
              <svg
                className="barriers-root__header--editicon"
                onClick={this.openBarriersEditDialog}
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
                className="barriers-root__header--noteicon"
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
          title="BARRIERS"
          handleClose={this.handleBarriersDialogClose}
          handleAction={this.handleBarriersEditDialogAction}
          open={isBarriersDialogOpen}
          showActions={true}
          showCloseIcon={true}
        >
          <div>
            <DialogList
              onChangeTab={this.handleTabChange}
              showTabs={true}
              type="barriers"
              tabs={this.state.tabs}
              selectedTab={selectedTab}
              items={this.state.items}
              formList={this.state.formList}
              title="BARRIER"

              miniTabs={this.state.miniTabs}
              activeMiniTabIndex={this.state.activeMiniTabIndex}
              onClickMiniTab={this.onClickMiniTab}
            />
          </div>
        </DialogPopup> */}
          <MemberPopup
            title="BARRIERS"
            onClose={this.handleBarriersDialogClose}
            openPopup={isBarriersDialogOpen}
            data={getBarriersData()}
            columns={getBarriersColumns()}
            showTabs={true}
            tabs={[{ id: 1, text: 'Update' }, { id: 2, text: 'Add' }]}
            tabTypes={["grid", "form"]}
            formFields={this.state.formList}
          />
          {this.state.isNotesOpen ? (
            <NotesPopup
              category="Barriers"
              openPopup={this.state.isNotesOpen}
              onClose={this.openNotesDialog}
            />
          ) : ""}
          <div className="cd-history-list-container">
            <BasicList
              rows={[{ title: "No access to transportation", date: "09/03/2020" },
              { title: "No access to internet", date: "10/02/2020", isShowChip: true },
              { title: "Exposure to crime, violence, and social...", date: "07/24/2020" },
              { title: "Poverty", date: "02/24/2020" }]}
              isShowDescription={false}
              isShowChip={true}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Barriers;
