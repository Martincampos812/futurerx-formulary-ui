import React, { Component } from 'react'
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Label from '../../../../../../../../shared/Frx-components/label/Label'

import './styles.scss';

export interface ChoiceProps {
  step?: number
  loadingFileType?: string;
  choiceType?: string;
  onChange?: (key: string, value: string) => void
}

export interface ChoiceState {
  
}

class Choice extends Component<ChoiceProps, ChoiceState> {
  handleFileTypeChange = (e) => {
    const { onChange } = this.props;
    
    if(typeof(onChange) === 'function') {
      onChange(e.target.name, e.target.value);
    }
  }
  
  renderLoadingFileType = () => {
    const { loadingFileType } = this.props; 
    
    return (
      <div className="file-type">
        <Label><span className="file-type__label">What type of file are you loading?</span></Label>
        
        <div className="file-type__radio-group radio-group">
          <RadioGroup
            className="radio-group-custom"
            name="loadingFileType"
            value={loadingFileType}
            onChange={this.handleFileTypeChange}
              >
                <FormControlLabel
                  value="full-replace"
                  control={<Radio />}
                  label="Full Replace"
                />
                <FormControlLabel
                  value="changes-only"
                  control={<Radio />}
                  label="Changes Only"
                />
            </RadioGroup>
          </div>
      </div>
    )  
  }

  renderChoiceType = () => {
    const { choiceType } = this.props; 
    
    return (
      <div className="file-type">        
        <div className="file-type__radio-group radio-group">
          <RadioGroup
            className="radio-group-custom"
            name="choiceType"
            value={choiceType}
            onChange={this.handleFileTypeChange}
              >
              <FormControlLabel
                value="formulary"
                control={<Radio />}
                label="Formulary"
              />
              <FormControlLabel
                value="list"
                control={<Radio />}
                label="List"
              />
          </RadioGroup>
        </div>
        
        {
          choiceType === 'list' &&
          <div className="file-type__checklist">
          </div>
        }
          
      </div>
    )  
  }

  render() {
    const { step } = this.props; 
    
    return ( 
      <div id="upload-choice">
        { step === 1 && this.renderLoadingFileType() }
        { step === 2 && this.renderChoiceType() }
      </div>
    );
  }
}

export default Choice;
