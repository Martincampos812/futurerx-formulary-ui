import React from "react";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import DialogList from "../shared/FrxDialogList/FrxDialogList";
import { DialogListItemModel } from "../../models/dialog-list-item.model";
import { TabModel } from "../../models/tab.model";
import { FormModel } from "../../models/form-model";
import NotesPopup from '../member/MemberNotesPopup';
import TextField from '@material-ui/core/TextField';
import BasicList from "../shared/FrxBasicList/FrxBasicList";
import "./ClinicalDiagnosis.scss";

import { TabInfo } from '../../models/tab.model';
import FrxMiniTabs from '../shared/FrxMiniTabs/FrxMiniTabs';
import { getTabNames } from '../../mocks/SearchFormMocks';
import MemberPopup from "../member/MemberPopup";
import { getClinicalDiagnosisData } from "../../mocks/grid/clinical-diagnosis";
import { getClinicalDiagnosisColumns } from "../../utils/grid/columns";

interface ClinicalDiagnosisHistoryState {
  isClinicalDiagnosisDialogOpen: boolean;
  items: DialogListItemModel[];
  tabs: TabModel[];
  formList: any[];
  searchDiagnosis: string;
  selectedTab: number;
  openMemberNotesPopup: boolean;
  isFilterApplied: boolean;

  miniTabs: any;
  activeMiniTabIndex: number;
}

