import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';



export default function CheckboxLabels(Props:any) {
  return (
    <FormGroup row>
      {
        Props.checkBoxOpt!==undefined && Props.checkBoxOpt.map(e=>{
          return <FormControlLabel control={<Checkbox onChange = {(event) => Props.selectionHandler(event, e.text, Props.title)}/>} label={e.text} />
        })
      }
    </FormGroup>
  );
}
