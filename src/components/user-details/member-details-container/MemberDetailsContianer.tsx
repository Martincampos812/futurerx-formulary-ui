import React, {ReactElement} from "react";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";

import MemberDetails from "../member-details/MemberDetails";
import InformationCard from "../information-card/InformationCard";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // marginLeft: "10px",
      // margitnRight: "10px",
      // width: "600px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "end",
      color: theme.palette.text.secondary,
      marginBottom: "0px",
    },
  })
);

interface Props {}
export default function MemberDetailsContianer({}: Props): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={4}>
          <MemberDetails />
        </Grid>

        <Grid item sm={8}>
          {/* <Paper className={classes.paper}>
            <CloseIcon />
          </Paper> */}
          <InformationCard />
        </Grid>
      </Grid>
    </div>
  );
}
