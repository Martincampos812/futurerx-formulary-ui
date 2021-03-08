import React, {Fragment} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
//types
import { IPropT } from './types'
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  select: {
    borderRadius: 5
  },
  input: {
    padding: theme.spacing(0,2),
    "&:focus": {
      padding: theme.spacing(0,2),
      background: "transparent",
    },
  },
}));

const Dropdown = ({ name, label, options, onSetAction, fullWidth, height, width }: IPropT) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box>
        <Typography variant="button">{label}</Typography>
      </Box>
      <FormControl variant="filled" className={classes.formControl} style={{height, width}}>
      <Select
        native
        disableUnderline
        fullWidth={fullWidth}
        inputProps={{
          name,
          className: classes.input, 
        }}
        onChange={({target:{value}})=>onSetAction(value)}
        className={classes.select}
        style={{height}}
      >
        {options.map((value)=> (
          <option value={value}>{value}</option>
        ))}
      </Select>
    </FormControl>
    </Fragment>
  );
};

export default Dropdown;
