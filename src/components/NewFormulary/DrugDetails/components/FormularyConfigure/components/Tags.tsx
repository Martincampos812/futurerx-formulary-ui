/* eslint-disable no-use-before-define */

import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props: any) {
  const onchangeHandler = (e, val) => {
    props.getAutoCompleteChange(val);
  };
  // let tt = props.autoSelected.length>0?props.autoSelected[0]:[{
  //   value:'ff'
  // }];
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={props.options}
      disableCloseOnSelect
      value={props.autoSelected}
      getOptionLabel={(option: any) => option.value}
      onChange={onchangeHandler}
      disabled={props.editable}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.value}
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  );
}
