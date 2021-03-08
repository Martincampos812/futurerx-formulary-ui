import React from "react";
import FrxNotesList from "../../../shared/FrxNotesList/FrxNotesList";
import { NoteItemModel } from "../../../../models/note-item.model";
import { getReviewNotesData } from "../../../../mocks/GrievanceReviewNotesMock";
import { Container, Divider, Button } from "@material-ui/core";
import "./GrievancesReviewNotes.scss";
interface ReviewNotesProps {
  items?: NoteItemModel;
  title: string;
  type?: string;
  notesListClasses?: any;
}

interface ReviewNotesState {
  notes: any;
  // activeCategoryIndex: number;
  filteredData: any;
}

const notesListClasses: any = {
  parent_class: "membernotes-noteslist",
  note_heading: "note-heading",
  timeago: "note-timeago",
  content_text: "content-text",
  category_chip: "category-chip",
  para: "para",
};
class ReviewNotes extends React.Component<ReviewNotesProps, ReviewNotesState> {
  state = {
    filteredData: [],
    notes: [],
  };

  componentDidMount() {
    this.setState({
      notes: getReviewNotesData(),
    });
  }
  render() {
    return (
      <div className="grn-tab-info">
        <div className="title mb-15">
          <span>{this.props.title}</span>
          <div className="icon-wrapper">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                fill="#2055B5"
              ></path>
            </svg>
          </div>
        </div>
        <div className="top-div">
          <Divider />
        </div>
        <Container disableGutters className="__rn-container scroll-bar">
          <div className="bg-white cdh1-mn-container">
            <FrxNotesList
              title=""
              items={this.state.notes}
              type=""
              notesListClasses={notesListClasses}
            />
          </div>
        </Container>
        <div className="rn__flex-container">
          <input className="rn__input-field" placeholder="Add a note" />
          <Button className="rn__btn">Add Note</Button>
        </div>
      </div>
    );
  }
}
export default ReviewNotes;
