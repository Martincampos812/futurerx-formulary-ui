import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Input } from "@material-ui/core";
import CustomSelect from "../../../../../shared/Frx-components/dropdown/DropDown";

interface Props {
  radiobtn?: any;
  filetype: string;
  input?: string;
}
export default function RadioButtons(Props: Props) {
  let radioBtnlayout, radioDefault;

  if (Props.radiobtn && Props.radiobtn.length > 0) {
    radioDefault = Props.radiobtn[0]
    radioBtnlayout = Props.radiobtn.map((e) => {
      return (
        <FormControlLabel key={e} value={e} control={<Radio color="primary" />} label={e} />
      )
    })
  }

  return (
    <React.Fragment>
      <div className="filetype">
        <span>{Props.filetype}</span>
        {Props.input === 'input' &&
          <div className="input"><Input
            className=""
            placeholder=""
            type="text"
            name="claimId"
            value=''
            disableUnderline={true}
          /></div>
        }
        {Props.input === 'select' && <CustomSelect
          placeholder="Select"
          value=''
          options={['']}
        />}
      </div>
      <div className="radio-option">
        <FormControl component="fieldset">
          <RadioGroup row aria-label="position" name="position" defaultValue={radioDefault}>
            {radioBtnlayout}
          </RadioGroup>
        </FormControl>
      </div>
      <div className="applybtn">
      <Button variant="contained" color="primary">Apply</Button>
      </div>
    </React.Fragment>
  );
}
