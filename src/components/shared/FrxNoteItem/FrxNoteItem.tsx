import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Chip from "@material-ui/core/Chip";
import "./FrxNoteItem.scss";

const styles = (theme: Theme) => ({
  root: {
    // maxWidth: 750,
    minWidth: 640,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
});

// interface StyleProps {
// 	root:BaseCSSProperties;
// 	inline:BaseCSSProperties;
// }

interface NoteItemProps {
  classes: any;
  avatar?: string;
  timeAgo: string;
  heading: string;
  content: string;
  title?: string;
  id: number;
  type?: string;
  category?: string;
  notesListClasses?: any;
}

class NoteItem extends React.Component<NoteItemProps> {
  render() {
    const { classes, avatar, heading, content, timeAgo, title } = this.props;

    return (
      <>
        {/* <Divider component="li" className="note-item-divider"/> */}
        <ListItem alignItems="flex-start" className="frx-note-item-root">
          {avatar ? (
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={avatar} />
            </ListItemAvatar>
          ) : null}
          <ListItemText
            primary={
              <>
                <div>
                  <p
                    className={
                      Boolean(title)
                        ? "frx-note-item-root__list-item-unique"
                        : "frx-note-item-root__list-item"
                    }
                  >
                    <span className="frx-note-item-root__list-item__heading">
                      {heading}
                    </span>
                    &nbsp; &nbsp;
                    <span
                      className={
                        Boolean(title)
                          ? "frx-note-item-root__list-item__date-unique"
                          : "frx-note-item-root__list-item__date"
                      }
                    >
                      {timeAgo}
                    </span>
                  </p>
                </div>
                {Boolean(title) ? (
                  <p className="frx-note-item-root__list-item-unique">
                    <span className="frx-note-item-root__list-item__title">
                      {title}
                    </span>
                  </p>
                ) : null}
              </>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className="frx-note-item-root__list-item__content"
                  color="textPrimary"
                >
                  {content.length > 100
                    ? content.substring(0, 120) + "..."
                    : content}
                </Typography>
              </React.Fragment>
            }
          />
          {this.props.type == "membernotes" ? (
            <Chip
              className="frx-note-item-root__list-item__chip"
              label={this.props.category}
              variant="outlined"
            />
          ) : (
            ""
          )}
        </ListItem>
        <Divider component="li" className="note-item-divider" />
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NoteItem);
