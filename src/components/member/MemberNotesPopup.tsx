import React from "react";
import FrxDialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import { NoteItemModel } from "../../models/note-item.model";
import NotesList from "../shared/FrxNotesList/FrxNotesList";
import TextField from "@material-ui/core/TextField";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Select } from "antd";
import "./MemberNotesPopup.scss";
import { getNotesMock } from "../../mocks/notesMock";
import FrxGridContainer from "../shared/FrxGrid/FrxGridContainer";
import { memberNotesGridColumns } from "../../utils/grid/columns";

const { Option } = Select;

interface MemberNotesPopupProps {
  openPopup: boolean;
  onClose: () => void;
  category: string;
}

interface CategoryData {
  id: number;
  category: string;
  notes: Array<NoteItemModel>;
}

interface MemberNotesPopupState {
  categoriesData: Array<CategoryData>;
  activeCategoryNotes: Array<NoteItemModel>;
  activeCategoryIndex: number;
  listView: boolean;
  gridView: boolean;
  noteSelect: string | undefined;
  columns: any;
  isFetchingData: boolean;
  filteredData: any;
}

class MemberNotesPopup extends React.Component<
  MemberNotesPopupProps,
  MemberNotesPopupState
> {
  state: MemberNotesPopupState = {
    categoriesData: [],
    activeCategoryNotes: [],
    activeCategoryIndex: 0,
    listView: true,
    gridView: false,
    noteSelect: undefined,
    columns: memberNotesGridColumns(),
    isFetchingData: false,
    filteredData: []
  };

  componentDidMount() {
    /**
     * TODO: mock data
     * this would come from server
     */

    /**
     * The tabs required for the model
     */
    this.fetchAndUpdateNotesToState("start", 0);
  }

  /**
   *@function onClose
   *
   * Close the member notes popup
   *
   * @memberof MemberNotesPopup
   */

  onClose = () => {
    this.props.onClose();
  };

  handleGridNotesViewClick = () => {
    this.setState({
      listView: false,
      gridView: true
    });
  };

  handleListNotesViewClick = () => {
    this.setState({
      listView: true,
      gridView: false
    });
  };

  /**
   * Action method if any action is required for dialog popup
   *
   * @memberof MemberNotesPopup
   */
  action = () => {
    console.log("no action to perform");
  };

  /**
   *Fetch notes details for all categories and filter specific category notes
   *
   * @param {string} type
   * @param {number} index
   * @param {*} [item]
   * @memberof MemberNotesPopup
   */
  fetchAndUpdateNotesToState = (type: string, index: number, item?: any) => {
    let allCategoriesNotesList: any[] = [];
    if (type == "start") {
      const categories = getNotesMock();
      index = 0;
      if (this.props.category == "all") {
        categories.forEach((category: any) => {
          allCategoriesNotesList = [
            ...category.notes,
            ...allCategoriesNotesList
          ];
        });
        this.setState({
          categoriesData: categories,
          activeCategoryIndex: 0,
          activeCategoryNotes: allCategoriesNotesList
        });
      } else {
        let category = categories.find((item, i) => {
          index = i + 1;
          return item.category == this.props.category;
        });
        console.log("notes mock list", categories);

        this.setState({
          categoriesData: categories,
          activeCategoryNotes: category.notes,
          activeCategoryIndex: 0 + index
        });
      }
    } else {
      if (item == "all") {
        this.state.categoriesData.forEach((cat: any) => {
          allCategoriesNotesList = [...cat.notes, ...allCategoriesNotesList];
        });
        this.setState({
          activeCategoryIndex: index,
          activeCategoryNotes: allCategoriesNotesList
        });
        console.log("allCategoriesNotesList", allCategoriesNotesList);
      } else {
        let categoryItem = this.state.categoriesData.find(
          (category: any) => category.category == item
        );
        console.log("categoryItem", categoryItem);
        this.setNotesList(categoryItem, index);
      }
    }
  };

  /**
   *Set the state for notes[] after filtering the proper notes list
   *
   * @param {*} categoryItem
   * @param {number} i
   * @memberof MemberNotesPopup
   */
  setNotesList = (categoryItem: any, i: number) => {
    if (categoryItem != undefined && categoryItem.hasOwnProperty("notes")) {
      this.setState({
        activeCategoryIndex: i,
        activeCategoryNotes: categoryItem.notes
      });
    }
  };

  onSelectNote = (value: string) => {
    this.setState({ noteSelect: value });
  };

  handleSearch = searchObject => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.content) {
      setTimeout(() => {
        const newData = this.state.activeCategoryNotes.filter(
          d => d.content === searchObject.content
        );
        this.setState({ isFetchingData: false, activeCategoryNotes: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };

  render() {
    console.log(
      'this.fetchAndUpdateNotesToState("start", 0)',
      this.state.activeCategoryNotes
    );

    const notesListClasses: any = {
      parent_class: "membernotes-noteslist",
      note_heading: "note-heading",
      timeago: "note-timeago",
      content_text: "content-text",
      category_chip: "category-chip",
      para: "para"
    };

    return (
      <div>
        <React.Fragment>
          <FrxDialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title="MEMBER NOTES"
            handleClose={this.onClose}
            handleAction={this.action}
            open={this.props.openPopup}
            showActions={false}
            className="member-notes-popup-root"
            height="80%"
            width="90%"
          >
            <Grid
              container
              spacing={0}
              className="member-notes-popup-root__dialog"
            >
              <Grid
                xs={4}
                className="member-notes-popup-root__dialog__categories"
                alignContent="flex-start"
                key={0}
                item
              >
                <List>
                  <ListItem
                    key={0}
                    className={
                      this.state.activeCategoryIndex == 0
                        ? "member-notes-popup-root__category-list__item--active"
                        : "member-notes-popup-root__category-list__item"
                    }
                    onClick={() =>
                      this.fetchAndUpdateNotesToState("onClick", 0, "all")
                    }
                  >
                    <ListItemText
                      className={
                        this.state.activeCategoryIndex == 0
                          ? "member-notes-popup-root__category-list__item__text--active"
                          : "member-notes-popup-root__category-list__item__text"
                      }
                    >
                      ALL
                    </ListItemText>
                  </ListItem>
                  {this.state.categoriesData.map((item: any, i: number) => {
                    return (
                      <ListItem
                        key={item.id}
                        className={
                          this.state.activeCategoryIndex == i + 1
                            ? "member-notes-popup-root__category-list__item--active"
                            : "member-notes-popup-root__category-list__item"
                        }
                        onClick={() =>
                          this.fetchAndUpdateNotesToState(
                            "onClick",
                            i + 1,
                            item.category
                          )
                        }
                      >
                        <ListItemText
                          className={
                            this.state.activeCategoryIndex == i + 1
                              ? "member-notes-popup-root__category-list__item__text--active"
                              : "member-notes-popup-root__category-list__item__text"
                          }
                        >
                          {item.category}
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>

              <Grid
                className="member-notes-popup-root__dialog__category-notes"
                item
                xs
                direction="column"
              >
                <div
                  className="member-notes-popup-root__dialog__category-notes__top-bar"
                  key={1}
                >
                  <svg
                    className="member-notes-popup-root__dialog__category-notes__top-bar__search-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7ZM7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5C8.61495 13.5 10.0923 12.911 11.2291 11.9362L14.6464 15.3536C14.8417 15.5488 15.1583 15.5488 15.3536 15.3536C15.5488 15.1583 15.5488 14.8417 15.3536 14.6464L11.9362 11.2291C12.911 10.0923 13.5 8.61495 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5Z"
                      fill="#999999"
                    />
                  </svg>
                  <TextField
                    className="member-notes-popup-root__dialog__category-note__top-bar-search-box"
                    //variant="outlined-search"
                    onChange={(e: any) => {
                      if (
                        (e && e.target && e.target.value) ||
                        (e && e.target && e.target.value === "")
                      ) {
                        let Match = (serTxt: any) => {
                          var searchTxt = serTxt.toLowerCase();
                          return (item: any) => {
                            return (
                              item.category.toLowerCase().includes(searchTxt) ||
                              item.content.toLowerCase().includes(searchTxt) ||
                              item.heading.toLowerCase().includes(searchTxt) ||
                              item.timeAgo.toLowerCase().includes(searchTxt)
                            );
                          };
                        };
                        let match = Match(e.target.value);
                        this.setState({
                          filteredData: this.state.activeCategoryNotes.filter(
                            (item: any) => match(item)
                          )
                        });
                      } else {
                        this.setState({
                          filteredData: []
                        });
                      }
                    }}
                    type="search"
                    placeholder="Search (note, user, date, category, user)"
                  />
                  <svg
                    onClick={this.handleListNotesViewClick}
                    className="member-notes-popup-root__dialog__category-note__top-bar_list-icon"
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="red"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4 5H5.6C5.048 5 5 5.447 5 6C5 6.553 5.048 7 5.6 7H11.4C11.952 7 12 6.553 12 6C12 5.447 11.952 5 11.4 5ZM13.4 10H5.6C5.048 10 5 10.447 5 11C5 11.553 5.048 12 5.6 12H13.4C13.952 12 14 11.553 14 11C14 10.447 13.952 10 13.4 10ZM5.6 2H13.4C13.952 2 14 1.553 14 1C14 0.447 13.952 0 13.4 0H5.6C5.048 0 5 0.447 5 1C5 1.553 5.048 2 5.6 2ZM2.4 5H0.6C0.0479999 5 0 5.447 0 6C0 6.553 0.0479999 7 0.6 7H2.4C2.952 7 3 6.553 3 6C3 5.447 2.952 5 2.4 5ZM2.4 10H0.6C0.0479999 10 0 10.447 0 11C0 11.553 0.0479999 12 0.6 12H2.4C2.952 12 3 11.553 3 11C3 10.447 2.952 10 2.4 10ZM2.4 0H0.6C0.0479999 0 0 0.447 0 1C0 1.553 0.0479999 2 0.6 2H2.4C2.952 2 3 1.553 3 1C3 0.447 2.952 0 2.4 0Z"
                      fill={this.state.listView ? "#F65A1C" : "#666666"}
                    />
                  </svg>
                  <svg
                    onClick={this.handleGridNotesViewClick}
                    className="member-notes-popup-root__dialog__category-note__topBar_div-icon"
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="blue"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 0H10V4H6V0ZM12 0H16V4H12V0ZM0 0H4V4H0V0ZM6 6H10V10H6V6ZM12 6H16V10H12V6ZM0 6H4V10H0V6Z"
                      fill={this.state.listView ? "#666666" : "#F65A1C"}
                    />
                  </svg>
                </div>

                <div className="member-notes-popup-root__dialog__category-notes__list scroll-bar">
                  {this.state.listView ? (
                    <NotesList
                      title=""
                      items={
                        this.state.filteredData.length > 0
                          ? this.state.filteredData
                          : this.state.activeCategoryNotes
                      }
                      type="membernotes"
                      notesListClasses={notesListClasses}
                    />
                  ) : (
                    <div className="member-notes-popup-root__dialog__category-notes__list-grid">
                      <FrxGridContainer
                        enableSearch
                        onSearch={this.handleSearch}
                        fixedColumnKeys={["auth-overrideid"]}
                        gridName="MEMBER NOTES"
                        isFetchingData={this.state.isFetchingData}
                        columns={this.state.columns}
                        data={
                          this.state.filteredData.length > 0
                            ? this.state.filteredData
                            : this.state.activeCategoryNotes
                        }
                        pagintionPosition="bottomRight"
                        onSettingsClick="grid-menu"
                        enableSettings={false}
                        scroll={{ x: 400, y: 300 }}
                        hidePagination={false}
                        hideItemsPerPage={false}
                        hidePageJumper={true}
                        hideClearFilter={true}
                        hideMultiSort={true}
                      />
                    </div>
                  )}
                </div>

                <div className="member-notes-popup-root__dialog__category-notes_form">
                  <input
                    className="member-notes-popup-root__dialog__category-notes_form__input-field"
                    placeholder="Add a note"
                  />
                  {/* <select
                    className="member-notes-popup-root__dialog__category-notes_form__drop-down"
                  >
                    {this.state.categoriesData.map((item: any, i: number) => {
                      return (
                        <option>{item.category}</option>
                      )
                    })
                    }
                  </select> */}
                  <Select
                    placeholder="Summary"
                    value={this.state.noteSelect}
                    onChange={this.onSelectNote}
                    className="member-notes-popup-root__dialog__category-notes_form__drop-down"
                    suffixIcon={
                      <svg
                        className="ant-select-suffix"
                        width="6"
                        height="3"
                        viewBox="0 0 6 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                          fill="#999999"
                        />
                      </svg>
                    }
                  >
                    {this.state.categoriesData.map((item: any, i: number) => {
                      return (
                        <Option value={item.category}>{item.category}</Option>
                      );
                    })}
                  </Select>
                  <button className="member-notes-popup-root__dialog__category-notes_form__submit-btn">
                    Add Note
                  </button>
                </div>
              </Grid>
            </Grid>
          </FrxDialogPopup>
        </React.Fragment>
      </div>
    );
  }
}

export default MemberNotesPopup;