class ClinicalDiagnosisHistory extends React.Component {
  state: ClinicalDiagnosisHistoryState = {
    isClinicalDiagnosisDialogOpen: false,
    items: [],
    tabs: [],
    formList: [],
    searchDiagnosis: '',
    selectedTab: 0,
    openMemberNotesPopup: false,
    isFilterApplied: false,

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
        content: "F90.2  Attention-deficit hyperactive disorder, combine type",
        heading: "Member diagnosed by their PCP."
      },
      {
        id: 2,
        avatar: "",
        content:
          "S72.8X1A   Nondisplaced segmental fracture of shaft of right f...",
        heading: "Expected to be in a cast for 8 to 12 weeks."
      },
      {
        id: 3,
        avatar: "",
        content: "M87.28   Osteonecrosis due to previous trauma, other site",
        heading: "Experiencing pain in right hip."
      },
      {
        id: 4,
        avatar: "",
        content: "F90.2   Attention-deficit hyperactive disorder, combine type",
        heading: "Diagnosed by PCP."
      }
    ];

    const formList: FormModel[] = [
      {
        id: 1,
        type: "autocomplete",
        required: true,
        placeholder: "Search Diagnosis Code",
        fieldLabel: "Search",
        list: [
          "F90.2  Diagnosis code description",
          "F90.2  Diagnosis code description",
          "F90.2  Diagnosis code description"
        ]
      },
      {
        id: 2,
        type: "textarea",
        required: true,
        placeholder:
          "Add a custom note to help other users understand any additional information for this diagnosis.",
        fieldLabel: "Notes",
        list: []
      },
      {
        id: 3,
        type: "datepicker",
        required: true,
        placeholder: "Add date",
        fieldLabel: "Diagnosis date",
        list: []
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
   * @function openClinicalDiagnosisEditDialog
   * to open the dialog to see list of clinical history and take action
   * @author Deepak_T
   */
  openClinicalDiagnosisEditDialog = () => {
    this.setState({ isClinicalDiagnosisDialogOpen: true });
  };

  openNotesDialog = () => {
    this.setState({ openMemberNotesPopup: !this.state.openMemberNotesPopup });
  };

  /**
   * @function handleClinicalDiagnosisEditDialogAction
   * to peform the action cancel/save for edit dialog
   * @param action type of action 'positive' | 'negative'
   * @author Deepak_T
   */
  handleClinicalDiagnosisEditDialogAction = (action: string) => {
    this.setState({ isClinicalDiagnosisDialogOpen: false });
  };

  /**
   * @function handleClinicalDiagnosisDialogClose
   * to close the clinical history edit dialog
   * @author Deepak_T
   */
  handleClinicalDiagnosisDialogClose = () => {
    console.log("dialog close ");
    this.setState({ isClinicalDiagnosisDialogOpen: false });
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

  handleSearch = (e: any) => {
    console.log('search value', e.target.value)
    this.setState({
      searchDiagnosis: e.target.value
    })
  }

  render() {
    const { isClinicalDiagnosisDialogOpen, selectedTab } = this.state;
    return (
      <div className="cd-history-root">
        <div className="cd-history-root__header">
          <span className="cd-history-root__header__heading">Clinical Diagnosis History</span>

          <div className="cd-history-root__header-actons">
            <div className="cd-history-root__header-actons__search-box-container1">
              {/* <span className="cd-history-root__header-actons__search-box-container1-input-container"> */}
              <input
                className="cd-history-root__header-actons__search-box-container1-input-container-search-input"
                type='search'
                placeholder="Search Diagnosis"
                onChange={(e) => this.handleSearch(e)}
              />
              {/* </span> */}

              <div className="cd-history-root__header-actons__search-box-container2">
                {/* <svg
                  className="cd-history-root__header-actons__search-box-container2__search-icon"
                  width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.33778C0 8.29409 2.38147 10.6756 5.33778 10.6756C6.66768 10.6756 7.88125 10.1936 8.81403 9.39424L12.4198 13L13.0004 12.4194L9.39459 8.81363C10.1938 7.8809 10.6756 6.66749 10.6756 5.33778C10.6756 2.38147 8.29409 0 5.33778 0C2.38147 0 0 2.38147 0 5.33778ZM0.821197 5.33778C0.821197 2.83313 2.83313 0.821197 5.33778 0.821197C7.84243 0.821197 9.85437 2.83313 9.85437 5.33778C9.85437 7.84243 7.84243 9.85437 5.33778 9.85437C2.83313 9.85437 0.821197 7.84243 0.821197 5.33778Z" fill="white" />
                </svg> */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7ZM7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5C8.61495 13.5 10.0923 12.911 11.2291 11.9362L14.6464 15.3536C14.8417 15.5488 15.1583 15.5488 15.3536 15.3536C15.5488 15.1583 15.5488 14.8417 15.3536 14.6464L11.9362 11.2291C12.911 10.0923 13.5 8.61495 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5Z" fill="#999999"></path></svg>
              </div>
            </div>

            <span className="cd-history-root__header-actons__icon-container">
              <svg
                className="cd-history-root__header-actons__icon-container__edit-icon"
                onClick={this.openClinicalDiagnosisEditDialog}
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
                className="cd-history-root__header-actons__icon-container__note-icon"
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
        </div>

        {/* <DialogPopup
          positiveActionText="Save"
          negativeActionText="Cancel"
          title="CLINICAL DIAGNOSIS"
          handleClose={this.handleClinicalDiagnosisDialogClose}
          handleAction={this.handleClinicalDiagnosisEditDialogAction}
          open={isClinicalDiagnosisDialogOpen}
          showActions={true}
          showCloseIcon={true}
          className="dialog-popup-root"
        >
          <div>
            <DialogList
              onChangeTab={this.handleTabChange}
              showTabs={true}
              type="clinical history"
              tabs={this.state.tabs}
              selectedTab={selectedTab}
              items={this.state.items}
              formList={this.state.formList}
              title="DIAGNOSIS DESCRIPTION"

              miniTabs={this.state.miniTabs}
              activeMiniTabIndex={this.state.activeMiniTabIndex}
              onClickMiniTab={this.onClickMiniTab}
            />
          </div>
        </DialogPopup> */}
        <MemberPopup
          title="Clinical Diagnosis"
          onClose={this.handleClinicalDiagnosisDialogClose}
          openPopup={isClinicalDiagnosisDialogOpen}
          data={getClinicalDiagnosisData()}
          columns={getClinicalDiagnosisColumns()}
          showTabs={true}
          tabs={[{ id: 1, text: 'Update' }, { id: 2, text: 'Add' }]}
          tabTypes={["grid", "form"]}
          formFields={this.state.formList}
        />
        {this.state.openMemberNotesPopup ? (
          <NotesPopup
            category="Clinical Diagnosis History"
            openPopup={this.state.openMemberNotesPopup}
            onClose={this.openNotesDialog}
          />
        ) : ""}
        <div className="cd-history-root__list-container">
          <BasicList
            rows={[{ title: "F90.2", description: "Attention-deficit hyperactive disorder, combine type", date: "05/12/2020" },
            { title: "S72.8X1A", description: "Nondisplaced segmental fracture of shaft of right femur, initial encounter for closed fracture", date: "05/12/2019" },
            { title: "M87.28", description: "Osteonecrosis due to previous trauma, other site", date: "07/09/2018" },
            { title: "F90.2", description: "Attention-deficit hyperactive disorder, combine type", date: "07/09/2018" },
            { title: "S72.8X1A", description: "Nondisplaced segmental fracture of shaft of right femur, initial encounter for closed fracture", date: "05/12/2019" },
            { title: "M87.28", description: "Osteonecrosis due to previous trauma, other site", date: "07/09/2018" },
            ]}
            isShowDescription={true}
            queryString={this.state.searchDiagnosis !== '' ? this.state.searchDiagnosis : ''}
          />
        </div>
      </div>
    );
  }
}

export default ClinicalDiagnosisHistory;
