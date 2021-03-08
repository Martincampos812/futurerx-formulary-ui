import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper, { PopperPlacementType } from "@material-ui/core/Popper";
import React from "react";
import { NoteItemModel } from "../../../models/note-item.model";
import NotesList from "../FrxNotesList/FrxNotesList";
import "./FrxNotesPopOver.scss";

interface NotesPopOverProps {
  placement: PopperPlacementType | undefined;

  width: number;
  id: number;
}

interface NotesPopOverState {
  anchorEl: HTMLElement | null;
  notes: NoteItemModel[];
}

class NotesPopOver extends React.Component<
  NotesPopOverProps,
  NotesPopOverState
> {
  state = {
    anchorEl: null,
    notes: []
  };

  componentDidMount() {
    // from server

    const notes: NoteItemModel[] = [
      {
        id: 1,
        content: "Member is due for a flu shot",
        heading: "George Smith",
        timeAgo: "09/21/2020",
        avatar: "https://via.placeholder.com/150"
      },
      {
        id: 2,
        content: "Member declined a flu shot at latest PCP appointment",
        heading: "George Smith",
        timeAgo: "2 hours ago",
        avatar: "https://via.placeholder.com/150"
      }
    ];

    this.setState({ notes });
  }

  /**
   * @function handleNotesClick
   * to trigger open/close of notes pop up
   * @param event React.MouseEvent<HTMLElement>
   * @author Deepak_T
   */
  handleNotesClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: this.state.anchorEl ? null : event.currentTarget
    });
  };

  /**
   * @function handleNotesClose
   * to close notes pop up
   * @author Deepak_T
   */
  handleNotesClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { placement, id } = this.props;
    return (
      <>
        <Button onClick={this.handleNotesClick}>Notes</Button>

        <Popper
          open={this.state.anchorEl ? true : false}
          id={id + ""}
          className="notes-pop-over"
          anchorEl={this.state.anchorEl}
          placement={placement}
          transition
        >
          <ClickAwayListener onClickAway={this.handleNotesClose}>
            <NotesList
              title="MEMBER NOTIFICATION NOTES"
              items={this.state.notes}
              type="notes"
            />
          </ClickAwayListener>
        </Popper>
      </>
    );
  }
}

export default NotesPopOver;
