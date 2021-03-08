import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { switchSlice } from "../../../../../../redux/slices/formulary/switch/switchSlice";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const mapPropToState = (dispatch) => {
  return {
    switchBtn: (switchValue) =>
      dispatch(switchSlice.actions.switchButton(switchValue)),
  };
};

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 34,
      height: 18,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: 1,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(17px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: "#1D54B4",
          borderColor: "#1D54B4",
        },
      },
    },
    thumb: {
      width: 16,
      height: 16,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 17,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  })
)(Switch);

function CustomizedSwitches(props: any) {
  const [state, setState] = React.useState({
    checkedC: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.switchBtn(event.target.checked);
  };

  useEffect(() => {
    props.switchBtn(false);
  }, []);

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item className="label">
            {props.leftTitle}
          </Grid>
          <Grid item className="switch">
            <AntSwitch
              checked={state.checkedC}
              onChange={handleChange}
              name="checkedC"
            />
          </Grid>
          <Grid item className="label">
            {props.rightTitle}
          </Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}

export default connect(null, mapPropToState)(CustomizedSwitches);
