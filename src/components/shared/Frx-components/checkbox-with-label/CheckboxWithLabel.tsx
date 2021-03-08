import React, { Component } from 'react';
import { Checkbox } from "antd";
import './CheckboxWithLabel.scss';

class CheckboxWithLabel extends Component<any, any> {
  render() {
    const { children } = this.props;
    
    return ( 
      <div className="checkbox-with-label">
        <Checkbox className="custom-checkbox" {...this.props}>
          <span className="checkbox-with-label__text">{children}</span>
        </Checkbox>
      </div>
    );
  }
}

export default CheckboxWithLabel;