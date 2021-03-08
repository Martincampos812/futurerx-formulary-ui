import { Grid, Paper } from '@material-ui/core';
import React, { Component } from 'react';
import { getNotesMock } from '../../mocks/notesMock';
import { NoteItemModel } from '../../models/note-item.model';
import FrxAssignedDetails from '../shared/FrxAssignedDetails/FrxAssignedDetails';
import NotesList from "../shared/FrxNotesList/FrxNotesList";
import FrxTaskList from '../shared/FrxTaskList/FrxTaskList';
import FrxMiniTabs from '../shared/FrxMiniTabs/FrxMiniTabs';
import { TabInfo } from '../../models/tab.model';
import { getCallsTabNames } from '../../mocks/callMock';
import AuditGrid from "./AuditGrid";
import './CallListDetails.scss';

interface CallListDetailsState {
    categoriesData: any;
    activeCategoryIndex: any;
    activeCategoryNotes: Array<NoteItemModel>;
    tabs: any;
    activeTabIndex: any
}
interface callListDetailsProps {

}
const notesListClasses: any = {
    parent_class: "membernotes-noteslist",
    note_heading: "note-heading",
    timeago: "note-timeago",
    content_text: "content-text",
    category_chip: "category-chip",
    para: "para"
}
class CallListDetails extends Component<callListDetailsProps, CallListDetailsState> {
    state = {
        categoriesData: 0,
        activeCategoryIndex: 0,
        activeCategoryNotes: [],
        tabs: getCallsTabNames(),
        activeTabIndex: 0,
    }
    onClickTab = (selectedTabIndex: number) => {
        let activeTabIndex = 0;
        const tabs = this.state.tabs.map(
          (tab: TabInfo, index: number) => {
            if (index === selectedTabIndex) {
              activeTabIndex = index;
            }
            return tab;
          }
        );
        this.setState({ tabs, activeTabIndex })
      };
    componentDidMount() {
        let allCategoriesNotesList: any[] = []
        const categories = getNotesMock();
        categories.forEach((category: any) => {
            allCategoriesNotesList = [...category.notes, ...allCategoriesNotesList]
        })
        this.setState({
            categoriesData: categories,
            activeCategoryIndex: 0,
            activeCategoryNotes: allCategoriesNotesList
        })
    }
    render() {
        return (
            <>
            <div className="callListDetails-root__mini-tab">
                <FrxMiniTabs tabList={this.state.tabs} activeTabIndex={this.state.activeTabIndex} onClickTab={this.onClickTab} />
            </div>
            {this.state.activeTabIndex === 0 ? (
            <Grid container spacing={2} className="callListDetails-root">
                <Grid item>
                    <Grid container className="callListDetails-root-info" justify="center" spacing={0}>
                        {[0, 1, 2].map((value) => (
                            <Grid 
                            key={value} 
                            item
                            className=
                            {
                                value === 0 ? "callListDetails-root-task" : "" || 
                                value === 1 ? "callListDetails-root-story" : "" || // to add individual width for resolutions
                                value === 2 ? "callListDetails-root-notes" : ""
                            }
                            >
                                {value === 0 && <Paper className="paper-task">
                                    <FrxTaskList
                                        isVisible={true}
                                        isLocked={true}
                                    />
                                </Paper>}
                                {value === 1 && <Paper className="paper-story">
                                    <FrxAssignedDetails/>
                                </Paper>}
                                {value === 2 && <Paper className="paper-notes">
                                    <NotesList
                                        title="NOTES"
                                        items={this.state.activeCategoryNotes}
                                        type="calllistdetails"
                                        notesListClasses={notesListClasses}
                                    />
                                </Paper>}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            ) : this.state.activeTabIndex === 1 ? (
                <>
                <AuditGrid />
                </>
            ) : null}
            </>
        )
    }
}

export default CallListDetails;