import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import NotesPopOver from "../FrxNotesPopOver/FrxNotesPopOver";

const styles = (theme: Theme) => ({
  root: {
    maxWidth: 750,
    minWidth: 640,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

// interface StyleProps {
// 	root:BaseCSSProperties;
// 	inline:BaseCSSProperties;
// }

interface DialogListItemProps {
  classes: any;
  avatar: string;
  heading: string;
  content: string;
  type: string;
  id: number;
  showDivider: boolean;
  showActions: boolean;
}

class DialogListItem extends React.Component<DialogListItemProps> {
  render() {
    const {
      classes,
      avatar,
      heading,
      content,
      showDivider,
      id,
      showActions
    } = this.props;

    return (
      <>
        <ListItem alignItems="flex-start">
          {avatar ? (
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={avatar} />
            </ListItemAvatar>
          ) : null}
          <ListItemText
            primary={heading}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {content}
                </Typography>
              </React.Fragment>
            }
          />
          {showActions ? (
            <>
              <Button>Delete</Button>

              <NotesPopOver width={350} placement={"left-start"} id={id} />
            </>
          ) : null}
        </ListItem>
        {showDivider ? <Divider component="li" /> : null}
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogListItem);
