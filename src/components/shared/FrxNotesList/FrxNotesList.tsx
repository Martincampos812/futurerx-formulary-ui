import { DialogClassKey } from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import React from "react";
import { NoteItemModel } from "../../../models/note-item.model";
import NoteItem from "../FrxNoteItem/FrxNoteItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import './FrxNotesList.scss'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      //width: "100%",
      //maxHeight: 250,
      overflowY: "auto",
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: "inline"
    }
  });

interface NotesListProps {
  classes: Partial<Record<DialogClassKey, string>>;
  items: NoteItemModel[];
  title: string;
  type: string;
  notesListClasses?: any;
}

class NotesList extends React.Component<NotesListProps> {
  textAreaStyles = {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    display: "block"
  };
  renderListItems = () => {
    const { items } = this.props;
    return items.map((item: NoteItemModel, index: number) => {
      return (
        <NoteItem
          key={item.id}
          {...item}
          type={this.props.type}
          notesListClasses={this.props.notesListClasses}
        />
      );
    });
  };

  render() {
    const { classes, title } = this.props;
    return (
      <>
        <List
          subheader={<ListSubheader>{title}</ListSubheader>}
          className="frx-note-list-container-root"
        >
          {this.renderListItems()}
        </List>
        {this.props.type === "notes" ? (
          <TextareaAutosize
            style={this.textAreaStyles}
            aria-label="add note"
            rowsMin={3}
            placeholder="Add note"
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NotesList);
